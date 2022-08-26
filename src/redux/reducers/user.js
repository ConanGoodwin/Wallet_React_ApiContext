import { ADD_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

function user(state = INITIAL_STATE, { type, payLoad }) {
  switch (type) {
  case ADD_LOGIN:
    return { ...state, email: payLoad };
  default: return state;
  }
}

export default user;
