import Sidebar from './Sidebar';
import Tutors from './Tutors';
import University from './University/University';
import data from '../utils/data.json';
import { useRef, useEffect } from 'react';
// import News from './News';

import React from 'react'

export default function App() {
  useEffect(() => {
    localStorage.setItem('tutors', JSON.stringify(data?.tutors));
  }, [])

  const isTrueRef = useRef(true);
  console.log(isTrueRef);

  const inputRef = useRef(null);
  console.dir(inputRef);

  function changeIsTrueRef() {
    if (!isTrueRef?.current) {
      return false;
    }

    isTrueRef.current = false;
  }

  return (
      <div className="wrapper">
        <Sidebar />
        <main className="main">
          {/* <News /> */}
          <input id="inputForRef" ref={inputRef} />
          <button onClick={() => changeIsTrueRef()}> Toggle Value </button>
          <h1 className="page-title">University Information</h1>
          <University />
          <Tutors />
        </main>
      </div>
  )
}
