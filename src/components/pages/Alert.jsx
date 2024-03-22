// Komponent Alert.js
import React, { useEffect } from "react";

const Alert = ({ show, onHide }) => {
  useEffect(() => {
    let timer;
    if (show) {
      timer = setTimeout(() => {
        onHide(); // Wywołanie funkcji przekazanej jako prop, aby ukryć alert
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [show, onHide]); // Dodajemy onHide do listy zależności

  if (!show) {
    return null;
  }

  return (
    <div role="alert" className="alert alert-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Produkt pomyślnie dodano do koszyka :)</span>
    </div>
  );
};

export default Alert;
