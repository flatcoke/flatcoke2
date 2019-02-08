import React from 'react'

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    return <div>Hello World {this.props.userAgent}</div>
  }
}
