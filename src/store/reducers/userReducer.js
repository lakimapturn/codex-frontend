import { LOGOUT_USER } from "store/actions/userActions";
import { FETCH_USER, FETCHING_USER } from "store/actions/userActions";

const initialState = {
  isUserDataFetching: false,
  userData: [],
  remainingTasks: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER: {
      return Object.assign({}, state, {
        ...state,
        isUserDataFetching: true,
      });
    }

    case FETCH_USER: {
      return Object.assign({}, state, {
        ...state,
        userData: action.payload.user,
        isUserDataFetching: false,
      });
    }

    case LOGOUT_USER: {
      return Object.assign({}, state, {
        ...state,
        userData: [],
        remainingTasks: [],
      });
    }

    // case UPDATE_DOG_TASKS: {
    //   state.userData.dog_owned[action.payload.task] = true;
    //   return Object.assign({}, state, {
    //     ...state,
    //   });
    // }

    default: {
      return state;
    }
  }
};
