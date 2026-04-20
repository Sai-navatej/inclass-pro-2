import React, { useState } from 'react';
import useBudget from '../hooks/useBudget';
import BudgetCard from '../components/BudgetCard';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Budget = () => {
  const { budget, updateBudget } = useBudget();
  const [newBudget, setNewBudget] = useState(budget || '');

  const handleUpdate = (e) => {
    e.preventDefault();
    if (Number(newBudget) >= 0) {
      updateBudget(Number(newBudget));
      toast.success('Budget updated successfully!');
    } else {
      toast.error('Budget must be a positive number.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="page-title">Budget Tracking</h1>

      <div className="grid grid-cols-2">
        <div>
          <BudgetCard />
        </div>

        <div className="card glass-panel">
          <h3 className="section-title">Update Budget</h3>
          <p className="text-muted mb-4">Set a monthly budget to keep track of your spending limits.</p>
          
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label className="form-label">Monthly Limit (₹)</label>
              <input 
                type="number" 
                className="form-control" 
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                placeholder="e.g. 50000"
              />
            </div>
            <button type="submit" className="btn btn-primary">Save Budget</button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Budget;
