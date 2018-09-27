import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import tetris from './map'

class App extends Component {
  constructor() {
    super() 
    this.state = {
      map: tetris.map,
      pieces: ['L1', 'L2', 'Z1', 'Z2', 't', 'I', 'Square'],
      colors: ['black', 'gray', 'purple', 'red', 'blue', 'yellow', 'green', 'orange'],
      nextPiece: '',
      currentPiece: '',
      direction: '',
      nextColor: '',
      currentColor: '',
      start: false,
      currentCoords: [],
    }
  }
  componentDidMount() {
    this.getNextPiece()
  }
  getNextPiece = () => {
    let {pieces, map} = this.state
    let a = ~~(Math.random() * pieces.length)
    let b = ~~(Math.random() * 6) + 2
    let nextPiece = pieces[a]
    let currentPiece = this.state.nextPiece
    let currentColor = this.state.nextColor
    let nextColor = b
    let currentCoords = []
    if(currentPiece) {
      let m = 5
      let d = 1
      if(currentPiece === 'I') {
        m = 4
        d = 2
      }
      tetris.pieces[currentPiece].initial.forEach((r, i) => {
        r.forEach((c, f) => {
          if(map[d + i][f + m] !== 1 && c !== 0){
            map[d + i][f + m] = currentColor
            currentCoords.push([d + i, f + m])
          }
        })
      })
    }
    this.setState({nextPiece, currentPiece, direction: 'c1', nextColor, currentColor, currentCoords})
  }

  startGame = () => {
    if(!this.state.start) {
      this.getNextPiece()
      this.setState({start: true})
    }
  }

  movePiece = () => {
    let map = this.state.map.slice()
    let previousCoords = this.state.currentCoords.slice()
    let currentCoords = []
    let end = false
    let next = false
    previousCoords.forEach(r => {
      map[r[0]][r[1]] = 0
      currentCoords.push([r[0] + 1, r[1]])
    })
    for(let i = 0; i < currentCoords.length; i++) {
      let r = currentCoords[i]
      if(map[r[0]] && map[r[0]][r[1]] === 0){
        map[r[0]][r[1]] = this.state.currentColor
      } else {
        currentCoords.splice(i, 1)
        i--
        end = true
      }
    }
    if(end) {
      currentCoords.forEach(r => {
        map[r[0]][r[1]] = 0
      })
      previousCoords.forEach(r => {
        map[r[0]][r[1]] = this.state.currentColor
      })
      next = true
    } else {
      currentCoords.forEach(r => {
        map[r[0]][r[1]] = this.state.currentColor
      })
    }
    this.setState({map, currentCoords})
    if(next) this.getNextPiece()
  }

  moveSide = (dir) => {
    let map = this.state.map.slice()
    let previousCoords = this.state.currentCoords.slice()
    let currentCoords = []
    let end = false
    previousCoords.forEach(r => {
      let newCoord = []
      map[r[0]][r[1]] = 0
      if(dir === 'left') newCoord = [r[0], r[1] - 1]
      if(dir === 'right') newCoord = [r[0], r[1] + 1]
      currentCoords.push(newCoord)
    })
    for(let i = 0; i < currentCoords.length; i++) {
      let r = currentCoords[i]
      if(map[r[0]] && map[r[0]][r[1]] === 0){
        map[r[0]][r[1]] = this.state.currentColor
      } else if (r[0] === 20) {
        end = true
      } else {
        currentCoords.splice(i, 1)
        i--
        end = true
      }
    }
    if(end) {
      currentCoords.forEach(r => {
        map[r[0]][r[1]] = 0
      })
      previousCoords.forEach(r => {
        map[r[0]][r[1]] = this.state.currentColor
      })
      this.setState({map, currentCoords: previousCoords})
    } else {
      currentCoords.forEach(r => {
        map[r[0]][r[1]] = this.state.currentColor
      })
      this.setState({map, currentCoords})
    }
  }

  rotatePiece = () => {
    let previousCoords = this.state.currentCoords.slice()
    let map = this.state.map.slice()
    let {direction, currentPiece} = this.state
    let piece = tetris.pieces[currentPiece][direction]
    // console.log('piece', piece)
    let currentCoords = []
    // console.log('before', previousCoords)
    // console.log('before', map)
    previousCoords.forEach(r => {
      map[r[0]][r[1]] = 0
    })
    for(let i = 0; i < previousCoords.length; i++) {
      let r = previousCoords[i]
      let newCoords = [r[0] + piece[i][0], r[1] + piece[i][1]]
      if(map[newCoords[0]] && map[newCoords[0]][newCoords[1]] === 0){

      map[newCoords[0]][newCoords[1]] = this.state.currentColor
      currentCoords.push(newCoords)
      }
    }

    if(direction === 'c1') {
      direction = 'c2'
    } else if(direction === 'c2') {
      direction = 'c3'
    } else if(direction === 'c3') {
      direction = 'c4'
    } else if(direction === 'c4') direction = 'c1'

    this.setState({direction, map, currentCoords})
  }

  render() {
    let map = this.state.map.map((r, f) => {
      let row = r.map((c, i) => {
        if(c === 1) {
          return (
            <div key={i} className='cube' style={{backgroundColor: 'gray'}}></div>
          )
        } else if(c === 0) {
          return (
            <div key={i} className='cube' style={{backgroundColor: 'black'}}></div>
          )
        } else {
          return (
            <div key={i} className='cube' style={{backgroundColor: this.state.colors[c]}}></div>
          )
        }
      })
      return (
        <div key={f} style={{display: 'flex', flexDirection: 'row'}}>
          {row}
        </div>
      )
    })
    return (
      <div onClick={this.startGame} style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'purple'}}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <button onClick={() => this.moveSide('left')}>Left</button>
        <button onClick={this.movePiece}>Move</button>
        <button onClick={() => this.moveSide('right')}>Right</button>
        <button onClick={() => this.rotatePiece()}>Rotate</button>
      </div>
        {map}
      </div>
    );
  }
}

export default App;
