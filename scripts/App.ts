window.onload = () => {
    var app = new App();
};

import { Gauge } from "./Gauge";

export class App {
    private canvas: HTMLCanvasElement;
    private context2d: CanvasRenderingContext2D;
    private lastCalledTime: number;
    private fps: number = 0;

    private _gauge: Gauge
    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.context2d = <CanvasRenderingContext2D>this.canvas.getContext("2d");
                
        this.initGauge();
        var slider = <HTMLInputElement>document.getElementById("valueSlider");
        slider.onchange = () => {
            var val = parseInt(slider.value);
            this._gauge.value = val / 100;
        }
        requestAnimationFrame(this.renderLoop);
        this.updateFpsLabel();
    }

    /**
     * Render loop.
     */
    private renderLoop = (): void => {
        requestAnimationFrame(this.renderLoop);
        this.calculateFps();

        this.context2d.save();
        this.context2d.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.context2d.oImageSmoothingEnabled = true;

        //center gauge.
        this.context2d.translate(
            this.canvas.width / 2 - this._gauge.width / 2,
            this.canvas.height / 2 - this._gauge.height / 2
        );
        this._gauge.render(this.context2d);
        this.context2d.restore();
    }

    private initGauge(): void {
        this._gauge = new Gauge();
        this._gauge.width = 200;
        this._gauge.height = 100;
        this._gauge.thickness = 50;
        this._gauge.value = .25;
    }

    /**
     * Called every frame to calculate the fps.
     */
    private calculateFps(): void {
        if(!this.lastCalledTime) {
            this.lastCalledTime = Date.now();
            this.fps = 0;
            return;
        }
        let delta = (Date.now() - this.lastCalledTime)/1000;
        this.lastCalledTime = Date.now();
        this.fps = 1/delta;
    }

    /**
     * Updates the FPS label text.
     */
    private updateFpsLabel(): void {
        var fpsLabel = document.getElementById("fpsLabel");
        if (!fpsLabel) return;

        window.setInterval(() => {
            fpsLabel.innerHTML = Math.floor(this.fps).toString();
        }, 1000)
    }
}