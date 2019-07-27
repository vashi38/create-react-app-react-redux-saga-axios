import { fromJS } from "immutable";
import { GET_CITY_LIST_DONE, GET_WEATHER, GET_WEATHER_DONE, GET_CITY_LIST } from "./constants";

const initialState = fromJS({
    loadingCityList: false,
    cityList: [],
    loadingWeatherData: false,
    weatherResponse: {}
});

export default function HomeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CITY_LIST: return state.set('loadingCityList', true).set('cityList', []);
        case GET_CITY_LIST_DONE: return state.set('loadingCityList', false).set('cityList', action.data);
        case GET_WEATHER: return state.set('loadingWeatherData', true).set('weatherResponse', {});
        case GET_WEATHER_DONE: return state.set('loadingWeatherData', false).set('weatherResponse', action.data);
        default: return state;
    }
}
