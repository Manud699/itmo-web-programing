import { BaseValidator } from "./BaseValidator"
import { ResultValidation } from "./ResultValidation";

export class OptionsValidator extends BaseValidator {
    #allowedOptions
    constructor(optionsArray) {
        super();
        this.#allowedOptions = optionsArray; 
    }

    validate(value){
        if (value === '' || value === null) return ResultValidation.fail('No se ha seleccionado ninguna opción.');  

        const num = parseFloat(value);
        
        if(!this.#allowedOptions.includes(num)) {
            return  ResultValidation.fail(`El valor ${value} no está dentro de las opciones permitidas.`);
        }

        return ResultValidation.success(); 
    }

}