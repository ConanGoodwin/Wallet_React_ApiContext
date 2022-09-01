import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import convertMoney from '../tests/helpers/convertMoney';
import wallet from '../images/wallet_48.png';

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
    let resultado = total.toFixed(2);
    resultado = resultado.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    return (
      <header className="cabeca">
        <h1 className="walletTitle fontTitle">
          TrybeWallet
          {' '}
          <img src={ wallet } alt="wallet" />
        </h1>
        <section className="principalInfo">
          <div data-testid="email-field">
            <i className="fa-solid fa-user">_</i>
            {email}
          </div>
          <div data-testid="total-field" className="total">
            <i className="fa-solid fa-sack-dollar">_</i>
            {
              resultado
            }
            {' '}
            <span data-testid="header-currency-field"> BRL</span>
          </div>
        </section>
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
