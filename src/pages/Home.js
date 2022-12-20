import React from 'react';
import Navbar from '../component/global/Navbar';
import Modules from '../component/Home/Modules';
import ProgressRounded from '../component/Home/ProgressRounded';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="section bg-background text-textPrimary min-h-screen">
        <div className="">
          <Modules />
        </div>
      </div>
    </>
  );
};

export default Home;
