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
import Patterns from "./pages/Patterns/Patterns"
import NotFound from "./pages/404/404"

const Index: React.FC = () => {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Main} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={SignUp} />
						<Route exact path="/my-patterns" component={Patterns} />
						<Route exact path="/liked-patterns" component={Patterns} />
						<Route path="/user" component={Patterns} />
						<Route path="/" component={NotFound} />
					</Switch>
				</BrowserRouter>
			</Provider>
		</>
	);
};
ReactDOM.render(<Index />, document.getElementById('root'));