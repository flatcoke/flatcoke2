
import React from 'react'

export default class extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>  <a href='/auth/google'>login with google</a></li>
          <li> <a href='/auth/facebook'>login with facebook</a></li>
        </ul>
      </div>
    )
  }
}
