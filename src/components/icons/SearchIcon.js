import React from 'react'

class SearchIcon extends React.Component {
  render() {
    return (
      <svg viewBox='0 0 32 32'
        fill={this.props.color}
        width={`${this.props.width}px`}
        height={`${this.props.height}px`}>
        <path d='M19.42712 21.42712C18.03725 22.41748 16.33665 23 14.5 23 9.80558 23 6 19.19442 6 14.5S9.80558 6 14.5 6 23 9.80558 23 14.5c0 1.83665-.58252 3.53725-1.57288 4.92712l5.5848 5.5848c.5502.5502.5456 1.43055-.0002 1.97636l-.02344.02344c-.54442.54442-1.43066.5459-1.97636.0002l-5.5848-5.5848zM14.5 21c3.58985 0 6.5-2.91015 6.5-6.5S18.08985 8 14.5 8 8 10.91015 8 14.5s2.91015 6.5 6.5 6.5z' fillRule='evenodd' />
      </svg>
    )
  }
}

SearchIcon.defaultProps = {
  width: 30,
  height: 30,
  color: '#929292',
}

export default SearchIcon
