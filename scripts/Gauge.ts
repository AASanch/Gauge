export class Gauge {

    width: number = 100;
    height: number = 100;
    thickness: number = 20;
    value: number = .5;


    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        //ctx.translate(0.5, 0.5);
        this.drawBackground(ctx);
        this.drawFullSector(ctx);
        this.drawValueSector(ctx);
        ctx.restore();
    }

    drawBackground(ctx: CanvasRenderingContext2D) {
        //ctx.beginPath();
        // ctx.rect(0,0,this.width, this.height);
        // ctx.fillStyle = null;
        // ctx.fill();
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

    drawValueSector(ctx: CanvasRenderingContext2D) {
        if (this.value == 0)
            return;

        let centerX = this.width / 2;
        let centerY = this.height;
        let outerRadiusX = this.width / 2;
        let outerRadiusY = this.height;
        let rotation = 0;
        let startAngle = Math.PI; //180 degrees
        let endAngle = startAngle + (Math.PI * this.value); //180 degrees
 
        //outer arc
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, outerRadiusX, outerRadiusY, rotation, startAngle, endAngle);
        
        //line to inner arc
        let innerRadiusX = outerRadiusX - this.thickness;
        let innerRadiusY = outerRadiusY - this.thickness;
        let innerX = centerX + Math.cos(endAngle) * innerRadiusX;
        let innerY = centerY + Math.sin(endAngle) * innerRadiusY;
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
    }
}