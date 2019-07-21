import { fromJS } from "immutable";
import { ACTION1 } from "./constants";

const initialState = fromJS({
    key1: 'Shivanand',
    key2: 'Sonnad',
    key3: '1234567890',
});

export default function HomeReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION1: return state.set('key1', 'Changed');
        default: return state;
    }
}
