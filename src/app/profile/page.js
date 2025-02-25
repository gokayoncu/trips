"use client";
import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Burada kullanıcı verilerini çekmek için bir API çağrısı yapabilirsiniz.
    // Örnek olarak localStorage'dan veriyi alıyoruz.
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  if (!user) {
    return (
      <div className="text-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8 m-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <p className="text-lg">{user.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="text-lg">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <p className="text-lg">{user.phone}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <p className="text-lg">{user.address}</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => alert("Edit profile functionality will be added later.")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
