"use client";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef, useContext } from "react";
import { FilterContext } from '@/context/FilterContext';

export default function TourFilter({ setIsFilterOpen }) {
    const { filters, setFilters } = useContext(FilterContext); // Context üzerinden filtreleri alıyoruz
    const [locationOpen, setLocationOpen] = useState(false);
    const locationRef = useRef(null);
    const [filteredItems, setFilteredItems] = useState([]);
    const [category, setCategory] = useState(null); // Seçilen kategori durumu

    // Location arama
    const storedTours = JSON.parse(localStorage.getItem("tours")) || [];
    const filtered = storedTours.filter(item =>
        item.location?.toLowerCase().includes(filters.location?.toLowerCase() || '')
      );

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: prev[key] === value ? null : value
        }));
    };

    const handleLocationChange = (e) => {
        setFilters((prev) => ({
            ...prev,
            location: e.target.value
        }));
    };

    const handleLocationSelect = (location) => {
        setFilters((prev) => ({
            ...prev,
            location: location
        }));
        setFilteredItems([]);
    };

    const resetFilters = () => {
        setFilters({
            theme: null,
            activity: null,
            price: 0,
            startTime: "",
            groupSize: "",
            vehicle: null,
            features: null,
            location: ""
        });
        setLocationOpen(false);
        setCategory(null); // Kategori sıfırlama
    };

    const closeFilter = () => {
        setIsFilterOpen(false);
        setLocationOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                locationRef.current &&
                !locationRef.current.contains(event.target) &&
                !event.target.closest('input')
            ) {
                setLocationOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-gray-700 bg-opacity-50 flex justify-center items-center">
            <div className="w-full max-w-lg bg-white p-4 rounded-lg">
            {category && (
                    <div className="mb-4 flex items-center">
                        <span className="font-semibold text-lg bg-primary-500 text-white rounded-md p-1">{category.toUpperCase()}</span>
                        <button 
                            onClick={() => setCategory(null)} 
                            className="ml-4 text-red-500 hover:text-red-700"
                        >
                            Back
                        </button>
                    </div>
                )}
                <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-primary">Filters</span>
                    <button onClick={closeFilter} className="text-gray-600 hover:text-primary">Close</button>
                </div>

                {/* Kategori Seçenekleri */}
                {!category && (
                    <div className="mb-4">
                        <p className="font-semibold text-lg">Select Category</p>
                        <div className="flex gap-4 mt-3">
                            {["Tours", "Tickets", "Rent", "Transfer"].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setCategory(option)}
                                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Seçilen kategoriye göre filtreler */}
                {category && (
                    <>
                        {/* Location Search */}
                        <div className="mb-4 relative">
                            <input
                                type="text"
                                placeholder="Location"
                                value={filters.location}
                                onChange={handleLocationChange}
                                onClick={() => setLocationOpen(true)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <FaSearch className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
                            {locationOpen && filtered.length > 0 && (
                                <ul
                                    ref={locationRef}
                                    className="absolute w-full bg-white border border-gray-200 mt-1 max-h-60 overflow-y-auto"
                                >
                                    {filtered.map(item => (
                                        <li
                                            key={item.id}
                                            className="px-4 py-2 text-gray-600 cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleLocationSelect(item.location)}
                                        >
                                            {item.location}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Theme */}
                        <div className="mb-4">
                            <label className="block text-sm mb-2 text-gray-700">Theme</label>
                            <div className="flex flex-wrap gap-2">
                                {["Island Tour", "Local Tour", "Safari"].map((theme) => (
                                    <button
                                        key={theme}
                                        onClick={() => handleFilterChange("theme", theme)}
                                        className={`px-3 py-1 rounded-full text-xs ${filters.theme === theme ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}
                                    >
                                        {theme} (45)
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Activity */}
                        <div className="mb-4">
                            <label className="block text-sm mb-2 text-gray-700">Activity</label>
                            <div className="flex flex-wrap gap-2">
                                {["Swimming", "Running", "Snorkeling"].map((activity) => (
                                    <button
                                        key={activity}
                                        onClick={() => handleFilterChange("activity", activity)}
                                        className={`px-3 py-1 rounded-full text-xs ${filters.activity === activity ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}
                                    >
                                        {activity} (45)
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <label className="block text-sm mb-2 text-gray-700">Price</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="5000"
                                    value={filters.price}
                                    onChange={(e) => setFilters((prev) => ({ ...prev, price: e.target.value }))}
                                    className="w-full appearance-none bg-gray-200 h-1 rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                                />
                                <span className="text-sm border border-gray-300 px-2 py-1 rounded-md">${filters.price}</span>
                            </div>
                        </div>

                        {/* Start Time */}
                        <div className="mb-4">
                            <label className="block text-sm mb-2 text-gray-700">Start Time</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="24"
                                    value={filters.startTime}
                                    onChange={(e) => setFilters({ ...filters, startTime: e.target.value })}
                                    className="w-full appearance-none bg-gray-200 h-1 rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                                />
                                <span className="text-sm border border-gray-300 px-2 py-1 rounded-md">{filters.startTime}:00</span>
                            </div>
                        </div>

                        {/* Group Size */}
                        <div className="mb-4">
                            <label className="block text-sm mb-2 text-gray-700">Group Size</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={filters.groupSize}
                                    onChange={(e) => setFilters({ ...filters, groupSize: e.target.value })}
                                    className="w-full appearance-none bg-gray-200 h-1 rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                                />
                                <span className="text-sm border border-gray-300 px-2 py-1 rounded-md">{filters.groupSize}</span>
                            </div>
                        </div>

                        {/* Vehicle */}
                        <div className="mb-4">
                            <label className="block text-sm mb-2 text-gray-700">Vehicle</label>
                            <div className="flex flex-wrap gap-2">
                                {["Yacht", "Speedboat", "Safari", "Catamaran", "Speedcatamaran"].map((vehicle) => (
                                    <button
                                        key={vehicle}
                                        onClick={() => handleFilterChange("vehicle", vehicle)}
                                        className={`px-3 py-1 rounded-full text-xs ${filters.vehicle === vehicle ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}
                                    >
                                        {vehicle} (45)
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="mb-4">
                            <label className="block text-sm mb-2 text-gray-700">Features</label>
                            <div className="flex flex-wrap gap-2">
                                {["Transfer", "Halal Food", "Vegetarian Food"].map((feature) => (
                                    <button
                                        key={feature}
                                        onClick={() => handleFeatureClick(feature)}
                                        className={`px-3 py-1 rounded-full text-xs ${filters.features === feature ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}
                                    >
                                        {feature} (45)
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                <div className="flex gap-3">
                    <button
                        className="flex-1 px-4 py-2 border border-gray-300 bg-white text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
                        onClick={resetFilters}
                    >
                        RESET
                    </button>
                    <button
                        className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                        onClick={closeFilter}
                    >
                        SEARCH
                    </button>
                </div>
            </div>
        </div>
    );
}
