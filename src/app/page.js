"use client";
import { useState, useEffect, useContext } from 'react';
import TourCard from '@/components/TourCard';
import Navbar from '@/components/Navbar';
import { FilterContext } from '@/context/FilterContext';

export default function Home() {
  const { filters: filtereTours } = useContext(FilterContext); // Filtreleri context'ten alıyoruz
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedTours, setClickedTours] = useState({});

  useEffect(() => {
    // API'den turları çek
    fetch('/api/tours')
      .then((response) => response.json())
      .then((data) => {
        setTours(data);
        setLoading(false);
        localStorage.setItem('tours', JSON.stringify(data));
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setLoading(false);
      });

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesMap = {};
    favorites.forEach((favorite) => {
      favoritesMap[favorite.id] = true;
    });
    setClickedTours(favoritesMap);
  }, []);

  const filteredTours = tours.filter((tour) => {
    let matches = true;

    if (filtereTours.activity && tour.activity !== filtereTours.activity) {
      matches = false;
    }
    if (filtereTours.features && !tour.features.some((feature) => filtereTours.features.includes(feature))) {
      matches = false;
    }
    if (filtereTours.groupSize && tour.groupSize < filtereTours.groupSize) {
      matches = false;
    }
    if (filtereTours.location && !tour.location.toLowerCase().includes(filtereTours.location.toLowerCase())) {
      matches = false;
    }
    if (filtereTours.price && tour.price < filtereTours.price) {
      matches = false;
    }
    if (filtereTours.startTime && tour.startTime !== filtereTours.startTime) {
      matches = false;
    }
    if (filtereTours.theme && tour.theme !== filtereTours.theme) {
      matches = false;
    }
    if (filtereTours.vehicle && tour.vehicle !== filtereTours.vehicle) {
      matches = false;
    }

    return matches;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {loading ? (
          <p className="text-center text-foreground">Loading tours...</p>
        ) : filteredTours.length > 0 ? (
          filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} clickedTours={clickedTours} setClickedTours={setClickedTours} />
          ))
        ) : (
          tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} clickedTours={clickedTours} setClickedTours={setClickedTours} />
          ))
        )}
      </div>
    </div>
  );
}
