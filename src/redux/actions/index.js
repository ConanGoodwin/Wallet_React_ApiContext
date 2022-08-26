export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

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
  // console.log(data);
  // console.log(dataFilter);

  dispatch({ type: ADD_CURRENCIES, payLoad: keysFiltered });
}

export function connectApi() {
  return async (dispatch) => {
    try {
      const URL = 'https://economia.awesomeapi.com.br/json/all';
      const fetchApi = await fetch(URL);
      const data = await fetchApi.json();

      successfulApi(dispatch, data);
    } catch (e) {
      errorConect(e);
    }
  };
}
