import { useState } from 'react';
import api from '../utils/api'

const EXPENSE = 'EXPENSE';
const INCOME = 'INCOME';
const TRANSFER = 'TRANSFER';

const NewTransactionModal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    amount: 0,
    account: 3,
    category: 2,
    type: EXPENSE,
    toAccount: 3,
  });

  const onChange = (event) => {
    const { id, value } = event.target;
    setFormValues({ ...formValues, [id]: value, });
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if (!isSubmitting) {
      setIsSubmitting(true);
      const response = api.createTransaction(formValues);

      if (!response.error) {

      }

      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="type">Type: </label>
      <select id="type" value={formValues.type} onChange={onChange}>
        <option value={EXPENSE}>Expense</option>
        <option value={INCOME}>Income</option>
        <option value={TRANSFER}>Transfer</option>
      </select>

      <label htmlFor="name">Name: </label>
      <input type="text" name="name" id="name" value={formValues.name} onChange={onChange} />

      <label htmlFor="description">Description: </label>
      <input type="text" name="description" id="description" value={formValues.description} onChange={onChange} />

      <label htmlFor="amount">Amount: </label>
      <input type="text" name="amount" id="amount" value={formValues.amount} onChange={onChange} />

      <label htmlFor="account">Account: </label>
      <select id="account" value={formValues.account} onChange={onChange}>
        <option value="3">Cash</option>
      </select>

      <label htmlFor="toAccount">To toAccount: </label>
      <select id="toAccount" value={formValues.toAccount} onChange={onChange}>
        <option value="3">Cash</option>
      </select>

      <label htmlFor="category">Category: </label>
      <select id="category" value={formValues.category} onChange={onChange}>
        <option value="2">Shopping</option>
      </select>

      <input type="submit" value="Submit" />
    </form>
  )
};

export default NewTransactionModal;
