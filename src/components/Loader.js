import React from 'react';

const style = {
  position: 'fixed',
  left: '50%',
  top: '50%',
  width: 100,
  height: 100,
  padding: 10,
  zIndex: 100,
  backgroundColor: '#eee',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const Loader = ({loading}) => {
  return (
    loading &&
    <div style={style}>
      Loading
    </div>
  );
};

export default Loader;