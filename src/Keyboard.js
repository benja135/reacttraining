import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Keyboard.css'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

class Keyboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            used: Array.from(ALPHABET).fill(false),
        }
    }

    reset() {
        this.setState({
            used: Array.from(ALPHABET).fill(false),
        })
    }

    onClick(letter, index) {
        const { onClick }  = this.props
        const { used } = this.state
        if (!used[index]) {
            used[index] = true
            this.setState({ used: used })
            onClick(letter)
        }
    }

    render() {
        const { used } = this.state
        return ( 
            <div className="keyboard">
            {Array.from(ALPHABET).map((letter, index) =>
                <span className={used[index] ? 'card used' : 'card'} onClick={() => this.onClick(letter, index)} key={index}>
                    {letter}
                </span>
            )}
            </div>
        )
    }
}

Keyboard.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default Keyboard
