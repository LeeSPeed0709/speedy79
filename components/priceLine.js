import React from 'react'

export default class extends React.Component {
  render() {
    let { data } = this.props;

    return (
      <div>
        <div className="section"><div className="price">{data[0]}</div><div className="quantity">{data[1]}</div></div>
        <style jsx>{`
          .section {
              overflow: hidden;
              width: 300px;
          }
          .price {
              float: left;
          }
          .quantity {
              float: right;
          }
          `}</style>
      </div>
    )
  }
}