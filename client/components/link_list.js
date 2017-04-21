// link list / table component

// add React
import React, { Component } from 'react';
// add container for updating React data w/ any changes to MongoDB collection
// must convert a component to a container when consuming a publication (in server) with a subscription (in client)
import { createContainer } from 'meteor/react-meteor-data';
// add Links collection from MongoDB
import { Links } from '../../imports/collections/links';

// create class-based component (requires a render() method)
// "URL" = long URL
// "Address" = short URL
class LinkList extends Component 
{
	renderRows() 
	{
		return this.props.links.map(link => 
		{
			const { url, clicks, token } = link;
			const shortLink = `http://localhost:3000/${token}`;
			return (
				<tr key={token}>
					<td>{url}</td>
					<td>
						<a href={shortLink}>{shortLink}</a>
					</td>
					<td>
						{clicks}
					</td>
				</tr>
			);
		});
	}
	render() 
	{
		return (
			<table className="table">
				<thead>
					<tr>
						<th>URL</th>
						<th>Address</th>
						<th>Clicks</th>
					</tr>
				</thead>
				<tbody>
					{this.renderRows()}
				</tbody>
			</table>
		);
	}
}

// export component / container
// any files that *import* the file link_list.js, will get the "LinkList" component / container by *default*
// 2 arguments:
	// 1. fat arrow function
	// !! 2. component that we want to inject the data into (LinkList)
// fetch all links and assign to "link" key so that it is available inside the LinkList component as this.props.links
export default createContainer(() => 
{
	Meteor.subscribe('links');
	return { links: Links.find({}).fetch() };
}, LinkList);