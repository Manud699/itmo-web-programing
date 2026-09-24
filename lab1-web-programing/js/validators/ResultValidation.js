export class ResultValidation {
    #isValid; 
    #message; 

    constructor(isValid, inputData = '') {
        this.#isValid = Boolean(isValid);
        this.#message = String(inputData); 
    }

    get isValid() {
        return this.#isValid; 
    }

    get message() {
        return this.#message; 
    }

    static success(message = 'OK') {
        return new ResultValidation(true, message);
    }

    static fail(message = 'Validation error') {
        return new ResultValidation(false, message);
    }
}