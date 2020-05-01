import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const [_transactions, setTransactions] = useState<Transaction[]>([]);
  const [_balance, setBalance] = useState<Balance>({} as Balance);
  const history = useHistory();

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/transactions');
      const { transactions, balance } = response.data;
      setTransactions(transactions);
      setBalance(balance);
    }

    loadTransactions();
  }, [_transactions]);

  async function handleDelete(id: string): Promise<void> {
    await api.delete(`/transactions/${id}`);

    history.push('/');
  }

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{formatValue(_balance.income)}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {formatValue(_balance.outcome)}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{formatValue(_balance.total)}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Valor</th>
                <th>Tipo</th>
                <th>Categoria</th>
              </tr>
            </thead>

            <tbody>
              {_transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  {transaction.type === 'income' ? (
                    <td className="income">{formatValue(transaction.value)}</td>
                  ) : (
                    <td className="outcome">
                      {' - '}
                      {formatValue(transaction.value)}
                    </td>
                  )}
                  <td>{transaction.type}</td>
                  <td>{transaction.category.title}</td>
                  <td className="button">
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      type="button"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
