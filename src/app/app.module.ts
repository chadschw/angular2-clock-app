import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ClockComponent } from './clock/clock.component';
import { AnalogClockComponent } from './analog-clock/analog-clock.component';

import { ClockSettingsService } from './clock-settings/clock-settings.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ClockComponent,
    AnalogClockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ClockSettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
