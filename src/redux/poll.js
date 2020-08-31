import * as ActionTypes from "./ActionTypes";

export const Poll = (
    state = { isLoading: true, errMess: null, poll: {} },
    action
) => {
    switch (action.type) {
        case ActionTypes.ADD_POLL:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                poll: action.payload,
            };

        case ActionTypes.POLL_LOADING:
            return { ...state, isLoading: true, errMess: null, poll: {} };

        case ActionTypes.POLL_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};
