import React, { useEffect } from 'react';
import Search from '../components/Search/Search';
import Landing from '../components/Landing/Landing';
import Header from '../components/Header/Header';

const Home = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
  // Find the elements in the DOM
  const container = document.getElementById('clapperboard-container');
  const stick = document.querySelector('.clap-stick');

  if (container && stick) {
    // --- Step 1: Start the slide-in animation ---
    container.classList.add('slide-in');

    // --- Step 2: Listen for when the slide-in animation finishes ---
    const handleSlideInEnd = () => {
      // Once the slide-in is done, trigger the clap animation
      stick.classList.add('clap');

      // --- Step 3 (NEW): Listen for when the CLAP animation finishes ---
      const handleClapEnd = () => {
        // When the clap is done, add the 'hide' class to the container to make it vanish
        container.classList.add('hide');
      };
      
      // We attach this new listener to the 'stick' element
      stick.addEventListener('animationend', handleClapEnd, { once: true });
    };

    // We attach the first listener to the 'container' element
    container.addEventListener('animationend', handleSlideInEnd, { once: true });
  }

}, []); // The empty array ensures this runs only once
 
  
  return (
    <>
    {/* The main container that will slide in */}
      <div id="clapperboard-container">
       {/* The clapperboard itself */}
        <div className="clapperboard">
          {/* The top part that rotates */}
          <div className="clap-stick"></div>
          {/* The main board at the bottom */}
          <div className="board">
            <div className="line">SCENE: 1</div>
            <div className="line">TAKE: 4</div>
            <div className="line">DIRECTOR: YOU</div>
            <div className="line">DATE: {currentDate} </div>
            <div className="line__primary"><u><b>The Movie Library</b></u></div>
          </div>
        </div>
      </div>
      <Header />
      {/* 
        Render the Search component with NO props. 
        It will know what to do on its own. 
      */}
      <Search />
      <Landing />
    </>
  );
};

export default Home;