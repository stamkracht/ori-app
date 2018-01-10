import React from 'react'

import Icon from './Icon'
import Button from './Button'
import ListItem from './ListItem'

import '../styles/reporting.css'


class Reporting extends React.Component {

  constructor(props) {
    super(props)

    this.options = [
      'Invalid',
      'Incorrect',
      'Irrational',
      'Irrelevant',
      'Inappropriate',
      'All of the above',
    ]

    this.state = {
      active: false,
    }

    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleClickOutside, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickOutside, false)
  }

  handleClickOutside(e) {
    if ( this.state.active && !this.dropdown.contains(e.target) ) {
      this.closeReporting()
    }
  }

  openReporting() {
    this.setState({active: true})
  }

  closeReporting() {
    this.setState({active: false})
  }

  renderOptions() {
    return this.options.map((option, id) => {
      return <ListItem key={id} id={`${id}-${option}`} label={option} badge={false} />
    })
  }

  renderReporting() {
    if ( this.state.active ) {
      return (
        <div className='c-dropdown' ref={node => { this.dropdown = node }}>
          <div className='c-dropdown--header'>
            <h3>Report this document</h3>
            <div onClick={this.closeReporting.bind(this)}>
              <Icon icon='close' width='20' height='20'/>
            </div>
          </div>
          <div className='c-dropdown--select'>
            <ul>
              {this.renderOptions()}
            </ul>
          </div>
          <textarea placeholder='Other reason' />
        </div>
      )
    }
  }

  render() {
    return (
      <div className='c-reporting'>
        <Button
          text=''
          icon='flag'
          shadow={false}
          hovering={false}
          onClick={this.openReporting.bind(this)} />
        {this.renderReporting()}
      </div>
    )
  }
}

Reporting.defaultProps = {
  label: 'this is a label',
  id: Math.round(Math.random()*1000),
}

export default Reporting
