import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
<<<<<<< HEAD
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './draw/draw.module#DrawPageModule' },
=======
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
>>>>>>> f33497cca3ffb825078256e822599c36ddcf206b
  { path: 'list/:id', loadChildren: './list/list.module#ListPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
