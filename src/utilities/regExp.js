export const validateEmail = (email) => {
  const result =
    /^[-a-z0-9~!$%^&*_=+}{?]+(\.[-a-z0-9~!$%^&*_=+}{?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

  return result.test(email);
};

export const capitalizeText = (text) => {
  const finalSentence = text.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );

  return finalSentence;
};
