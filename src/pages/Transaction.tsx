import React, { useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import { useProducts } from '../context/ProductContext';
import { useProductCategories } from '../context/ProductCategoryContext';

// Transaction status options
const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'payment', label: 'Payment' },
  { value: 'waiting', label: 'Waiting' },
  { value: 'cancelled', label: 'Cancelled' },
];

// Dummy transaction data type
interface Transaction {
  id: string;
  productId: string;
  total: number;
  stock: number;
  categoryId: string;
  status: 'payment' | 'waiting' | 'cancelled';
}

// Dummy transactions (replace with real data/fetch in real app)
const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: 'TRX001',
    productId: '1',
    total: 100000,
    stock: 2,
    categoryId: 'cat1',
    status: 'payment',
  },
  {
    id: 'TRX002',
    productId: '2',
    total: 50000,
    stock: 1,
    categoryId: 'cat2',
    status: 'waiting',
  },
  {
    id: 'TRX003',
    productId: '1',
    total: 200000,
    stock: 4,
    categoryId: 'cat1',
    status: 'cancelled',
  },
];

const TransactionPage: React.FC = () => {
  // In real app, fetch transactions from context or API
  const [transactions] = useState<Transaction[]>(DUMMY_TRANSACTIONS);
  const { products } = useProducts();
  const { categories } = useProductCategories();

  // Search state
  const [searchId, setSearchId] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  // Hapus: const [searchTrigger, setSearchTrigger] = useState(0); // trigger for search button

  // Filtered transactions (simulate API call on search button)
  const filteredTransactions = useMemo(() => {
    // Simulate API call delay
    if (searchLoading) return [];
    return transactions.filter((trx) => {
      const matchId = searchId ? trx.id.toLowerCase().includes(searchId.toLowerCase()) : true;
      const matchCategory = searchCategory ? trx.categoryId === searchCategory : true;
      const matchStatus = searchStatus ? trx.status === searchStatus : true;
      return matchId && matchCategory && matchStatus;
    });
  }, [transactions, searchId, searchCategory, searchStatus, searchLoading]);

  // Helper to get product/category name
  const getProductName = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    return prod ? prod.name : '-';
  };
  const getCategoryName = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : '-';
  };

  // Table columns (fix type for accessor)
  const columns: {
    header: string;
    accessor: keyof Transaction;
    render?: (row: Transaction) => React.ReactNode;
    sortable?: boolean;
  }[] = [
    { header: 'Id Transaction', accessor: 'id', sortable: true },
    {
      header: 'Nama Product',
      accessor: 'productId',
      render: (row) => getProductName(row.productId),
      sortable: true,
    },
    { header: 'Total Transaksi', accessor: 'total', sortable: true, render: (row) => `Rp${row.total.toLocaleString()}` },
    { header: 'Jumlah Stock', accessor: 'stock', sortable: true },
    {
      header: 'Nama Product Category',
      accessor: 'categoryId',
      render: (row) => getCategoryName(row.categoryId),
      sortable: true,
    },
    {
      header: 'Status Transaksi',
      accessor: 'status',
      render: (row) => {
        let color = 'bg-gray-200 text-gray-700';
        if (row.status === 'payment') color = 'bg-green-100 text-green-700';
        if (row.status === 'waiting') color = 'bg-yellow-100 text-yellow-700';
        if (row.status === 'cancelled') color = 'bg-red-100 text-red-700';
        return <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>{row.status}</span>;
      },
      sortable: true,
    },
  ];

  // Handler for search button
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchLoading(true);
    setTimeout(() => {
      setSearchLoading(false);
      // Hapus: setSearchTrigger((prev) => prev + 1);
    }, 700); // simulate API delay
  };

  // Reset search result when filter changes (optional, can be removed if only want to search on button)
  // useEffect(() => { setSearchTrigger((prev) => prev + 1); }, [searchId, searchCategory, searchStatus]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Transaction</h1>
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Search Criteria</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Id Transaction</label>
            <input
              type="text"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search by transaction ID"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Product Category</label>
            <select
              value={searchCategory}
              onChange={e => setSearchCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status Transaksi</label>
            <select
              value={searchStatus}
              onChange={e => setSearchStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition text-sm md:text-base w-full md:w-auto justify-center"
            disabled={searchLoading}
          >
            {searchLoading ? (
              <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Searching...</span>
            ) : (
              <><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="currentColor" /><line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeLinecap="round" /></svg> Search</>
            )}
          </button>
        </div>
      </form>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Transaction List</h2>
        <div className="w-full max-w-full overflow-x-auto">
          <DataTable data={filteredTransactions} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
