import React, { useState } from "react";

const CouponForm = () => {
  const [couponName, setCouponName] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");

  // Function to generate random coupon name
  const generateRandomName = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setCouponName(result);
  };

  const handleAddCoupon = () => {
    // Logic to add coupon goes here
    console.log("Coupon Name:", couponName);
    console.log("Discount Percentage:", discountPercentage);
    // Clear form fields after submission
    setCouponName("");
    setDiscountPercentage("");
  };

  return (
    <div className="flex justify-center items-center bg-main-color m-20 max-w-4xl mx-auto p-4 rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Dodaj nowy kupon rabatowy</h2>

        <input
          type="text"
          placeholder="Nazwa kuponu"
          value={couponName}
          onChange={(e) => setCouponName(e.target.value)}
          className="w-full mb-2 p-2 rounded-md border border-gray-300"
        />
        <button
          onClick={generateRandomName}
          className="ml-2 p-2 rounded-md bg-gray-300"
        >
          Losowa nazwa
        </button>

        <input
          type="number"
          placeholder="Procent rabatu"
          value={discountPercentage}
          onChange={(e) => setDiscountPercentage(e.target.value)}
          className="w-full mb-2 mt-2 p-2 rounded-md border border-gray-300"
          min={1}
        />
        
        <div className="flex justify-center">
          <button
            onClick={handleAddCoupon}
            className="w-150 text-white p-2 rounded-md bg-buttons-color transition duration-300"
          >
            Dodaj kupon
          </button>
        </div>
      </div>

    </div>
  );
};

export default CouponForm;
