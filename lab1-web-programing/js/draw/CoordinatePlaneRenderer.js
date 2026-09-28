export class CoordinatePlaneRenderer {
    #canvas;
    #ctx;
    #width;
    #height;
    #scale; 
    #centerX;
    #centerY;  


    constructor(canvasId) {
        this.#canvas = document.getElementById(canvasId);
        this.#ctx = this.#canvas.getContext('2d');
        this.#width = this.#canvas.width;
        this.#height = this.#canvas.height;
        this.#scale = 40; 
        this.#centerX = this.#width / 2; 
        this.#centerY = this.#height / 2;
        
    }


    drawBaseGraph(rValue = null) {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
        
        if (rValue) {
            this.#drawHitShapes(rValue); 
        }
        
        this.#drawAxes(rValue);
    }


    drawPoint(x, y, r, isHit) {
        const pixelX = this.#centerX + (x * this.#scale);
        const pixelY = this.#centerY - (y * this.#scale); 

        this.#ctx.beginPath();
        this.#ctx.arc(pixelX, pixelY, 4, 0, Math.PI * 2);
        this.#ctx.fillStyle = isHit ? '#00FF00' : '#FF0000'; 
        this.#ctx.fill();
        this.#ctx.closePath();
    }

    #drawHitShapes(r) {
        const scaledR = r * this.#scale;
        const scaledHalfR = (r / 2) * this.#scale;

        this.#ctx.fillStyle = '#3399FF';
        this.#ctx.beginPath();

        this.#ctx.fillRect(this.#centerX - scaledR, this.#centerY - scaledHalfR, scaledR, scaledHalfR);

        this.#ctx.moveTo(this.#centerX, this.#centerY);
        this.#ctx.lineTo(this.#centerX + scaledR, this.#centerY);
        this.#ctx.lineTo(this.#centerX, this.#centerY - scaledHalfR);
        this.#ctx.fill();

        this.#ctx.moveTo(this.#centerX, this.#centerY);
        this.#ctx.arc(this.#centerX, this.#centerY, scaledHalfR, Math.PI, 0.5 * Math.PI, true);
        this.#ctx.fill();
    }

    #drawAxes(r) {
        this.#ctx.strokeStyle = '#000000';
        this.#ctx.lineWidth = 1;
        
        this.#ctx.beginPath();
        this.#ctx.moveTo(0, this.#centerY);
        this.#ctx.lineTo(this.#width, this.#centerY);
        this.#ctx.moveTo(this.#centerX, 0);
        this.#ctx.lineTo(this.#centerX, this.#height);
        this.#ctx.stroke();

        if (r) {
            this.#ctx.fillStyle = '#000000';
            this.#ctx.font = "12px sans-serif";
            const scaledR = r * this.#scale;
            const scaledHalfR = (r / 2) * this.#scale;
            
            this.#ctx.fillText("R", this.#centerX + scaledR - 5, this.#centerY + 15);
            this.#ctx.fillText("R/2", this.#centerX + scaledHalfR - 10, this.#centerY + 15);
            this.#ctx.fillText("-R/2", this.#centerX - scaledHalfR - 15, this.#centerY + 15);
            this.#ctx.fillText("-R", this.#centerX - scaledR - 10, this.#centerY + 15);

            this.#ctx.fillText("R", this.#centerX + 5, this.#centerY - scaledR + 5);
            this.#ctx.fillText("R/2", this.#centerX + 5, this.#centerY - scaledHalfR + 5);
            this.#ctx.fillText("-R/2", this.#centerX + 5, this.#centerY + scaledHalfR + 5);
            this.#ctx.fillText("-R", this.#centerX + 5, this.#centerY + scaledR + 5);
        }
    }
}