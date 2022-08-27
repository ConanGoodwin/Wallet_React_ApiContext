export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_FULL_CURRENCIES = 'ADD_FULL_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_QT_EXPENSE = 'ADD_QT_EXPENSE';
export const IS_LOADING = 'IS_LOADING';

export const newLogin = (payLoad) => ({
  type: ADD_LOGIN,
  payLoad,
});

export function errorConect({ message }) {
  console.log(message);
}

export function successfulApi(dispatch, data) {
  const keysFiltered = Object.keys(data).filter((key) => key !== 'USDT');
  let dataFilter = [];
  keysFiltered.forEach((key) => {
    dataFilter = [...dataFilter, { [key]: data[key] }];
  });

  dispatch({ type: ADD_CURRENCIES, payLoad: keysFiltered });
  dispatch({ type: ADD_FULL_CURRENCIES, payLoad: dataFilter });
}

export function connectApi() {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING });
      const URL = 'https://economia.awesomeapi.com.br/json/all';
      const fetchApi = await fetch(URL);
      const data = await fetchApi.json();

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
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const fetchApi = await fetch(URL);
    const data = await fetchApi.json();

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
