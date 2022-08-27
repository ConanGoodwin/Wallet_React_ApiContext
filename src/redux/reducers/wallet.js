import { ADD_CURRENCIES, ADD_EXPENSE, ADD_FULL_CURRENCIES, IS_LOADING } from '../actions';

const INITIAL_STATE = {
  qtCurrencies: 0,
  currencies: [],
  fullCurrencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  loading: false,
};

function wallet(state = INITIAL_STATE, { type, payLoad }) {
  switch (type) {
  case IS_LOADING:
    return { ...state, loading: !state.loading };
  case ADD_CURRENCIES:
    return { ...state, currencies: [...payLoad] };
  case ADD_FULL_CURRENCIES:
    return { ...state, fullCurrencies: [...payLoad] };
  case ADD_EXPENSE:
    console.log(payLoad);
    return { ...state, expenses: [...state.expenses, payLoad] };
  default: return state;
  }
}

export default wallet;
