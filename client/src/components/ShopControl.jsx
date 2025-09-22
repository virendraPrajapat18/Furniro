
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SlidersHorizontal, ChevronDown, LayoutGrid, X } from "lucide-react";
import {
  fetchProducts,
  fetchFilteredProducts,
} from "../redux/slices/productSlice";
import AddProductModal from "./AddProductModal";

// Mock data
const mockCategories = ["Sofa", "Table", "Chair", "Bed", "Lamp"];
const mockBrands = ["Urban Sofa", "Vintage Living", "Eco Wood", "Cozy Home"];

const ShopControls = () => {
  const dispatch = useDispatch();

    const [showAddProduct, setShowAddProduct] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(8000000);
  const [sortBy, setSortBy] = useState("default");

  // ✅ toggle category
  const toggleCategory = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // ✅ toggle brand
  const toggleBrand = (brand) => {
    setBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // ✅ Apply Filters
  const handleApply = () => {

    dispatch(
      fetchFilteredProducts({ categories, brands, minPrice, maxPrice, sortBy })
    );
    setShowFilterModal(false);
  };

  // ✅ Clear Filters
  const handleClear = () => {
    setCategories([]);
    setBrands([]);
    setMinPrice(0);
    setMaxPrice(8000000);
    setSortBy("default");

    dispatch(fetchProducts()); // reload all
  };

  useEffect(() => {
    // dispatch filtered products whenever sortBy changes
    dispatch(
      fetchFilteredProducts({ categories, brands, minPrice, maxPrice, sortBy })
    );
  }, [sortBy]);

  return (
    <>
      <div className="bg-[#F9F1E7] py-6 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Filter, View Toggles, and Results */}
            <div className="flex flex-col md:flex-row items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilterModal(true)}
                  className="flex items-center gap-2 text-base font-medium text-gray-800"
                >
                  <SlidersHorizontal className="text-gray-800" />
                  <span>Filter</span>
                </button>
              </div>
              <div className="w-full md:w-[1px] h-[1px] md:h-9 bg-gray-400 my-2 md:my-0"></div>
              <span className="text-gray-600 text-sm md:text-base">
                Showing 1-16 of 32 results
              </span>
            </div>
            {/* //add product */}
            <div className="flex-grow flex justify-center h-[48px] w-[202px]">
              <button
                onClick={() => setShowAddProduct(true)}
                className="px-6 py-2 text-[#B8860B] bg-white font-semibold  transition duration-300"
              >
                Add Product
              </button>
            </div>
            {/* Add Product Modal */}
            <AddProductModal
              isOpen={showAddProduct}
              onClose={() => setShowAddProduct(false)}
            />

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-base">Sort by</span>
              <div className="relative">
                <select
                  className="appearance-none bg-transparent text-gray-600 text-sm pr-8 cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="priceLowToHigh">Price (Low to High)</option>
                  <option value="priceHighToLow">Price (High to Low)</option>
                  <option value="brand">Brand Name</option>
                  {/* <option value="newest">Newest</option> */}
                </select>
                <ChevronDown
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  size={16}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full m-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Filter Options</h2>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-500 hover:text-gray-800 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              {mockCategories.map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={category}
                    checked={categories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="rounded text-yellow-600 focus:ring-yellow-500"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Brands</h3>
              {mockBrands.map((brand) => (
                <label key={brand} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={brand}
                    checked={brands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="rounded text-yellow-600 focus:ring-yellow-500"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Price Range</h3>
              <div className="flex flex-col space-y-2">
                <span>Min: Rp {minPrice.toLocaleString("id-ID")}</span>
                <input
                  type="range"
                  min="0"
                  max="8000000"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(Math.min(Number(e.target.value), maxPrice))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex flex-col space-y-2 mt-4">
                <span>Max: Rp {maxPrice.toLocaleString("id-ID")}</span>
                <input
                  type="range"
                  min="0"
                  max="8000000"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(Math.max(Number(e.target.value), minPrice))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleApply}
                className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700"
              >
                Apply Filters
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopControls;
