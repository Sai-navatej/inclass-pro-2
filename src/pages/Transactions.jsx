import React, { useState } from 'react';
import useTransactions from '../hooks/useTransactions';
import useDebounce from '../hooks/useDebounce';
import TransactionCard from '../components/TransactionCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  const [filters, setFilters] = useState({ type: 'All', category: 'All' });
  const [sortOption, setSortOption] = useState('date');

  const { transactions, deleteTransaction } = useTransactions(debouncedSearchQuery, filters, sortOption);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
      toast.success('Transaction deleted successfully!');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="page-title">Transactions</h1>
      
      <div className="search-filter-container glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <Filters 
          filters={filters} 
          onFilterChange={setFilters} 
          sortOption={sortOption} 
          onSortChange={setSortOption} 
        />
      </div>

      <div className="transactions-list mt-8">
        {transactions.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <h3 className="text-muted">No transactions found</h3>
            <p className="text-muted mt-2">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <AnimatePresence>
            {transactions.map(t => (
              <TransactionCard 
                key={t.id} 
                transaction={t} 
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default Transactions;
