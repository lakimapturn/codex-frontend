import { important_tasks } from "constants/data";
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
      updateTasks(action.payload.user);

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

const updateTasks = (user) => {
  try {
    const tasks = important_tasks;
    for (const index in tasks) {
      if (
        tasks[index].text.indexOf("First Vaccination") !== -1 &&
        user.dog_owned.vaccinated
      ) {
        tasks[index].completed = true;
      } else if (
        tasks[index].text.indexOf("Microchipped") !== -1 &&
        user.dog_owned.microchipped
      ) {
        tasks[index].completed = true;
      } else if (user.dog_owned.last_vaccinated) {
        tasks[index].text =
          "Next Vaccination:  " +
          new Date(user.dog_owned.last_vaccinated).toLocaleDateString();
      }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.log(error);
  }
};
