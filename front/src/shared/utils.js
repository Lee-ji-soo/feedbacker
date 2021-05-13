export const emailCheck = (email) => {
  const emailRegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  return emailRegExp.test(email);
};

export const API_URL = "https://feedbacker.club/api";
