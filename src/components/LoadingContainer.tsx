import * as React from "react";
import {Spinner} from "./spinner/Spinner";
import * as _ from "lodash";

interface LoadingContainerProps {
    loading?: boolean;
    data?: boolean;
    spinnerSize?: string;
    minHeight?: string;
}

const NO_DATA_SIZE = '0.8em';

export class LoadingContainer extends React.Component<LoadingContainerProps, {}> {

    static defaultProps = {
        loading: true,
        data: false,
        spinnerSize: '1em',
        minHeight: '100px'
    };

    componentDidMount() {

    }

    componentWillReceiveProps(props: LoadingContainerProps) {

    }

    render() {
        var style = {
            minHeight: this.props.minHeight,
            position: 'relative'
        };
        var noDataToDisplayStyle = {
            display: this.props.data || this.props.loading ? 'none' : 'block',
            fontSize: NO_DATA_SIZE,
            height: NO_DATA_SIZE,
            textAlign: 'center'
        };
        return <div style={style}>
            {(!this.props.loading && this.props.data)? <div>{this.props.children}</div> : null}
            <Spinner isLoading={this.props.loading} className="margin-auto" spinnerSize={this.props.spinnerSize}/>
            <div style={noDataToDisplayStyle} className="margin-auto font-weight-bold">No data to display</div>
        </div>
    }
}