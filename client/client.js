// add React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// add components
import Header from './components/header';
import LinkCreate from './components/link_create';
import { Links } from '../imports/collections/links';
import LinkList from './components/link_list';

// create App component (similar to a class / constructor function)
class App extends Component
{	

	// render the view
	// the console.log is run as many times as this component gets rendered... currently 2x:
		// 1. once for constructor function's initialization of the "images" prop
		// 2. then once when state of "images" prop gets updated with images from Imgur API
	// pass "images" prop into ImageList child component
	render()
	{
		return(
			<div>
				<Header />
				<LinkCreate />
				<LinkList />
			</div>
		);
	}
};

// wait for DOM to load before rendering components
// render component to the screen
// ReactDOM.render(); takes 2 arguments
	// 1. which component to render
	// 2. where to render it in the HTML structure
// add an instance of App component
Meteor.startup( () => {
	ReactDOM.render(<App />, document.querySelector(".react-target"));
});