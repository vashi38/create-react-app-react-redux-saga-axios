import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { selectLoadingCityList, selectCityList, selectLoadingWeather, selectWeatherData } from './selectors';
import { connect } from 'react-redux';
import { getCityList, getWeatherFromCityId } from './actions';
import Select from '../../components/CustomSelect';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCity: {}
        };
    }
    componentDidMount() {
        this.props.getCityList();
    }

    componentDidUpdate(prevProps) {
        const { loadingCityList } = prevProps;
        if (loadingCityList && !this.props.loadingCityList) {
            this.initSelect();
        }
    }

    initSelect = () => {
        const { cityList, getWeatherFromCityId } = this.props;
        const list = this.getCitySelectOptions(cityList);
        if (list && list.length) {
            getWeatherFromCityId(list[0].value);
            this.setState({
                selectedCity: list[0],
            });
        }
    }

    getCitySelectOptions = (list) => {
        if (!list || !Array.isArray(list)) return [];
        return list.map(city => ({
            label: city.name,
            value: city.id,
        }));
    }

    handleChangeSelectedCity = (evt) => {
        this.setState({
            selectedCity: evt,
        });
        this.props.getWeatherFromCityId(evt.value);
    }

    render() {
        const { cityList } = this.props;
        const { selectedCity } = this.state;
        const citySelectOptions = this.getCitySelectOptions(cityList);
        return (
            <div>
                <Select 
                    options={citySelectOptions}
                    value={selectedCity}
                    onChange={this.handleChangeSelectedCity}
                />
                {this.props.children}
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
        getCityList: () => {
            dispatch(getCityList());
        },
        getWeatherFromCityId: (id) => {
            dispatch(getWeatherFromCityId(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);