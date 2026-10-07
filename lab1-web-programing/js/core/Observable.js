

export class Observable {

    #listeners = new Set(); 

    suscribe(listener){
        this.#listeners.add(listener);
        return () => this.#listeners.delete(listener);
    }

    notify(payload){
        this.#listeners.forEach(payload);
    }

} 