import * as React from "react";
import * as _ from "lodash";
import {ViewModel} from "../../view-model/view.model";
import HTMLProps = __React.HTMLProps;

export interface InputProps extends HTMLProps<any>{
    inputBind: ViewModel<string>;
}

export class Input extends React.Component<InputProps, {}> {
    refs: {
        [key: string]: (Element);
        element: (HTMLInputElement);
    };

    handleChange: () => void;

    reactProps: {};

    componentWillMount(){
        this.reactProps = _.pickBy(this.props, (e, k) => k!== 'inputBind');
        this.handleChange =  _.debounce(() => {
            this.props.inputBind.viewValue = this.refs.element.value;
            this.props.inputBind.status.touched = true;
            this.dispatchChange();
        }, 500);
    }

    componentDidMount(){
        this.props.inputBind.render = () => {
            this.refs.element.value = this.props.inputBind.modelValue;
            this.props.inputBind.viewValue = this.refs.element.value;
        };
        this.props.inputBind.render();
        this.dispatchChange();
    }

    dispatchChange(){
        this.props.inputBind.reflectViewChange(this.refs.element.value);
    }

    render() {
        return <input { ...this.reactProps } onChange={this.handleChange.bind(this)} ref="element"/>;
    }
}