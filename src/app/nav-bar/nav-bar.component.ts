import { Component, NgZone, OnInit } from '@angular/core'
import { ClockSettingsService } from '../clock-settings/clock-settings.service';
import { MouseMoveService } from '../mouse-move.service';
import {KeyboardService} from "../keyboard.service";

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
        private keyboardService: KeyboardService,
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
            this.clockSettings.AddImgUrl(this.newImageUrl);
            this.newImageUrl = "";
        }
    }

    private removeUrl: string = "";
    OnSelectImageClick(url: string) {
        if (this.keyboardService.IsKeyDown(KeyboardService.ctrl)) {
            this.removeUrl = url;
        } else {
            this.clockSettings.BgImgSrc = url;
            this.clockSettings.FitWidth();
        }
    }

    ShowRemoveButtonFor(url: string) {
        return (url === this.removeUrl);
    }

    OnRemoveImg() {
        this.clockSettings.RemoveImgUrl(this.removeUrl);
    }

    OnCancelRemoveImg() {
        this.removeUrl = "";
    }

    FontNames: string[] = [
        "Cinzel",
        "Coiny",
        "Cormorant Garamond",
        "Gloria Hallelujah",
        "Kaushan Script",
        "Open Sans",
        "Permanent Marker",
        "Rock Salt",
        "Shadows Into Light"
    ]

    private collapsed: boolean = true;
}