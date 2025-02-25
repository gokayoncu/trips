"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showMessage, setShowMessage] = useState(false);  // Mesajın görünmesini kontrol etmek için state
  const router = useRouter();

  useEffect(() => {
    // LocalStorage'dan sepetteki ürünleri al
    const storedItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedItems);
  }, []);

  const handleCheckout = () => {
    // Ödeme işlemlerinin şu an gerçekleştirilemediğini belirten mesajı göster
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false); // 3 saniye sonra mesajı gizle
    }, 3000);
  };

  const handleRemoveItem = (itemId) => {
    // Sepetten bir öğeyi kaldırma işlemi
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems)); // Güncellenmiş listeyi localStorage'a kaydet
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-semibold mb-4">Sepetiniz</h1>
      
      {/* Sepet öğeleri */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between items-center relative">
              {/* Çarpı işareti */}
              <button
                onClick={() => handleRemoveItem(item.id)}  // Tıklanınca ürünü kaldır
                className="absolute top-2 right-2 text-xl text-red-500 hover:text-red-700"
              >
                ✖
              </button>

              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold text-center">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{item.description}</p>
              <div className="text-lg font-semibold">THB {item.price}</div>
            </div>
          ))
        ) : (
          <p className="text-center text-foreground">Sepetinizde ürün yok.</p>
        )}
      </div>
      
      {/* Toplam Fiyat */}
      {cartItems.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleCheckout}  // Butona tıklanınca handleCheckout fonksiyonu çalışacak
            className="bg-primary-500 text-white px-6 py-2 rounded-md"
          >
            Ödeme Sayfasına Git
          </button>
        </div>
      )}

      {/* Ödeme işlemleri yapılamıyor mesajı */}
      {showMessage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg text-red-500 font-semibold">Şu an ödeme işlemleri gerçekleştirilemiyor.</p>
          </div>
        </div>
      )}
    </div>
  );
}
