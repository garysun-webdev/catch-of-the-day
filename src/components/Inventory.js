import React, { Component } from 'react';
import AddFishForm from './AddFishForm';

export default class Inventory extends Component {
	render() {
		return (
			<div>
				<AddFishForm addFish={this.props.addFish}/>
			</div>
		)
	}
}

