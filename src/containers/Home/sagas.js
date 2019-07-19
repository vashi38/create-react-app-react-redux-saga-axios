import { take, cancel, fork, takeLatest, put } from 'redux-saga/effects';

function* doTest(action) {
    yield put({
        type: 'ACTION12',
    });
}

function* testWatcher() {
    yield takeLatest('ACTION1', doTest);
}

export function* test() {
    const watcher = yield fork(testWatcher);

    yield take('@@router/LOCATION_CHANGE');
    yield cancel(watcher);
}

export default [
    test,
];