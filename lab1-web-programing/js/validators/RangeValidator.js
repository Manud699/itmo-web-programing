import {  BaseValidator } from "./BaseValidator";
import {  ResultValidation } from "./ResultValidation"

export class RangeValidator extends BaseValidator {

    #min; 
    #max;

    constructor(min, max){
        super()
        this.#min = min;
        this.#max = max; 
    }

    validate(value) {
        const normalizedValue = String(value).replace(",", "."); 
        const num = parseFloat(normalizedValue); 

        if(isNaN()) {
            return ResultValidation.fail(`El valor provisto no es un número.`);
        }

        if(num < this.#min) {
            return ResultValidation.fail(`El valor \({num} está fuera del límite [\){this.#min}, ${this.#max}].`);
        }
        
        return ResultValidation.success; 
    }
}

