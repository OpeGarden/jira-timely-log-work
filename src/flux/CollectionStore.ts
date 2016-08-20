import {Store, StoreListener} from "./Store";

interface StoresDict<T extends Store> {
    [index: string]: T;
}


export class CollectionStore<T extends Store> {
    stores:StoresDict<T> = {};
    createStore:() => T;

    constructor(createStore:() => T) {
        this.createStore = createStore;
    }

    addItemStore(itemKey:string) {
        var store = this.createStore();
        _.set(this.stores, itemKey, store);
        return store;
    }

    removeItemStore(itemKey:string) {
        _.set(this.stores, itemKey, null);
    }

    getItemStore(itemKey:string) {
        var store = _.get<any, T>(this.stores, itemKey);
        return store? store: this.addItemStore(itemKey);
    }

}