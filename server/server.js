// only run on the server
// console.logs appear on Terminal

// add modules
import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
// add ConnectRoute for detecting whether URL is a short URL (so that client request is handled entirely by Meteor [React is never loaded; saving time] and client is redirected to full URL)
// similar to NodeJS ExpressJS router module
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
	// code to run on server at startup
	Meteor.publish('links', function() 
	{
		return Links.find({});
	});
});

// executed whenever a user visits with a route that matches the pattern 'localhost:3000/abcd' (root URL + slash + string of characters)
// "req" is the request from the client
// "res" is the response to be sent back to client
// "next" is a reference to the next middleware to be run
function onRoute(req, res, next) {
	// extra the token from the URL and search "Links" collection in MongoDB for a matching short URL token
	// findOne() finds the first record that matches the search criteria
	// "req.params.token" was found using the "console.log(req)" below
	const link = Links.findOne({ token: req.params.token });
	// if we find a match for the token in the "Links" collection, redirect the user to the long URL
	// 307 is the "redirect" code
	if (link) 
	{
		// UPDATE record in MongoDB collection
		// update the "clicks" value (increment it by 1) of this link's record in the Links collection in MongoDB
		// "$inc: { clicks: 1 }" means *inc*rement the "clicks" value by 1
		Links.update(link, { $inc: { clicks: 1 }});
		res.writeHead(307, { 'Location': link.url });
	    res.end();
	} 
	// else, send user to the React app
	else 
	{
	    next();
	}
}

// define the middleware
// ConnectRoute is an NPM module that creates a middleware that checks if the URL of an incoming HTTP request matches '/:token', which represents a root URL (ex. localhost:3000) + slash + single string of characters (no extra slashes + characters)
	// localhost:3000/ = NO MATCH
	// localhost:3000/books/harry_potter = NO MATCH
	// localhost:3000/abcd = YES MATCH !!
// if it matches, then the anonymous function (with the HTTP request "req" as the parameter) gets executed
const middleware = ConnectRoute(function(router) 
{
	// router.get('/:token', (req) => console.log(req));
	router.get('/:token', onRoute);
});

// use the middleware
// WebApp is part of Meteor
WebApp.connectHandlers.use(middleware);