import { FETCH_QUESTIONS, ANSWER_QUESTION } from "store/actions/QAActions";

const initialState = {
  isFetching: false,
  question_response: [],
};

export const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS: {
      return Object.assign({}, state, {
        ...state,
        question_response: action.payload.questions,
      });
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
