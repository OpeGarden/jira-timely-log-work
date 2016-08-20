import {Store} from "../Store";
import {Issue, LogWork} from "../../model/Issue";
import * as IssuesAPI from "../../api/IssuesAPI";


export const Events = {
    LOADING_LOG_WORK: 'LOADING_LOG_WORK',
    LOADED_LOG_WORK: 'LOADED_LOG_WORK',
    LOGGING_WORK: 'LOGGING_WORK'
};

export class IssueStore extends Store {

    workLogs: LogWork[] = [];

    getIssueLoggedWork(issue: Issue){
        this.dispatch(Events.LOADING_LOG_WORK);
        IssuesAPI.getIssueLoggedWork(issue.key)
            .then(result => {
                this.workLogs = result.worklogs;
                this.dispatch(Events.LOADED_LOG_WORK);
            });
    }

    logWork(issue: Issue, work: LogWork) {
        this.dispatch(Events.LOGGING_WORK);
        IssuesAPI.logWork(issue.key, work)
            .then(result => {
                this.workLogs = result.worklogs;
                this.dispatch(Events.LOADED_LOG_WORK);
            });
    }
}