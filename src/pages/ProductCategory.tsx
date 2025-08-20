import React, { useState } from 'react';
import { useProductCategories } from '../context/ProductCategoryContext';
import { toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';
import { useForm } from 'react-hook-form';
import DataTable from '../components/DataTable'; // Import DataTable
import Modal from '../components/Modal'; // Import Modal

interface CategoryFormData {
  name: string;
  description: string;
}

interface Category extends CategoryFormData {
  id: string;
}

const ProductCategory: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, loading } = useProductCategories();
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<CategoryFormData & { id?: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal
  const [formKey, setFormKey] = useState(0); // Key to force form remount

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormData>();

  const handleAddEdit = (data: CategoryFormData) => {
    if (isEditing && currentCategory?.id) {
      updateCategory({ ...data, id: currentCategory.id });
      toast.success("Category updated successfully!");
    } else {
      addCategory(data);
      toast.success("Category added successfully!");
    }
    setIsEditing(false);
    setCurrentCategory(null);
    reset();
    setIsModalOpen(false); // Close modal on submission
    setFormKey(prev => prev + 1); // Reset form key
  };

  // FIX: Open modal and reset form with category data on edit
  const handleEditClick = (category: Category) => {
    setIsEditing(true);
    setCurrentCategory(category);
    reset(category); // Prefill form
    setIsModalOpen(true); // Open modal
  };

  // FIX: Always reset form and clear state on create
  const openCreateModal = () => {
    setIsEditing(false); 
    setCurrentCategory(null);
    reset(
      {
        name : '',
        description : '',
      }
    ); // Clear form
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    deleteCategory(id);
    toast.success("Category deleted successfully!");
  };

  const closeCreateModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentCategory(null);
    reset();
    setFormKey(prev => prev + 1); // Reset form key
  };

  const categoryColumns = [
    { header: 'Name', accessor: 'name' as keyof Category, sortable: true },
    { header: 'Description', accessor: 'description' as keyof Category, sortable: true },
    {
      header: 'Actions',
      accessor: 'id' as keyof Category,
      render: (row: Category) => (
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Categories</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Category Management</h2>
        <button
          onClick={openCreateModal}
          className="mb-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Category
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeCreateModal} title={isEditing ? 'Edit Category' : 'Add New Category'}>
        <form key={formKey} onSubmit={handleSubmit(handleAddEdit)} className="space-y-4">
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
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? <ScaleLoader color={"#fff"} height={15} /> : (isEditing ? 'Update Category' : 'Add Category')}
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
        <h2 className="text-2xl font-semibold mb-4">Existing Categories</h2>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <ScaleLoader color={"#4F46E5"} />
          </div>
        ) : categories.length === 0 ? (
          <p className="text-gray-600">No categories added yet.</p>
        ) : (
          <div className="w-full max-w-full overflow-x-auto">
            <DataTable data={categories} columns={categoryColumns} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategory; 