import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { Users } from './users';
import { createForms } from "react-redux-form";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from "./forms";
import { Polls } from './polls';
import { Poll } from './poll';

export const ConfigureStore = () => {
    const store = createStore(
      combineReducers({
        dishes: Dishes,
        comments: Comments,
        promotions: Promotions,
        leaders: Leaders,
        users: Users,
        polls: Polls,
        poll: Poll,
        ...createForms({
          feedback: InitialFeedback,
        }),
      }),
      applyMiddleware(thunk, logger)
    );
    return store;
}