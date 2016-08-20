import * as React from "react";
import * as _ from "lodash";
import {Issue} from "../model/Issue";
import {issuesCollectionStore} from "../flux/stores/IssuesCollectionStore";
import {IssueStore, Events} from "../flux/stores/IssueStore";
import {LoadingContainer} from "./LoadingContainer";
import {LogWorkList} from "./LogWorkList";
import {LogWork} from "../model/Issue";
import {ViewModel, createViewModel} from "../view-model/view.model";
import {Input} from "./forms/Input";
import {stringDurationValidator} from "../view-model/ValidatorProvider";

interface IssueRowProps {
    issue: Issue;
}

interface IssueRowState {
    loading?: boolean;
    workLogs?: LogWork[];
    timeSpentControl?: ViewModel<string>;
    whenControl?: ViewModel<string>;
}

export class IssueRow extends React.Component<IssueRowProps, IssueRowState> {

    issueStore:IssueStore;
    ctrlChange = (ctrlName:string, value:any) => {
        console.log(ctrlName, 'ctrlName');
        this.setState({
            [ctrlName]: value
        })
    };

    state:IssueRowState = {
        loading: false,
        workLogs: [],
        timeSpentControl: createViewModel<string>({
            modelValue: '1h',
            onChange: this.ctrlChange,
            ctrlName: 'timeSpent',
            validators: {
                duration: stringDurationValidator
            }
        }),
        whenControl: createViewModel<string>({
            modelValue: moment(new Date(this.props.issue.fields.resolutiondate)).format('YYYY-MM-DD'),
            onChange: this.ctrlChange,
            ctrlName: 'when',
            validators: {}
        })
    };


    issueKeyClick() {
        this.issueStore.getIssueLoggedWork(this.props.issue);
    }


    logWork() {
        var {timeSpentControl, whenControl} = this.state;
        if (timeSpentControl.status.valid && whenControl.status.valid) {
            this.issueStore.logWork(this.props.issue, {
                started: moment(whenControl.modelValue).format('YYYY-MM-DDTHH:mm:00.000+0000'),
                timeSpent: timeSpentControl.modelValue,
            });
        }

    }

    componentDidMount() {
        console.log('componentDidMount');
        this.issueStore = issuesCollectionStore.getItemStore(this.props.issue.key);
        this.issueStore.addListener(this.onChange);
        this.setState({
            loading: false,
            workLogs: this.issueStore.workLogs
        });
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        this.issueStore.removeListener(this.onChange);
        issuesCollectionStore.removeItemStore(this.props.issue.key);
    }

    onChange = (event:string) => {
        switch (event) {
            case Events.LOADING_LOG_WORK:
                this.setState({
                    loading: true
                });
                break;
            case Events.LOADED_LOG_WORK:
                this.setState({
                    loading: false,
                    workLogs: this.issueStore.workLogs
                });
                break;
        }
    };

    render() {
        const issue:Issue = this.props.issue;
        if (!issue) {
            return null;
        }
        var {timeSpentControl} = this.state;
        var timeSpentClass = _.chain({
            'has-danger': !timeSpentControl.status.valid && timeSpentControl.status.touched,
            'form-group': true
        }).pickBy().map((v, k) => k).join(' ').value();
        return <tr>
            <td className="pointer" onClick={this.issueKeyClick.bind(this)}>
                {issue.key}
            </td>
            <td>
                <LoadingContainer loading={this.state.loading} data={!_.isEmpty(this.state.workLogs)}
                                  spinnerSize="1.5em">
                    <LogWorkList workLogs={this.state.workLogs} issueKey={this.props.issue.key}/>
                </LoadingContainer>

                <div className="row m-t-1">
                    <div className="col-sm-3">
                        <div className={timeSpentClass}>
                            <label>Time Spent</label>
                            <div className="input-group">
                                <Input inputBind={this.state.timeSpentControl} type="text" className="form-control"
                                       placeholder="e.g: 1d 2h"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9 ">
                        <div className="form-group">
                            <label>When</label>
                            <div className="input-group">
                                <Input inputBind={this.state.whenControl} type="date" className="form-control"
                                       placeholder=""/>
                                <div className="input-group-btn">
                                    <button className="btn btn-secondary" type="button"
                                            onClick={this.logWork.bind(this)}>
                                        Go!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>;
    }
}