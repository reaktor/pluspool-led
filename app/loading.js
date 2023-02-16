import React from 'react';
import ProgressBar from '../components/ProgressBar';
import Navbar from '../components/Navbar';
export default function Loading() {
  return (
    <div className='container'>
      <Navbar />
      <ProgressBar />
    </div>
  );
}

