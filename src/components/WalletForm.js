import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectApi, newExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'Alimentação',
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;

    await dispatch(connectApi());
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formSubmit = (action) => {
    const { dispatch, fullCurrencies, qtCurrencies } = this.props;
    let dataCurrencies = {};
    fullCurrencies.forEach((item) => {
      // console.log(Object.keys(item)[0]);
      // console.log(Object.values(item)[0]);
      dataCurrencies = {
        ...dataCurrencies,
        [Object.keys(item)[0]]: Object.values(item)[0],
      };
    });

    action.preventDefault();
    dispatch(newExpense({
      id: qtCurrencies + 1,
      ...this.state,
      exchangeRates: dataCurrencies,
    }));
  };

  render() {
    const { currencies, loading } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <div>
        { (loading) ? (<p>Loading...</p>) : (
          <form onSubmit={ this.formSubmit }>
            <label htmlFor="descSpend">
              Descrição:
              <input
                id="descSpend"
                type="text"
                name="description"
                value={ description }
                onChange={ this.handleChange }
                data-testid="description-input"
              />
            </label>
            <label htmlFor="valueSpend">
              Valor:
              <input
                id="valueSpend"
                type="number"
                name="value"
                value={ value }
                onChange={ this.handleChange }
                data-testid="value-input"
                // value={ 0 }
              />
            </label>
            <label htmlFor="currenciesSpend">
              Moeda:
              <select
                id="currenciesSpend"
                name="currency"
                value={ currency }
                onChange={ this.handleChange }
                data-testid="currency-input"
              >
                {currencies.map((item, index) => (
                  <option
                    value={ item }
                    key={ index }
                  >
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="payTypeSpend">
              Metodo de pagamento:
              <select
                id="payTypeSpend"
                name="method"
                value={ method }
                onChange={ this.handleChange }
                data-testid="method-input"
              >
                <option value="dinheiro">Dinheiro</option>
                <option value="credito">Cartão de crédito</option>
                <option value="debito">Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="categorySpend">
              Metodo de pagamento:
              <select
                id="categorySpend"
                name="tag"
                value={ tag }
                onChange={ this.handleChange }
                data-testid="tag-input"
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>
            <button type="submit">Adicionar despesa</button>
          </form>
        ) }
      </div>
    );
  }
}

WalletForm.propTypes = {
  qtCurrencies: PropTypes.number.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fullCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  wallet: { qtCurrencies, currencies, fullCurrencies, loading },
}) => ({
  fullCurrencies,
  qtCurrencies,
  currencies,
  loading,
});

export default connect(mapStateToProps)(WalletForm);
