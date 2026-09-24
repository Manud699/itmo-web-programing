import { BaseValidator } from "./BaseValidator.js";
import { ResultValidation } from "./ResultValidation.js";

export class RangeValidator extends BaseValidator {
    #min;
    #max;

    constructor(min, max){
        super();
        this.#min = min;
        this.#max = max; 
    }

    validate(value) {
        // Prevenir errores si el campo llega completamente vacío
        if (value === '' || value === null || value === undefined) {
            return ResultValidation.fail('No se ha proporcionado ningún valor en Y.');
        }

        const normalizedValue = String(value).replace(",", "."); 
        const num = parseFloat(normalizedValue); 

        // Corrección 1: Pasamos 'num' como argumento
        if (isNaN(num)) {
            return ResultValidation.fail(`El valor provisto no es un número válido.`);
        }

        // Corrección 2: Evaluamos tanto el mínimo como el máximo
        if (num <= this.#min || num >= this.#max) {
            return ResultValidation.fail(`El valor ${num} está fuera del límite (${this.#min}, ${this.#max}).`);
        }
        
        // Corrección 3: Ejecutamos la función success devolviendo el valor numérico
        return ResultValidation.success(num); 
    }
}