import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import convertMoney from '../tests/helpers/convertMoney';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <section>
        <table>
          <thead>
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
          <tbody>
            {
              (expenses) ? (
                expenses.map((item) => (
                  <tr key={ item.id }>
                    <td>{item.description}</td>
                    <td>{item.tag}</td>
                    <td>{item.method}</td>
                    <td>
                      {
                        item.value === '' ? '0.00' : parseFloat(item.value).toFixed(2)
                      }
                    </td>
                    <td>{item.exchangeRates[item.currency].name}</td>
                    <td>
                      {
                        parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)
                      }
                    </td>
                    <td>
                      {convertMoney(
                        item.value,
                        item.exchangeRates[item.currency].ask,
                      ).toFixed(2)}
                    </td>
                    <td>Real</td>
                    <td>
                      <button type="button">att</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>null</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </section>
    );
  }
}

Table.propTypes = {
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
