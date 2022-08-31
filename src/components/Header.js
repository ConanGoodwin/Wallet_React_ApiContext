import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import convertMoney from '../tests/helpers/convertMoney';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce(
      (prev, curr, index) => prev + convertMoney(
        curr.value,
        curr.exchangeRates[expenses[index].currency].ask,
      ),
      0,
    );
    const resultado = total.toFixed(2);
    // resultado = resultado.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    return (
      <header style={ { display: 'flex', backgroundColor: '#598C58', color: 'white' } }>
        <div data-testid="email-field">{email}</div>
        <div data-testid="total-field">
          {
            resultado
          }
        </div>
        {' '}
        <div data-testid="header-currency-field">BRL</div>
      </header>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
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

export default connect(mapStateToProps)(Header);
