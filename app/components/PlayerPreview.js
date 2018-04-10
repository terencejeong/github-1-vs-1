import React from 'react'
import PropTypes from 'prop-types';

// UI stateless component 
function PlayerPreview({ avatar, username, children}) {
    return (
        <div>
            <div className='column'>
                <img
                    className='avatar'
                    src={avatar}
                    alt={`Avatar for ${username}`}
                />
                <h2 className="username">@{username}</h2>
            </div>
            {/* allows us flexibility with our components.  */}
            {children}
        </div>
    )
}



PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
}

export default PlayerPreview 