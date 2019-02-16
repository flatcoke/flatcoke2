/* global describe, it */
import { shallow } from 'enzyme'
import React from 'react'
import expect from 'expect.js'

import App from 'pages/index'

describe('With Enzyme', () => {
  it('index shows "TaeminKim"', () => {
    const app = shallow(<App />)

    // console.log(app)
    expect(app.find('ul').text()).to.string('TaeminKim')
  })
})
