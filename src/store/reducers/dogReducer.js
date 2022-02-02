import { FETCH_DOG_FOOD } from "store/actions/dogActions";
import { FETCHING_DOG_DATA } from "store/actions/dogActions";
import { UPDATE_DOG_TASKS } from "store/actions/dogActions";
import { FETCH_DOG_DATA } from "store/actions/dogActions";

const initialState = {
  isDogDataFetching: false,
  dogData: [],
  dogFood: [],
};

export const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DOG_DATA: {
      return Object.assign({}, state, {
        ...state,
        isDogDataFetching: true,
      });
    }
    case FETCH_DOG_DATA: {
      return Object.assign({}, state, {
        ...state,
        isDogDataFetching: false,
        userData: action.payload.user,
        remainingTasks: action.payload.user.dog_owned.tasks,
      });
    }
    case FETCH_DOG_FOOD: {
      return Object.assign({}, state, {
        ...state,
        isDogDataFetching: false,
        dogFood: action.payload.foods,
      });
    }
    default: {
      return state;
    }
  }
};
