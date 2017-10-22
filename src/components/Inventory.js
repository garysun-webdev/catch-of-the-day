import React, { Component } from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

export default class Inventory extends Component {
	constructor(){
		super();
		this.renderList = this.renderList.bind(this);
		this.state = {
			uid: null,
			owner: null
		}
	}

	componentDidMount() {
		base.onAuth((user)=>{
			if(user){
				//{user} => user:user
				this.authHandler(null, {user});
			}
		})
	}

	handleChange=(e, key)=>{
		const {name, value} = e.target;
		const fish = this.props.fishes[key];
		const updatedFish = {...fish, [name]:value}
		this.props.updateFish(key, updatedFish);
	}

	renderList(key) {
		const fish = this.props.fishes[key];
		return(
			<div className="fish-edit" key={key}>
				<input type="text" name="name" value={fish.name} 
					onChange={(e) => this.handleChange(e,key)}
				/>
				<input type="text" name="price" value={fish.price} 
					onChange={(e) => this.handleChange(e,key)}
				/>
				<select name="status" value={fish.status} 
					onChange={(e) => this.handleChange(e,key)}
				>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea name="desc" value={fish.desc}
					onChange={(e) => this.handleChange(e,key)}
				></textarea>
				<input name="image" value={fish.image} type="text" 
					onChange={(e) => this.handleChange(e,key)}
				/>
				<button onClick={() => this.props.removeFish(key)}>Remove Item</button>
			</div>
		)
	}


	renderLogin = () => {
		return(
			<nav className="login">
				<h2>Inventory</h2>
				<p>Sign in to manage your store's inventory</p>
				<button className="github" onClick={()=>this.authenticate('github')}>
					Login In with Github
				</button>
				<button className="facebook" onClick={()=>this.authenticate('facebook')}>
					Login In with Facebook
				</button>
				<button className="twitter" onClick={()=>this.authenticate('twitter')}>
					Login In with Twitter
				</button>
			</nav>
		)
	}

	authenticate = (provider) => {
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	authHandler = (err, authData) => {

		const storeRef = base.database().ref(this.props.storeId);
		
		//query database once
		storeRef.once('value', (snapshot) => {
			const data = snapshot.val() || {} ;

			//if no owner -> write in
			if(!data.owner){
				storeRef.set({
					owner: authData.user.uid
				})
			}

			this.setState({
				uid: authData.user.uid,
				owner: data.owner || authData.user.uid
			});

		})
	}

	logout = () => {
		base.unauth();
		this.setState({uid: null});
	}

	render() {
		const logout = <button onClick={this.logout}>Log Out!</button>

		//login or not
		if(!this.state.uid){
			return <div>{this.renderLogin()}</div>
		}

		if(this.state.uid !== this.state.owner) {
			return(
				<div>
					<p>Sorry, you are not the owner of the store.</p>
					{logout}
				</div>
			)
		}

		return (
			<div>
				<h2>Inventory</h2>
				{logout}
				{Object.keys(this.props.fishes).map(this.renderList)}
				<AddFishForm addFish={this.props.addFish}/>
				<button onClick={this.props.loadSample}>Load Sample</button>
			</div>
		)
	}
}

Inventory.propTypes= {
	fishes: React.PropTypes.object.isRequired,
	updateFish: React.PropTypes.func.isRequired,
	removeFish: React.PropTypes.func.isRequired,
	addFish: React.PropTypes.func.isRequired,
	loadSample: React.PropTypes.func.isRequired,
	storeId: React.PropTypes.string.isRequired
}
