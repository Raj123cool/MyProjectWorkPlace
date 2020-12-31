import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {SpeechProvider} from '@speechly/react-client'
import {Provider} from './context/context'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <SpeechProvider appId="b0940620-5f94-42d6-8973-a005c884905c" language="en-US">
    <Provider>
        <App />
    </Provider> 
  </SpeechProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
