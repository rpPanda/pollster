import * as ActionTypes from "./ActionTypes";

export const Polls = (
    state = { isLoading: false, errMess: null, polls: [] },
    action
) => {
    switch (action.type) {
        case ActionTypes.ADD_POLLS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                polls: action.payload,
            };

        case ActionTypes.POLLS_LOADING:
            return { ...state, isLoading: true, errMess: null, polls: [] };

        case ActionTypes.POLLS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};
