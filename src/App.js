import React from 'react';
import './App.css';

class App extends React.Component {
    constructor() {
        super();

        this.ws = null;
    }

    state = {
        isConnecting: false
    }

    componentDidMount() {
        this.connectSocket();
    }

    connectSocket() {
        this.ws = new WebSocket('wss://stream.binance.cloud:9443/ws/bnbbtc@depth20');
        this.ws.onopen = () => {
            console.log('open');
            this.setState({
                isConnecting: true
            })
        }

        this.ws.onmessage = msg => {
            this.setState({
                data: JSON.parse(msg.data).asks
            })
        }

        this.ws.onclose = () => {
            console.log('close');
            this.setState({
                isConnecting: false
            })
        }
    }

    breakSocket() {
        this.ws.close();
    }

    render() {
        let { data, isConnecting } = this.state;
        return (
            <div>
                {
                    isConnecting ?
                        <button onClick={this.breakSocket.bind(this)}>断开</button> :
                        <button onClick={this.connectSocket.bind(this)}>重连</button>
                }
                <ul>
                    {
                        data && data.length > 0 && data.map((item, index) => {
                            return (
                                <li key={index}>
                                    {item}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default App;
