import * as constants from "../constants/constants";
export const validatePhone = (_, value) => {
  const phoneRegex = constants.REGEXPHONE;
  if (value && !phoneRegex.test(value)) {
    return Promise.reject("Vui lòng nhập số điện thoại có định dạng Việt Nam");
  }
  return Promise.resolve();
};
export const validateEmail = (_, value) => {
  const phoneRegex = constants.REGEXEMAIL;
  if (value && !phoneRegex.test(value)) {
    return Promise.reject("Vui lòng nhập email hợp lệ");
  }
  return Promise.resolve();
};
