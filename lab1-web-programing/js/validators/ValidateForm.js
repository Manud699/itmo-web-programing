import {OptionsValidator} from "./OptionsValidator";
import {RangeValidator} from "./RangeValidator";
import {ResultValidation} from "./ResultValidation";

export class ValidateForm {

    #xValidator;
    #yValidator; 
    #rValidator; 

    
    constructor(xValidator, yValidator, rValidator){
        this.#xValidator = new OptionsValidator([-3, -2, -1, 0, 1, 2, 3, 4, 5]); 
        this.#yValidator = new RangeValidator([-5, 3]); 
        this.#rValidator = new OptionsValidator([1, 1.5, 2, 2.5, 3]);
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