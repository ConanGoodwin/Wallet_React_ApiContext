import {
  ADD_CURRENCIES, ADD_EXPENSE, ADD_FULL_CURRENCIES,
  ADD_QT_EXPENSE, DEL_EXPENSE, EDIT_EXPENSE, IS_LOADING, NEW_EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  qtCurrencies: -1,
  currencies: [],
  fullCurrencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  loading: false,
};

function wallet(state = INITIAL_STATE, { type, payLoad }) {
  const { loading, expenses, qtCurrencies } = state;

  switch (type) {
  case IS_LOADING:
    return { ...state, loading: !loading };
  case ADD_CURRENCIES:
    return { ...state, currencies: [...payLoad] };
  case ADD_FULL_CURRENCIES:
    return { ...state, fullCurrencies: [...payLoad] };
  case ADD_EXPENSE:
    return { ...state, expenses: [...expenses, payLoad] };
  case ADD_QT_EXPENSE:
    return { ...state, qtCurrencies: qtCurrencies + 1 };
  case DEL_EXPENSE:
    return {
      ...state, expenses: expenses.filter(({ id }) => id !== payLoad), editor: false,
    };
  case NEW_EDIT_EXPENSE:
    return { ...state, idToEdit: payLoad, editor: true };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: [...expenses.map((item) => (item.id !== payLoad.id ? item : payLoad))],
    };
  default: return state;
  }
}

export default wallet;
