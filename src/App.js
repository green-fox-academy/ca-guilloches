import React, { Component } from 'react';
import Control from './components/Control'

class App extends Component {
  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas() {
      const ctx = this.refs.canvas.getContext('2d');
      ctx.fillRect(0,0, 100, 100);
  }

  render() {
    return (
      <div className="App">
        <canvas ref="canvas" width={600} height={300}/>
        <Control name="Size" default="1" min="0" max="200" />
      </div>
    );
  }
}

export default App;
