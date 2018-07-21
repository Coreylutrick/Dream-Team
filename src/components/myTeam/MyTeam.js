import React from 'react';

import './MyTeam.css';

class MyTeam extends React.Component
{
  state = {
    pokemon: [],
  }
  render ()
  {
    return (
      <div>
        <h2>My Team</h2>
      </div>
    );
  }
}

export default MyTeam;
