import * as React from "react";
import {FindIssues} from './FindIssues';
import {IssuesList} from "./IssuesList";
import {LoadingContainer} from "./LoadingContainer";

export interface AppProps { compiler: string; framework: string; }


export class App extends React.Component<AppProps, {}> {

    render() {
        return <div>
            <div><h1>Log Work Anomaly Report</h1></div>
            <FindIssues/>
            <IssuesList/>
        </div>
    }
}