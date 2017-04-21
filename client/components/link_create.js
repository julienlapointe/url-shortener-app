// link creation component (form)

// add React
import React, { Component } from 'react';

// create class-based component (requires a render() method) for the link creation form
class LinkCreate extends Component 
{
	// initialize error message as empty string
	constructor(props) 
	{
		super(props);
		this.state = { error: '' };
	}

	// prevent browser from refreshing the page
	handleSubmit(event) 
	{
		event.preventDefault();
		console.log(this.refs.link.value);
		Meteor.call('links.insert', this.refs.link.value, (error) => 
		{
			console.log(error);
			// if error, present error message
			if (error) 
			{
				this.setState({ error: 'Enter a valid URL' });
			} 
			// else, there is no error so clear error message and input field value (URL)
			// clear URL so that user can enter another URL
			// re-watch Section 4, Lecture 66...
			else 
			{
				this.setState({ error: '' });
				this.refs.link.value = '';
			}
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<div className="form-group">
					<label>Link to shorten</label>
					<input ref="link" className="form-control" />
				</div>
				<div className="text-danger">{this.state.error}</div>
				<button className="btn btn-primary">Shorten!</button>
			</form>
		);
	}
}

export default LinkCreate;