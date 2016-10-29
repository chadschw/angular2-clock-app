import { ImgZoomService, ImgState } from './img-zoom.service';

describe("Test zoom", () => {
    it("works", () => {
        var service = new ImgZoomService();
        var imgState = ImgState.Create(0, 0, 100, 200);

        var zoomedImgState = service.Zoom(imgState, 1.2, 50, 100);
        expect(zoomedImgState.x).toBe(-10);
        expect(zoomedImgState.y).toBe(-20);
    })
})