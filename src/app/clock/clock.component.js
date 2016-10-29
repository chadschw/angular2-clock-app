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
var ClockComponent = (function () {
    // private _imgUrls: string[] = [
    //     "img/palm_tree_sun_rise.jpg",
    //     "img/birds.gif",
    //     "img/clouds.gif",
    //     "img/fog.gif",
    //     "img/iceland.gif",
    //     "img/lake.gif",
    //     "img/mountain_lake.gif",
    //     "img/waterfall.gif",
    //     "img/yosemite.gif"
    // ];
    function ClockComponent() {
        var _this = this;
        this._imgUrls = [
            "http://hdwallsize.com/wp-content/uploads/2013/04/Amazing-Sunrise-Landscape-Wallpaper.jpg",
            "http://wallpapercave.com/wp/cik4PFd.jpg",
            "https://s-media-cache-ak0.pinimg.com/originals/62/6e/07/626e07bfb56bbf629d94cb39a8355b34.jpg",
            "http://www.hdwallpaperup.com/wp-content/uploads/2015/02/Amazing-Landscape-wallpaper.jpg",
            "http://freewallpapers4desktop.com/wallpapers/amazing_landscape-1920x1080.jpg",
            "http://www.animaatjes.de/wallpapers/wallpapers/landschaft/wallpaper_landschap_animaatjes-72.jpg"
        ];
        this._bgImgOpacity = 1;
        this._opacityStep = 0.05;
        this._bgImgWidth = 1000;
        this._bgImgWidthStep = 50;
        this._digitalClock = false;
        this._showControls = false;
        this.NewImageUrl = "";
        this.Time = new Date(Date.now());
        setInterval(function () {
            _this.OnInterval();
        }, 1000);
    }
    ClockComponent.prototype.OnInterval = function () {
        this.Time = new Date(Date.now());
    };
    ClockComponent.prototype.ngOnInit = function () {
        $(function () {
            $(".draggable").draggable();
        });
        this._bgImgElement = document.getElementById("background-image");
        this._bgImgDivElement = document.getElementById("background-img-div");
        var img = new Image();
        img.src = this._imgUrls[0];
        var self = this;
        img.onload = function () {
            document.images["background-image"].src = img.src;
            self.AdjustBgImgOpacity(0);
            self.SetBgImgWidth(window.innerWidth);
            self.PlaceBgImgAt(0, 0);
        };
    };
    ClockComponent.prototype.SetBgImgSrc = function (url) {
        this._bgImgElement.src = url;
    };
    ClockComponent.prototype.OnClockMouseEnter = function () {
        this._showControls = true;
    };
    ClockComponent.prototype.OnClickMouseLeave = function () {
        this._showControls = false;
    };
    ClockComponent.prototype.ToggleAnalogDigital = function () {
        this._digitalClock = !this._digitalClock;
    };
    ClockComponent.prototype.SetBgImgOpacity = function (opacity) {
        this._bgImgOpacity = opacity;
        this._bgImgElement.style.opacity = this._bgImgOpacity.toString();
    };
    ClockComponent.prototype.AdjustBgImgOpacity = function (amount) {
        var newOpacity = this._bgImgOpacity += amount;
        if (newOpacity > 1) {
            newOpacity = 1;
        }
        else if (newOpacity < 0) {
            newOpacity = 0;
        }
        this.SetBgImgOpacity(newOpacity);
    };
    ClockComponent.prototype.Darker = function () {
        this.AdjustBgImgOpacity(this._opacityStep);
    };
    ClockComponent.prototype.Lighter = function () {
        this.AdjustBgImgOpacity(-this._opacityStep);
    };
    ClockComponent.prototype.PlaceBgImgAt = function (x, y) {
        this._bgImgDivElement.style.position = "absolute";
        this._bgImgDivElement.style.left = x + "px";
        this._bgImgDivElement.style.top = y + "px";
    };
    ClockComponent.prototype.SetBgImgWidth = function (width) {
        this._bgImgWidth = width;
        this._bgImgElement.style.height = "auto";
        this._bgImgElement.style.width = this._bgImgWidth.toString() + "px";
    };
    ClockComponent.prototype.AdjustBgImgWidth = function (amount) {
        var newWidth = this._bgImgWidth += amount;
        if (this._bgImgWidth < 200) {
            this._bgImgWidth = 200;
        }
        this.SetBgImgWidth(newWidth);
    };
    ClockComponent.prototype.Wider = function () {
        this.AdjustBgImgWidth(this._bgImgWidthStep);
    };
    ClockComponent.prototype.Narrower = function () {
        this.AdjustBgImgWidth(-this._bgImgWidthStep);
    };
    ClockComponent.prototype.FitWidth = function () {
        this.PlaceBgImgAt(0, 0);
        this._bgImgElement.style.height = "auto";
        this._bgImgWidth = window.innerWidth;
        this._bgImgElement.style.width = this._bgImgWidth + "px";
    };
    ClockComponent.prototype.FitHeight = function () {
        this.PlaceBgImgAt(0, 0);
        this._bgImgElement.style.width = "auto";
        this._bgImgElement.style.height = window.innerHeight + "px";
        this._bgImgWidth = this._bgImgElement.width;
    };
    ClockComponent.prototype.OnSelectImgClick = function (url) {
        this._bgImgElement.src = url;
    };
    ClockComponent.prototype.AddNewImage = function () {
        if (this.NewImageUrl.length !== 0) {
            this._imgUrls.push(this.NewImageUrl);
            this.NewImageUrl = "";
        }
    };
    ClockComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "clock",
            styleUrls: [
                'clock.styles.css'
            ],
            templateUrl: 'clock.template.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ClockComponent);
    return ClockComponent;
}());
exports.ClockComponent = ClockComponent;
//# sourceMappingURL=clock.component.js.map