import Constants from "../constants";

const initialState = {
  isLogin: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  data: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Constants.User.LOGIN_REQUEST:
      return { ...state, isError: false, isLoading: true };
    case Constants.User.LOGIN_FAILED:
      return { ...state, isError: true, isLoading: false };
    case Constants.User.LOGIN_SUCCESS: {
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        isError: false,
        isLoading: false,
        isLogin: true,
        data: payload,
      };
    }
    case Constants.User.LOGIN_UPDATE: {
      localStorage.setItem("user", JSON.stringify({ ...state.data, ...payload }));
      return {
        ...state,
        isLogin: true,
        data: { ...state.data, ...payload },
      };
    }
    case Constants.User.LOGIN_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
