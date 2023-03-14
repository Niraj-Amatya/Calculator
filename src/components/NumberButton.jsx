import React from 'react';
import { ACTIONS } from '../App';

const NumberButton = ({ dispatch, num }) => {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.JOINNUM, payload: num })}>
      {num}
    </button>
  );
};

export default NumberButton;
