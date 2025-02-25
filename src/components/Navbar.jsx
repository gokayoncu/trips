"use client"
import { FaSearch, FaHeart, FaShoppingCart, FaFilter, FaUser } from "react-icons/fa"
import React,{ useState } from "react"
import Link from "next/link"
import Image from "next/image"
import FilterPopup from "./FilterPopup"

export default function Navbar({filtereTours, setFiltereTours}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const openFilter = () => setIsFilterOpen(true)
  const closeFilter = () => setIsFilterOpen(false)

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className=" fixed w-full z-50 top-0 flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-primary">TOURS</span>
          <FaFilter className="w-6 h-6 text-primary cursor-pointer" onClick={openFilter} />
        </div>
        <Link href="/">
          <Image src="/icon.png" alt="Logo" width={30} height={30} />
        </Link>
        <div className="flex gap-4">
          <Link href="/favorites">
            <FaHeart className="text-2xl cursor-pointer" />
          </Link>
          <Link href="/cart">
            <FaShoppingCart className="text-2xl cursor-pointer" />
          </Link>
          <Link href="/profile">
            <FaUser className="text-2xl cursor-pointer" />
          </Link>
        </div>
      </nav>

      {/* Filter Modal */}
      {isFilterOpen && (
        <FilterPopup setIsFilterOpen={setIsFilterOpen} filtereTours={filtereTours} setFiltereTours={setFiltereTours}/>
      )}
    </div>
  )
}

