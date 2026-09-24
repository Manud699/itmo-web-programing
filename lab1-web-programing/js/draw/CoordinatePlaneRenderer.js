export class CoordinatePlaneRenderer {
    #canvas;
    #ctx;
    #width;
    #height;
    #scale; 

    constructor(canvasId) {
        this.#canvas = document.getElementById(canvasId);
        this.#ctx = this.#canvas.getContext('2d');
        this.#width = this.#canvas.width;
        this.#height = this.#canvas.height;
        this.#scale = 40; 
    }

    
    drawBaseGraph(rValue = null) {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
        
        if (rValue) {
            this.#drawHitShapes(rValue); 
        }
        
        this.#drawAxes(rValue);
    }

    
    drawPoint(x, y, r, isHit) {
        const centerX = this.#width / 2;
        const centerY = this.#height / 2;
        
        const pixelX = centerX + (x * this.#scale);
        const pixelY = centerY - (y * this.#scale); 

        this.#ctx.beginPath();
        this.#ctx.arc(pixelX, pixelY, 4, 0, Math.PI * 2);
        this.#ctx.fillStyle = isHit ? '#00FF00' : '#FF0000'; 
        this.#ctx.fill();
        this.#ctx.closePath();
    }

    #drawHitShapes(r) {
        const centerX = this.#width / 2;
        const centerY = this.#height / 2;
        const scaledR = r * this.#scale;
        const scaledHalfR = (r / 2) * this.#scale;

        this.#ctx.fillStyle = '#3399FF';
        this.#ctx.beginPath();

        this.#ctx.fillRect(centerX - scaledR, centerY - scaledHalfR, scaledR, scaledHalfR);

        this.#ctx.moveTo(centerX, centerY);
        this.#ctx.lineTo(centerX + scaledR, centerY);
        this.#ctx.lineTo(centerX, centerY - scaledHalfR);
        this.#ctx.fill();

        this.#ctx.moveTo(centerX, centerY);
        this.#ctx.arc(centerX, centerY, scaledHalfR, Math.PI, 0.5 * Math.PI, true);
        this.#ctx.fill();
    }

    #drawAxes(r) {
        const centerX = this.#width / 2;
        const centerY = this.#height / 2;

        this.#ctx.strokeStyle = '#000000';
        this.#ctx.lineWidth = 1;
        
        this.#ctx.beginPath();
        this.#ctx.moveTo(0, centerY);
        this.#ctx.lineTo(this.#width, centerY);
        this.#ctx.moveTo(centerX, 0);
        this.#ctx.lineTo(centerX, this.#height);
        this.#ctx.stroke();

        if (r) {
            this.#ctx.fillStyle = '#000000';
            this.#ctx.font = "12px sans-serif";
            const scaledR = r * this.#scale;
            const scaledHalfR = (r / 2) * this.#scale;
            

            this.#ctx.fillText("R", centerX + scaledR - 5, centerY + 15);
            this.#ctx.fillText("R/2", centerX + scaledHalfR - 10, centerY + 15);
            this.#ctx.fillText("-R/2", centerX - scaledHalfR - 15, centerY + 15);
            this.#ctx.fillText("-R", centerX - scaledR - 10, centerY + 15);

            this.#ctx.fillText("R", centerX + 5, centerY - scaledR + 5);
            this.#ctx.fillText("R/2", centerX + 5, centerY - scaledHalfR + 5);
            this.#ctx.fillText("-R/2", centerX + 5, centerY + scaledHalfR + 5);
            this.#ctx.fillText("-R", centerX + 5, centerY + scaledR + 5);
        }
    }
}