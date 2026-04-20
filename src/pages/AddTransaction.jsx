import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useFinance } from '../context/FinanceContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const CATEGORIES = ['Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Health', 'Utilities', 'Subscriptions', 'Salary', 'Other'];

const schema = yup.object().shape({
  title: yup.string().required('Title is required').max(50),
  amount: yup.number().typeError('Amount must be a number').positive('Amount must be positive').required('Amount is required'),
  category: yup.string().required('Category is required'),
  date: yup.string().required('Date is required'),
  type: yup.string().oneOf(['income', 'expense']).required('Type is required'),
  notes: yup.string().max(200),
  recurring: yup.boolean()
});

const AddTransaction = () => {
  const { addTransaction } = useFinance();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      recurring: false
    }
  });

  const onSubmit = (data) => {
    addTransaction(data);
    toast.success('Transaction added successfully!');
    navigate('/transactions');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="add-transaction">
      <h1 className="page-title">Add Transaction</h1>

      <div className="card glass-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Type</label>
              <select {...register('type')} className="form-control">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <p className="form-error">{errors.type?.message}</p>
            </div>

            <div className="form-group">
              <label className="form-label">Date</label>
              <input type="date" {...register('date')} className="form-control" />
              <p className="form-error">{errors.date?.message}</p>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Title</label>
            <input type="text" {...register('title')} className="form-control" placeholder="e.g. Grocery Shopping" />
            <p className="form-error">{errors.title?.message}</p>
          </div>

          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Amount (₹)</label>
              <input type="number" step="0.01" {...register('amount')} className="form-control" placeholder="0.00" />
              <p className="form-error">{errors.amount?.message}</p>
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select {...register('category')} className="form-control">
                <option value="">Select Category</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <p className="form-error">{errors.category?.message}</p>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes (Optional)</label>
            <textarea {...register('notes')} className="form-control" rows="3" placeholder="Add any details..."></textarea>
            <p className="form-error">{errors.notes?.message}</p>
          </div>

          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center' }}>
            <input type="checkbox" id="recurring" {...register('recurring')} style={{ width: 'auto' }} />
            <label htmlFor="recurring" className="form-label" style={{ margin: 0 }}>This is a recurring transaction</label>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary">Save Transaction</button>
            <button type="button" className="btn btn-icon" onClick={() => navigate('/transactions')}>Cancel</button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddTransaction;
