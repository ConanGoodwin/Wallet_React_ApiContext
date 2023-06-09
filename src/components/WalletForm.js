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
    this.editInputsExpense = this.renderWithExpanseId.bind();

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
      method: 'Dinheiro',
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
    const { description: desc } = this.state;

    if (editor) {
      const filterExpense = expenses.filter(({ id }) => id === idToEdit);
      const { value, description, currency, method, tag } = filterExpense[0];

      if (this.EDIT) {
        this.EDIT = false;
        if (desc !== description) {
          this.setState({
            value,
            description,
            currency,
            method,
            tag,
          }, () => {
            this.EDIT = false;
          });
        }
      }
    }
  };

  render() {
    const { currencies, loading, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    if (!editor) this.EDIT = true;

    return (
      <div className="main">
        {(editor) && (
          <p>
            <span
              className="button is-white is-loading"
            />
            {' '}
            Editando...
          </p>
        )}
        {(editor && this.EDIT) && this.editInputsExpense()}
        { (loading) ? (<p>Loading...</p>) : (
          <form onSubmit={ this.formSubmit } className="mainForm">
            <label htmlFor="descSpend" className="label">
              Descrição:
              <p className="control">
                <input
                  id="descSpend"
                  type="text"
                  name="description"
                  value={ description }
                  className="input is-primary is-small"
                  onChange={ this.handleChange }
                  data-testid="description-input"
                />
              </p>
            </label>
            <label htmlFor="valueSpend" className="label">
              Valor:
              <p className="control">
                <input
                  id="valueSpend"
                  type="number"
                  name="value"
                  value={ value }
                  className="input is-primary is-small"
                  onChange={ this.handleChange }
                  data-testid="value-input"
                />
              </p>
            </label>
            <label htmlFor="currenciesSpend" className="label">
              Moeda:
              <div className="select is-link is-small">
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
              </div>
            </label>
            <label htmlFor="payTypeSpend" className="label">
              Metodo de pagamento:
              <div className="select is-link is-small">
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
              </div>
            </label>
            <label htmlFor="categorySpend" className="label">
              Categoria:
              <div className="select is-link is-small">
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
              </div>
            </label>
            <p className="buttons">
              <button
                type="submit"
                className="button btnShadow is-link is-small is-responsive is-outlined"
              >
                <span className="icon">
                  <i className="fa-solid fa-circle-dollar-to-slot" />
                </span>
                <span>
                  { editor ? 'Editar despesa' : 'Adicionar despesa'}
                </span>
              </button>
            </p>
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
