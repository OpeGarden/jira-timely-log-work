import {userStore} from "./flux/stores/UserStore";
import {User} from "./model/User";
import * as _ from "lodash";

interface RequestOptions {
    params?: any;
    payload: any;
}

export function fetchServer(baseUrl = 'http://localhost:3000') {
    var user:User = userStore.user;

    console.log('user', user);

    var myHeaders = new Headers();
    myHeaders.append("target", `https://${user.jiraUrl}`);
    myHeaders.append("Content-Type", 'application/json');
    myHeaders.append("Authorization", 'Basic ' + btoa(`${user.username}:${user.password}`));
    return (url:string, init?:RequestInit&RequestOptions):Promise<Response> => {
        var qs = _.get(init, 'params')?
        '?' + _.chain(init.params).map((e: string, k: string) => `${k}=${e}`).join('&').value() : '';

        var body = _.get(init, 'payload')? JSON.stringify(init.payload) : init.payload;

        return fetch(
            `${baseUrl}${url}${qs}`,
            _.assign({body}, init, {
                headers: myHeaders
            }))
            .then((response:Response) => {
                return response.json();
            });
    };
}