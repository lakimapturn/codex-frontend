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

    case ASK_QUESTION: {
      return {};
    }

    case ANSWER_QUESTION: {
      state.userData.dog_owned[action.payload.task] = true;
      return Object.assign({}, state, {
        ...state,
      });
    }

    default: {
      return state;
    }
  }
};
