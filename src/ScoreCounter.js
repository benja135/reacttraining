import React from 'react'
import PropTypes from 'prop-types'

import './ScoreCounter.css'

const EMOJIS = ['😍','🥰','😃','😀','🙂','🤨','😒','😞','😔','😩','🥺','😢','😭','☠️']

const ScoreCounter = ({ score, sc = score >= EMOJIS.length ? EMOJIS.length - 1 : score}) => (
    <div>
        <h1>{EMOJIS[sc]}</h1>
    </div>
)


ScoreCounter.propTypes = {
    score: PropTypes.number.isRequired
}

export default ScoreCounter
