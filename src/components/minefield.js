import React from 'react';
import Row from './row';
import '../styles/minefield.css';

export default class Minefield extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="minefield">
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
            </div>
        )
    }
}