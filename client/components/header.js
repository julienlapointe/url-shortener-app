// header component

// add React
import React from 'react';

// create functional component
const Header = () => {
	return (
		<nav className="nav navbar-default">
			<div className="navbar-header">
				<a className="navbar-brand">ShortenMyLink.com</a>
			</div>
		</nav>
	);
};

// export component
// any files that *import* the file header.js, will get the "Header" component by *default*
export default Header;