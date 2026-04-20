import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/currencyFormatter';
import { CategoryPieChart } from '../components/Charts';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { transactions } = useFinance();

  const metrics = useMemo(() => {
    let income = 0;
    let expense = 0;
    const categoryTotals = {};

    transactions.forEach(t => {
      const amount = Number(t.amount);
      if (t.type === 'income') {
        income += amount;
      } else {
        expense += amount;
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amount;
      }
    });

    const netBalance = income - expense;

    // Find top spending category
    let topCategory = 'None';
    let maxCategoryAmount = 0;
    Object.entries(categoryTotals).forEach(([cat, amt]) => {
      if (amt > maxCategoryAmount) {
        maxCategoryAmount = amt;
        topCategory = cat;
      }
    });

    // Prepare pie chart data
    const pieData = Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return { income, expense, netBalance, topCategory, pieData };
  }, [transactions]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="dashboard"
    >
      <h1 className="page-title">Dashboard Overview</h1>
      
      <div className="grid grid-cols-3 mb-8">
        <div className="card glass-panel">
          <div className="card-title">Net Balance</div>
          <div className="card-value">{formatCurrency(metrics.netBalance)}</div>
        </div>
        <div className="card glass-panel">
          <div className="card-title">Total Income</div>
          <div className="card-value text-success">{formatCurrency(metrics.income)}</div>
        </div>
        <div className="card glass-panel">
          <div className="card-title">Total Expenses</div>
          <div className="card-value text-danger">{formatCurrency(metrics.expense)}</div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="card glass-panel">
          <h2 className="section-title">Top Spending Category</h2>
          <div className="card-value" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            {metrics.topCategory}
          </div>
          <div className="text-muted">
            Analyzing your spending habits helps you stay on track.
          </div>
        </div>

        <div className="card glass-panel">
          <h2 className="section-title">Expenses by Category</h2>
          <CategoryPieChart data={metrics.pieData} />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
