import { Component, OnInit, NgZone } from '@angular/core'

import { ClockSettingsService } from '../clock-settings/clock-settings.service';
import { ImgZoomService, ImgState } from './img-zoom.service';

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

    constructor(
        private clockSettings: ClockSettingsService,
        private imgZoom: ImgZoomService,
        private zone: NgZone) {
        this.Time = new Date(Date.now());

        setInterval(() => {
            this.OnInterval();
        }, 1000);

        window.onmousewheel = (e: MouseWheelEvent) => {
            this.zone.run(() => {
                console.log(e);
                this.OnMouseWheel(e.deltaY);
            });
        }

        window.onmousemove = (e: MouseEvent) => {
            this.OnMouseMove(e.x, e.y);
        }
    }

    OnInterval() {
        this.Time = new Date(Date.now());
    }

    OnMouseWheel(delta: number) {
        var zoomFactor = (delta > 0) ? 0.9 : 1.1;
        var newImgState = this.imgZoom.Zoom(this.GetBgImgState(), zoomFactor, this.mx, this.my);
        this.SetBgImgState(newImgState);
    }

    private mx: number = 0;
    private my: number = 0;

    OnMouseMove(x: number, y: number) {
        this.mx = x;
        this.my = y;
    }

    private GetBgImgState(): ImgState {
        return ImgState.Create(
            this.GetBgImgX(),
            this.GetBgImgY(),
            this._bgImgElement.height,
            this._bgImgElement.width);
    }

    private GetBgImgX(): number {
        var str: string = this._bgImgDivElement.style.left;
        str = str.replace("px", "");
        return parseInt(str);
    }

    private GetBgImgY(): number {
        var str: string = this._bgImgDivElement.style.top;
        str = str.replace("px", "");
        return parseInt(str);
    }

    private SetBgImgState(imgState: ImgState) {
        this.clockSettings.PlaceBgImgAt(imgState.x, imgState.y);
        this.clockSettings.SetImgWidthHeight(imgState.w, imgState.h);
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
