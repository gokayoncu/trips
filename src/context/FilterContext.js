"use client";
import { createContext, useState, useEffect } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        theme: null,
        activity: null,
        price: 0,
        startTime: "",
        groupSize: "",
        vehicle: null,
        features: null,
        location: ""
    });
    const userData = {
        name: "Users",
        email: "users@user.com",
        phone: "+90 555 123 45 67",
        address: "İstanbul, Türkiye",
      };
      
      // Kullanıcı verisini localStorage'a kaydediyoruz.
      localStorage.setItem("user", JSON.stringify(userData));
    useEffect(() => {
        const storedFilters = JSON.parse(localStorage.getItem("tourFilters")) || {};
        setFilters(storedFilters);
    }, []);

    // Filtreler değiştiğinde, güncellenmiş filtreleri localStorage'a kaydedelim
    useEffect(() => {
        localStorage.setItem('tourFilters', JSON.stringify(filters));
    }, [filters]);

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </FilterContext.Provider>
    );
};
