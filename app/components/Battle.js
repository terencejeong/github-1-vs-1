import React, { Component } from 'react'; 
var PropTypes = require('prop-types');


// UI stateless component 

function PlayerPreview(props) {
    return (
        <div>
            <div className='column'>
                <img 
                    className='avatar'
                    src={props.avatar}
                    alt={`Avatar for ${props.username}`}
                    />
                <h2 className="username">@{props.username}</h2>
            </div>
                <button
                    className="reset"
                    onClick={props.onReset.bind(null, props.id)}
                    >
                    Reset
                </button>
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired, 
    username: PropTypes.string.isRequired, 
    onReset: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired   
}

class PlayerInput extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            username: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        var value = event.target.value;
        this.setState(function(){
            return{
                username: value
            }
        })
    }

    handleSubmit(event){
        event.preventDefault(); 
        // onSubmit is the function passed to this component from Battle class. Can call it anything, but this is the pattern.
        this.props.onSubmit(
            this.props.id, 
            this.state.username
        )
    }
    render() {
        return (
            <form className="column" onSubmit={this.handleSubmit}>
                <label className="header" htmlFor="username">
                {this.props.label}
                </label>
                <input 
                    id='username'
                    placeholder='github username'
                    type='text'
                    autoComplete='off'
                    value={this.state.username}
                    onChange={this.handleChange}
                    />
                    <button 
                    className="button"
                    type='submit'
                    disabled={!this.state.username}
                    >
                    Submit
                    </button>
            </form>
        )
        PlayerInput.propTypes = {
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            onSubmit: PropTypes.func.isRequired
        }
    }
}

class Battle extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            playerOneName: '', 
            playerTwoName: '', 
            playerOneImage: null, 
            playerTwoImage: null
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }
    handleSubmit(id, username) {
        this.setState(function() {
            var newState = {};
            newState[id + 'Name'] = username; 
            newState[id + 'Image']= `https://github.com/${username}.png?size=200`; 
            return newState
        })
    }

    handleReset(id) {
        this.setState(function(){
            var newState = {}; 
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null
            return newState
        })
    }
    render() {
        const playerOneName = this.state.playerOneName;
        const playerTwoName = this.state.playerTwoName; 
        const playerOneImage = this.state.playerOneImage; 
        const playerTwoImage = this.state.playerTwoImage; 

        return (
            <div>
                <div className="row">
                    {!playerOneName && 
                    <PlayerInput 
                        id="playerOne"
                        label="Player One"
                        onSubmit={this.handleSubmit} /> 
                    }

                    {playerOneImage !== null &&
                        <PlayerPreview
                            avatar={playerOneImage}
                            username={playerOneName}
                            onReset={this.handleReset}
                            id='playerOne' />
                    }
                  

                    {!playerTwoName && 
                    <PlayerInput 
                        id="playerTwo"
                        label="Player Two"
                        onSubmit={this.handleSubmit} /> 
                     }

                    {playerTwoImage !== null &&
                        <PlayerPreview
                            avatar={playerTwoImage}
                            username={playerTwoName}
                            onReset={this.handleReset}
                            id='playerTwo' />
                    }
                </div>
                {playerOneImage && playerTwoImage &&
                    <button className="button">Battle</button>
                }
                
            </div>
        )
    }
}


module.exports = Battle