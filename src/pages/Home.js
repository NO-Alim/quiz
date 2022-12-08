import React from 'react';
import done from '.././assets/images/done.png';
import Navbar from '../component/global/Navbar';

const Home = () => {
  const fakeArr = [1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      <Navbar />

      <div className="section bg-background text-textPrimary min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          <div className="bg-brand/10 p-2 rounded-md cursor-pointer">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-[#1e871c] rounded-full flex items-center justify-center">
                  <img src={done} alt="done" className="w-4" />
                </div>
                <h1>Day 8</h1>
              </div>
              <h1>Score: 10</h1>
            </div>
          </div>
          {fakeArr.map((item) => {
            return (
              <div
                key={item}
                className="bg-brand/10 p-2 rounded-md text-center cursor-pointer"
              >
                Day {item}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
