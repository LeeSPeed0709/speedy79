import React from 'react'
import Head from '../components/head'
import PriceLine from '../components/priceLine';

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return { name: query.name };
  }

  state = {
    data: {}
  }

  componentDidMount() {
    this.connectWebSocket();
  }

  connectWebSocket() {
    this.ws = new WebSocket(`wss://stream.binance.cloud:9443/ws/${this.props.name.toLowerCase()}@depth20`);
    this.ws.onopen = () => {
      console.log('open');
      this.setState({ isConnecting: true });
    }
    this.ws.onmessage = res => {
      this.setState({
        data: JSON.parse(res.data)
      })
    }
    this.ws.onclose = () => {
      console.log('close');
      this.setState({ isConnecting: false });
    }
  }

  breakConnect() {
    this.ws.close();
  }

  render() {
    let { name } = this.props;
    let { data, isConnecting } = this.state;
    return (
      <div>
        <Head title={name} />
        {
          isConnecting ?
            <button onClick={this.breakConnect.bind(this)}>断开</button> :
            <button onClick={this.connectWebSocket.bind(this)}>连接</button>
        }
        <div>{name}</div>
        <div>买</div>
        {
          data.bids && data.bids.map(item => {
            return (
              <PriceLine key={`${item[0] - item[1]}-${new Date().getTime()}`} data={item} />
            )
          })
        }
        <div>卖</div>
        {
          data.asks && data.asks.map(item => {
            return (
              <PriceLine key={`${item[0] - item[1]}`} data={item} />
            )
          })
        }
      </div>
    )
  }
}
