import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import tetris from './map'

class App extends Component {
  constructor() {
    super() 
    this.state = {
      map: tetris.map,
      next: tetris.next,
      pieces: ['L1', 'L2', 'Z1', 'Z2', 't', 'I', 'Square'],
      colors: ['black', 'gray', 'purple', 'red', 'blue', 'yellow', 'green', 'orange'],
      nextPiece: '',
      currentPiece: '',
      direction: '',
      nextColor: '',
      currentColor: '',
      start: false,
      currentCoords: [],
      autoMove: null,
      initialSpeed: 1000,
      speed: 1000, 
      score: 0,
    }
  }
  componentDidMount() {
    this.getNextPiece()
  }
  getNextPiece = () => {
    let {pieces, map, start} = this.state
    let next = this.state.next.slice()
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
      let j = 3
      let k = 2
      if(nextPiece === 'I') {
        j = 2
        k = 2
      }
      next.forEach((r, a) => {
        r.forEach((c, b) => {
          if(c !== 1){
            next[a][b] = 0
          }
        })
      })
      tetris.pieces[nextPiece].initial.forEach((r, i) => {
        r.forEach((c, f) => {
          if(next[k + i][f + j] !== 1 && c !== 0){
            next[k + i][f + j] = nextColor
          }
        })
      })
    }
    this.setState({nextPiece, currentPiece, direction: 'c1', nextColor, currentColor, currentCoords})
  }

  startGame = () => {
    if(!this.state.start) {
      this.getNextPiece()
      let a = setInterval(this.movePiece, this.state.speed)
      // let a = ''
      this.setState({start: true, autoMove: a})
    }
  }

  movePiece = () => {
    let map = this.state.map.slice()
    let previousCoords = this.state.currentCoords.slice()
    let currentCoords = []
    let end = false
    let next = false
    let lose = false
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
      let up = []
      previousCoords.forEach(r => {
        map[r[0]][r[1]] = this.state.currentColor
        up.push([r[0] - 1, r[1]])
      })
      up.forEach(r => {
        if(map[r[0]][r[1]] === 1) {
          lose = true
        }
      })
      if(lose) {
        clearInterval(this.state.autoMove)
        alert("you fail!")
      }

      next = true
    } else {
      currentCoords.forEach(r => {
        map[r[0]][r[1]] = this.state.currentColor
      })
    }
    this.setState({map, currentCoords})
    if(next) {
      let {checkRows, getNextPiece} = this
      checkRows().then(() => {
        getNextPiece()
      })
    }
  }

  checkRows = async () => {
    let map = this.state.map.slice()
    let { score, initialSpeed, speed } = this.state
    let count = 0
    clearInterval(this.state.autoMove)
    for(let i = map.length - 2; i >= 1; i--) {
      if(map[i].indexOf(0) === -1) {
        map.splice(i, 1)
        count++
      }
    }
    let newRows = []
    for(let i = 0; i < count; i++) {
      newRows.push([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])
    }
    score += count * 10
    speed = initialSpeed - ~~(score / 100) * 100
    map.splice(1,0, ...newRows)
    this.setState({map, score, autoMove: setInterval(this.movePiece, speed), speed})
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
      this.setState({map, currentCoords})
    }
  }

  rotatePiece = () => {
    let previousCoords = this.state.currentCoords.slice()
    let map = this.state.map.slice()
    let {direction, currentPiece} = this.state
    if(currentPiece !== 'Square') {
      let piece = tetris.pieces[currentPiece][direction]
      let currentCoords = []
      let move = false
      previousCoords.forEach(r => {
        map[r[0]][r[1]] = 0
      })
      for(let i = 0; i < previousCoords.length; i++) {
        let r = previousCoords[i]
        let newCoords = [r[0] + piece[i][0], r[1] + piece[i][1]]
        if(map[newCoords[0]] && map[newCoords[0]][newCoords[1]] === 0){
          currentCoords.push(newCoords)
          map[newCoords[0]][newCoords[1]] = this.state.currentColor
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
  }

  moveToBottom = () => {
    let map = this.state.map.slice()
    let previousCoords = this.state.currentCoords.slice()
    let currentCoords = []
    let end = false
    let next = false
    let lose = false
    console.log('before', previousCoords)
    let nextCoords = []
    previousCoords.forEach((r, i) => {
      map[r[0]][r[1]] = 0
    // nextCoords.push([r[0] + 1, r[1]])
    previousCoords[i] = [r[0] + 1, r[1]]
    })
  }

  handleKeyDown = (e) => {
    if('ArrowLeft' === e.key) {
      this.moveSide('left')
    } else if ('ArrowRight' === e.key) {
      this.moveSide('right')
    } else if ('ArrowDown' === e.key) {
      this.movePiece()
    } else if ('ArrowUp' === e.key) {
      this.rotatePiece()
    }
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
    let next = this.state.next.map((r, f) => {
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
      <div>
      <div onClick={this.startGame} style={{height: '100vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'purple'}}  tabIndex="0" onKeyDown={this.handleKeyDown}>
      {/* <button onClick={this.moveToBottom}>Move</button> */}
      <div>
        {map}
      </div>
      {/* <div style={{paddingTop: '50px', paddingLeft: '25px', alignSelf: 'flex-start'}}>
        {next}
      </div> */}
      </div>
      </div>
    );
  }
}

export default App;
