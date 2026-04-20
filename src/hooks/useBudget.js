import { useFinance } from '../context/FinanceContext';
import { useMemo } from 'react';
import { isThisMonth, parseISO } from 'date-fns';

const useBudget = () => {
  const { transactions, budget, setBudget } = useFinance();

  const metrics = useMemo(() => {
    const currentMonthTransactions = transactions.filter(t => 
      t.date && isThisMonth(parseISO(t.date))
    );

    const totalSpent = currentMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const monthlyBudget = Number(budget.monthlyBudget) || 0;
    const remainingBudget = monthlyBudget > 0 ? monthlyBudget - totalSpent : 0;
    const percentageUsed = monthlyBudget > 0 ? Math.min((totalSpent / monthlyBudget) * 100, 100) : 0;

    return {
      totalSpent,
      remainingBudget,
      percentageUsed,
      isExceeded: totalSpent > monthlyBudget && monthlyBudget > 0
    };
  }, [transactions, budget]);

  const updateBudget = (newBudget) => {
    setBudget({ monthlyBudget: newBudget });
  };

  return {
    budget: budget.monthlyBudget,
    updateBudget,
    ...metrics
  };
};

export default useBudget;
