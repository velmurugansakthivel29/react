
import { combineReducers } from 'redux';

import defaultreducer from './authreducer';

const rootReducer = combineReducers({
    authenticatedState: defaultreducer,
});

export default rootReducer;