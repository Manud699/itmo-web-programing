
export class LocalStorageRep {

    #storageKey; 

    constructor(storageKey = 'lab1_points') {
        this.#storageKey = storageKey; 
    }

    getAllPoints(){
        const data = localStorage.getItem(this.#storageKey);
        return data ? JSON.parse(data) : []; 
    }

    savePoint(pointData){
        const currentPoints = this.getAllPoints();
        currentPoints.push(pointData);
        localStorage.setItem(this.#storageKey, JSON.stringify(currentPoints)); 
    }

    clear(){
        localStorage.removeItem(this.#storageKey);
    }

}