import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectBreadcrumbs } from '../Home/selectors';
import styles from './styles.module.scss';

class Breadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    
    getBreadcrumbList = () => {
        try {
            const { routes } = this.props;
            const lastElement = routes[routes.length - 1];
            const breadcrumbs = lastElement.breadcrumbs || [];
            return breadcrumbs;
        } catch (e) {
            return [];
        }
    }

    render() {
        const breadcrumbList = this.getBreadcrumbList()
        return (
            <div className={styles.breadcrumbContainer}>
                {breadcrumbList.map((Breadcrumb, index, list) => {
                    if (index === list.length - 1) {
                        return <span key={index}><Breadcrumb /></span>
                    }
                    return <span key={index}><Breadcrumb />&nbsp;>&nbsp;</span>
                })}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    breadcrumbList: selectBreadcrumbs(),
})

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs);