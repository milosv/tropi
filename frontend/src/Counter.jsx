import React from 'react';
// import Websocket from "react-websocket";
import { currencyFormatter } from './helpers/formatting';
import cx from 'classnames';
import './counter.css';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0
        };
        this.handleData = this.handleData.bind(this);
    }

    componentDidMount() {
        const stream = new EventSource(`http://${window.location.hostname}:4000/sse`, { withCredentials: true });

        stream.onopen = () => {
            console.log('Opened connection 🎉');
        };

        stream.onerror = (event) => {
            console.log('Error: ' + JSON.stringify(event));
        };

        stream.onmessage = (event) => {
            this.handleData(event.data);
            console.log('Received Message: ' + event.data);
        };
    }

    handleData(data) {
        const result = JSON.parse(data);
        this.setState({ total: result.total });
    }

    render() {
        const classnames = cx('App', {
            'counter--over-thousand': this.state.total > 999 && this.state.total < 1998,
            'counter--over-two-thousand': this.state.total > 1999 && this.state.total < 2998,
            'counter--over-three-thousand': this.state.total > 2999 && this.state.total < 3998
        });
        return (
            <div className={classnames}>
                <h1 dangerouslySetInnerHTML={{ __html: currencyFormatter(this.state.total, false, true)}} />
            </div>
        );
    }
}

export default Counter;
