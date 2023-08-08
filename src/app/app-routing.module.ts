import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componant/page/home/home.component';
import { DetailsComponent } from './componant/page/details/details.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'details', component: DetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/home' }, // Redirect for invalid routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
