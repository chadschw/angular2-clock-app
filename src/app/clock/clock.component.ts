import { Component, OnInit } from '@angular/core'

import { ClockSettingsService } from '../clock-settings/clock-settings.service';

declare var $: any;

@Component({
    selector: "clock",
    styleUrls: [
        'clock.styles.css'
    ],
    templateUrl: 'clock.template.html'
})
export class ClockComponent implements OnInit{
    Time: Date;

    constructor(private clockSettings: ClockSettingsService) {
        this.Time = new Date(Date.now());

        setInterval(() => {
            this.OnInterval();
        }, 1000);
    }

    OnInterval() {
        this.Time = new Date(Date.now());
    }

    private _bgImgElement: HTMLImageElement;
    private _bgImgDivElement: HTMLElement;
    
    ngOnInit() {
        $( () => {
            $( ".draggable" ).draggable();
      } );

      this._bgImgElement = <HTMLImageElement>document.getElementById("background-image");
      this._bgImgDivElement = document.getElementById("background-img-div");

      var img = new Image();
      img.src = this.clockSettings.BgImgSrc;
      var self = this;
      img.onload = () => { 
          self.clockSettings.PlaceBgImgAt(0,0);
     }

     this.clockSettings.SetSetPositionCallback(() => {
        this._bgImgDivElement.style.position = "absolute";
        this._bgImgDivElement.style.left = this.clockSettings.BgImgXposAsString;
        this._bgImgDivElement.style.top = this.clockSettings.BgImgYposAsString;
     });

     this.clockSettings.SetGetImgWidthCallback(() => {
         console.log("img width = " + this._bgImgElement.width);
         return this._bgImgElement.width;
     });
    }
}
