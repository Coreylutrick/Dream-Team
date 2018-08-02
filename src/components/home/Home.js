import React from 'react';

import './Home.css';

class Home extends React.Component
{
  render ()
  {
    return (
      <div>
        <h2 className="text-center">Home</h2>
        <div className="row">
          <div className="text-center">
            <img alt="professor oak" src="https://vignette.wikia.nocookie.net/p__/images/8/84/Professor_Oak_XY.png/revision/latest?cb=20131206152342&path-prefix=protagonist"/>
          </div>
          <div className="row text-center">
            <div className="text-center box col-xs-4 col-xs-offset-4">
              <p>Welcome to the world of Pokemon!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
