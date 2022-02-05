export const FETCH_USER = "FETCH_USER";
export const FETCHING_USER = "FETCHING_USER";
export const LOGOUT_USER = "LOGOUT_USER";

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
      console.log(result);
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
      dog_name: details.dog?.name,
      dog_age: details.dog?.age,
      dog_image: details.dog?.image,
      dog_vaccinated: details.dog?.vaccinated,
      dog_microchipped: details.dog?.microchipped,
      dog_breed: details.dog?.breed,
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
      await console.log(result);

      localStorage.setItem("user", JSON.stringify(result.id));

      // Add image handling and create a dispatch event that logs the user in and redirects him

      // return dispatch({})
    } catch (err) {
      console.log(err);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem("user");
    return dispatch({ type: LOGOUT_USER });
  };
};
