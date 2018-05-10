import React, { Component } from 'react';
import Control from './components/Control'

class App extends Component {

	constructor() {
		super();
		this.ctx = null;
	}

	componentDidMount() {
		this.ctx = this.refs.canvas.getContext('2d');
	}

	updateCanvas(pos) {
		this.clearCanvas();
		this.ctx.fillRect(pos, pos, 100, 100);
	}

	clearCanvas() {
		this.ctx.clearRect(
			0,
			0,
			this.refs.canvas.width,
			this.refs.canvas.height
		);
	}

	updateProperty(value) {
		this.updateCanvas(value);
	}

	render() {
		return (
			<div className="App">
				<canvas ref="canvas" width={600} height={300}/>
				<Control name="Size" default="1" min="0" max="200" callback={ this.updateProperty.bind(this) } />
			</div>
		);
	}
}

export default App;
