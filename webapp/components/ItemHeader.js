import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SearchFilters from './SearchFilters';

class ItemHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		};
	}

	toggleVisibility = () => {
		const visible = !this.state.visible;
		this.setState({
			visible,
		});
	}

	render() {
		return (
			<nav className={`navbar-main ${this.state.visible ? 'active' : ''}`}>
				<Link to="/"><div className="title">PriceBot</div></Link>
			</nav>
		);
	}
}

export default ItemHeader;
