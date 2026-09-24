
export class AppController {

    #validator;
    #localStoredRep; 
    #CoordinatePlaneRenderer


    constructor(validator, localStoredRep, CoordinatePlaneRenderer) {
        this.#validator = validator; 
        this.#localStoredRep = localStoredRep; 
        this.#CoordinatePlaneRenderer = CoordinatePlaneRenderer; 
    }


    setupEventListeners(){
        const formEl = document.getElementById("formulario");
        formEl.addEventListener("submit", (e) => this.#handleFormSubmit(e));
        this.#loadInitialData();
    }


    #handleFormSubmit(event){
        event.preventDefault(); 
        const xInput = document.querySelector("input[name=inputX]:checked");
        const xRaw = xInput ? xInput.value : null; 
        const yRaw = document.getElementById("inputY").value;
        const rRaw = document.getElementById("inputR").value;

        const validation = this.#validator.validateForm(xRaw, yRaw, rRaw); 

        if(!validation.isValid) {
            console.error("Error de validación:", validation.message);
            return; 
        }

        const {x,y,r} = validation.data; 
        const isHit = this.#calculateHit(x, y, r);

        const timestamp = this.#getFormattedDate();
        const pointData = { x, y, r, isHit, timestamp };

        this.#localStoredRep.savePoint(pointData);
        this.#addPointToTable(pointData);

        this.#CoordinatePlaneRenderer.drawPoint(x, y, r, isHit);
    }


    #getFormattedDate() {
        const now = new Date();
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const formatter = new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: userTimeZone
        });        
        return formatter.format(now);
    }


    #calculateHit(x, y, r) {
        if (x >= 0 && y >= 0) {
            return (x + 2 * y) <= r;
        }
    
        if (x <= 0 && y >= 0) {
            return x >= -r && y <= r / 2;
        }
        
        if (x <= 0 && y <= 0) {
            return (x * x + y * y) <= (r / 2) * (r / 2);
        }
        return false;
    }


    #addPointToTable(pointData) {
        const tbody = document.querySelector('#table-results tbody');
        const row = document.createElement('tr');
        const timestamp = this.#getFormattedDate(); 
        row.innerHTML = `
        ${pointData.x}
        ${pointData.y}
        ${pointData.r}
        ${pointData.timestamp}
        ${pointData.isHit ? 'Попадание' : 'Промах'}`;
        tbody.appendChild(row);
    }


    #loadInitialData() {
    const points = this.#localStoredRep.getAllPoints();
    points.forEach(point => {
        this.#addPointToTable(point);
        this.#CoordinatePlaneRenderer.drawPoint(point.x, point.y, point.r, point.isHit);
        });
    }
}