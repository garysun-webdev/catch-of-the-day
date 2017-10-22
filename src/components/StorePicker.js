import React, { Component } from 'react';
import { getFunName } from '../helpers.js'

export default class StorePicker extends Component {
	onSubmitButton(event) {
		event.preventDefault();
		const storeName = this.storeInput.value;
		this.props.history.push(`/stores/${storeName}`);
	}

	render(){
		return(
			<form className="store-selector" onSubmit={this.onSubmitButton.bind(this)}>
			{ /* JSX Comment - You cannot put it in the top level either!!! */ }
				<h2>Please Enter A Store</h2>
				<input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input}} />
				<button type="submit">Visit Store-></button>
			</form>
		)
	}
}

StorePicker.propTypes = {
	history: React.PropTypes.object.isRequired
}



