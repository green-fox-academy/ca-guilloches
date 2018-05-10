import React, { Component } from 'react';

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
      </div>
    );
  }
}

export default App;
