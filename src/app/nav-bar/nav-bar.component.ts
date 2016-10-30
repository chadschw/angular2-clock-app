import { Component, NgZone, OnInit } from '@angular/core'
import { ClockSettingsService } from '../clock-settings/clock-settings.service';
import { MouseMoveService } from '../mouse-move.service';

@Component({
    selector: 'nav-bar',
    templateUrl: 'nav-bar.template.html',
    styleUrls: [
        'nav-bar.styles.css',
        '../../assets/icons/icons-light-med.css',
    ]
})
export class NavBarComponent implements OnInit
{
    constructor(
        private clockSettings: ClockSettingsService,
        private mouseMoveService: MouseMoveService,
        private zone: NgZone) { }
    
    ngOnInit() {
        this.mouseMoveService.AddCallback((e: MouseEvent) => {
            this.zone.run(() => {
                if (e.clientX > 400) {
                    this.collapsed = true;
                }
            });
        });
    }

    private newImageUrl: string = "";
    AddNewImage() {
        if (this.newImageUrl.length !== 0) {
            //this.clockSettings.ImgUrls.push(this.newImageUrl);
            this.clockSettings.AddImgUrl(this.newImageUrl);
            this.newImageUrl = "";
        }
    }

    OnSelectImageClick(url: string) {
        this.clockSettings.BgImgSrc = url;
    }

    private collapsed: boolean = true;
}