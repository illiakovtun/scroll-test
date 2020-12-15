import React from 'react';
import {Link} from 'react-router-dom';

const styles = {
  backgroundColor: '#eee',
  padding: 5,
  position: 'fixed',
  left: 20,
  top: 20,
  display: 'flex',
  width: 200,
  justifyContent: 'space-around',
  zIndex: 100
};

const Routes = () => {
  return (
    <div style={styles}>
      <Link to={'/home'}>Home</Link>
      <Link to={'/comments'}>Comments</Link>
    </div>
  );
};

export default Routes;