const isLogin = true;

const LoginReducer = (state = isLogin, action) => {
  switch (action.type) {
    case 'CHANGEHEADER':
      return !isLogin;
  }
};
