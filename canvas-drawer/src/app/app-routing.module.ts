import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {path: 'canvas', component: CanvasComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
