import * as React from "react";
import {LoadingContainer} from "./LoadingContainer";
import {IssuesTable} from "./IssuesTable";
import * as _ from "lodash";
import {issuesStore, Events} from "../flux/stores/IssuesStore";
import {Issue} from "../model/Issue";


interface IssuesListState {
    loading?: boolean;
    issues?: Issue[];
}

export class IssuesList extends React.Component<{}, IssuesListState> {

    state:IssuesListState = {
        loading: false,
        issues: []
    };

    onChange = (event:string) => {
        switch (event) {
            case Events.LOADING_ISSUES:
                this.setState({
                    loading: true
                });
                break;
            case Events.ISSUES_LOADED:
                console.log('data', issuesStore.issues);
                this.setState({
                    loading: false,
                    issues: issuesStore.issues
                });
                break;
        }
    };

    componentDidMount() {
        issuesStore.addListener(this.onChange);
    }

    componentWillUnmount() {
        issuesStore.removeListener(this.onChange);
    }


    render() {
        return  <LoadingContainer loading={this.state.loading} data={!_.isEmpty(this.state.issues)} spinnerSize="3em" minHeight="400px">
            <IssuesTable issues={this.state.issues}/>
        </LoadingContainer>;
    }
}