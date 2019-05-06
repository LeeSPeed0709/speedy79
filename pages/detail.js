import React from 'react'
import Link from 'next/link'
import Head from '../components/head'

export default class extends React.Component {
    static async getInitialProps({ query }) {
        return { name: query.id };
    }

    render() {
        let { name } = this.props;
        return (
            <div>
                <Head title={name} />
                <div>{name}</div>
                <Link href="/">
                    <a>回主页</a>
                </Link>
                <style jsx>{`
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
                    .row {
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
