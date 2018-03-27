import React, {Component} from 'React'; 
import {Router, Link} from 'react-router-dom'; 

class Home extends Component {
    render() {
        return (
            <div className = "home-component">
                <h1>Pit your Githubs 1 vs 1! Hosted By Terry!</h1>
                <Link className="button" to="/battle">
                    Battle
                </Link>
            </div>
        )
    }
}

module.exports = Home;
