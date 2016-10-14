import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'analog-clock',
    template: `
        <div id="analog-clock-div" style="white-space: nowrap;">
            <img id="second" src="second.png"><img id="minute" src="minute.png"><img id="hour" src="hour.png">
        </div>
    `,
    styles: [
        `
        #analog-clock-div {
            display: inline-block;
            width: 200px;
            overflow: hidden;
        }
        #second {
            
        }
        #minute {
            position: relative;
            left: -200px;
        }
        #hour {
            position: relative;
            left: -400px;
        }
        `
    ]
})
export class AnalogClockComponent implements OnInit {
    private _secondImgElement: HTMLImageElement;
    private _minuteImgElement: HTMLImageElement;
    private _hourImgElement: HTMLImageElement;

    ngOnInit() {
        this._secondImgElement = <HTMLImageElement>document.getElementById("second");
        this._secondImgElement.style.transformOrigin = "50% 50%";

        this._minuteImgElement = <HTMLImageElement>document.getElementById("minute");
        this._secondImgElement.style.transformOrigin = "50% 50%";

        this._hourImgElement = <HTMLImageElement>document.getElementById("hour");
        this._hourImgElement.style.transformOrigin = "50% 50%";

        setInterval(() => { this.OnInterval();}, 1000);

        //this._secondImgElement.style.transform = this.BuildRotateString(45);
    }

    OnInterval() {
        var now = new Date(Date.now());
        var milliseconds = now.getMilliseconds();
        var seconds = now.getSeconds();
        var minutes = now.getMinutes();
        var hours = now.getHours();

        var secondDegress = ((seconds * 1000) + milliseconds) * (6/1000);

        var minuteDegrees = ((minutes * 60) + seconds) * (6/60);
        
        var hourDegrees = hours * 30;
        hourDegrees += ((minutes * 60) + seconds) * (30/3600);

        console.log(minuteDegrees);

        this._secondImgElement.style.transform = this.BuildRotateString(secondDegress);
        this._minuteImgElement.style.transform = this.BuildRotateString(minuteDegrees);
        this._hourImgElement.style.transform = this.BuildRotateString(hourDegrees);

    }

    BuildRotateString(degrees: number): string {
        return "rotate("+degrees+"deg)";
    }
}