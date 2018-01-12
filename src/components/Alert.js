import React from 'react'
import 'react-responsive-modal/lib/react-responsive-modal.css'
import Modal from 'react-responsive-modal/lib/css'
import Tag from './Tag'
import Button from './Button'
import { validate } from '../utilities/email.js'

import '../styles/alert.css'


class Alert extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      active: false,
      result: '',
      update: false,
    }
  }

  onOpenModal() {
    this.setState({active: true})
  }

  onCloseModal() {
    this.setState({active: false})
    this.setState({result: ''})
  }

  handleClick() {
    if (validate(this.refs.email.value))  {
      this.setState({result: 'valid'})
    } else {
      this.setState({result: 'invalid'})
    }
  }

  renderModalButton() {
    return (
      <Button
        text='Sign up for alerts'
        icon='mail'
        textAlign='left'
        onClick={this.onOpenModal.bind(this)} />
    )
  }

  renderModalHeader() {
    return (
      <h2 className='c-alert--header'>
        Sign up for alerts
      </h2>
    )
  }

  renderTags() {
    return this.props.service.filters.types.map((types, i) => {
      return types.items.map((item, i) => {
        if(item.active)
          return (
            <Tag key={i}
                text={item.name}
                onClick={ () => {
                  item.active = !item.active;
                  this.setState({update: !this.state.update})
                } }
            />
          )
      })
    })
  }

  renderModalContent() {
    return (
      <div className='c-alert--content'>
        <h3>Receive alerts for documents corresponding to these filters:</h3>
        <div className='c-selectedFilters'>
          {this.renderTags()}
        </div>
        <input placeholder='Type in your email address' ref='email' />
        {this.state.result === 'invalid' && <p>Please insert a valid email address!</p>}
      </div>
    )
  }

  renderModalFooter() {
    return (
      <div className='c-alert--footer'>
        <Button
          text='Submit'
          shadow={true}
          hovering={true}
          textAlign='center'
          onClick={this.handleClick.bind(this)} />
      </div>
    )
  }

  renderModal() {
    return (
      <Modal little open={this.state.active}
          onClose={this.onCloseModal.bind(this)}>
        {this.renderModalHeader()}
        {this.renderModalContent()}
        {this.renderModalFooter()}
      </Modal>
    )
  }

  render() {
    return (
      <div className='c-alert'>
        {this.renderModalButton()}
        {this.renderModal()}
      </div>
    )
  }
}

Alert.defaultProps = {
  service: {},
}

export default Alert