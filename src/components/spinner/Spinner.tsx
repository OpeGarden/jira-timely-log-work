import * as React from "react";
import IntrinsicAttributes = JSX.IntrinsicAttributes;

interface SpinnerProps {
    spinnerSize: string;
    className?: string;
    isLoading: boolean;
}

export class Spinner extends React.Component<SpinnerProps, {}> {
    render() {
        var size = this.props.spinnerSize;
        var style = {
            fontSize: size,
        };
        var containerWidth = {
            height: size,
            width: size
        };
        return this.props.isLoading ? <div className={this.props['className']} style={containerWidth}>
            <i className="fa fa-refresh fa-spin" style={style} />
        </div> : null;
    }
}