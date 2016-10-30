import { Injectable } from '@angular/core';

@Injectable()
export class MouseMoveService {
    // Apparently you can only have one mouse move service in the application.
    // So we'll have it here and then clients will register callbacks!

    constructor() {
        window.onmousemove = (e: MouseEvent) => {
            this.callbacks.forEach(callback => {
                callback(e);
            });
        }
    }

    AddCallback(callback: (e: MouseEvent) => void) {
        this.callbacks.push(callback);
    }

    private callbacks: { (e: MouseEvent): void }[] = [];
}