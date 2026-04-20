import React from 'react';
import { MdEdit, MdDelete, MdRepeat } from 'react-icons/md';
import { formatCurrency } from '../utils/currencyFormatter';
import { format, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import './Components.css'; // Let's put common component CSS here

const TransactionCard = ({ transaction, onDelete, onEdit }) => {
  const isExpense = transaction.type === 'expense';

  return (
    <motion.div 
      className={`transaction-card glass-panel ${transaction.recurring ? 'recurring' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <div className="transaction-info">
        <div className="transaction-header">
          <h3>{transaction.title}</h3>
          {transaction.recurring && (
            <span className="badge-recurring" title="Recurring Transaction">
              <MdRepeat />
            </span>
          )}
        </div>
        <div className="transaction-meta">
          <span className="badge category-badge">{transaction.category}</span>
          <span className="date">{format(parseISO(transaction.date), 'MMM dd, yyyy')}</span>
        </div>
        {transaction.notes && <p className="notes text-muted">{transaction.notes}</p>}
      </div>

      <div className="transaction-actions-amount">
        <div className={`amount ${isExpense ? 'text-danger' : 'text-success'}`}>
          {isExpense ? '-' : '+'}{formatCurrency(transaction.amount)}
        </div>
        <div className="actions">
          {onEdit && (
            <button className="btn-icon" onClick={() => onEdit(transaction)} aria-label="Edit">
              <MdEdit />
            </button>
          )}
          {onDelete && (
            <button className="btn-icon delete" onClick={() => onDelete(transaction.id)} aria-label="Delete">
              <MdDelete />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionCard;
