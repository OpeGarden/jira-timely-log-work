import * as React from "react";
import {Issue} from "../model/Issue";
import {IssueRow} from "./IssueRow";

interface IssuesTableProps {
    issues: Issue[]
}



export class IssuesTable extends React.Component<IssuesTableProps, {}> {

    static defaultProps:IssuesTableProps = {
        issues: []
    };

    render() {
        return <div className="p-t-1">
            <table className="table">
                <colgroup>
                    <col style={{width: '20%'}}/>
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th>ID/Description</th>
                        <th>Work</th>
                    </tr>
                </thead>

                <tbody>
                    {this.props.issues.map((issue: Issue, index: number) => <IssueRow issue={issue} key={index}/>)}
                </tbody>
            </table>
        </div>
            ;
    }
}