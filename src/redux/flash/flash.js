import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from 'react-redux';

// Actions constants
const FLASH_SUCCESS = 'flash/success';
const FLASH_ERROR = 'flash/error';
const FLASH_INFO = 'flash/info';
const FLASH_WARNING = 'flash/warning';
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

// Flash messages toast
const flashSuccess = (message) => toast.success(message);
const flashError = (message) => toast.error(message);
const flashInfo = (message) => toast.info(message);
const flashWarning = (message) => toast.warning(message);

export const flash = (key, message, callback = null) => {
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

  if (callback) {
    callback();
  }
};
