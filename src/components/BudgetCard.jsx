import React from 'react';
import useBudget from '../hooks/useBudget';
import { formatCurrency } from '../utils/currencyFormatter';

const BudgetCard = () => {
  const { budget, totalSpent, remainingBudget, percentageUsed, isExceeded } = useBudget();

  let progressClass = 'success';
  if (percentageUsed > 90) progressClass = 'danger';
  else if (percentageUsed > 75) progressClass = 'warning';

  return (
    <div className="budget-card glass-panel">
      <h3 className="card-title">Monthly Budget Overview</h3>
      <div className="budget-progress-container">
        <div 
          className={`budget-progress-bar ${progressClass}`} 
          style={{ width: `${percentageUsed}%` }}
        ></div>
      </div>
      <div className="budget-stats">
        <div>
          <div className="text-muted">Budget</div>
          <div className="font-weight-bold">{formatCurrency(budget)}</div>
        </div>
        <div>
          <div className="text-muted">Spent</div>
          <div className="text-danger">{formatCurrency(totalSpent)}</div>
        </div>
        <div>
          <div className="text-muted">Remaining</div>
          <div className={isExceeded ? 'text-danger' : 'text-success'}>
            {formatCurrency(remainingBudget)}
          </div>
        </div>
      </div>
      {isExceeded && (
        <div className="form-error" style={{ marginTop: '1rem', marginBottom: 0 }}>
          You have exceeded your monthly budget!
        </div>
      )}
    </div>
  );
};

export default BudgetCard;
