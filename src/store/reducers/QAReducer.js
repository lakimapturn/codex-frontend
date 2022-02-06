import { ASK_QUESTION } from "store/actions/QAActions";
import {
  FETCH_QUESTIONS,
  ANSWER_QUESTION,
  FETCHING_QUESTIONS,
} from "store/actions/QAActions";

const initialState = {
  isFetching: false,
  question_response: [],
};

export const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_QUESTIONS: {
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
      });
    }
    case FETCH_QUESTIONS: {
      return Object.assign({}, state, {
        ...state,
        question_response: action.payload.questions,
        isFetching: false,
      });
    }

    default: {
      return state;
    }
  }
};
