import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouterAndRedux from './renderWith';

describe('Testes na pagina de Login:', () => {
  test('Testa se os inputs são renderizados.', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('senha')).toBeInTheDocument();
  });

  test('Testa validação de email e senha', () => {
    const allReturnObject = renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText('email');
    const senha = screen.getByPlaceholderText('senha');
    const btnSubmit = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(email, 'teste');
    expect(btnSubmit).toHaveAttribute('disabled');
    userEvent.type(email, 'conan@teste.com');
    expect(btnSubmit).toHaveAttribute('disabled');
    userEvent.type(senha, '12345');
    expect(btnSubmit).toHaveAttribute('disabled');
    userEvent.type(senha, '123456');
    expect(btnSubmit).not.toHaveAttribute('disabled');

    userEvent.click(btnSubmit);
    expect(allReturnObject.history.location.pathname).toBe('/carteira');
  });
});
