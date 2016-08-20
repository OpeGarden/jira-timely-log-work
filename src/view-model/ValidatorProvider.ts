import values = require("lodash/values");
import * as _ from "lodash";

export interface Validator<T> {

    (viewValue:T, modelValue:T) : boolean|Promise<any>;
}

export const stringDurationValidator: Validator<string> = (viewValue: string, modelValue: string) => {
    return !_.isString(viewValue) || _.every(viewValue.split(/s+/), e => /(\d+(h|d|m|s)\s*)$/i.test(e))
};
