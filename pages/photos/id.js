import React from 'react'

export default class extends React.Component {
  static async getInitialProps({ query }) {
    console.log(query)
    return {query}
  }

  render() {
    return <div></div>
  }
}
