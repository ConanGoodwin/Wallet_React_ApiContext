import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((prev, curr, index) => {
      const taxa = curr.exchangeRates[expenses[index].currency].ask;
      return prev + (parseFloat(curr.value) * taxa);
    }, 0);
    const resultado = total.toFixed(2);
    // resultado = resultado.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    return (
      <header style={ { display: 'flex' } }>
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
