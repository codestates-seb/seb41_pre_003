import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const increase = () => {
  return {
    type: 'INCREASE',
  };
};

export const decrease = () => {
  return {
    type: 'DECREASE',
  };
};

const count = 1;

// Reducer를 생성할 때에는 초기 상태를 인자로 요구합니다.
const counterReducer = (state = count, action) => {
  // Action 객체의 type 값에 따라 분기하는 switch 조건문입니다.
  switch (action.type) {
    //action === 'INCREASE'일 경우
    case 'INCREASE':
      return state + 1;

    // action === 'DECREASE'일 경우
    case 'DECREASE':
      return state - 1;

    // action === 'SET_NUMBER'일 경우
    case 'SET_NUMBER':
      return action.payload;

    // 해당 되는 경우가 없을 땐 기존 상태를 그대로 리턴
    default:
      return state;
  }
  // Reducer가 리턴하는 값이 새로운 상태가 됩니다.
};

const store = createStore(counterReducer);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
