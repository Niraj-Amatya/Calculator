import React from 'react';
import { ACTIONS } from '../App';

const OperatorButton = ({ dispatch, operator }) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: operator })
      }
    >
      {operator}
    </button>
  );
};

export default OperatorButton;
