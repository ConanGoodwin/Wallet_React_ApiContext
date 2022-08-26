import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectApi } from '../redux/actions';

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;

    await dispatch(connectApi());
  }

  render() {
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="descSpend">
          Descrição:
          <input
            id="descSpend"
            type="text"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="valueSpend">
          Valor:
          <input
            id="valueSpend"
            type="number"
            data-testid="value-input"
            // value={ 0 }
          />
        </label>
        <label htmlFor="currenciesSpend">
          Moeda:
          <select id="currenciesSpend" data-testid="currency-input">
            {currencies.map((item) => (
              <option
                value={ item }
                key={ item }
              >
                {item}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="payTypeSpend">
          Metodo de pagamento:
          <select id="payTypeSpend" data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categorySpend">
          Metodo de pagamento:
          <select id="categorySpend" data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

export default connect(mapStateToProps)(WalletForm);
