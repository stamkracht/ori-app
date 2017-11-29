import React from 'react'

import Container from './Container'
import '../styles/button.css'
import document from '../images/document.svg'
import hamburger from '../images/hamburger.svg'
import search from '../images/search.svg'
import arrow from '../images/arrow.svg'


class Button extends React.Component {

  renderIcon() {
    if ( this.props.icon ) {
      let className = `c-container--icon ${this.props.iconPosition}`
      if ( this.props.icon === 'document' ) {
        return <img className={className} src={document} alt='document icon' />
      } else if ( this.props.icon === 'hamburger' ) {
          return <img className={className} src={hamburger} alt='hamburger icon' />
      }  else if ( this.props.icon === 'arrow' ) {
          return <img className={className} src={arrow} alt='arrow icon' />
      } else {
          return <img className={className} src={search} alt='search icon' />
        }
      }
    }

  render() {
    return (
      <div className='c-button'>
        <Container>
          <div className='c-container--text'>
            {this.props.text}
          </div>
          {this.renderIcon()}
        </Container>
      </div>
    )
  }
}

Button.defaultProps = {
  text: 'Click me',
  icon: '',
  iconPosition: 'right',
}

export default Button;
