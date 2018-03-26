import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string'; 
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview'
const api = require('../utils/api')

const Profile = (props) => {
    const {info} = props
    console.log(info)
    return (
        <div>
            <PlayerPreview username={info.login} avatar={info.avatar_url}> 
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
            </ul>
            </ PlayerPreview>
        </div>
    );
};


const Player = (props) => {
    return (
        <div>
           <h1 className="header">{props.label}</h1>
            <h3 style={{ textAlign: 'center' }}>Score: {props.score}</h3>
            <Profile info={props.profile}/>
        </div>
    );
};

Player.propTypes = {
    label: PropTypes.string.isRequired, 
    score: PropTypes.number.isRequired, 
    profile: PropTypes.object.isRequired
}


class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
            winner: null, 
            loser: null, 
            error: null, 
            loading: true
        }
    }
    
    componentDidMount() {
        const players = queryString.parse(this.props.location.search)
        api.battle([
            players.playerOneName, 
            players.playerTwoName
        ]).then(result => {
            if (result === null) {
                return this.setState(function () {
                    return {
                        error: 'There was an error, check both users are on Github', 
                        loading: false
                    }
                })
            }
         this.setState(function(){
             return {
                 error: null, 
                 winner: result[0], 
                 loser: result[1], 
                 loading: false
             }
         });
        })
    }
    render() {
        const error = this.state.error; 
        const winner = this.state.winner; 
        const loser = this.state.loser; 
        const loading = this.state.loading; 

        if (loading === true) {
            return <p>Loading</p>
        }

        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to="/battle"> Reset </Link>
                </div>
            )
        }
        return (
            <div className="row">
                <Player
                    label='Winner'
                    score={winner.score}
                    profile={winner.profile} 
                />

                <Player
                    label='Loser'
                    score={loser.score}
                    profile={loser.profile}
                />
                
            </div>
        );
    }
}

export default Results;



