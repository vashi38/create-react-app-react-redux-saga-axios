import React, { Component } from 'react';
import { Link } from 'react-router';

class ShowsBreadcrumb extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Link to={`/shows`}>Shows</Link>
        );
    }
}

export default ShowsBreadcrumb;
