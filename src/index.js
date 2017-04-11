import React from 'react'
import ReactDOM from 'react-dom'
import './normalize.css'
import './index.css'
import App from './App'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import focusReducers from './reducers/reducers.js';
import CurrentTask from './components/currentTask.js'
import EditTask from './components/edit.js'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'



let focusStore = createStore(focusReducers);


ReactDOM.render(
	<Provider store={focusStore}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={CurrentTask} />
				<Route path="/edit" component={EditTask} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);

export default focusStore;