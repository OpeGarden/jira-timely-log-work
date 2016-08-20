
import {Store} from "../Store";
import {FindIssuesState} from "../../components/FindIssues";
import {Issue, JIRAIssuesBody} from "../../model/Issue";
import * as IssuesAPI from "../../api/IssuesAPI";

export const Events = {
    LOADING_ISSUES: 'LOADING_ISSUES',
    ISSUES_LOADED: 'ISSUES_LOADED'
};
export class IssuesStore extends Store{

    issues: Issue[] = [];

    getAllIssues(form : FindIssuesState){
        this.dispatch(Events.LOADING_ISSUES);
        IssuesAPI.getAllIssues(form)
            .then(jiraResponse => {
                this.issues = jiraResponse.issues;
                this.dispatch(Events.ISSUES_LOADED);
            });
    }


}

export const issuesStore = new IssuesStore();