import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import mockData from './mockData';
import renderWithRouterAndRedux from './renderWith';

describe('Testes na pagina Wallet:', () => {
  const INPUT_VALUE = 'value-input';
  const ADD_DESP = 'Adicionar despesa';
  const DESC_INPUT = 'description-input';

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
    const describe = screen.getByTestId(DESC_INPUT);
    const value = screen.getByTestId(INPUT_VALUE);

    expect(describe).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });

  test('Testa se o cabeçalho da tabela é gerado na tela', () => {
    expect(screen.getByText('Tag')).toBeInTheDocument();
    expect(screen.getByText('Câmbio utilizado')).toBeInTheDocument();
    expect(screen.getByText('Valor convertido')).toBeInTheDocument();
    expect(screen.getByText('Moeda de conversão')).toBeInTheDocument();
    expect(screen.getByText('Editar/Excluir')).toBeInTheDocument();
  });

  test('Testa se uma nova despesa é adicionada na tabela e seu valor somado no total', async () => {
    const value = screen.getByTestId(INPUT_VALUE);
    const btnAdd = screen.getByRole('button', { name: ADD_DESP });
    const total = screen.getByTestId('total-field');
    expect(total).toBeInTheDocument();

    userEvent.type(value, '1');
    userEvent.click(btnAdd);

    expect(await screen.findByText('vazia')).toBeInTheDocument();
    expect(await screen.findByText('Dólar Americano/Real Brasileiro')).toBeInTheDocument();
    expect(await screen.findByText('Real')).toBeInTheDocument();
    expect(await screen.getByTestId(INPUT_VALUE)).toHaveValue(null);
    expect(total.innerHTML).toBe('4.75');
    // expect(await screen.findByText('4.75')).toBeInTheDocument();
  });

  test('Testa se uma despesa é editada corretamente', async () => {
    const value = screen.getByTestId(INPUT_VALUE);
    const btnAdd = screen.getByRole('button', { name: ADD_DESP });

    userEvent.type(value, '1');
    userEvent.click(btnAdd);
    userEvent.click(btnAdd);

    const btnEdit = await screen.findAllByRole('button', { name: 'Edit' });

    expect(btnEdit[0]).toBeInTheDocument();
    // expect(btnEdit[1]).toBeInTheDocument();

    userEvent.click(btnEdit[0]);

    const btnConfirmEdit = await screen.findByRole('button', { name: 'Editar despesa' });
    const describe = screen.getByTestId(DESC_INPUT);

    expect(btnConfirmEdit).toBeInTheDocument();
    expect(await screen.getByTestId(INPUT_VALUE)).toHaveValue(1);
    expect(describe).toHaveValue('vazia');

    userEvent.clear(describe);
    userEvent.type(describe, 'passagem');
    userEvent.click(btnConfirmEdit);

    const editdescribe = await screen.findByText('passagem');

    expect(editdescribe).toBeInTheDocument();

    userEvent.click(btnEdit[0]);

    const btnConfirmEdit2 = await screen.findByRole('button', { name: 'Editar despesa' });
    const describe2 = screen.getByTestId(DESC_INPUT);

    userEvent.clear(describe2);
    userEvent.type(describe2, '');
    userEvent.click(btnConfirmEdit2);

    expect(await screen.findByText('vazia')).toBeInTheDocument();
  });

  test('Testa se uma despesa é deletada corretamente', async () => {
    const value = screen.getByTestId(INPUT_VALUE);
    const btnAdd = screen.getByRole('button', { name: ADD_DESP });

    userEvent.type(value, '1');
    userEvent.click(btnAdd);

    const value2 = await screen.findByTestId(INPUT_VALUE);
    const describe = screen.getByTestId(DESC_INPUT);
    const btnAdd2 = screen.getByRole('button', { name: ADD_DESP });

    userEvent.type(describe, 'passagem');
    userEvent.type(value2, '2');
    userEvent.click(btnAdd2);

    expect(await screen.findByText('9.51')).toBeInTheDocument();

    const btnDelete = await screen.findAllByRole('button', { name: 'Delete' });
    const describeTable = await screen.findByText('vazia');

    userEvent.click(btnDelete[0]);

    expect(describeTable).not.toBeInTheDocument();
  });

  test('Testa se inputs vazios adicionados preenche com valores default', async () => {
    const btnAdd = screen.getByRole('button', { name: ADD_DESP });

    userEvent.click(btnAdd);
    expect(await screen.findByText('vazia')).toBeInTheDocument();
  });
});
