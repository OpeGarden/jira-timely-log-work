import * as React from "react";
import {Input} from "./forms/Input";
import {ViewModel, createViewModel} from "../view-model/view.model";
import {issuesStore} from "../flux/stores/IssuesStore";
import {userStore} from "../flux/stores/UserStore";
import {AppConfig} from "../config";

export interface FindIssuesState {
    jiraUrl?: string;
    username?: string;
    password?: string;
    jql?: string;
}


export class FindIssues extends React.Component<{}, FindIssuesState> {
    state = {
        jiraUrl: "",
        username: "",
        password: "",
        jql: "",
    };

    ctrlChange = (ctrlName: string, value:any) => {
        this.setState({
            [ctrlName]: value
        });
    };

    jiraUrlModel:ViewModel<string> = createViewModel<string>({
        modelValue: AppConfig.JIRA,
        onChange: this.ctrlChange,
        ctrlName: 'jiraUrl'
    });
    usernameModel:ViewModel<string> = createViewModel<string>({
        modelValue: AppConfig.USER,
        onChange: this.ctrlChange,
        ctrlName: 'username'
    });

    passwordModel:ViewModel<string> = createViewModel<string>({
        modelValue: '',
        onChange: this.ctrlChange,
        ctrlName: 'password'
    });

    jqlModel:ViewModel<string> = createViewModel<string>({
        modelValue: AppConfig.JQL,
        onChange: this.ctrlChange,
        ctrlName: 'jql'
    });


    componentWillMount() {

    }

    shouldComponentUpdate(nextProps:{}, nextState:FindIssuesState, nextContext:any):boolean {
        //console.log('shouldComponentUpdate', {nextProps, nextState, nextContext});
        return true;
    }

    getIssues() {
        userStore.setAuthentication({
            username: this.state.username,
            password: this.state.password,
            jiraUrl: this.state.jiraUrl
        });
        issuesStore.getAllIssues(this.state);
    }

    render() {
        console.log('FindIssues.render');

        return <div className="p-t-1">
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="jiraServer">JIRA Server</label>
                        <Input inputBind={this.jiraUrlModel} type="text" className="form-control" id="jiraServer"
                               placeholder="Enter url"/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="userEmail">Username/Email</label>
                        <Input type="text" className="form-control" id="userEmail" placeholder="Enter email"
                               inputBind={this.usernameModel}/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input type="password" className="form-control" id="password" placeholder="Enter password"
                               inputBind={this.passwordModel}/>
                    </div>
                </div>

                <div className="col-md-12">

                    <div className="form-group">
                        <label htmlFor="jql">Issues search</label>
                        <div className="input-group">
                            <Input type="text" className="form-control" id="jql" placeholder="Enter JQL"
                                   inputBind={this.jqlModel}/>
                            <div className="input-group-btn">
                                <button className="btn btn-secondary" type="button" onClick={this.getIssues.bind(this)}>
                                    Go!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}