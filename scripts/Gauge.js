System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Gauge;
    return {
        setters:[],
        execute: function() {
            Gauge = (function () {
                function Gauge() {
                    this.width = 100;
                    this.height = 100;
                    this.thickness = 20;
                    this.value = .5;
                }
                Gauge.prototype.render = function (ctx) {
                    ctx.save();
                    //ctx.translate(0.5, 0.5);
                    this.drawBackground(ctx);
                    this.drawFullSector(ctx);
                    this.drawValueSector(ctx);
                    ctx.restore();
                };
                Gauge.prototype.drawBackground = function (ctx) {
                    //ctx.beginPath();
                    // ctx.rect(0,0,this.width, this.height);
                    // ctx.fillStyle = null;
                    // ctx.fill();
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
                Gauge.prototype.drawValueSector = function (ctx) {
                    if (this.value == 0)
                        return;
                    var centerX = this.width / 2;
                    var centerY = this.height;
                    var outerRadiusX = this.width / 2;
                    var outerRadiusY = this.height;
                    var rotation = 0;
                    var startAngle = Math.PI; //180 degrees
                    var endAngle = startAngle + (Math.PI * this.value); //180 degrees
                    //outer arc
                    ctx.beginPath();
                    ctx.ellipse(centerX, centerY, outerRadiusX, outerRadiusY, rotation, startAngle, endAngle);
                    //line to inner arc
                    var innerRadiusX = outerRadiusX - this.thickness;
                    var innerRadiusY = outerRadiusY - this.thickness;
                    var innerX = centerX + Math.cos(endAngle) * innerRadiusX;
                    var innerY = centerY + Math.sin(endAngle) * innerRadiusY;
                    ctx.lineTo(innerX, innerY);
                    //inner arc
                    startAngle = startAngle + (Math.PI * this.value);
                    endAngle = Math.PI;
                    ctx.ellipse(centerX, centerY, innerRadiusX, innerRadiusY, rotation, startAngle, endAngle, true);
                    //close
                    ctx.closePath();
                    // ctx.strokeStyle = "blue";
                    // ctx.stroke();
                    ctx.fillStyle = "lightblue";
                    ctx.fill();
                };
                return Gauge;
            }());
            exports_1("Gauge", Gauge);
        }
    }
});
//# sourceMappingURL=Gauge.js.map