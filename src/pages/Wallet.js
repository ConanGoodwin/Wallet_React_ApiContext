import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;

    return (
      <main>
        <Header />
        <div data-testid="email-field">{email}</div>
        <div data-testid="total-field">0</div>
        <div data-testid="header-currency-field">BRL</div>
      </main>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({
  email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
