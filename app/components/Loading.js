import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
    content: {
        textAlign: 'center', 
        fontSize: '35px'
    }
}

class Loading extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            text: props.text, 
            speed: props.speed
        }
    }

    componentDidMount(){
        const stopper = this.props.text + '...'; 
        this.interval = window.setInterval(() => {
            if (this.state.text === stopper) {
                this.setState(() => {
                    return {
                        text: this.props.text
                    }
                })
            } else {
                this.setState((prevState) => {
                    return {
                        text: prevState.text + '.'
                    }
                })
            }
        }, this.props.speed)
    }

    // Have to unmount otherwise the function this.interval will run every 300ms
    componentWillUnmount(){
        console.log('COMPONENT HAS UNMOUNTED')
        window.clearInterval(this.interval)
    }
    
    render() {
        return (
            <div style={styles.content}>
                {this.state.text}
            </div>
        );
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
    text: 'Loading', 
    speed: 300
}

export default Loading;