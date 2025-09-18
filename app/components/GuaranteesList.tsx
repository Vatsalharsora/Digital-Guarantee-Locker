import { useState } from 'react';
import { motion } from "framer-motion";

interface GuaranteesListProps {
  onBack: () => void;
}

interface Guarantee {
  id: number;
  productName: string;
  brand: string;
  category: string;
  purchaseDate: string;
  warrantyPeriod: string;
  expiryDate: string;
  purchaseAmount: number;
  status: 'Active' | 'Expiring Soon' | 'Expired';
  documents: string[];
}

export const GuaranteesList = ({ onBack }: GuaranteesListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Mock data - in real app, this would come from an API
  const guarantees: Guarantee[] = [
    {
      id: 1,
      productName: 'Samsung Galaxy S24',
      brand: 'Samsung',
      category: 'Electronics',
      purchaseDate: '2024-08-15',
      warrantyPeriod: '1 year',
      expiryDate: '2025-08-15',
      purchaseAmount: 75000,
      status: 'Active',
      documents: ['warranty_card.pdf', 'purchase_receipt.jpg']
    },
    {
      id: 2,
      productName: 'LG Refrigerator 260L',
      brand: 'LG',
      category: 'Appliances',
      purchaseDate: '2024-03-20',
      warrantyPeriod: '1 year',
      expiryDate: '2025-03-20',
      purchaseAmount: 35000,
      status: 'Expiring Soon',
      documents: ['warranty_card.pdf']
    },
    {
      id: 3,
      productName: 'Dell Inspiron Laptop',
      brand: 'Dell',
      category: 'Electronics',
      purchaseDate: '2025-01-10',
      warrantyPeriod: '1 year',
      expiryDate: '2026-01-10',
      purchaseAmount: 55000,
      status: 'Active',
      documents: ['warranty_card.pdf', 'purchase_receipt.pdf']
    },
    {
      id: 4,
      productName: 'Godrej Steel Almirah',
      brand: 'Godrej',
      category: 'Furniture',
      purchaseDate: '2022-05-30',
      warrantyPeriod: '5 years',
      expiryDate: '2027-05-30',
      purchaseAmount: 12000,
      status: 'Active',
      documents: ['warranty_card.jpg']
    },
    {
      id: 5,
      productName: 'Sony Headphones',
      brand: 'Sony',
      category: 'Electronics',
      purchaseDate: '2023-12-15',
      warrantyPeriod: '1 year',
      expiryDate: '2024-12-15',
      purchaseAmount: 8000,
      status: 'Expired',
      documents: ['warranty_card.pdf', 'purchase_receipt.jpg']
    }
  ];

  const categories = ['All', ...Array.from(new Set(guarantees.map(g => g.category)))];
  const statuses = ['All', 'Active', 'Expiring Soon', 'Expired'];

  const filteredGuarantees = guarantees.filter(guarantee => {
    const matchesSearch = guarantee.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guarantee.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || guarantee.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || guarantee.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expiring Soon':
        return 'bg-orange-100 text-orange-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewDocument = (guarantee: Guarantee) => {
    // In real app, this would open the document viewer
    alert(`Viewing documents for ${guarantee.productName}`);
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Guarantees</h1>
        <p className="text-gray-600">Manage and track all your warranty documents</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search guarantees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">View:</span>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              ☰
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              ⚏
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          {filteredGuarantees.length} of {guarantees.length} guarantees
        </p>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Purchase Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Expiry</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredGuarantees.map((guarantee) => (
                  <tr key={guarantee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{guarantee.productName}</div>
                        <div className="text-sm text-gray-600">{guarantee.brand}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{guarantee.category}</td>
                    <td className="px-6 py-4 text-gray-600">{guarantee.purchaseDate}</td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600">{guarantee.expiryDate}</div>
                      {guarantee.status !== 'Expired' && (
                        <div className="text-xs text-gray-500">
                          {getDaysUntilExpiry(guarantee.expiryDate)} days left
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(guarantee.status)}`}>
                        {guarantee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDocument(guarantee)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuarantees.map((guarantee) => (
            <motion.div
              key={guarantee.id}
              layout
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{guarantee.productName}</h3>
                  <p className="text-sm text-gray-600">{guarantee.brand}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(guarantee.status)}`}>
                  {guarantee.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="text-gray-900">{guarantee.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Purchase:</span>
                  <span className="text-gray-900">{guarantee.purchaseDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expires:</span>
                  <span className="text-gray-900">{guarantee.expiryDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount:</span>
                  <span className="text-gray-900">₹{guarantee.purchaseAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => handleViewDocument(guarantee)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  View Documents
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                  Edit
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {filteredGuarantees.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No guarantees found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </motion.div>
  );
};