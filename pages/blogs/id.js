import React from 'react'

export default class extends React.Component {
  static async getInitialProps(props) {
    console.log(props.query.id)
    return {}
  }

  render() {
    return <div>{}</div>
  }
}
