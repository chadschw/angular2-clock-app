import { Component, OnInit } from '@angular/core'

declare var $: any;

@Component({
    moduleId: module.id,
    selector: "clock",
    styleUrls: [
        'clock.styles.css'
    ],
    templateUrl: 'clock.template.html'
})
export class ClockComponent implements OnInit{
    Time: Date;

    private _imgUrls: string[] = [
        "http://hdwallsize.com/wp-content/uploads/2013/04/Amazing-Sunrise-Landscape-Wallpaper.jpg",
        "http://wallpapercave.com/wp/cik4PFd.jpg",
        "https://s-media-cache-ak0.pinimg.com/originals/62/6e/07/626e07bfb56bbf629d94cb39a8355b34.jpg",
        "http://www.hdwallpaperup.com/wp-content/uploads/2015/02/Amazing-Landscape-wallpaper.jpg",
        "http://freewallpapers4desktop.com/wallpapers/amazing_landscape-1920x1080.jpg",
        "http://www.animaatjes.de/wallpapers/wallpapers/landschaft/wallpaper_landschap_animaatjes-72.jpg"
    ];

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
    
    constructor() {
        this.Time = new Date(Date.now());

        setInterval(() => {
            this.OnInterval();
        }, 1000);
    }

    OnInterval() {
        this.Time = new Date(Date.now());
    }

    private _bgImgElement: HTMLImageElement;
    private _bgImgOpacity = 1;
    private _opacityStep = 0.05;
    private _bgImgDivElement: HTMLElement;
    private _bgImgWidth = 1000;
    private _bgImgWidthStep = 50;
    private _digitalClock = false;

    ngOnInit() {
        $( () => {
            $( ".draggable" ).draggable();
      } );

      this._bgImgElement = <HTMLImageElement>document.getElementById("background-image");
      this._bgImgDivElement = document.getElementById("background-img-div");

      var img = new Image();
      img.src = this._imgUrls[0];
      var self = this;
      img.onload = () => { 
          document.images["background-image"].src = img.src;
          self.AdjustBgImgOpacity(0);
          self.SetBgImgWidth(window.innerWidth);
          self.PlaceBgImgAt(0,0);
     }
    }

    SetBgImgSrc(url: string) {
        this._bgImgElement.src = url;
    }

    private _showControls: boolean = false;
    OnClockMouseEnter() {
        this._showControls = true;
    }

    OnClickMouseLeave() {
        this._showControls = false;
    }

    ToggleAnalogDigital() {
        this._digitalClock = !this._digitalClock;
    }    

    SetBgImgOpacity(opacity: number) {
        this._bgImgOpacity = opacity;
        this._bgImgElement.style.opacity = this._bgImgOpacity.toString();
    }

    AdjustBgImgOpacity(amount: number) {
        var newOpacity = this._bgImgOpacity += amount;
        if (newOpacity > 1) {
            newOpacity = 1;
        } else if (newOpacity < 0) {
            newOpacity = 0;
        }

        this.SetBgImgOpacity(newOpacity);
    }

    Darker() {
        this.AdjustBgImgOpacity(this._opacityStep);
    }

    Lighter() {
        this.AdjustBgImgOpacity(-this._opacityStep);
    }

    PlaceBgImgAt(x: number, y: number) {
        this._bgImgDivElement.style.position = "absolute";
        this._bgImgDivElement.style.left = x + "px";
        this._bgImgDivElement.style.top = y + "px";
    }

    SetBgImgWidth(width: number) {
        this._bgImgWidth = width;
        this._bgImgElement.style.height = "auto";
        this._bgImgElement.style.width = this._bgImgWidth.toString() + "px";
    }

    AdjustBgImgWidth(amount: number) {
        var newWidth = this._bgImgWidth += amount;
        if (this._bgImgWidth < 200) {
            this._bgImgWidth = 200;
        }

        this.SetBgImgWidth(newWidth);
    }

    Wider() {
        this.AdjustBgImgWidth(this._bgImgWidthStep);
    }

    Narrower() {
        this.AdjustBgImgWidth(-this._bgImgWidthStep);
    }

    FitWidth() {
        this.PlaceBgImgAt(0,0);
        this._bgImgElement.style.height = "auto";
        this._bgImgWidth = window.innerWidth;
        this._bgImgElement.style.width = this._bgImgWidth + "px"; 
    }

    FitHeight() {
        this.PlaceBgImgAt(0,0);
        this._bgImgElement.style.width = "auto";
        this._bgImgElement.style.height = window.innerHeight + "px";
        this._bgImgWidth = this._bgImgElement.width;
    }

    OnSelectImgClick(url: string) {
        this._bgImgElement.src = url;
    }

    private NewImageUrl: string = "";
    AddNewImage() {
        if (this.NewImageUrl.length !== 0) {
            this._imgUrls.push(this.NewImageUrl);
            this.NewImageUrl = "";
        }
    }
}
