import { BaseValidator } from "./BaseValidator.js";
import { ResultValidation } from "./ResultValidation.js";

export class OptionsValidator extends BaseValidator {
    #allowedOptions;

    constructor(optionsArray) {
        super();
        this.#allowedOptions = optionsArray; 
    }

    validate(value) {
        if (value === '' || value === null || value === undefined) {
            return ResultValidation.fail('No se ha seleccionado ninguna opción.');
        }

        const num = parseFloat(value);

        if (isNaN(num)) {
            return ResultValidation.fail(`El valor "${value}" no es un número válido.`);
        }
        
        if (!this.#allowedOptions.includes(num)) {
            return ResultValidation.fail(`El valor ${value} no está dentro de las opciones permitidas.`);
        }

        return ResultValidation.success(num); 
    }
}