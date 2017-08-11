import React from 'react';
import '../styles/header.css';
import jQuery from 'jquery';
global.jQuery = jQuery;
global.jquery = jQuery;
import 'bootstrap';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title
    };
  }

  render() {
    return (
      <div className="header">
        <span className="bomb glyphicon glyphicon-asterisk"></span>
        <h1 className="title">{this.props.title}</h1>
      </div>
    );
  }
}

export default Header;