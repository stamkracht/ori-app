import React from 'react'

class LocationIcon extends React.Component {
  render() {
    return (
      <svg viewBox="0 0 141.732 141.732"
        fill={this.props.color}
        width={`${this.props.width}px`}
        height={`${this.props.height}px`}>
        <path d="M95.35 50.645c0 13.98-11.39 25.322-25.438 25.322-14.05 0-25.438-11.342-25.438-25.322 0-13.984 11.39-25.322 25.438-25.322 14.052 0 25.438 11.337 25.438 25.322m26.393 0C121.743 22.675 98.966 0 70.866 0 42.768 0 19.99 22.674 19.99 50.645c0 12.298 4.407 23.574 11.732 32.345l39.188 56.283 39.76-57.104c1.43-1.78 2.737-3.655 3.917-5.626l.402-.574h-.067c4.33-7.454 6.82-16.096 6.82-25.325"/>
      </svg>

    )
  }
}

export default LocationIcon
