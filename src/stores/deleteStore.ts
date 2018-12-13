import { action, observable } from "mobx";
import RootStore from "./rootStore";

export default class DeleteStore {
    private rootStore: RootStore;

    @observable
    public isDeletable: boolean;
    
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.isDeletable = false;
    }
    
    @action
    public allowDelete = () => {
        //this.isDeletable = true;
        this.isDeletable = !this.isDeletable;
    }

    @action
    public disallowDelete = () => {
        this.isDeletable = false;
    }
}