export class Gauge {
    width: number = 100;
    height: number = 100;    
    thickness: number = 20;

    private _value =.5;
    private _valueSector: GaugeSector;
    private _subSectors: Array<GaugeSector>;    

    get value(): number {
        return this._value;  
    }

    set value(val: number) {
        this._value = val;
        this.updateValueSector();
    }

    get valueColor(): string | CanvasGradient | CanvasPattern {
        return this._valueSector.color;
    }

    set valueColor(val:string | CanvasGradient | CanvasPattern) {
        this._valueSector.color = val;
    }

    get subSectors(): Array<GaugeSector> {
        return this._subSectors;
    }

    private updateValueSector() {
        this._valueSector.endValue = this._value;
    }

    constructor() {
        this._valueSector = new GaugeSector();
        this._valueSector.startValue = 0;
        this._subSectors = new Array<GaugeSector>();
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        this.drawFullSector(ctx);
        this._valueSector.render(ctx, this);
        for(let subSector of this._subSectors) {
            subSector.render(ctx, this);
        }
        this.drawArrow(ctx);
        ctx.restore();
    }

    drawFullSector(ctx: CanvasRenderingContext2D) {        
        let centerX = this.width / 2;
        let centerY = this.height;
        let outerRadiusX = this.width / 2;
        let outerRadiusY = this.height;
        let rotation = 0;
        let startAngle = Math.PI; //180 degrees
        let endAngle = 0; //180 degrees

        //outer arc
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, outerRadiusX, outerRadiusY, rotation, startAngle, endAngle);
        
        //line to inner arc
        ctx.lineTo(this.width - this.thickness, this.height);

        //inner arc
        let innerRadiusX = outerRadiusX - this.thickness;
        let innerRadiusY = outerRadiusY - this.thickness;
        startAngle = 0;
        endAngle = Math.PI;
        ctx.ellipse(centerX, centerY, innerRadiusX,innerRadiusY, rotation, startAngle, endAngle, true);

        ctx.closePath();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.fill();
    }

    drawArrow(ctx: CanvasRenderingContext2D) {
        ctx.save();
        let cx = this.width/2;
        let cy = this.height;
        let arrowLength = this.height + 25;
        let arrowThickness = 5;
        let arrowColor = "black";
        let angle = Math.PI * (1 + this.value);
        ctx.translate(cx, cy);
        ctx.rotate(angle)
        ctx.beginPath();
        ctx.moveTo(0, -arrowThickness / 2);
        ctx.lineTo(arrowLength, 0);
        ctx.lineTo(0, arrowThickness / 2);
        ctx.closePath();
        ctx.fillStyle = arrowColor;
        ctx.fill();
        ctx.restore();
    }
}

export class GaugeSector {
    startValue: number = .25;
    endValue: number = .40;
    color: string | CanvasGradient | CanvasPattern = "red";

    render(ctx: CanvasRenderingContext2D, parentGauge: Gauge)  {
        let centerX = parentGauge.width / 2;
        let centerY = parentGauge.height;
        let outerRadiusX = parentGauge.width / 2;
        let outerRadiusY = parentGauge.height;
        let rotation = 0;
        let startAngle = Math.PI + (Math.PI * this.startValue);
        let endAngle = Math.PI + (Math.PI * this.endValue);
 
        //outer arc
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, outerRadiusX, outerRadiusY, rotation, startAngle, endAngle);
        
        //line to inner arc
        let innerRadiusX = outerRadiusX - parentGauge.thickness;
        let innerRadiusY = outerRadiusY - parentGauge.thickness;
        let innerX = centerX + Math.cos(endAngle) * innerRadiusX;
        let innerY = centerY + Math.sin(endAngle) * innerRadiusY;
        ctx.lineTo(innerX, innerY);

        //inner arc
        let temp = startAngle;
        startAngle = endAngle;
        endAngle = temp;
        ctx.ellipse(centerX, centerY, innerRadiusX, innerRadiusY, rotation, startAngle, endAngle, true);

        //close
        ctx.closePath();
                
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}