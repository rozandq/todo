import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TodoList, TodoService, TodoItem} from '../todo.service';
import {forEach} from '@angular-devkit/schematics';
import { AlertController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  private _list: TodoList;

  constructor(
      private activatedRoute: ActivatedRoute,
      private todoService: TodoService,
      private alertController: AlertController
  ) {
    this.activatedRoute.params.subscribe(
        res =>
            this.todoService.getListFromID(res.id).subscribe(
            list => this._list = list
        )
    );
  }

  ngOnInit() {

  }

  get name(): string {
    return this._list ? this._list.name : "";
  }

  get todos(): TodoItem[] {;
      return this._list ? this._list.items : [];
  }

  async removeItem(slidingItem: IonItemSliding, item: TodoItem){
    slidingItem.close();

    const alert = await this.alertController.create({
      header: 'Confirmer',
      message: 'Etes vous sûr de vouloir supprimer cet item ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Oui',
          handler: () => {
            this.todoService.deleteTodo(this._list.uuid, item.uuid);
          }
        }
      ]
    });

    await alert.present();
  }

  async addItem(){
    const alert = await this.alertController.create({
      header: 'Nouvel Item',
      inputs: [
        {
          name: 'nom',
          type: 'text',
          placeholder: 'Nom'
        },
        {
          name: 'desc',
          placeholder: 'Description'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok');
            let newItem: TodoItem = {
              // FAIRE UNE VRAIE FONCTION POUR GENERER LES IDs CORRECTREMENT
              uuid : Math.random() * 10000000000000000 + "",
              name : data.nom ? data.nom : "Sans Nom",
              desc : data.desc ? data.desc : "",
              complete : false
            };
            this.todoService.addTodo(this._list.uuid, newItem);
          }
        }
      ]
    });

    await alert.present();
  }

  async editItem(slidingItem: IonItemSliding, item: TodoItem){
    slidingItem.close();
    const alert = await this.alertController.create({
      header: 'Modifier Item',
      inputs: [
        {
          name: 'nom',
          type: 'text',
          value: item.name
        },
        {
          name: 'desc',
          value: item.desc,
          placeholder: "Description"
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok');
            item.name = data.nom;
            item.desc = data.desc;
            this.todoService.editTodo(this._list.uuid, item);
          }
        }
      ]
    });

    await alert.present();
  }
}
