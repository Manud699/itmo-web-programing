import { ValidateForm } from '../validators/ValidateForm.js';
import { OptionsValidator } from '../validators/OptionsValidator.js';
import { RangeValidator } from '../validators/RangeValidator.js';
import { LocalStorageRep } from '../repository/LocalStorageRep.js';
import { CoordinatePlaneRenderer } from '../draw/CoordinatePlaneRenderer.js';
import { AppController } from './AppController.js';

export class AppBootstrapper {
    constructor() {
        this.validator = null;
        this.repository = null;
        this.coordinatePlaneRenderer = null;
        this.controller = null;
    }

    boot(){
        this.initRepositories();
        this.initValidators();
        this.initUI();
        this.initControllers();
    } 

    initRepositories() {
        this.repository = new LocalStorageRep('lab1_points');
    }

    initValidators() {
        const xOptions = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
        const rOptions = [1, 1.5, 2, 2.5, 3];
        
        const xValidator = new OptionsValidator(xOptions);
        const yValidator = new RangeValidator(-5, 3);
        const rValidator = new OptionsValidator(rOptions);

        this.validator = new ValidateForm(xValidator, yValidator, rValidator);
    }

    initUI() {
        this.coordinatePlaneRenderer = new CoordinatePlaneRenderer('canvas');
        this.coordinatePlaneRenderer.drawBaseGraph();
    }

    initControllers() {
        this.controller = new AppController(
            this.validator,
            this.repository,
            this.coordinatePlaneRenderer
        );
        this.controller.setupEventListeners();
    }
}