import './App.css';
import { useReducer } from 'react';
import NumberButton from './components/NumberButton';
import OperatorButton from './components/OperatorButton';

const initialState = {
  currentNum: null,
  previousNum: null,
  operator: null,
  override: false,
};

export const ACTIONS = {
  JOINNUM: 'join-numbers',
  CLEAR: 'clear',
  CHOOSE_OPERATOR: 'choose-operator',
  EQUALITY: 'equality',
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.JOINNUM:
      if (state.currentNum === '0' && payload === '0') return state;
      if (state.currentNum === null && payload.includes('.')) return state;

      if (
        state.currentNum !== null &&
        state.currentNum.includes('.') &&
        payload === '.'
      )
        return state;

      if (state.override === true) {
        return {
          ...state,
          currentNum: payload,
        };
      }

      return {
        ...state,
        currentNum: `${state.currentNum || ''}${payload}`,
      };
    case ACTIONS.CLEAR:
      return {
        currentNum: null,
        previousNum: null,
        operator: null,
      };

    case ACTIONS.CHOOSE_OPERATOR:
      if (state.currentNum === null && state.previousNum === null) return state;
      if (state.currentNum !== null && state.previousNum === null) {
        return {
          ...state,
          previousNum: state.currentNum,
          operator: payload,
          currentNum: null,
        };
      }

      return {
        ...state,
        previousNum: evaluate(state),
        operator: payload,
        currentNum: null,
      };

    case ACTIONS.EQUALITY:
      if (state.currentNum !== null && state.previousNum === null) return state;

      return {
        ...state,
        currentNum: evaluate(state),
        previousNum: null,
        operator: null,

        override: true,
      };
  }
};

const evaluate = ({ currentNum, operator, previousNum }) => {
  const current = Number(currentNum);
  const prev = Number(previousNum);
  let result = '';
  if (operator === '+') {
    result = prev + current;
  }
  if (operator === '-') {
    result = prev - current;
  }
  if (operator === '*') {
    result = prev * current;
  }
  if (operator === '/') {
    result = prev / current;
  }
  return result.toString();
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentNum, operator, previousNum } = state;

  return (
    <div className="App">
      <div className="output">
        {previousNum}
        {operator}
        {currentNum}
      </div>
      <div className="button">
        <NumberButton dispatch={dispatch} num="0" />
        <NumberButton dispatch={dispatch} num="1" />
        <NumberButton dispatch={dispatch} num="2" />
        <NumberButton dispatch={dispatch} num="3" />
        <NumberButton dispatch={dispatch} num="4" />
        <NumberButton dispatch={dispatch} num="5" />
        <NumberButton dispatch={dispatch} num="6" />
        <NumberButton dispatch={dispatch} num="7" />
        <NumberButton dispatch={dispatch} num="8" />
        <NumberButton dispatch={dispatch} num="9" />
        <NumberButton dispatch={dispatch} num="." />
      </div>
      <div>
        <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
        <button onClick={() => dispatch({ type: ACTIONS.EQUALITY })}>=</button>
      </div>
      <div className="operator">
        <OperatorButton dispatch={dispatch} operator="+" />
        <OperatorButton dispatch={dispatch} operator="-" />
        <OperatorButton dispatch={dispatch} operator="*" />
        <OperatorButton dispatch={dispatch} operator="/" />
      </div>
    </div>
  );
}

export default App;
