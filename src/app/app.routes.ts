import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormComponent } from './pages/reactive-form/reactive-form.component';
import { TemplateFormComponent } from './pages/template-form/template-form.component';

export const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'reactive-form', component: ReactiveFormComponent},
    {path:'template-form', component:TemplateFormComponent},
    {path:'', redirectTo: 'home', pathMatch: 'full'},
    {path:'**', redirectTo: 'home', pathMatch: 'full'},
];
