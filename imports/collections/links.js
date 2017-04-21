// add handle for MongoDB database
// MongoDB database is automatically created and run when meteor app is created
import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';

// define Meteor methods for manipulating data in the "links" collection
// 'links.insert' is a valid JS key (since there is a . (period), the ' ' (quotes) must be added)
// check() and Match() are Meteor utility functions
// use Match.Where() for custom form validation
Meteor.methods
({
	'links.insert': function(url) 
	{
		console.log('attempting to save', url);
		check(url, Match.Where(url => validUrl.isUri(url)));
		// if URL is valid, then assign a token and save to db
		const token = Math.random().toString(36).slice(-5);
		Links.insert({ url, token, clicks: 0 });
	}
});

// creates and export collection
export const Links = new Mongo.Collection('links');