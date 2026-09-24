import {OptionsValidator} from "./OptionsValidator.js";
import {RangeValidator} from "./RangeValidator.js";
import {ResultValidation} from "./ResultValidation.js";

export class ValidateForm {

    #xValidator;
    #yValidator; 
    #rValidator; 

    
    constructor(xValidator, yValidator, rValidator){
        this.#xValidator = xValidator; 
        this.#yValidator = yValidator; 
        this.#rValidator = rValidator;
    }


    validateForm(xRaw, yRaw, rRaw){
        const xResult = this.#xValidator.validate(xRaw); 
        if(!xResult.isValid) return ResultValidation.fail(`Error en X: ${xResult.message}`);

        const yResult = this.#yValidator.validate(yRaw); 
        if(!yResult.isValid) return ResultValidation.fail(`Error en Y: ${yResult.message}`);

        const rResult = this.#rValidator.validate(rRaw); 
        if(!rResult.isValid) return ResultValidation.fail(`Error en R: ${rResult.message}`);

        const cleanData = {
            x: parseFloat(xRaw),
            y: parseFloat(String(yRaw).replace(',', '.')),
            r: parseFloat(rRaw)
        }

        const successResult = ResultValidation.success();
        successResult.data = cleanData;
        return successResult;
    }

}