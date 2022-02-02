export const FETCH_QUESTIONS = "FETCH_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export const fetchQuestions = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://codex-django-backend.herokuapp.com/question-response"
      );
      const result = await response.json();
      // console.log(result);
      return dispatch({
        type: FETCH_QUESTIONS,
        payload: { questions: result },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const answerQuestion = (question, answer, user) => {
  return async (dispatch) => {
    const data = { user: user, answer: answer, question: question };
    try {
      const response = await fetch(
        "https://codex-django-backend.herokuapp.com/answer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      // console.log(result);
      return dispatch({
        type: FETCH_QUESTIONS,
        payload: { questions: result },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
