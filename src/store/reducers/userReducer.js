import { FETCH_USER } from "store/actions/userActions";

const initialState = {
  isUserDataFetching: false,
  userData: [],
  remainingTasks: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER: {
      return Object.assign({}, state, {
        ...state,
        userData: action.payload.user,
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
