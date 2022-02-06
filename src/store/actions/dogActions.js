export const FETCH_DOG_DATA = "FETCH_DOG_DATA";
export const UPDATE_DOG_TASKS = "UPDATE_DOG_TASKS";
export const FETCH_DOG_FOOD = "FETCH_DOG_FOOD";
export const FETCHING_DOG_DATA = "FETCHING_DOG_DATA";

export const fetchDogData = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCHING_DOG_DATA });
      const response = await fetch("https://api.thedogapi.com/v1/breeds");
      const result = await response.json();
      return dispatch({ type: FETCH_DOG_DATA, payload: { data: result } });
    } catch (error) {
      console.log(error);
    }
  };
};

export const completeTask = (userDog, task) => {
  return async (dispatch) => {
    try {
      const data = { dog: userDog, task: task };
      const response = await fetch(
        "https://codex-django-backend.herokuapp.com/dog",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return dispatch({ type: UPDATE_DOG_TASKS, payload: { dog: result.dog } });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchFoods = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCHING_DOG_DATA });
      const response = await fetch(
        "https://codex-django-backend.herokuapp.com/foods"
      );
      const result = await response.json();
      console.log(result);
      return dispatch({ type: FETCH_DOG_FOOD, payload: { foods: result } });
    } catch (error) {
      console.log(error);
    }
  };
};
