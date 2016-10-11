import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ClockComponent } from './clock.component';
import { AnalogClockComponent } from './analog-clock.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ 
    AppComponent,
    ClockComponent,
    AnalogClockComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
