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
      currentDimensions: [],
      direction: '',
      nextColor: '',
      currentColor: '',
      start: false,
      currentCoords: [],
      startingCoords: {
        Square: [
          [[1, 5], [1, 6]],
          [[2, 5],[2, 6]]
        ],
        I: [
          [[1, 4],[1, 5], [1, 6], [1, 7]],
          [[2, 4],[2, 5], [2, 6], [2, 7]],
          [[3, 4],[3, 5], [3, 6], [3, 7]],
          [[4, 4],[4, 5], [4, 6], [4, 7]],
        ],
        all: [
          [[1, 4],[1, 5],[1, 6]],
          [[2, 4],[2, 5],[2, 6]],
          [[3, 4],[3, 5],[3, 6]],
        ]
      }
    }
  }
  componentDidMount() {
    this.getNextPiece()
  }
  // getNextPiece = () => {
  //   let {pieces, map} = this.state
  //   let a = ~~(Math.random() * pieces.length)
  //   let b = ~~(Math.random() * 6) + 2
  //   let nextPiece = pieces[a]
  //   let currentPiece = this.state.nextPiece
  //   let currentColor = this.state.nextColor
  //   let nextColor = b
  //   let currentCoords = []
  //   if(currentPiece) {
  //     tetris.pieces[currentPiece].c1.forEach((r, i) => {
  //       r.forEach((c, f) => {
  //         if(map[1 + i][f + 5] !== 1 && c !== 0){
  //           map[1 + i][f + 5] = currentColor
  //           currentCoords.push([1 + i, f + 5])
  //         }
  //       })
  //     })
  //   }
  //   this.setState({nextPiece, currentPiece, direction: 'c1', nextColor, currentColor, currentCoords})
  // }
  getNextPiece = () => {
    let {pieces, map} = this.state
    let a = ~~(Math.random() * pieces.length)
    let b = ~~(Math.random() * 6) + 2
    let nextPiece = pieces[a]
    let currentPiece = this.state.nextPiece
    let currentColor = this.state.nextColor
    let nextColor = b
    let currentCoords = []
    let currentDimensions = []
    if(currentPiece === 'Square') {
      currentCoords = this.state.startingCoords.Square.slice()
    } else if(currentPiece === 'I') {
      currentCoords = this.state.startingCoords.I.slice()
    } else {
      currentCoords = this.state.startingCoords.all.slice()
    }
    if(currentPiece) {
      currentDimensions = tetris.pieces[currentPiece].c1.slice()
      for(let i = 0; i < currentCoords.length; i++) {
        let r = currentCoords[i]
        for(let f = 0; f < r.length; f++) {
          let c = r[f]
          if(currentDimensions[i][f]) {
            map[c[0]][c[1]] = currentColor
          }
        }
      }
    }
    // if(currentPiece) {
    //   tetris.pieces[currentPiece].c1.forEach((r, i) => {
    //     r.forEach((c, f) => {
    //       if(map[1 + i][f + 5] !== 1 && c !== 0){
    //         map[1 + i][f + 5] = currentColor
    //         currentCoords.push([1 + i, f + 5])
    //       }
    //     })
    //   })
    // }
    this.setState({nextPiece, currentPiece, direction: 'c1', nextColor, currentColor, currentCoords, currentDimensions})
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
    let {currentDimensions} = this.state
    let end = false
    let next = false

    previousCoords.forEach(r => {
      let newRow = []
      r.forEach(c => {
        // console.log('prev', c)
        map[c[0]][c[1]] = 0
        newRow.push([c[0] + 1, c[1]])
      })
      currentCoords.push(newRow)
    })
    
    // console.log(map)
    for(let i = 0; i < currentCoords.length; i++) {
      let r = currentCoords[i]
      for(let f = 0; f < r.length; f++) {
        let c = r[f]
        // console.log('curr', c)
        if(map[c[0]] && map[c[0]][c[1]] === 0) {
          // console.log(currentDimensions)
          if(currentDimensions[i][f]){
            map[c[0]][c[1]] = this.state.currentColor
          }
        } else {
          r.splice(f, 1)
          f--
          end = true
        }
      }
    }

      if(end) {
        currentCoords.forEach(r => {
          r.forEach(c => {
            map[c[0]][c[1]] = 0
          })
        })
        previousCoords.forEach((r, i) => {
          r.forEach((c, f) => {
            if(currentDimensions[i][f]) {
              map[c[0]][c[1]] = this.state.currentColor
            }
          })
        })
        next = true
      } else {
            currentCoords.forEach((r, i) => {
              r.forEach((c, f) => {
                if(currentDimensions[i][f]) {
                  map[c[0]][c[1]] = this.state.currentColor
                }
              })
            })

      }
    
    // if(end) {
    //   currentCoords.forEach(r => {
    //     map[r[0]][r[1]] = 0
    //   })
    //   previousCoords.forEach(r => {
    //     map[r[0]][r[1]] = this.state.currentColor
    //   })
    //   next = true
    // } else {
    //   currentCoords.forEach(r => {
    //     map[r[0]][r[1]] = this.state.currentColor
    //   })
    // }
    this.setState({map, currentCoords})
    if(next) this.getNextPiece()
  }
  // movePiece = () => {
  //   let map = this.state.map.slice()
  //   let previousCoords = this.state.currentCoords.slice()
  //   let currentCoords = []
  //   let end = false
  //   let next = false
  //   previousCoords.forEach(r => {
  //     map[r[0]][r[1]] = 0
  //     currentCoords.push([r[0] + 1, r[1]])
  //   })
  //   for(let i = 0; i < currentCoords.length; i++) {
  //     let r = currentCoords[i]
  //     if(map[r[0]] && map[r[0]][r[1]] === 0){
  //       map[r[0]][r[1]] = this.state.currentColor
  //     } else {
  //       currentCoords.splice(i, 1)
  //       i--
  //       end = true
  //     }
  //   }
  //   if(end) {
  //     currentCoords.forEach(r => {
  //       map[r[0]][r[1]] = 0
  //     })
  //     previousCoords.forEach(r => {
  //       map[r[0]][r[1]] = this.state.currentColor
  //     })
  //     next = true
  //   } else {
  //     currentCoords.forEach(r => {
  //       map[r[0]][r[1]] = this.state.currentColor
  //     })
  //   }
  //   this.setState({map, currentCoords})
  //   if(next) this.getNextPiece()
  // }

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
      </div>
        {map}
      </div>
    );
  }
}

export default App;
