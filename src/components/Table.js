/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import convertMoney from '../tests/helpers/convertMoney';
import { downExpense, newEditExpense, removeExpense, upExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;

    return (
      <section className="tableMain">
        <table className="table is-striped">
          <thead
            className="tableHeader"
            style={ { backgroundColor: '#63734A' } }
          >
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody style={ { backgroundColor: '#BFCC98' } }>
            {
              expenses.map((item) => (
                <tr key={ item.id }>
                  <td>{item.description}</td>
                  <td style={ { fontSize: 'larger' } }>{item.tag}</td>
                  <td style={ { fontSize: 'larger' } }>{item.method}</td>
                  <td>
                    <span className="coin">
                      {
                        item.value === '' ? '0.00' : parseFloat(item.value).toFixed(2)
                      }
                    </span>
                  </td>
                  <td>{item.exchangeRates[item.currency].name}</td>
                  <td>
                    <span className="coin">
                      {
                        parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)
                      }
                    </span>
                  </td>
                  <td>
                    <span className="coin">
                      {convertMoney(
                        item.value,
                        item.exchangeRates[item.currency].ask,
                      ).toFixed(2)}
                    </span>
                  </td>
                  <td style={ { fontSize: 'larger' } }>Real</td>
                  <td className="tdBtns">
                    <div className="field is-grouped">
                      <p className="control">
                        <button
                          type="button"
                          name={ item.id }
                          className="button btnShadow
                           is-info is-small is-rounded is-responsive is-outlined "
                          data-testid="edit-btn"
                          onClick={ () => dispatch(newEditExpense(item.id)) }
                        >
                          <span className="icon">
                            <i className="fa-regular fa-pen-to-square" />
                          </span>
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          name={ item.id }
                          className="button btnShadow
                           is-danger is-small is-rounded is-responsive is-outlined "
                          data-testid="delete-btn"
                          onClick={ () => dispatch(removeExpense(item.id)) }
                        >
                          <span className="icon">
                            <i className="fa-solid fa-trash" />
                          </span>
                          <span>Delete</span>
                        </button>
                      </p>
                      <p className="buttons">
                        <button
                          type="button"
                          name={ item.id }
                          className="button btnShadow
                          is-dark is-small is-responsive btnUp"
                          onClick={ () => dispatch(upExpense(item.id)) }
                        >
                          <span className="icon">
                            <i className="fa-solid fa-caret-up" />
                          </span>
                        </button>
                        <button
                          type="button"
                          name={ item.id }
                          className="button btnShadow
                          is-dark is-small is-responsive btnDw"
                          onClick={ () => dispatch(downExpense(item.id)) }
                        >
                          <span className="icon">
                            <i className="fa-solid fa-caret-down" />
                          </span>
                        </button>
                      </p>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    );
  }
}

Table.propTypes = {
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

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(Table);
