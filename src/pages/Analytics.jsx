import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { CategoryPieChart, IncomeExpenseBarChart, TrendLineChart } from '../components/Charts';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';

const Analytics = () => {
  const { transactions } = useFinance();

  const chartData = useMemo(() => {
    const categoryTotals = {};
    const barDataMap = {};
    const trendDataMap = {};

    transactions.forEach(t => {
      const amount = Number(t.amount);
      const date = t.date;
      const monthYear = format(parseISO(date), 'MMM yyyy');
      
      // Bar Chart Data (Income vs Expense)
      if (!barDataMap[monthYear]) {
        barDataMap[monthYear] = { name: monthYear, income: 0, expense: 0 };
      }

      // Trend Line Data (Spending over time)
      if (!trendDataMap[date]) {
        trendDataMap[date] = { date: format(parseISO(date), 'MMM dd'), amount: 0 };
      }

      if (t.type === 'expense') {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amount;
        barDataMap[monthYear].expense += amount;
        trendDataMap[date].amount += amount;
      } else {
        barDataMap[monthYear].income += amount;
      }
    });

    const pieData = Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Sort by date strings
    const barData = Object.values(barDataMap).reverse(); 
    
    // Line chart
    const trendData = Object.values(trendDataMap).sort((a, b) => new Date(a.date) - new Date(b.date));

    return { pieData, barData, trendData };
  }, [transactions]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="page-title">Financial Analytics</h1>

      {transactions.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <h3 className="text-muted">Not enough data</h3>
          <p className="text-muted mt-2">Add some transactions to see your analytics.</p>
        </div>
      ) : (
        <div className="grid">
          <div className="card glass-panel">
            <h2 className="section-title">Income vs Expense</h2>
            <IncomeExpenseBarChart data={chartData.barData} />
          </div>

          <div className="grid grid-cols-2">
            <div className="card glass-panel">
              <h2 className="section-title">Spending by Category</h2>
              <CategoryPieChart data={chartData.pieData} />
            </div>

            <div className="card glass-panel">
              <h2 className="section-title">Spending Trend</h2>
              <TrendLineChart data={chartData.trendData} />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Analytics;
