import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newApi, newExpense, editExpense } from '../redux/actions';

class WalletForm extends Component {
  EDIT = true;

  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;

    await dispatch(newApi());
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  clearInputs = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'Alimentação',
    });
  };

  formSubmit = async (action) => {
    const { dispatch, qtCurrencies, editor, idToEdit } = this.props;

    action.preventDefault();
    if (!editor) {
      await dispatch(newExpense({
        id: qtCurrencies + 1,
        ...this.state,
      }));
    } else {
      await dispatch(editExpense({
        id: idToEdit,
        ...this.state,
      }));
    }
    this.clearInputs();
  };

  renderWithExpanseId = () => {
    const { editor, expenses, idToEdit } = this.props;

    if (editor) {
      const filterExpense = expenses.filter(({ id }) => id === idToEdit);
      const { value, description, currency, method, tag } = filterExpense[0];

      if (this.EDIT) {
        this.EDIT = false;
        this.setState({
          value,
          description,
          currency,
          method,
          tag,
        });
      }
    }
  };

  render() {
    const { currencies, loading, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <div>
        {(editor) && (<p>Editando...</p>)}
        {(editor) && this.renderWithExpanseId()}
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
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
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
            <button type="submit">
              { editor ? 'Editar despesa' : 'Adicionar despesa'}
            </button>
          </form>
        ) }
      </div>
    );
  }
}

WalletForm.propTypes = {
  qtCurrencies: PropTypes.number.isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    exchangeRates: PropTypes.objectOf(PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      ask: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};

const mapStateToProps = ({ wallet: {
  qtCurrencies, currencies, fullCurrencies, loading, idToEdit, expenses, editor },
}) => ({
  fullCurrencies,
  qtCurrencies,
  currencies,
  loading,
  idToEdit,
  expenses,
  editor,
});

export default connect(mapStateToProps)(WalletForm);
