import React, { Component } from 'react';
import Control from './components/Control'

class App extends Component {

	constructor() {
		super();
		this.ctx = null;

		this.options = {
			majorRipple: 50,
			minorRipple: 0.15,
			radiusEffect:25,
			angleMultiplier: 1.9,
			scale: 2.5,
			numSegments: 3000
		}
	}

	componentDidMount() {
		this.ctx = this.refs.canvas.getContext('2d');
		this.plotGuilloches(this.options);
	}

	plotGuilloches(options) {
		const {minorRipple, majorRipple, radiusEffect, angleMultiplier, scale, numSegments} = options;

		this.ctx.beginPath();
		let theta = 0,
		rp = minorRipple + radiusEffect,
		s = (majorRipple + minorRipple) / minorRipple,
		rR = majorRipple + minorRipple,
		x,
		y,
		px,
		py,
		thetaStep = 2*Math.PI / numSegments;

		let initPos = this.getPlotCoordinates(rR, angleMultiplier, theta, rp, s);
		x = initPos.x * scale;
		y = initPos.y * scale;
		px = x;
		py = y;

		for (let i = 0; i < numSegments; i++) {
			theta += thetaStep;
			let coords = this.getPlotCoordinates(rR, angleMultiplier, theta, rp, s);
			x = coords.x * scale;
			y = coords.y * scale;
			this.drawLine(px, py, x, y);
			px = x;
			py = y;
		}
		this.ctx.stroke();
	}

	exportCanvas() {
		var link = document.createElement("a");
		link.download = 'awesomeart.png';
		link.href = this.refs.canvas.toDataURL();
		link.click();
	}

	drawLine(cx, cy, x, y) {
		const offsetX = this.refs.canvas.width / 2;
		const offsetY = this.refs.canvas.height / 2;
		this.ctx.moveTo(offsetX + cx, offsetY + cy);
		this.ctx.lineTo(offsetX + x, offsetY + y);
	}

	getPlotCoordinates(rR, angleMultiplier, theta, rp, s) {
		const x = rR * Math.cos(angleMultiplier * theta) + rp * Math.cos(s * angleMultiplier * theta);
		const y = rR * Math.sin(angleMultiplier * theta) + rp * Math.sin(s * angleMultiplier * theta);
		return {x, y};
	}

	clearCanvas() {
		this.ctx.clearRect(
			0,
			0,
			this.refs.canvas.width,
			this.refs.canvas.height
		);
	}

	updateProperty(property, value) {
		this.clearCanvas();
		this.options[property] = value;
		this.plotGuilloches(this.options);
	}

	render() {
		return (
			<div className="App">
				<canvas ref="canvas" width={600} height={300}/>
				<button onClick={this.exportCanvas.bind(this)}>Export image</button>
				<Control
					name="Major ripple"
					configKey="majorRipple"
					default={ this.options.majorRipple }
					min="0"
					max="200"
					callback={ this.updateProperty.bind(this) }
				/>
				<Control
					name="Minor ripple"
					configKey="minorRipple"
					default={ this.options.minorRipple }
					step="0.05"
					min="0"
					max="10"
					callback={ this.updateProperty.bind(this) }
				/>
				<Control
					name="Radius effect"
					configKey="radiusEffect"
					default={ this.options.radiusEffect }
					min="0"
					max="100"
					callback={ this.updateProperty.bind(this) }
				/>
				<Control
					name="Angle multiplier"
					configKey="angleMultiplier"
					default={ this.options.angleMultiplier }
					step="0.05"
					min="0"
					max="25"
					callback={ this.updateProperty.bind(this) }
				/>
				<Control
					name="Scale"
					configKey="scale"
					default={ this.options.scale }
					min="1"
					max="15"
					callback={ this.updateProperty.bind(this) }
				/>
			</div>
		);
	}
}

export default App;
