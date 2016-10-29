"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AnalogClockComponent = (function () {
    function AnalogClockComponent() {
    }
    AnalogClockComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._secondImgElement = document.getElementById("second");
        this._secondImgElement.style.transformOrigin = "50% 50%";
        this._minuteImgElement = document.getElementById("minute");
        this._secondImgElement.style.transformOrigin = "50% 50%";
        this._hourImgElement = document.getElementById("hour");
        this._hourImgElement.style.transformOrigin = "50% 50%";
        setInterval(function () { _this.OnInterval(); }, 1000);
        //this._secondImgElement.style.transform = this.BuildRotateString(45);
    };
    AnalogClockComponent.prototype.OnInterval = function () {
        var now = new Date(Date.now());
        var milliseconds = now.getMilliseconds();
        var seconds = now.getSeconds();
        var minutes = now.getMinutes();
        var hours = now.getHours();
        var secondDegress = ((seconds * 1000) + milliseconds) * (6 / 1000);
        var minuteDegrees = ((minutes * 60) + seconds) * (6 / 60);
        var hourDegrees = hours * 30;
        hourDegrees += ((minutes * 60) + seconds) * (30 / 3600);
        console.log(minuteDegrees);
        this._secondImgElement.style.transform = this.BuildRotateString(secondDegress);
        this._minuteImgElement.style.transform = this.BuildRotateString(minuteDegrees);
        this._hourImgElement.style.transform = this.BuildRotateString(hourDegrees);
    };
    AnalogClockComponent.prototype.BuildRotateString = function (degrees) {
        return "rotate(" + degrees + "deg)";
    };
    AnalogClockComponent = __decorate([
        core_1.Component({
            selector: 'analog-clock',
            template: "\n        <div id=\"analog-clock-div\" style=\"white-space: nowrap;\">\n            <img id=\"second\" src=\"second.png\"><img id=\"minute\" src=\"minute.png\"><img id=\"hour\" src=\"hour.png\">\n        </div>\n    ",
            styles: [
                "\n        #analog-clock-div {\n            display: inline-block;\n            width: 200px;\n            overflow: hidden;\n        }\n        #second {\n            \n        }\n        #minute {\n            position: relative;\n            left: -200px;\n        }\n        #hour {\n            position: relative;\n            left: -400px;\n        }\n        "
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AnalogClockComponent);
    return AnalogClockComponent;
}());
exports.AnalogClockComponent = AnalogClockComponent;
//# sourceMappingURL=analog-clock.component.js.map