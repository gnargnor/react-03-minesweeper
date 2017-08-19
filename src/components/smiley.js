import React from 'react';
import '../styles/smiley.css';

class Smiley extends React.Component {
  constructor(props){
  super(props);
  }

  render() {
    return (
      <div className="smiley-background">
        <div className="smiley-button">😀</div>
      </div>
    );
  }

}

export default Smiley;