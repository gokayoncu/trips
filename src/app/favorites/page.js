"use client";
import React, { useEffect, useState } from "react";
import { CiHeart } from 'react-icons/ci';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (tourId) => {
    const updatedFavorites = favorites.filter((tour) => tour.id !== tourId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites); // Favori listesini güncelle
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">Favorites</h1>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((tour) => (
            <div key={tour.id} className="bg-white p-4 rounded-lg shadow-lg">
              {/* Tour Image */}
              <div className="relative w-full h-40">
                <img src={tour.image} alt={tour.title} className="rounded-md w-full h-full object-cover" />
                <svg
                  onClick={() => handleRemoveFavorite(tour.id)}
                  className="absolute top-2 right-2 w-6 h-6 cursor-pointer transition duration-300 fill-red-500 border-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>


              </div>

              {/* Tour Title */}
              <h3 className="mt-2 font-semibold text-sm">{tour.title}</h3>
              <p className="mt-1 text-xs text-gray-500">{tour.location}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite tours yet.</p>
      )}
    </div>
  );
}
