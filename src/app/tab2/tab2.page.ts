import { Component , OnInit } from '@angular/core';
import {TodoList, TodoService} from '../todo.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  todos: TodoList[];

  constructor(
    private todoService: TodoService, private navCtrl: NavController,
    private alertController: AlertController
  ){}

  ngOnInit(){
    this.todoService.getList().subscribe(
        lists => this.todos = lists
    );
  }

  itemsLeft(list: TodoList){
      return list.items.reduce((previousValue, currentValue) => currentValue.complete ? previousValue : previousValue + 1, 0);
  }

  openList(index) {
    this.navCtrl.navigateForward(`/list/${index}`);
  }

  async addList() {
    const alert = await this.alertController.create({
      header: 'Nouvelle Liste',
      inputs: [
        {
          name: 'nom',
          type: 'text',
          placeholder: "Nom"
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
            let newList: TodoList = {
              // FAIRE UNE VRAIE FONCTION POUR GENERER LES IDs CORRECTREMENT
              uuid : Math.random() * 10000000000000000 + "",
              name : data.nom ? data.nom : "Sans Nom",
              items : []
            };
            this.todoService.addList(newList);
          }
        }
      ]
    });

    await alert.present();
  }

  async removeList(list: TodoList){
    const alert = await this.alertController.create({
      header: 'Confirmer',
      message: 'Etes vous sûr de vouloir supprimer cette liste ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Oui',
          handler: () => {
            this.todoService.deleteList(list);
          }
        }
      ]
    });

    await alert.present();
  }

  async editList(list: TodoList){
    const alert = await this.alertController.create({
      header: 'Modifier Liste',
      inputs: [
        {
          name: 'nom',
          type: 'text',
          value: list.name
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
            list.name = data.nom;
            this.todoService.editList(list);
          }
        }
      ]
    });

    await alert.present();
  }
}
