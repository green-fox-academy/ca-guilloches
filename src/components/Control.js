import React, { Component } from 'react';

class Control extends Component {

	changeEvent(e) {
		console.log(this.refs.slider.value)
	}

	render() {
		return (
			<div className="control">
			<label>{ this.props.name }</label>
			<input
				ref="slider"
				onChange={ this.changeEvent.bind(this) }
				type="range"
				min={ this.props.min }
				max={ this.props.max }
				defaultValue={ this.props.default }
			/>
			</div>
		);
	}
}

export default Control;
