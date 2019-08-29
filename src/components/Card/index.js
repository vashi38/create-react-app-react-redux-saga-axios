import React, { Component } from 'react';
import styles from './styles.module.scss';
class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { id, image, name, onClick } = this.props;
        return (
            <div className={styles.cardContainer} onClick={() => onClick(id)}>
                <img src={image} alt="show thumbnail" />
                <div className={styles.cardDescription}>
                    <h3>{name}</h3>
                </div>
            </div>
        )
    }
}

Card.defaultProps = {
    image: 'https://placeimg.com/200/200/any',
}

export default Card;
