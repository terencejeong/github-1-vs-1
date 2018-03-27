import React from 'react'
import PropTypes from 'prop-types';

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
            {/* allows us flexibility with our components.  */}
            {props.children}
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
}

export default PlayerPreview 