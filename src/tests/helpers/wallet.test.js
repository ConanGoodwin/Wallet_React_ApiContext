import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import mockData from './mockData';
import renderWithRouterAndRedux from './renderWith';

describe('Testes na pagina Wallet:', () => {
  const INPUT_VALUE = 'value-input';

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText('email');
    const senha = screen.getByPlaceholderText('senha');
    const btnSubmit = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(email, 'conan@teste.com');
    userEvent.type(senha, '123456');
    userEvent.click(btnSubmit);
  });

  test('Testa se os elementos de formulário são gerados na tela', async () => {
    const describe = screen.getByTestId('description-input');
    const value = screen.getByTestId(INPUT_VALUE);

    expect(describe).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });

  test('Testa se o cabeçalho da tabela é gerado na tela', () => {
    expect(screen.getByText('Tag')).toBeInTheDocument();
    expect(screen.getByText('Câmbio utilizado')).toBeInTheDocument();
    expect(screen.getByText('Moeda de conversão')).toBeInTheDocument();
  });

  test('Testa se uma nova despesa é adicionada na tabela e seu valor somado no total', async () => {
    const value = screen.getByTestId(INPUT_VALUE);
    const btnAdd = screen.getByRole('button', { name: 'Adicionar despesa' });
    const total = screen.getByTestId('total-field');
    expect(total).toBeInTheDocument();

    userEvent.type(value, '1');
    userEvent.click(btnAdd);

    expect(await screen.findByText('vazia')).toBeInTheDocument();
    expect(await screen.getByTestId(INPUT_VALUE)).toHaveValue(null);
    expect(total.innerHTML).toBe('4.75');
    // expect(await screen.findByText('4.75')).toBeInTheDocument();
  });

  test('Testa se uma despesa é editada e deletada corretamente', async () => {
    const value = screen.getByTestId(INPUT_VALUE);
    const btnAdd = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(value, '1');
    userEvent.click(btnAdd);

    const btnEdit = await screen.findByRole('button', { name: 'Edit' });

    expect(btnEdit).toBeInTheDocument();

    userEvent.click(btnEdit);

    const btnConfirmEdit = await screen.findByRole('button', { name: 'Editar despesa' });
    const describe = screen.getByTestId('description-input');

    expect(btnConfirmEdit).toBeInTheDocument();
    expect(await screen.getByTestId(INPUT_VALUE)).toHaveValue(1);
    expect(describe).toHaveValue('vazia');

    userEvent.clear(describe);
    userEvent.type(describe, 'passagem');
    userEvent.click(btnConfirmEdit);

    const btnDelete = await screen.findByRole('button', { name: 'Delete' });
    const editdescribe = await screen.findByText('passagem');

    expect(btnDelete).toBeInTheDocument();
    expect(editdescribe).toBeInTheDocument();

    userEvent.click(btnDelete);
    expect(editdescribe).not.toBeInTheDocument();
  });
});
