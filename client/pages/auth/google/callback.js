import React from 'react'

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const { user } = req
    const jwtToken = req.authInfo.token
    return { user, jwtToken }
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    return <div>Hello World</div>
  }
}
