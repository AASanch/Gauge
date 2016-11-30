System.register(["./Gauge"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Gauge_1;
    var App;
    return {
        setters:[
            function (Gauge_1_1) {
                Gauge_1 = Gauge_1_1;
            }],
        execute: function() {
            window.onload = function () {
                var app = new App();
            };
            App = (function () {
                function App() {
                    var _this = this;
                    this.fps = 0;
                    /**
                     * Render loop.
                     */
                    this.renderLoop = function () {
                        requestAnimationFrame(_this.renderLoop);
                        _this.calculateFps();
                        _this.context2d.save();
                        _this.context2d.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
                        _this.context2d.oImageSmoothingEnabled = true;
                        //center gauge.
                        _this.context2d.translate(_this.canvas.width / 2 - _this._gauge.width / 2, _this.canvas.height / 2 - _this._gauge.height / 2);
                        _this._gauge.render(_this.context2d);
                        _this.context2d.restore();
                    };
                    this.canvas = document.getElementById("canvas");
                    this.context2d = this.canvas.getContext("2d");
                    this.initGauge();
                    var slider = document.getElementById("valueSlider");
                    slider.onchange = function () {
                        var val = parseInt(slider.value);
                        _this._gauge.value = val / 100;
                    };
                    requestAnimationFrame(this.renderLoop);
                    this.updateFpsLabel();
                }
                App.prototype.initGauge = function () {
                    this._gauge = new Gauge_1.Gauge();
                    this._gauge.width = 200;
                    this._gauge.height = 100;
                    this._gauge.thickness = 50;
                    this._gauge.value = .25;
                };
                /**
                 * Called every frame to calculate the fps.
                 */
                App.prototype.calculateFps = function () {
                    if (!this.lastCalledTime) {
                        this.lastCalledTime = Date.now();
                        this.fps = 0;
                        return;
                    }
                    var delta = (Date.now() - this.lastCalledTime) / 1000;
                    this.lastCalledTime = Date.now();
                    this.fps = 1 / delta;
                };
                /**
                 * Updates the FPS label text.
                 */
                App.prototype.updateFpsLabel = function () {
                    var _this = this;
                    var fpsLabel = document.getElementById("fpsLabel");
                    if (!fpsLabel)
                        return;
                    window.setInterval(function () {
                        fpsLabel.innerHTML = Math.floor(_this.fps).toString();
                    }, 1000);
                };
                return App;
            }());
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=App.js.map