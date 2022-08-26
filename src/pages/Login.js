import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newLogin } from '../redux/actions';

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
      <form onSubmit={ this.formSubmit }>
        <input
          type="email"
          name="email"
          value={ email }
          placeholder="email"
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          value={ password }
          placeholder="senha"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ btnIsDisabled }
        >
          Entrar
        </button>
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
