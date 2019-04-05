import React, { Component } from 'preact';
import Shops from './Shops';

class Good extends Component {
    render() {
        const {good} = this.props;
        return (
            <div id="good">
                <div className="name">{good.name}</div>
                <img className="good-image" alt={good.name} src={good.photoUrl}/>
                <Shops goodId={good.id}/>
            </div>
        );
    }
}

export default Good;