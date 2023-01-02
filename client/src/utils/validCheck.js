const validCheck = (password) => {
  if (!/^[a-zA-Z0-9]{10,15}$/.test(password)) {
    return '숫자와 영문자 조합으로 10~15자리를 사용해야 합니다.';
  }

  let checkNumber = password.search(/[0-9]/g);
  let checkEnglish = password.search(/[a-z]/gi);

  if (checkNumber < 0 || checkEnglish < 0) {
    return '숫자와 영문자를 혼용하여야 합니다.';
  }

  if (/(\w)\1\1\1/.test(password)) {
    return '같은 문자를 4번 이상 사용하실 수 없습니다.';
  }
  return '사용하실 수 있습니다!';
};

export default validCheck;
