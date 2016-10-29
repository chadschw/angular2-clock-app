import { Component } from '@angular/core'
import { ClockSettingsService } from '../clock-settings/clock-settings.service';

@Component({
    selector: 'nav-bar',
    templateUrl: 'nav-bar.template.html',
    styleUrls: [
        'nav-bar.styles.css',
        '../../assets/icons/icons-light-med.css',
    ]
})
export class NavBarComponent
{
    constructor(private clockSettings: ClockSettingsService) {}

    private newImageUrl: string = "";
    AddNewImage() {
        if (this.newImageUrl.length !== 0) {
            this.clockSettings.ImgUrls.push(this.newImageUrl);
            this.newImageUrl = "";
        }
    }

    OnSelectImageClick(url: string) {
        this.clockSettings.BgImgSrc = url;
    }

    private collapsed: boolean = true;
}