import { toast } from 'react-toastify';

// Actions constants
const FLASH_SUCCESS = 'flash/success';
const FLASH_ERROR = 'flash/error';
const FLASH_INFO = 'flash/info';
const FLASH_WARNING = 'flash/warning';
const FLASH_DISPLAY = 'flash/display';
const FLASH_CLEAR = 'flash/clear';

// Actions creators
const flashAction = (type, message) => ({
  type,
  payload: message,
});

export const flashSuccessAction = (message) => flashAction(FLASH_SUCCESS, message);
export const flashErrorAction = (message) => flashAction(FLASH_ERROR, message);
export const flashInfoAction = (message) => flashAction(FLASH_INFO, message);
export const flashWarningAction = (message) => flashAction(FLASH_WARNING, message);
export const flashClearAction = () => ({ type: FLASH_CLEAR });
export const flashDisplayAction = () => ({ type: FLASH_DISPLAY });

// Flash messages toast
export const flashSuccess = (message) => toast.success(message);
export const flashError = (message) => toast.error(message);
export const flashInfo = (message) => toast.info(message);
export const flashWarning = (message) => toast.warning(message);

export const addFlash = (key, message) => (dispatch) => {
  switch (key) {
    case 'success':
      dispatch(flashSuccessAction(message));
      break;
    case 'error':
      dispatch(flashErrorAction(message));
      break;
    case 'info':
      dispatch(flashInfoAction(message));
      break;
    case 'warning':
      dispatch(flashWarningAction(message));
      break;
    default:
      break;
  }
};

export const flash = (key, message) => {
  switch (key) {
    case 'success':
      flashSuccess(message);
      break;
    case 'error':
      flashError(message);
      break;
    case 'info':
      flashInfo(message);
      break;
    case 'warning':
      flashWarning(message);
      break;
    default:
      break;
  }
};

// Reducer
const initialState = {
  success: null,
  error: null,
  info: null,
  warning: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FLASH_SUCCESS:
      return { ...state, success: action.payload };
    case FLASH_ERROR:
      return { ...state, error: action.payload };
    case FLASH_INFO:
      return { ...state, info: action.payload };
    case FLASH_WARNING:
      return { ...state, warning: action.payload };
    case FLASH_DISPLAY:
      Object.entries(state).forEach(([key, value]) => {
        if (value) {
          flash(key, value);
        }
      });
      return initialState;
    case FLASH_CLEAR:
      return initialState;
    default:
      return state;
  }
};
