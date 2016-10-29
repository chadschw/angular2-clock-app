import { Injectable } from '@angular/core';

export class ImgState {
    x: number;
    y: number;
    h: number;
    w: number;

    static Create(x: number, y: number, h: number, w: number): ImgState {
        var is = new ImgState();
        is.x = x;
        is.y = y;
        is.h = h;
        is.w = w;
        return is;
    }

    get HeightOverWidthRatio(): number {
        return this.h/this.w;
    }
}

@Injectable()
export class ImgZoomService {

    Zoom(imgState: ImgState, zoomFactor: number, mouseX: number, mouseY: number): ImgState {

        var newW = imgState.w * zoomFactor;
        var newH = imgState.h * zoomFactor;

        var newX = this.ZoomToPoint(imgState.x, zoomFactor, mouseX);
        var newY = this.ZoomToPoint(imgState.y, zoomFactor, mouseY);

        return ImgState.Create(newX, newY, newH, newW);
    }

    // return the adjusted x value for zooming by zoom (e.g. 1.1) while staying centered on px.
    private ZoomToPoint(x: number, zoom, px: number): number {
        var xDelta = px - x;
        var xZoomedDelta = xDelta * zoom;
        var xAdj = xZoomedDelta - xDelta;
        return x - xAdj; 
    }
}