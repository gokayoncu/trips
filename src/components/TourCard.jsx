import React, { useState } from "react";
import Image from "next/image";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';

// Kategoriler ve filtreler
const categories = ["Tours", "Tickets", "Rent", "Transfer"];
const filters = {
  Tours: ["Island Tour", "Land Tour", "Safari"],
  Tickets: ["Concert", "Museum", "Theater"],
  Rent: ["Car", "Bike", "Boat"],
  Transfer: ["Airport Shuttle", "Private Car"]
};

export default function TourCard({ tour ,index, clickedTours, setClickedTours}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tours");
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Hamburger menüsünü açma/kapama fonksiyonu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Kategori değiştiğinde filtreyi sıfırlamak için
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedFilters([]); // Kategori değiştiğinde filtreyi sıfırla
  };

  // Filtre seçme işlemi
  const handleFilterChange = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  const handleBookNowClick = (tour) => {
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    updatedCart.push(tour);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 5000);
  };
  
  const handleHeartClick = (tour) => {
    const updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (updatedFavorites.some((favorite) => favorite.id === tour.id)) {
      // Remove from favorites
      const filteredFavorites = updatedFavorites.filter((favorite) => favorite.id !== tour.id);
      localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
      setClickedTours((prevClickedTours) => {
        const updatedClickedTours = { ...prevClickedTours };
        delete updatedClickedTours[tour.id];
        return updatedClickedTours;
      });
    } else {
      // Add to favorites
      updatedFavorites.push(tour);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setClickedTours((prevClickedTours) => ({
        ...prevClickedTours,
        [tour.id]: true,
      }));
    }
  };
  return (
    <div key={`${tour.id}-${index}`} className="bg-white p-4 rounded-lg shadow-lg">
              <div className="w-full h-56 relative overflow-hidden rounded-md">
                <div className="absolute top-2 left-2 bg-white text-center text-primary-400 w-[22%] p-2 text-sm font-semibold rounded-lg z-10">
                  {tour.discount}% OFF
                </div>
                <div className="absolute top-2 bg-white right-2 p-2 border-2 z-10 rounded-md">
                <svg
  onClick={() => handleHeartClick(tour)}
  className={`w-6 h-6 cursor-pointer transition duration-300 ${clickedTours[tour.id] ? "fill-red-500 stroke-red-500" : "fill-white stroke-black"}`}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
>
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </div>
                <Image
                  src={tour.image}
                  alt={tour.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
                <div className="absolute bottom-2 left-2 bg-primary-500 text-center text-white w-[13%] p-1 text-base rounded-lg">
                  Tour
                </div>
              </div>

              {/* Rating and Location */}
              <div className="flex justify-between items-center text-sm mt-1">
                <div className="flex items-center">
                  {/* Rating */}
                  <span className="text-yellow-500 text-lg p-1">★</span>
                  <span className=" mr-2">{tour.rating}</span>
                  <span className=" mr-2 text-gray-500">({tour.reviews})</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt size={20} color="orange" />
                  <p className="text-foreground">{tour.location}</p>
                </div>
              </div>

              <h3 className="mt-2 font-semibold">{tour.title}</h3>

              {/* Price Section */}
              <div className="flex justify-end items-center mt-2">
                <p className="text-foreground flex items-center gap-1">
                  <span className="line-through text-red-600 ml-2 flex items-center gap-1">
                    THB {tour.oldPrice}
                    <FaArrowDown size={12} className="transform rotate-[-45deg]" />
                  </span>{" "}
                  <span className="font-semibold">
                    THB {tour.price}
                  </span>
                </p>
              </div>

              {/* Buttons Section */}
              <div className="flex justify-between mt-2">
                <button className="bg-transparent text-yellow-500 h-5 px-1 border-b-2 border-yellow-500 flex items-center space-x-2">
                  <span>Details</span>
                  <FaArrowRight size={16} />
                </button>
                <button
                  onClick={() => handleBookNowClick(tour)}
                  className="bg-primary-500 text-white px-6 py-2 rounded-md"
                >
                  Book Now
                </button>
              </div>
            </div>
  );
}
