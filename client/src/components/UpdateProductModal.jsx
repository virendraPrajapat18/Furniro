
import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateProduct, fetchProducts } from "../redux/slices/productSlice";

const categories = ["Sofa", "Table", "Chair", "Bed", "Lamp"];
const brands = ["Urban Sofa", "Vintage Living", "Eco Wood", "Cozy Home"];

const UpdateProductModal = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        description: product.description || "",
        category: product.category || "",
        brand: product.brand || "",
        price: product.price || "",
        salePrice: product.salePrice || "",
        totalStock: product.totalStock || "",
      });
    }
  }, [product]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setImageFile(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (imageFile) fd.append("image", imageFile);
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));

    await dispatch(updateProduct({ id: product._id, formData: fd })).unwrap();
    await dispatch(fetchProducts());
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={(e) => {
        e.stopPropagation(); // 🔥 prevent click bubbling
      }}
    >
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Update Product</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image */}
          <div>
            <label className="block text-sm mb-1">Image</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {product.image && !imageFile && (
              <img
                src={product.image}
                alt={product.title}
                className="w-20 mt-2 rounded"
              />
            )}
          </div>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Title"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={3}
            placeholder="Description"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Brand</option>
            {brands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Price"
          />
          <input
            name="salePrice"
            type="number"
            value={form.salePrice}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Sale Price"
          />
          <input
            name="totalStock"
            type="number"
            value={form.totalStock}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Total Stock"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-yellow-600 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
