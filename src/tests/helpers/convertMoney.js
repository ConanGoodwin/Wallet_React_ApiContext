const convertMoney = (tax, value) => {
  if (value === '') value = '0';

  return parseFloat(value) * tax;
};

export default convertMoney;
