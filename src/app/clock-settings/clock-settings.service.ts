import { Injectable } from '@angular/core';

@Injectable()
export class ClockSettingsService {

    ImgUrls: string[] = [
        "http://hdwallsize.com/wp-content/uploads/2013/04/Amazing-Sunrise-Landscape-Wallpaper.jpg",
        "http://wallpapercave.com/wp/cik4PFd.jpg",
        "https://s-media-cache-ak0.pinimg.com/originals/62/6e/07/626e07bfb56bbf629d94cb39a8355b34.jpg",
        "http://www.hdwallpaperup.com/wp-content/uploads/2015/02/Amazing-Landscape-wallpaper.jpg",
        "http://freewallpapers4desktop.com/wallpapers/amazing_landscape-1920x1080.jpg",
        "http://www.animaatjes.de/wallpapers/wallpapers/landschaft/wallpaper_landschap_animaatjes-72.jpg"
    ];

    BgImgXposAsString = "0px";
    BgImgYposAsString = "0px";
    
    BgImgSrc = this.ImgUrls[0];
    BgImgOpacityAsString = "1";
    
    BgImgWidthAsString: string = window.innerWidth + "px";
    BgImgHeightAsString = "auto";

    DigitalClock = false;

    IncreaseImageWidth() {
        this.AdjustBgImageWidth(50);
    }

    DecreaseImageWidth() {
        this.AdjustBgImageWidth(-50);
    }

    private AdjustBgImageWidth(adjust: number) {
        this.bgImageWidthAsNumber += adjust;
        if (this.bgImageWidthAsNumber > 100) {
            this.SetImgWidthHeight(this.bgImageWidthAsNumber, "auto");
        }
    }

    FitWidth() {
        this.PlaceBgImgAt(0,0);
        this.bgImageWidthAsNumber = window.innerWidth;
        this.SetImgWidthHeight(this.bgImageWidthAsNumber, "auto"); 
    }

    // Hack! I need to know the width after forcing the height.
    private stupidGetImgWidthCallback: () => number;
    SetGetImgWidthCallback(callback: () => number) {
        this.stupidGetImgWidthCallback = callback;
    }

    FitHeight() {
        this.PlaceBgImgAt(0,0);
        this.SetImgWidthHeight("auto", window.innerHeight);

        // Hack! The width apparently isn't immediately changed so wait
        // a bit before grabbing it.
        setTimeout(() => {
            this.bgImageWidthAsNumber = this.stupidGetImgWidthCallback();
        }, 100);
    }

    SetImgWidthHeight(w, h) {
        if (typeof w !== "string") {
            w = w + "px";
        }

        if (typeof h !== "string") {
            h = h + "px";
        }

        this.BgImgWidthAsString = w;
        this.BgImgHeightAsString = h;
    }

    private stupidCallback: () => void;
    SetSetPositionCallback(callback: () => void){
        this.stupidCallback = callback;
    }

    PlaceBgImgAt(x, y) {
        this.BgImgXposAsString = x + "px";
        this.BgImgYposAsString = y + "px";
        this.stupidCallback();
    }

    SetBgImgOpacity(opacity: number) {
        this.bgImgOpacity = opacity;
        this.BgImgOpacityAsString = opacity.toString();
    }

    AdjustBgImgOpacity(amount: number) {
        var newOpacity = this.bgImgOpacity += amount;
        if (newOpacity > 1) {
            newOpacity = 1;
        } else if (newOpacity < 0) {
            newOpacity = 0;
        }

        this.SetBgImgOpacity(newOpacity);
    }

    Darker() {
        this.AdjustBgImgOpacity(this.bgImgOpacityStep);
    }

    Lighter() {
        this.AdjustBgImgOpacity(-this.bgImgOpacityStep);
    }

    private bgImageWidthAsNumber: number = 1000;
    private bgImgOpacity = 1;
    private bgImgOpacityStep = 0.05;
    private bgImgWidthStep = 50;
}