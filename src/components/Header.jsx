import React from 'react'
import invtLogo from '../assets/investment-calculator-logo.png'

function Header() {
  return (
    <div id='header'>
      <img src={invtLogo} alt='header-img' />
      <h1>Investment Calculator</h1>
    </div>
  )
}

export default Header
