import * as _ from "lodash";

export interface StoreListener {
    (event: string) : any;
}

export class Store {

    listeners: StoreListener[] = [];

    addListener(listener: StoreListener) {
        this.listeners.push(listener);
    }

    removeListener(listener: StoreListener) {
        _.pull(this.listeners, listener);
    }

    dispatch(event: string){
        this.listeners.forEach(listener => {
            listener && listener(event);
        });
    }
}