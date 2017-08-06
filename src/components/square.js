import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/square.css';

export default class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(e){
        debugger;
        alert(`${e.target.key}`);
    }

    render() {
        return (
            <button 
            className="square"
            onClick={this.handleClick}
            />
        );
    }
}

// function mapStateToProps(state, ownProps) {
//     return state;
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         actions: true
//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Square);