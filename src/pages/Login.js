import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newLogin } from '../redux/actions';
import wallet from '../images/wallet_76.png';
import '../css/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      btnIsDisabled: true,
    };
  }

  enabledButton = () => {
    const { email, password } = this.state;
    const emailRegex = /^[^@^ ]+@[^@^ ]+\.[a-z]{2,3}(\.[a-z]{2})?$/;
    const passwordRegex = /^[A-Za-z0-9]{6}/;

    this.setState({
      btnIsDisabled: !emailRegex.test(email) || !passwordRegex.test(password),
    });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      this.enabledButton();
    });
  };

  formSubmit = (action) => {
    const { dispatch, history } = this.props;
    const { email } = this.state;

    action.preventDefault();
    dispatch(newLogin(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, btnIsDisabled } = this.state;

    return (
      <form
        onSubmit={ this.formSubmit }
        style={ { backgroundColor: '#598C58', color: 'greenyellow' } }
        className="formTitle"
      >
        <h1 className="myTitle fontTitle">
          TrybeWallet
          {' '}
          <img src={ wallet } alt="wallet" />
        </h1>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              type="email"
              name="email"
              value={ email }
              placeholder="email"
              className="input is-primary is-small is-rounded"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              type="password"
              name="password"
              value={ password }
              placeholder="senha"
              className="input is-primary is-small is-rounded"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>
          </p>
        </div>
        <p className="buttons">
          <button
            type="submit"
            disabled={ btnIsDisabled }
            className="button is-dark is-responsive is-outlined "
          >
            <span className="icon">
              <i className="fa-solid fa-wallet" />
            </span>
            <span>
              Entrar
            </span>
          </button>
        </p>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
