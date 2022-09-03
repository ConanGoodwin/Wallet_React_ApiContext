export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_FULL_CURRENCIES = 'ADD_FULL_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_QT_EXPENSE = 'ADD_QT_EXPENSE';
export const DEL_EXPENSE = 'DEL_EXPENSE';
export const NEW_EDIT_EXPENSE = 'NEW_EDIT_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const IS_LOADING = 'IS_LOADING';
export const UP_EXPENSE = 'UP_EXPENSE';
export const DOWN_EXPENSE = 'DOWN_EXPENSE';

export const newLogin = (payLoad) => ({
  type: ADD_LOGIN,
  payLoad,
});

export const removeExpense = (payLoad) => ({
  type: DEL_EXPENSE,
  payLoad,
});

export const newEditExpense = (payLoad) => ({
  type: NEW_EDIT_EXPENSE,
  payLoad,
});

export const upExpense = (payLoad) => ({
  type: UP_EXPENSE,
  payLoad,
});

export const downExpense = (payLoad) => ({
  type: DOWN_EXPENSE,
  payLoad,
});

async function connectApi() {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const fetchApi = await fetch(URL);
  const data = await fetchApi.json();

  return data;
}

export function errorConect({ message }) {
  console.log(message);
}

export const editExpense = (state) => async (dispatch) => {
  try {
    dispatch({ type: IS_LOADING });
    const data = await connectApi();

    await dispatch({
      type: EDIT_EXPENSE,
      payLoad: {
        ...state,
        exchangeRates: data,
      },
    });

    dispatch({ type: IS_LOADING });
  } catch (e) {
    errorConect(e);
  }
};

export function successfulApi(dispatch, data) {
  const keysFiltered = Object.keys(data).filter((key) => key !== 'USDT');
  let dataFilter = [];
  keysFiltered.forEach((key) => {
    dataFilter = [...dataFilter, { [key]: data[key] }];
  });

  dispatch({ type: ADD_CURRENCIES, payLoad: keysFiltered });
  dispatch({ type: ADD_FULL_CURRENCIES, payLoad: dataFilter });
}

export function newApi() {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING });
      const data = await connectApi();

      await successfulApi(dispatch, data);
      dispatch({ type: IS_LOADING });
    } catch (e) {
      errorConect(e);
    }
  };
}

export const newExpense = (state) => async (dispatch) => {
  try {
    dispatch({ type: IS_LOADING });
    const data = await connectApi();

    await dispatch({
      type: ADD_EXPENSE,
      payLoad: {
        ...state,
        exchangeRates: data,
      },
    });
    dispatch({ type: ADD_QT_EXPENSE });

    dispatch({ type: IS_LOADING });
  } catch (e) {
    errorConect(e);
  }
};
