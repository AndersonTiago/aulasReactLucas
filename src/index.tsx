import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';

const workerPath = "./worker.js";

const { serviceWorker } = window.navigator;


serviceWorker.register(workerPath, {})
  .then(result => {

    const worker = result.active;

    worker?.postMessage('{"name": "worker"}');

    // Uma requisição aleatória para demonstração do cache do Service Worker
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => console.log(json))

  })
  .catch(error => console.log(error));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

