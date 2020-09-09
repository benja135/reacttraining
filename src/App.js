import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Keyboard from './Keyboard'
import ScoreCounter from './ScoreCounter'

const DICT = ["ALAMBIQUE", "CASTOR", "ORDINATEUR", "CHIEN", "SMARTPHONE", "ECOLE", "GOURDE"]
const MAX_COUNT = 13

class App extends Component {

  constructor(props) {
    super(props)

    const word = this.getRandomWord()

    this.state = {
      word: word,
      mask: new Array(word.length).fill(false),
      won: false,
      count: 0,
      loose: false,
    }
  }

  getRandomWord() {
    return DICT[this.getRandomInt(DICT.length)]
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  getWordToPrint() {
    const { word, mask } = this.state
    let str = ""
    for (var i = 0; i < word.length; i++) {
      str += mask[i] ? word[i] : "_"
    }
    return str
  }

  // Arrow for binding this
  handleKeyboardClick = letter => {
    const { word, mask, count } = this.state
    let goodMove = this.updateMask(word, letter, mask);
    this.updateWin(mask);
    this.updateCountAndLoose(goodMove, count);
  }

  updateMask(word, letter, mask) {
    let goodMove = false
    for (var i = 0; i < word.length; i++) {
      if (word[i] === letter && !mask[i]) {
        mask[i] = true;
        goodMove = true;
        this.setState({ mask: mask });
      }
    }
    return goodMove;
  }

  updateCountAndLoose(goodMove, count) {
    if (!goodMove) {
      this.setState({ count: count + 1 });
      if (count + 1 >= MAX_COUNT) {
        this.setState({ loose: true });
      }
    }
  }

  updateWin(mask) {
    if (mask.every(e => e === true)) {
      this.setState({ won: true });
    }
  }

  // Arrow for binding
  reset = () => {
    const word = this.getRandomWord()
    this.setState({
      word: word,
      mask: new Array(word.length).fill(false),
      won: false,
      count: 0,
      loose: false,
    })
  }

  render() {
    const { won, count, loose } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <div className="word">
            <ScoreCounter score={count}></ScoreCounter>
            <h1>{this.getWordToPrint()}</h1>
          </div>
          {!won && !loose && <Keyboard onClick={this.handleKeyboardClick}></Keyboard>}
          {(won || loose) && <button className="button_a" onClick={this.reset}>New Game</button>}
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
