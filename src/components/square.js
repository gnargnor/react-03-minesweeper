import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/square.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMine: false,
            minesNearby: 0,
            hasBeenSwept: false,
        };
    }

    handleClick(){
        alert('click');
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

function mapStateToProps(state, ownProps) {

}

function mapDispatchToProps(dispatch) {
    // actions: bindActionCreators(squareActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Square);