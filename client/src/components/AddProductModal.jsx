import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addProduct, fetchProducts } from "../redux/slices/productSlice"; // adjust path

const categories = ["Sofa", "Table", "Chair", "Bed", "Lamp"];
const brands = ["Urban Sofa", "Vintage Living", "Eco Wood", "Cozy Home"];

const AddProductModal = ({ isOpen, onClose, closeOnSave = true }) => {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setImageFile(f);
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      category: "",
      brand: "",
      price: "",
      salePrice: "",
      totalStock: "",
    });
    setImageFile(null);
    if (fileRef.current) fileRef.current.value = "";
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // simple validation
    if (
      !form.title ||
      !form.category ||
      !form.brand ||
      !form.price ||
      !form.totalStock
    ) {
      setError(
        "Please fill required fields: title, category, brand, price, totalStock."
      );
      return;
    }

    const fd = new FormData();
    if (imageFile) fd.append("image", imageFile); // multer expects 'image' (based on your backend)
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("category", form.category);
    fd.append("brand", form.brand);
    fd.append("price", String(form.price));
    fd.append("salePrice", String(form.salePrice || ""));
    fd.append("totalStock", String(form.totalStock));

 
    try {
      setLoading(true);

  
      const payload = await dispatch(addProduct(fd)).unwrap();

      // refresh product list (optional, recommended)
      await dispatch(fetchProducts());

      // reset fields
      resetForm();

      // close modal if desired
      if (closeOnSave) onClose();

      // optionally call onClose or notify parent using a callback
    } catch (err) {
      console.error("Add product error:", err);
      // err can be a string (rejectWithValue) or Error
      setError(err?.message || JSON.stringify(err) || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Add Product
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-3 text-sm text-red-700 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              ref={fileRef}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 
                file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                file:bg-yellow-600 file:text-white hover:file:bg-yellow-700"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Category & Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <select
                name="brand"
                value={form.brand}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              >
                <option value="">Select Brand</option>
                {brands.map((b) => (
                  <option value={b} key={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price & Sale Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Sale Price
              </label>
              <input
                name="salePrice"
                type="number"
                value={form.salePrice}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Total Stock
            </label>
            <input
              name="totalStock"
              type="number"
              value={form.totalStock}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
