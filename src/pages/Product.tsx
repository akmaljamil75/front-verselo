import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useProductCategories } from '../context/ProductCategoryContext';
import { toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';
import { useForm } from 'react-hook-form';
import DataTable from '../components/DataTable'; // Import DataTable
import Modal from '../components/Modal'; // Import Modal

interface ProductFormData {
  name: string;
  description: string;
  stock: number;
  price: number;
  categoryId: string;
}

interface Product extends ProductFormData {
  id: string;
}

const ProductPage: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, loading: productLoading } = useProducts();
  const { categories, loading: categoryLoading } = useProductCategories();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductFormData & { id?: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>();

  const handleAddEdit = (data: ProductFormData) => {
    if (isEditing && currentProduct?.id) {
      updateProduct({ ...data, id: currentProduct.id });
      toast.success("Product updated successfully!");
    } else {
      addProduct(data);
      toast.success("Product added successfully!");
    }
    setIsEditing(false);
    setCurrentProduct(null);
    reset();
    setIsModalOpen(false); // Close modal on submission
  };

  // FIX: Open modal and reset form with product data on edit
  const handleEditClick = (product: Product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    reset(product); // Prefill form
    setIsModalOpen(true); // Open modal
  };

  // FIX: Always reset form and clear state on create
  const openCreateModal = () => {
    setIsEditing(false);
    setCurrentProduct(null);
    reset(); // Clear form
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    deleteProduct(id);
    toast.success("Product deleted successfully!");
  };

  const closeCreateModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentProduct(null);
    reset();
  };

  const isLoading = productLoading || categoryLoading;

  const productColumns = [
    { header: 'Name', accessor: 'name', sortable: true },
    { header: 'Description', accessor: 'description', sortable: true },
    { header: 'Stock', accessor: 'stock', sortable: true },
    { header: 'Price', accessor: 'price', sortable: true, render: (row: Product) => `$${row.price.toFixed(2)}` },
    {
      header: 'Category',
      accessor: 'categoryId',
      sortable: true,
      render: (row: Product) => categories.find(cat => cat.id === row.categoryId)?.name || 'N/A',
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (row: Product) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditClick(row)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(row.id)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Product Management</h2>
        <button
          onClick={openCreateModal}
          className="mb-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Product
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeCreateModal} title={isEditing ? 'Edit Product' : 'Add New Product'}>
        <form onSubmit={handleSubmit(handleAddEdit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('name', { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('description', { required: "Description is required" })}
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message as string}</p>}
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              id="stock"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('stock', { required: "Stock is required", valueAsNumber: true, min: { value: 0, message: "Stock cannot be negative" } })}
            />
            {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message as string}</p>}
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              step="0.01"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('price', { required: "Price is required", valueAsNumber: true, min: { value: 0, message: "Price cannot be negative" } })}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message as string}</p>}
          </div>
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="categoryId"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('categoryId', { required: "Category is required" })}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message as string}</p>}
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? <ScaleLoader color={"#fff"} height={15} /> : (isEditing ? 'Update Product' : 'Add Product')}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={closeCreateModal}
              className="ml-4 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          )}
        </form>
      </Modal>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Existing Products</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <ScaleLoader color={"#4F46E5"} />
          </div>
        ) : products.length === 0 ? (
          <p className="text-gray-600">No products added yet.</p>
        ) : (
          <DataTable data={products} columns={productColumns} />
        )}
      </div>
    </div>
  );
};

export default ProductPage; 