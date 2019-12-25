import React, { useCallback, useEffect, useState } from 'react';
import moira1 from './moira1.jpg';
import moira2 from './moira2.jpg';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState(null);
  const [index, setIndex] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');
  const pics = [moira1, moira2];

  setInterval(() => {
    console.log(index)
    setIndex((index > 0 ? 0 : 1));
  }, 2000);

  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setMessage(json.message);
        setIsFetching(false);
      }).catch(e => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={pics[index]} alt="moira" />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Algo Rhythm <br />
          10 <br />
          101 <br />
          1010 <br />
          0101 <br />
          101 <br />
          01 <br />
          </p>
        <p>{'« '}<strong>
          {isFetching
            ? 'Fetching message from API'
            : message}
        </strong>{' »'}</p>
        <p><a
          className="App-link"
          href="https://github.com/mars/heroku-cra-node"
        >
          React + Node deployment on Heroku
        </a></p>
        <p><a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a></p>
      </header>
    </div>
  );

}

export default App;
