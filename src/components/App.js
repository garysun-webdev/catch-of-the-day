import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import SampleFish from '../sample-fishes';
import Fish from './Fish';
import base from '../base';


class App extends Component {
	constructor() {	
		super();
		this.state={
			fishes:{},
			order:{}
		};

		this.addFish= this.addFish.bind(this);
		this.loadSample= this.loadSample.bind(this);
		this.addToOrder= this.addToOrder.bind(this);
	}

	componentWillMount() {
		this.ref = base.syncState(`${this.props.match.params.StoreId}/fishes`
			, {
				context: this,
				state: 'fishes'
			});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	addFish(fish) {
		const fishes = {...this.state.fishes};
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`]=fish;
		this.setState({fishes});
	}

	addToOrder(key) {
		//deep copy
		//if const order=this.state.order, it'll only copy the reference
		const order = {...this.state.order};
		order[key] = order[key] +1 || 1;
		this.setState({ order });
	}

	loadSample() {
		this.setState({
			fishes: SampleFish
		})
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
						{
						Object
						.keys(this.state.fishes)
						.map(key => <Fish addToOrder={this.addToOrder} key={key} index={key} details={this.state.fishes[key]} />)
						}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order}/>
				<Inventory addFish={this.addFish} loadSample={this.loadSample}/>
			</div>
		)
	}
}

export default App;

