import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { selectLoadingCityList, selectCityList, selectLoadingWeather, selectWeatherData } from './selectors';
import { connect } from 'react-redux';
import { getCityList, getWeatherFromCityId } from './actions';
import Select from '../../components/CustomSelect';
import styles from './styles.module.scss';
import Debounce from 'debounce'

class Home extends Component {
    constructor(props) {
        super(props);
        this.queryCityList = Debounce(this.queryCityList, 400);
        this.state = {
            selectedCity: {}
        };
    }
    componentDidMount() {
        this.queryCityList();
    }

    componentDidUpdate(prevProps, prevState) {
        const { loadingCityList } = prevProps;
        const { selectedCity } = prevState;
        if (selectedCity && this.state.selectedCity && selectedCity.value !== this.state.selectedCity.value) {
            this.getWeatherFromCityId();
        }
        if (loadingCityList && !this.props.loadingCityList) {
            this.initSelect();
        }
    }

    initSelect = () => {
        const { cityList } = this.props;
        const list = this.getCitySelectOptions(cityList);
        if (list && list.length) {
            this.setState({
                selectedCity: list[0],
            });
        }
    }

    getCitySelectOptions = (list) => {
        if (!list || !Array.isArray(list)) return [];
        return list.map(city => ({
            label: city.name.concat(', ', city.country),
            value: city.id,
        }));
    }

    getWeatherFromCityId() {
        const { selectedCity } = this.state;
        this.props.getWeatherFromCityId(selectedCity.value);
    }

    handleChangeSelectedCity = (evt) => {
        this.setState({
            selectedCity: evt,
        });
    }

    handleInputChangeCitySelect = (query) => {
        console.log(query);
        this.queryCityList(query);
    }

    queryCityList = (query = 'a') => {
        if (!query) return;
        this.props.getCityList(query);
    }

    render() {
        const { cityList, loadingCityList } = this.props;
        const { selectedCity } = this.state;
        const citySelectOptions = this.getCitySelectOptions(cityList);
        return (
            <div className={styles.container}>
                <div>
                    <strong>Select City: </strong>
                    <div className={styles.selectWrapper}>
                        <Select 
                            options={citySelectOptions}
                            value={selectedCity}
                            onInputChange={this.handleInputChangeCitySelect}
                            onChange={this.handleChangeSelectedCity}
                            isLoading={loadingCityList}
                            onBlur={null}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    loadingCityList: selectLoadingCityList(),
    cityList: selectCityList(),
    loadingWeather: selectLoadingWeather(),
    weatherData: selectWeatherData(),
})

function mapDispatchToProps(dispatch) {
    return {
        getCityList: (query) => {
            dispatch(getCityList(query));
        },
        getWeatherFromCityId: (id) => {
            dispatch(getWeatherFromCityId(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);