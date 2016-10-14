import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { ClockComponent } from './clock.component';
import { AnalogClockComponent } from './analog-clock.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule 
  ],
  declarations: [ 
    AppComponent,
    ClockComponent,
    AnalogClockComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
