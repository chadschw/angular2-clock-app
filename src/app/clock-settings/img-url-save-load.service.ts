import { Injectable } from '@angular/core';

@Injectable()
export class ImgUrlSaveLoadService {

    Save(urls: string[]) {
        localStorage[this.key] = JSON.stringify(urls);
    }

    Load(): string[] {
        if (localStorage[this.key]) {
            return JSON.parse(localStorage[this.key]);
        }
        
        return [
            "http://hdwallsize.com/wp-content/uploads/2013/04/Amazing-Sunrise-Landscape-Wallpaper.jpg",
            "http://wallpapercave.com/wp/cik4PFd.jpg",
            "https://s-media-cache-ak0.pinimg.com/originals/62/6e/07/626e07bfb56bbf629d94cb39a8355b34.jpg",
            "http://www.hdwallpaperup.com/wp-content/uploads/2015/02/Amazing-Landscape-wallpaper.jpg",
            "http://freewallpapers4desktop.com/wallpapers/amazing_landscape-1920x1080.jpg",
            "http://www.animaatjes.de/wallpapers/wallpapers/landschaft/wallpaper_landschap_animaatjes-72.jpg"
        ];
    }

    private key = "ClockAppImgUrls";
}