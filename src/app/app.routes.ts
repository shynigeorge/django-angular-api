import { Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';

export const routes: Routes = [
    { path: 'list', component: ViewComponent},
    
    { path: 'add', component: AddComponent },
    { path: 'update/:id', component: UpdateComponent },
   
];
