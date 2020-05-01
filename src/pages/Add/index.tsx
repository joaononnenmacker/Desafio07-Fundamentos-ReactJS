import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import api from '../../services/api';

import { Title, Form } from './styles';

const Add: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newValue, setNewValue] = useState<number>();
  const [newType, setNewType] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const history = useHistory();

  async function handleAddTransaction(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const transaction = {
      title: newTitle,
      value: newValue,
      type: newType,
      category: newCategory,
    };
    console.log(transaction);
    await api.post('/transactions', transaction);

    history.push('/');
  }

  return (
    <>
      <Header size="small" />
      <Title>Adicionar transação</Title>
      <Form onSubmit={handleAddTransaction}>
        <div className="title">
          <label>Título</label>
          <input
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            type="text"
            // placeholder="Digite o título da sua transação"
          />
        </div>
        <div className="value">
          <label>Valor</label>
          <input
            value={newValue}
            onChange={e => setNewValue(e.target.valueAsNumber)}
            type="number"
            // placeholder="Digite o valor da sua transação"
          />
        </div>
        <div className="type">
          <label>Tipo</label>
          <select onChange={e => setNewType(e.target.value)}>
            <option value="income">Income</option>
            <option value="outcome">Outcome</option>
          </select>
        </div>
        <div className="category">
          <label>Categoria</label>
          <input
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            type="text"
            // placeholder="Digite a categoria da sua transação"
          />
        </div>
        <button type="submit">Adicionar</button>
      </Form>
    </>
  );
};

export default Add;
