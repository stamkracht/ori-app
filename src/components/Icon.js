import React from 'react';

import FileIcon from './icons/FileIcon';
import HamburgerIcon from './icons/HamburgerIcon';
import ArrowIcon from './icons/ArrowIcon';
import SearchIcon from './icons/SearchIcon';
import AlertIcon from './icons/AlertIcon';
import LikeIcon from './icons/LikeIcon';
import DislikeIcon from './icons/DislikeIcon';
import FlagIcon from './icons/FlagIcon';
import LocationIcon from './icons/LocationIcon';
import MailIcon from './icons/MailIcon';
import CloseIcon from './icons/CloseIcon';
import ClearFiltersIcon from './icons/ClearFilters';

import '../styles/icon.css';

class Icon extends React.Component {
    renderIcon() {
        if (this.props.icon) {
            if (this.props.icon === 'file') {
                return <FileIcon width={this.props.width} height={this.props.height} color={this.props.color} />;
            } else if (this.props.icon === 'hamburger') {
                return <HamburgerIcon width={this.props.width} height={this.props.height} color={this.props.color} />;
            } else if (this.props.icon === 'arrow') {
                return <ArrowIcon width={this.props.width} height={this.props.height} color={this.props.color} />;
            } else if (this.props.icon === 'alert') {
                return <AlertIcon width={this.props.width} height={this.props.height} color={this.props.color} />;
            } else if (this.props.icon === 'like') {
                return <LikeIcon width={this.props.width} height={this.props.height} color={this.props.color} />;
            } else if (this.props.icon === 'dislike') {
                return <DislikeIcon width={this.props.width} height={this.props.height} color={this.props.color} />;
            } else if (this.props.icon === 'location') {
                return <LocationIcon width={this.props.width} height={this.props.height} color={this.props.color} />;
            } else if (this.props.icon === 'mail') {
                return <MailIcon width={this.props.width} height={this.props.height} color={this.props.color} />;
            } else if (this.props.icon === 'flag') {
                return <FlagIcon width={this.props.width} height={this.props.height} color={this.props.color} />;
            } else if (this.props.icon === 'clearFilter') {
                return (
                    <ClearFiltersIcon width={this.props.width} height={this.props.height} color={this.props.color} />
                );
            } else if (this.props.icon === 'close') {
                return <CloseIcon width={this.props.width} height={this.props.height} color={this.props.color} />;
            } else {
                return <SearchIcon width={this.props.width} height={this.props.height} color={this.props.color} />;
            }
        }
    }

    render() {
        return (
            <div className={`icon ${this.props.iconPosition} direction-${this.props.iconDirection}`}>
                {this.renderIcon()}
            </div>
        );
    }
}

Icon.defaultProps = {
    width: 30,
    height: 30,
    icon: 'file',
    iconPosition: 'right',
    iconDirection: ''
};

export default Icon;
