import React, { useState, useEffect } from "react";
import axios from "axios";

const CouponsList = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    // Pobranie listy kuponów po załadowaniu komponentu
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("http://localhost:5000/coupons"); // Endpoint z backendu
        setCoupons(response.data); // Ustawienie pobranych kuponów w stanie komponentu
      } catch (error) {
        console.error("Błąd pobierania kuponów:", error);
      }
    };

    fetchCoupons(); // Wywołanie funkcji pobierającej kody kuponów
  }, []); // Efekt wywoływany tylko raz po pierwszym renderowaniu komponentu

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th className="text-xl">Nazwa</th>
            <th className="text-xl">Procent</th>
            <th className="text-xl">Aktywny?</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12"></div>
                  </div>
                  <div className="text-xl">
                    <div className="font-bold">{coupon.name}</div>
                  </div>
                </div>
              </td>
              <td className="text-xl font-bold">{coupon.discount_percent}%</td>
              <td>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input type="checkbox" className="toggle" defaultChecked={coupon.is_active} />
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CouponsList;
