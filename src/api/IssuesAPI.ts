import {fetchServer} from "../FetchServer";


export function getAllIssues(params:any):Promise<any> {
    return fetchServer()('/rest/api/2/search', {params});
}

export function getIssueLoggedWork(issueKey: string):Promise<any> {
    return fetchServer()(`/rest/api/2/issue/${issueKey}/worklog`);
}

export function logWork(issueKey: string, params: any) :Promise<any>{
    return fetchServer()(`/rest/api/2/issue/${issueKey}/worklog`, {
        method: 'POST',
        payload: params
    });
}