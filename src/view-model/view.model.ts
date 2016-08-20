import * as _ from "lodash";
import {Validator} from "./ValidatorProvider";

export interface ViewModelConfig<T> {
    onChange: (ctrlName:string, value:T) => any;
    modelValue?: T;
    ctrlName: string;
    validators?: {[index: string]: Validator<T>};
}

export interface ControlStatus {
    touched: boolean;
    pending: boolean;
    valid: boolean;
}


export class ViewModel<T> {
    onChange:(ctrlName:string, value:T) => any;
    viewValue:T = null;
    modelValue:T = null;
    render:() => void = _.noop;
    ctrlName:string;
    status:ControlStatus = {
        touched: false,
        pending: false,
        valid: false
    };
    validators:{[index: string]: Validator<T>} = {};
    errors:{[index: string]: boolean} = {};

    constructor(config:ViewModelConfig<T>) {
        this.modelValue = config.modelValue;
        this.onChange = config.onChange || _.noop;
        this.ctrlName = config.ctrlName;
        _.assign(this.validators, config.validators);
    }

    reflectViewChange(newValue:T) {
        this.modelValue = newValue;
        this.onChange(this.ctrlName, newValue);
        this.validate();
    }

    reflectModelChange(newValue:T) {
        this.modelValue = newValue;
        this.render();
    }

    validate() {
        this.status.pending = true;
        this.status.valid = false;
        var hasAtLeastOneError = false;
        Promise.all([
                _.map(this.validators, (validator:Validator<T>, index:string) => {
                    return when(validator(this.viewValue, this.modelValue))
                        .then(() => {
                            this.errors[index] = false;
                        })
                        .catch(() => {
                            hasAtLeastOneError = true;
                            console.log('error', index);
                            this.errors[index] = true;
                        })
                })
            ])
            .then(() => {
                this.status.pending = false;
                this.status.valid = !hasAtLeastOneError;
                this.onChange(this.ctrlName, this.modelValue);
            });
    }
}

function when(promise:Promise<any>|any) {
    if (promise instanceof Promise) {
        return promise;
    }
    return promise ? Promise.resolve(promise) : Promise.reject('Validator false');
}

export function createViewModel<T>(config:ViewModelConfig<T>):ViewModel<T> {
    return new ViewModel(config);
}