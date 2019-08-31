/* eslint-disable react-hooks/rules-of-hooks */

import { browserHistory, useRouterHistory } from 'react-router';
import { createHistory } from 'history';

function configureDevHistory() {
    return useRouterHistory(createHistory)({
        basename: '/',
    });
}

function configureProdHistory() {
    return browserHistory;
}

function configureTestingHistory() {
    return useRouterHistory(createHistory)({
        basename: '/',
    });
}

export function configureHistory() {
    const env = process.env.NODE_ENV;
    switch (env) {
    case 'development':
        return configureDevHistory();
    case 'testing':
        return configureTestingHistory();
    default:
        return configureProdHistory();
    }
}
