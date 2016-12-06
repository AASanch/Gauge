System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Gauge, GaugeSector;
    return {
        setters:[],
        execute: function() {
            Gauge = (function () {
                function Gauge() {
                    this.width = 100;
                    this.height = 100;
                    this.thickness = 20;
                    this._value = .5;
                    this._valueSector = new GaugeSector();
                    this._valueSector.startValue = 0;
                    this._subSectors = new Array();
                }
                Object.defineProperty(Gauge.prototype, "value", {
                    get: function () {
                        return this._value;
                    },
                    set: function (val) {
                        this._value = val;
                        this.updateValueSector();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Gauge.prototype, "valueColor", {
                    get: function () {
                        return this._valueSector.color;
                    },
                    set: function (val) {
                        this._valueSector.color = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Gauge.prototype, "subSectors", {
                    get: function () {
                        return this._subSectors;
                    },
                    enumerable: true,
                    configurable: true
                });
                Gauge.prototype.updateValueSector = function () {
                    this._valueSector.endValue = this._value;
                };
                Gauge.prototype.render = function (ctx) {
                    ctx.save();
                    this.drawFullSector(ctx);
                    this._valueSector.render(ctx, this);
                    for (var _i = 0, _a = this._subSectors; _i < _a.length; _i++) {
                        var subSector = _a[_i];
                        subSector.render(ctx, this);
                    }
                    this.drawArrow(ctx);
                    ctx.restore();
                };
                Gauge.prototype.drawFullSector = function (ctx) {
                    var centerX = this.width / 2;
                    var centerY = this.height;
                    var outerRadiusX = this.width / 2;
                    var outerRadiusY = this.height;
                    var rotation = 0;
                    var startAngle = Math.PI; //180 degrees
                    var endAngle = 0; //180 degrees
                    //outer arc
                    ctx.beginPath();
                    ctx.ellipse(centerX, centerY, outerRadiusX, outerRadiusY, rotation, startAngle, endAngle);
                    //line to inner arc
                    ctx.lineTo(this.width - this.thickness, this.height);
                    //inner arc
                    var innerRadiusX = outerRadiusX - this.thickness;
                    var innerRadiusY = outerRadiusY - this.thickness;
                    startAngle = 0;
                    endAngle = Math.PI;
                    ctx.ellipse(centerX, centerY, innerRadiusX, innerRadiusY, rotation, startAngle, endAngle, true);
                    ctx.closePath();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = "black";
                    ctx.stroke();
                    ctx.fillStyle = "white";
                    ctx.fill();
                };
                Gauge.prototype.drawArrow = function (ctx) {
                    ctx.save();
                    var cx = this.width / 2;
                    var cy = this.height;
                    var arrowLength = this.height + 25;
                    var arrowThickness = 5;
                    var arrowColor = "black";
                    var angle = Math.PI * (1 + this.value);
                    ctx.translate(cx, cy);
                    ctx.rotate(angle);
                    ctx.beginPath();
                    ctx.moveTo(0, -arrowThickness / 2);
                    ctx.lineTo(arrowLength, 0);
                    ctx.lineTo(0, arrowThickness / 2);
                    ctx.closePath();
                    ctx.fillStyle = arrowColor;
                    ctx.fill();
                    ctx.restore();
                };
                return Gauge;
            }());
            exports_1("Gauge", Gauge);
            GaugeSector = (function () {
                function GaugeSector() {
                    this.startValue = .25;
                    this.endValue = .40;
                    this.color = "red";
                }
                GaugeSector.prototype.render = function (ctx, parentGauge) {
                    var centerX = parentGauge.width / 2;
                    var centerY = parentGauge.height;
                    var outerRadiusX = parentGauge.width / 2;
                    var outerRadiusY = parentGauge.height;
                    var rotation = 0;
                    var startAngle = Math.PI + (Math.PI * this.startValue);
                    var endAngle = Math.PI + (Math.PI * this.endValue);
                    //outer arc
                    ctx.beginPath();
                    ctx.ellipse(centerX, centerY, outerRadiusX, outerRadiusY, rotation, startAngle, endAngle);
                    //line to inner arc
                    var innerRadiusX = outerRadiusX - parentGauge.thickness;
                    var innerRadiusY = outerRadiusY - parentGauge.thickness;
                    var innerX = centerX + Math.cos(endAngle) * innerRadiusX;
                    var innerY = centerY + Math.sin(endAngle) * innerRadiusY;
                    ctx.lineTo(innerX, innerY);
                    //inner arc
                    var temp = startAngle;
                    startAngle = endAngle;
                    endAngle = temp;
                    ctx.ellipse(centerX, centerY, innerRadiusX, innerRadiusY, rotation, startAngle, endAngle, true);
                    //close
                    ctx.closePath();
                    ctx.fillStyle = this.color;
                    ctx.fill();
                };
                return GaugeSector;
            }());
            exports_1("GaugeSector", GaugeSector);
        }
    }
});
//# sourceMappingURL=Gauge.js.map