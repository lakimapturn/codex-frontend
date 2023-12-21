export const FETCH_QUESTIONS = "FETCH_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ASK_QUESTION = "ASK_QUESTION";
export const FETCHING_QUESTIONS = "FETCHING_QUESTIONS";

export const fetchQuestions = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCHING_QUESTIONS,
      });
      const response = await fetch("http://127.0.0.1:8000/question-response");
      const result = await response.json();
      return dispatch({
        type: FETCH_QUESTIONS,
        payload: { questions: result },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const askQuestion = (question, user) => {
  return async (dispatch) => {
    const data = { user: user, question: question };
    try {
      const response = await fetch("http://127.0.0.1:8000/question-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
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
      const response = await fetch("http://127.0.0.1:8000/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return dispatch({
        type: FETCH_QUESTIONS,
        payload: { questions: result },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
