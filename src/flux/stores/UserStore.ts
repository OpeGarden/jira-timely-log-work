
import {Store} from "../Store";
import {User} from "../../model/User";
export class UserStore extends Store {

    user: User;

    setAuthentication(user: User) {
        this.user = user;
    }
}

export const userStore = new UserStore();