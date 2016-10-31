import { Injectable } from '@angular/core';
import { ImgUrlSaveLoadService } from './img-url-save-load.service';

@Injectable()
export class ClockSettingsService {

    ImgUrls: string[] = [];

    constructor(private imgUrlLoadSaveService: ImgUrlSaveLoadService) {
        this.ImgUrls = imgUrlLoadSaveService.Load();
        this.BgImgSrc = this.ImgUrls[0];
    }

    BgImgXposAsString = "0px";
    BgImgYposAsString = "0px";
    
    BgImgSrc: string;
    BgImgOpacityAsString = "1";
    
    BgImgWidthAsString: string = window.innerWidth + "px";
    BgImgHeightAsString = "auto";

    DigitalClock = false;

    AddImgUrl(url: string) {
        this.ImgUrls.push(url);
        this.imgUrlLoadSaveService.Save(this.ImgUrls);
    }

    RemoveImgUrl(url: string) {
        var idx = this.ImgUrls.indexOf(url);
        if (idx !== -1) {
            this.ImgUrls.splice(idx, 1);
            this.imgUrlLoadSaveService.Save(this.ImgUrls);
        }
    }

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

    FontName: string = "Cormorant Garamond";
    SetFont(name: string) {
        this.FontName = name;
    }

    private bgImageWidthAsNumber: number = 1000;
    private bgImgOpacity = 1;
    private bgImgOpacityStep = 0.05;
    private bgImgWidthStep = 50;
}