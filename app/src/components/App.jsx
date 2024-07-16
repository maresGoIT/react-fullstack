import Sidebar from './Sidebar';
import Tutors from './Tutors';
import University from './University/University';
import data from '../utils/data.json';
import { Component, useEffect } from 'react';
// import News from './News';

import React from 'react'

export default function App() {
  useEffect(() => {
    localStorage.setItem('tutors', JSON.stringify(data?.tutors));
  }, [])
  
  return (
      <div className="wrapper">
        <Sidebar />
        <main className="main">
          {/* <News /> */}
          <h1 className="page-title">University Information</h1>
          <University />
          <Tutors />
        </main>
      </div>
  )
}
