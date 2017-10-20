import React, { Component } from 'react';
import AddFishForm from './AddFishForm';

export default class Inventory extends Component {
	render() {
		return (
			<div>
				<h2>Inventory</h2>
				<AddFishForm addFish={this.props.loadSample}/>
				<button onClick={this.props.loadSample}>Load Sample</button>
			</div>
		)
	}
}

