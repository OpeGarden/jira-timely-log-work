import * as React from "react";
import {Issue, LogWork} from "../model/Issue";

interface LogWorkListProps {
    issueKey?: string;
    workLogs: LogWork[];
}

export class LogWorkList extends React.Component<LogWorkListProps, {}> {

    static defaultProps:LogWorkListProps = {
        workLogs: []
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onChange = (event:string) => {
        switch (event) {

        }
    };

    render() {

        return <div>
            {this.props.workLogs.map(workLog =>
            <div key={workLog.id} className="row">
                <div className="col-sm-3">{workLog.timeSpent}</div>
                <div className="col-sm-9">{  moment(new Date(workLog.created)).format('YYYY-MM-DD')}</div>
            </div>
                )}
        </div>;
    }
}