import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from "./reducers/colorStore"

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import Main from "./pages/Main/Main"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"

const Index: React.FC = () => {

	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Main} />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={SignUp} />
					</Switch>
				</BrowserRouter>
			</Provider>
		</>
	);
};
ReactDOM.render(<Index />, document.getElementById('root'));