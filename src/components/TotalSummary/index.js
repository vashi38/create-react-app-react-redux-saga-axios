import React, { Component } from 'react';
import styles from './styles.module.scss'
class TotalCost extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    formatPrice = (price) => parseFloat(price).toFixed(2);

    render() {
        const { totalCost } = this.props;
        if (!totalCost) return null;
        return (
            <table>
                <tr>
                    <th className={styles.lineColumn}>Sub total</th>
                    <td className={styles.lineColumn}>{this.formatPrice(totalCost.subTotal)}</td>
                </tr>
                <tr>
                    <th className={styles.lineColumn}>Service Tax @{totalCost.tax.serviceTax}%</th>
                    <td className={styles.lineColumn}>{this.formatPrice(totalCost.serviceTax)}</td>
                </tr>
                <tr>
                    <th className={styles.lineColumn}>Swachh Bharat Cess @{totalCost.tax.swachhBharatCess}%</th>
                    <td className={styles.lineColumn}>{this.formatPrice(totalCost.swachhBharatCess)}</td>
                </tr>
                <tr>
                    <th className={styles.lineColumn}>Krishi Kalyan Cess @{totalCost.tax.krishiKalyanCess}%</th>
                    <td className={styles.lineColumn}>{this.formatPrice(totalCost.krishiKalyanCess)}</td>
                </tr>
                <tr>
                    <th className={styles.lineColumn}>Total</th>
                    <td className={styles.lineColumn}>{this.formatPrice(totalCost.total)}</td>
                </tr>
            </table>
        )
    }
}

export default TotalCost;