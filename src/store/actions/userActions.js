export const FETCH_USER = "FETCH_USER";
export const FETCHING_USER = "FETCHING_USER";

export const fetchUserData = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCHING_USER });
      const data = { username: "laki", password: "admin" };
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
      // console.log(result.user.dog_owned);
      return dispatch({ type: FETCH_USER, payload: { user: result.user } });
    } catch (error) {
      console.log(error);
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
      const response = fetch(
        "https://codex-django-backend.herokuapp.com/register",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = response.json();
      // return dispatch({})
    } catch (err) {
      console.log(err);
    }
  };
};
