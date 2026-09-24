
import { ValidateForm } from '../validators/ValidateForm.js';
import { LocalStorageRepo } from '../repository/LocalStorageRep.js';
import { CoordinatePlaneRenderer } from '../draw/CoordinatePlaneRenderer.js';
import { AppController } from './AppController.js';


export class AppBootstrapper {

    constructor() {
        this.validator = null;
        this.repository = null;
        this.CoordinatePlaneRenderer = null;
        this.controller = null;
    }


    boot(){
        this.initRepositories();
        this.initValidators();
        this.initUI();
        this.initControllers();
    } 


    initRepositories() {
        this.repository = new LocalStorageRepo('lab1_points');
    }

    initValidators() { 
        this.validator = new ValidateForm();
    }

    initUI() {
        this.CoordinatePlaneRenderer = new CoordinatePlaneRenderer('canvas');
        this.CoordinatePlaneRenderer.drawBaseGraph();
    }

    initControllers() {
        this.controller = new AppController(
            this.validator,
            this.repository,
            this.CoordinatePlaneRenderer
        );
        this.controller.setupEventListeners();
    }
}