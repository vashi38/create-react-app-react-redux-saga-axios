import { GET_CITY_LIST, GET_CITY_LIST_DONE, GET_WEATHER, GET_WEATHER_DONE } from "./constants";

export function getCityList(query) {
    return {
        type: GET_CITY_LIST,
        query,
    }
}

export function getCityListDone(data) {
    return {
        type: GET_CITY_LIST_DONE,
        data,
    }
}

export function getWeatherFromCityId(id) {
    return {
        type: GET_WEATHER,
        id,
    }
}

export function getWeatherFromCityIdDone(data) {
    return {
        type: GET_WEATHER_DONE,
        data,
    }
}