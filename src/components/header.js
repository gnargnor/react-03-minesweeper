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
      <div className="title">
        <span className="words"><span className="bombImg" />{this.props.title}</span>
        <span className="useless-buttons">
          <button className="useless">_</button>
          <button className="useless">.</button>
          <button className="useless">X</button>
        </span>
      </div>
    );
  }
}

export default Header;