import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from '../App.js';
import login from '../login';

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={login} />
			<Route exact path="/App" component={App} />
		</Switch>
	</BrowserRouter>
);

export default Router;
