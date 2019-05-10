import React from 'react'
import Head from '../components/head'
import Link from 'next/link'
import axios from 'axios'

export default class extends React.Component {
  static async getInitialProps() {
    return axios.get('https://www.binance.co/exchange/public/product')
      .then(res => {
        return { data: res.data.data };
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let { data } = this.props;

    return (
      <div>
        <Head title="list page" />
        <ul>
          <li className="row-head">
            <div className="cell">市场</div>
            <div className="cell">币种</div>
            <div className="cell right">24h最高价</div>
            <div className="cell right">24h最低价</div>
            <div className="cell right">24h成交量</div>
          </li>
          {
            data && data.length > 0 && data.map(item => {
              return (
                <li key={item.symbol}>
                  <Link href={`/detail?name=${item.symbol}`}>
                    <a className="row">
                      <div className="cell">{item.baseAsset}/{item.quoteAsset}</div>
                      <div className="cell">{item.quoteAssetName}</div>
                      <div className="cell right">{item.high}</div>
                      <div className="cell right">{item.low}</div>
                      <div className="cell right">{item.tradedMoney}</div>
                    </a>
                  </Link>
                </li>
              )
            })
          }
        </ul>
        <style jsx>{`
        :global(body) {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
        }
        ul {
            width: 1200px;
            margin: 0 auto;
            padding: 0;
            list-style: none;
            border-bottom: 1px solid #ccc;
        }
        li {
            height: 29px;
            line-height: 29px;
            border-top: 1px solid #ccc;
            color: #999;
        }
        a{
            text-decoration: none;
            color: #333;
        }
        .row, .row-head {
            display: flex;
        }
        .row:hover {
            background: rgb(253, 247, 236);
        }
        .cell {
            flex: 1;
        }
        .right {
            text-align: right;
        }
        `}</style>
      </div>
    )
  }
}
