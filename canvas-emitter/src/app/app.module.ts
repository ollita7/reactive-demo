import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CanvasEmitterComponent } from './canvas-emitter/canvas-emitter.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasEmitterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
