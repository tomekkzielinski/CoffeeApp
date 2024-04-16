import React from 'react'
import { useNavigate } from 'react-router-dom';

const OrderFinished = () => {
  const navigate = useNavigate();


  const redirectAfter10Second = () => {
    setTimeout(() => {
      navigate('/menu');
    }, 7000);
  };
  React.useEffect(() => {
    redirectAfter10Second();
  }, []);
  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src="https://previews.123rf.com/images/alfianiqbal/alfianiqbal2008/alfianiqbal200800261/153929384-coffee-cup-icon-vector-design-illustration-cup-of-coffee-icon-vector-isolated-on-white-background.jpg" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">Dziękujemy za złożenie zamówienia!</h1>
      <p className="py-6 text-3xl ">Numer zamówienia: 123</p>
      <p className="py-6 text-3xl ">Prosimy o podejście do kasy i opłacenie zamówienia</p>
      <p className="py-6 text-3xl ">Do zapłaty: 99.99</p>
      <button onClick={() => navigate('/menu')} className="text-white btn h-20 w-100 bg-buttons-color">Przejdź do Menu głównego</button>
    </div>
  </div>
</div>
  )
}

export default OrderFinished;