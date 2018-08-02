import React from 'react';

import './Home.css';

class Home extends React.Component
{
  render ()
  {
    return (
      <div>
        <div className="text-center row">
          <img className="col-xs-8 col-xs-offset-2" alt="Pokemon logo" src="http://pluspng.com/img-png/pokemon-logo-png-pokemon-logo-png-2000.png"/>
        </div>
        <h2 className="header text-center">Dream Team</h2>
        <div className="row">
          <div className="text-center">
            <div className="box homeText col-xs-5 col-xs-offset-1">
              <p>Welcome to the world of Pokemon! Using this site you can learn all sorts of things about your favorite Pokemon. Register and you can start exploring!</p>
            </div>
            <img className="col-xs-4 homeStuff" alt="professor oak" src="https://vignette.wikia.nocookie.net/p__/images/8/84/Professor_Oak_XY.png/revision/latest?cb=20131206152342&path-prefix=protagonist"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
