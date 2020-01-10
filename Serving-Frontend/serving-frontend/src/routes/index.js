import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Cambiar_Contrasena from '../Components/Cambiar_Contrasena';
import App from '../App.js';
import login from '../login';

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={login} />
			<Route exact path="/Inicio" component={App} />
			<Route exact path="/Cambiar_Contrasena" component={Cambiar_Contrasena} />
		</Switch>
	</BrowserRouter>
);

export default Router;
