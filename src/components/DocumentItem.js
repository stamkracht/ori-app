import React, { Component } from 'react'

import Container from './Container'
import Icon from './Icon'
import Button from './Button'
import '../styles/documentItem.css'

class DocumentItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      showFlag: false,
    }
  }

  toggleDropdown = () => {
    this.setState({show: !this.state.show})
  }

  toggleFlag = () => {
    this.setState({showFlag: !this.state.showFlag})
  }

  renderDetails = () => {
    return (
      <div className='c-details'>
        <Container shadow={true}>
          <div className='c-details--content'>
            <div className='c-details--text'>
              <h3>{this.props.docDetails}</h3>
              <h3>{this.props.docDetails}</h3>
            </div>
            <div className='c-details--snippets'>
              <p>'{this.props.snippet}'</p>
            </div>
            <button className='c-details--rating' onClick={this.toggleFlag}>
              <Icon icon='flag' width='20' height='20'/>
              {this.state.showFlag && this.renderFlag()}
            </button>
          </div>
        </Container>
      </div>
    )
  }

  renderFlag = () => {
    return (
      <div className='flagDropdown'>
        <h3>Report the document:</h3>
      </div>
    )
  }

  renderTags = () => {
    let tags = ['Tag 1', 'Tag 2', 'Tag 3']
    return tags.map((tag, id) => {
      return <div key={id}><Button shadow={true} text={tag} /></div>
    })
  }


  renderDocumentItem = () => {
    return (
      <div className='c-documents--content' onClick={this.toggleDropdown}>
        <Icon icon='file' iconPosition='left' width='50' height='50'/>
        <div className='c-documents--text'>
          <h2>{this.props.fileTitle}</h2>
          <h3>{this.props.fileDate}, {this.props.fileType}</h3>
        </div>
        <div className='c-documents--tag'>
          {this.renderTags()}
        </div>
    </div>
    )
  }

  render() {
    return (
        <div className='c-documents--item'>
          <Container shadow={true}>
            {this.renderDocumentItem()}
            <button className='c-documents--dropdown' onClick={this.toggleDropdown}>
              <Icon icon='arrow' />
            </button>
          </Container>
            {this.state.show && this.renderDetails()}
        </div>
    )
  }
}

DocumentItem.defaultProps = {
  fileTitle: 'Document title',
  fileDate: 'Document date',
  fileType: 'Document type',
  tags: [],
  docDetails: 'Document details',
  snippet: 'Snippet'
}

export default DocumentItem
