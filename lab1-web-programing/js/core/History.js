import { Observable } from "./Observable";
import { deepFreeze } from "./snapshot";

export class History extends Observable {
    #entries = [];
    #currentId = null; 
    #pendingIds = new Set();   
    #nextId = 1;


    record(type, newValue, oldValue, memento){
        this.#entries =this.#entries.filter(e => !this.#pendingIds.has(e.id));
        this.#pendingIds.clear();  
        this.#push(type, newValue, oldValue, memento)
    }


    restore(id){
        const target = this.#entries.find(e => e.id == id)
        if(!target) return null;

        this.#pendingIds = new Set(
            this.#entries.filter(e => e.id > id && e.type !== 'RESTORE').map(e => e.id)
        );

        this.#push('RESTORE', this.#currentId, id, target.memento);
    }


    getView() {
        return [...this.#entries]
            .sort((a, b) => b.id - a.id)
            .map(e => ({
                ...e,
                isCurrent: e.id === this.#currentId,
                isPending: this.#pendingIds.has(e.id)
            }));
    }


    toJSON() {
        return {
            entries: this.#entries,
            currentId: this.#currentId,
            pendingIds: [...this.#pendingIds],
            nextId: this.#nextId
        };
    }


    load(data){
        if(!data) return; 
        this.#entries = data.entries.map(e => ({...e, memento:deepFreeze(e.memento)}));
        this.#currentId = data.currentId; 
        this.#pendingIds = new Set(data.pendingIds); 
        this.#nextId = data.newId; 
        this.notify(this.getView())
    }


    #push(type, oldValue, newValue, memento){
        const id = this.#nextId++; 
        this.#entries.push({ id, type, oldValue, newValue, time: Date.now(), memento });
        this.#currentId = id; 
        this.notify(this.getView())
    }


} 