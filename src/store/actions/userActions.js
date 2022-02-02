export const FETCH_USER = "FETCH_USER";

export const fetchUserData = () => {
  return async (dispatch) => {
    try {
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
      console.log(result.user.dog_owned);
      return dispatch({ type: FETCH_USER, payload: { user: result.user } });
    } catch (error) {
      console.log(error);
    }
  };
};
