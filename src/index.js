import React, { Component } from 'react';
import ReactDom from 'react-dom';
import StorePicker from './components/StorePicker';
import './css/style.css';
import App from './components/App';
import NoPage from './components/NoPage';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

const Root = () => {
	return(
		<BrowserRouter>
			<Switch>
				<Route path="/stores/:StoreId" component={App} />
				<Route exact path="/" component={StorePicker} />
				<Route component={NoPage} />
			</Switch>
		</BrowserRouter>
	)
}


ReactDom.render(
	<Root />, document.querySelector('#main')
)

