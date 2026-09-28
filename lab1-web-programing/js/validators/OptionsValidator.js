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
            return ResultValidation.fail('Missing required parameter: a selection must be made.');
        }

        const num = parseFloat(value);

        if (isNaN(num)) {
            return ResultValidation.fail(`Invalid type: provided value ${value} is not a valid number.`);
        }
        
        if (!this.#allowedOptions.includes(num)) {
            return ResultValidation.fail(`Invalid selection: value ${value} is strictly not among the allowed options [${this.#allowedOptions.join(', ')}].`);
        }

        return ResultValidation.success(num); 
    }
}