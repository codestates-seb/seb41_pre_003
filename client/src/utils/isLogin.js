const isLogin = () => !!localStorage.getItem('AccessToken');
export default isLogin;
