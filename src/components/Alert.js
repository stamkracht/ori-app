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
      validEmail: false,
      update: false,
    }
  }

  onOpenModal() {
    this.setState({active: true})
  }

  onCloseModal() {
    this.setState({active: false})
  }

  handleSubmit() {
    this.setState({validEmail: validate(this.emailInput.value)})
  }

  handleTags(item) {
    item.active = !item.active;
    this.setState({update: !this.state.update})
  }

  renderEmailError() {
    if(!!this.emailInput && this.emailInput.value && !this.state.validEmail) {
      return <p>Please insert a valid email address!</p>
    }
  }

  renderQuery() {
    if(this.props.query) {
      return (
        <Tag key={'query'} text={this.props.query} onClick={() => this.props.resetQuery()}
/>
      )
    }
  }

  renderTags() {
    return Object.keys(this.props.filters).map(filterName => {
      return this.props.filters[filterName].terms.map((tag, i) => {
          return (
            <Tag key={i}
              text={tag}
              onClick={() => this.props.updateFilters(tag, filterName)}
            />
          )
        })
      });
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


  renderModalContent() {
    return (
      <div className='c-alert--content'>
        <h3>Receive alerts for documents in {this.props.area}{Object.getOwnPropertyNames(this.props.filters).length === 0 ? '.' : ' corresponding to these filters:'}</h3>
        <div className='c-selectedFilters'>
          {this.renderQuery()}
          {this.renderTags()}
        </div>
        <input placeholder='Type in your email address' ref={node => {this.emailInput = node}} />
        {this.renderEmailError()}
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
          onClick={this.handleSubmit.bind(this)} />
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
  area: 'selected area',
  filters: {},
  updateFilters: () => {},
  query: '',
  resetQuery: () => {},
}

export default Alert
