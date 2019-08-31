import React, { Component } from 'react';
import TotalCost from '../../components/TotalSummary';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
    selectShows,
} from '../Home/selectors';

class TotalRevenue extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    reduceTotalRevenueList = (list) => {
        return list.reduce((prevVal, currVal) => {
            const val = currVal.cost;
            return {
                subTotal: prevVal.subTotal + val.subTotal,
                serviceTax: prevVal.serviceTax + val.serviceTax,
                swachhBharatCess: prevVal.swachhBharatCess + val.swachhBharatCess,
                krishiKalyanCess: prevVal.krishiKalyanCess + val.krishiKalyanCess,
                total: prevVal.total + val.total,
                tax: currVal.tax,
            }
        }, {
            subTotal: 0,
            serviceTax: 0,
            swachhBharatCess: 0,
            krishiKalyanCess: 0,
            total: 0,
            tax: {},
        });
    }

    getTotalRevenue = () => {
        try {
            const { shows } = this.props;
            const revenueList = shows.map(show => show.getRevenue());
            return this.reduceTotalRevenueList(revenueList)
        } catch (e) {
            return {
                subTotal: 0,
                serviceTax: 0,
                swachhBharatCess: 0,
                krishiKalyanCess: 0,
                total: 0,
                tax: {},
            };
        }
    }
    
    render() {
        const totalRevenue = this.getTotalRevenue()
        return (
            <div>
                <TotalCost totalCost={totalRevenue} />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    shows: selectShows(),
})

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalRevenue);
