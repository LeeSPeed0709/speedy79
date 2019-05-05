import React from 'react'
import Head from '../components/head'
import Link from 'next/link'
import axios from 'axios'
import '../styles/index.less'

export default class extends React.Component {
  static async getInitialProps() {
    return axios.get('https://www.binance.co/exchange/public/product')
      .then(res => {
        return { data: res.data.data };
      })
  }

  render() {
    let { data } = this.props;
    return (
      <div>
        <Head title="Home Page" />
        <ul>
        {
          data && data.length > 0 && data.map(item => {
            return (
              <li key={item.symbol}>
                <Link href={`/detail`}>
                  <a className="row">
                    <div className="cell">{item.baseAsset}/{item.market}</div>
                    <div className="cell">{item.quoteAssetName}</div>
                    <div className="cell right">{item.activeSell}</div>
                  </a>
                </Link>
              </li>
            )
          })
        }
        </ul>
        
      </div>
    )
  }
}
