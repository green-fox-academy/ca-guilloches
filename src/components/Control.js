import React, { Component } from 'react';

class Control extends Component {

	changeEvent(e) {
		this.props.callback(
			this.props.configKey,
			parseFloat(this.refs.slider.value)
		);
	}

	render() {
		return (
			<div className="control">
			<label>{ this.props.name }</label>
			<input
				ref="slider"
				step={ this.props.step || 1 }
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
