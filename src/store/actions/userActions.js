export const FETCH_USER = "FETCH_USER";
export const FETCHING_USER = "FETCHING_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const fetchUserDataId = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCHING_USER });
    const response = await fetch(
      `https://codex-django-backend.herokuapp.com/user?user=${id}`
    );
    const result = await response.json();
    return dispatch({ type: FETCH_USER, payload: { user: result } });
  };
};

export const fetchUserData = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCHING_USER });
      const response = await fetch(
        "https://codex-django-backend.herokuapp.com/auth",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();

      localStorage.setItem("user", JSON.stringify(result.user.id));

      return dispatch({ type: FETCH_USER, payload: { user: result.user } });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const registerUser = (details) => {
  return async (dispatch) => {
    const data = {
      username: details.user.username,
      password: details.user.password,
      first_name: details.user.first_name,
      last_name: details.user.last_name,
      email: details.user.email,
      dog_name: details.dog.name,
      dog_age: details.dog.age,
      dog_image: details.dog.image,
      dog_vaccinated: details.dog.vaccinated,
      dog_microchipped: details.dog.microchipped,
      dog_breed: details.dog.breed,
    };

    try {
      const response = await fetch(
        "https://codex-django-backend.herokuapp.com/register",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();

      localStorage.setItem("user", JSON.stringify(result.id));

      return dispatch({ type: FETCH_USER, payload: { user: result } });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateTask = (user, task) => {
  return async (dispatch) => {
    const taskItem =
      task.text.indexOf("First Vaccination") !== -1
        ? "vaccinated"
        : "microchipped";
    const data = { user: user, task: taskItem };

    try {
      const response = await fetch(
        "https://codex-django-backend.herokuapp.com/task",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();

      return dispatch({ type: FETCH_USER, payload: { user: result } });
    } catch (err) {
      console.log(err);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem("user");
    localStorage.removeItem("tasks");
    return dispatch({ type: LOGOUT_USER });
  };
};
