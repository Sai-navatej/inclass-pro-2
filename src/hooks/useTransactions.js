import { useFinance } from '../context/FinanceContext';
import { useMemo } from 'react';

const useTransactions = (searchQuery = '', filters = {}, sortOption = 'date') => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useFinance();

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        t => 
          t.title.toLowerCase().includes(lowerQuery) || 
          (t.notes && t.notes.toLowerCase().includes(lowerQuery))
      );
    }

    // Filter by Category
    if (filters.category && filters.category !== 'All') {
      result = result.filter(t => t.category === filters.category);
    }

    // Filter by Type
    if (filters.type && filters.type !== 'All') {
      result = result.filter(t => t.type === filters.type);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortOption === 'date') {
        return new Date(b.date) - new Date(a.date); // Newest first
      } else if (sortOption === 'amount') {
        return Number(b.amount) - Number(a.amount); // Highest amount first
      } else if (sortOption === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

    return result;
  }, [transactions, searchQuery, filters, sortOption]);

  return {
    transactions: filteredAndSortedTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
  };
};

export default useTransactions;
