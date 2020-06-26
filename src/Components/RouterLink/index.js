import React from 'react';
import { Link } from 'react-router-dom';

class RouterLink extends React.PureComponent {
    render() {
        return (
            <Link to={this.props.to} href={this.props.href} >
                { this.props.title }
            </Link>
            
        );
    }
};

const styles = {
    textStyle: {
        fontSize: 14,
        textDecoration: 'none',
        // color: 'primary'
    }
}

export default RouterLink;
