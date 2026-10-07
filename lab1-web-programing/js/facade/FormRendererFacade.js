import { calculateHit } from '../core/geometry.js';

export class FormRendererFacade {
    #store;
    #history;
    #formValidator;   
    #fieldValidators; 
    #invalidFields = new Set(); 

    constructor(store, history, formValidator, fieldValidators) {
        this.#store = store;
        this.#history = history;
        this.#formValidator = formValidator;
        this.#fieldValidators = fieldValidators;
    }

    setupEventListeners() {
        document.querySelectorAll('input[name=inputX]').forEach(el =>
            el.addEventListener('change', e => this.#handleFieldChange('x', e.target.value)));
        document.getElementById('inputY')
            .addEventListener('change', e => this.#handleFieldChange('y', e.target.value));
        document.getElementById('selectR')
            .addEventListener('change', e => this.#handleFieldChange('r', e.target.value));

        document.getElementById('formulario')
            .addEventListener('submit', e => this.#handleFormSubmit(e));
        document.getElementById('clear-btn')
            ?.addEventListener('click', () => this.#handleClear());

        //document.addEventListener('keydown', e => { ... this.restore(id) ... });
    }

    restore(id) {
        const memento = this.#history.restore(id);
        if (!memento) return;
        this.#invalidFields.clear();              
        ['x', 'y', 'r'].forEach(f => this.#clearError(f));
        this.#store.restoreMemento(memento);
    }

    #handleFieldChange(field, raw) {
        this.#clearError(field);
        const result = this.#fieldValidators[field].validate(raw);
        if (!result.isValid) {
            this.#showError(field, result.errors);
            this.#invalidFields.add(field);
            return;                               
        }
        this.#invalidFields.delete(field);
        
        const value = field === 'y' ? String(raw).trim() : result.data;
        const current = this.#store.getState().form[field];
        if (current === value) return;            

        const setter = { x: 'setX', y: 'setY', r: 'setR' }[field];
        const old = this.#store[setter](value);
        this.#history.record(`CHANGE_${field.toUpperCase()}`, old, value,
                            this.#store.createMemento());
    }

    #handleFormSubmit(event) {
        event.preventDefault();

        if (this.#invalidFields.size > 0) return;
        ['x', 'y', 'r'].forEach(f => this.#clearError(f));

        const { form } = this.#store.getState();
        const validation = this.#formValidator.validateForm(form.x, form.y, form.r);
        if (!validation.isValid) {
            Object.entries(validation.errors).forEach(([f, msg]) => this.#showError(f, msg));
            return;
        }

        const { x, y, r } = validation.data;
        const point = { x, y, r, isHit: calculateHit(x, y, r), time: Date.now() };
        this.#store.addPoint(point);
        this.#history.record('ADD_POINT', null, point, this.#store.createMemento());
    }

    #handleClear() {
        const old = this.#store.clearPoints();
        this.#history.record('CLEAR_POINTS', old, 0, this.#store.createMemento());
    }

    #clearError(field) {
        document.getElementById(`input-check-${field}`)?.classList.add('hidden');
    }

    #showError(field, message) {
        const errorContainer = document.getElementById(`input-check-${field}`); 
        const textSpan = errorContainer.querySelector('.msg-content');
        
        if (textSpan) {
            textSpan.textContent = message; 
        }
        
        if (errorContainer) {
            errorContainer.classList.remove('hidden');
        }
    }
}