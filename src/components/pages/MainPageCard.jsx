import React from "react";
import { useNavigate  } from "react-router-dom";

const MainPageCard = () => {
    const navigate = useNavigate()
  const mainCardsData = [
    {
      card_id: 1,
      description: "Zamów kawę u teraz i otrzymaj 10% rabatu :)",
      topic: "Zamów kawę!",
      image_path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5mtxu6YLj55LApYP8EcHoL8p_sezWFwE11A&s",
      button_desc: "Przejdź do menu"
    },
    {
      card_id: 2,
      description: "Już wkrótce w naszej kiosko-stronce pojawi się kawowy blog.",
      topic: "BLOG",
      image_path: "https://static.wixstatic.com/media/6d48c5_95942c34a6ef499c89adbfbe8942bc11~mv2.jpg/v1/fill/w_640,h_508,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/6d48c5_95942c34a6ef499c89adbfbe8942bc11~mv2.jpg",
      button_desc: ""
    },
    {
      card_id: 3,
      description: "Dzielimy się z Tobą swoim wieloletnim doświadczenie, aby pomóc Ci odkryć jej prawdziwy potencjał - razem z nami za każdym razem przygotujesz idealną filiżankę kawy.",
      topic: "Jak zaparzyć doskonałą kawę?",
      image_path: "https://b2b.coffeedesk.pl/blog/wp-content/uploads/2022/11/49557019347_de25683446_c.jpg",
      button_desc: ""
    },
  ];

  function hasButtonDescription(card) {
    return card.hasOwnProperty('button_desc') && card.button_desc.trim() !== '';
  };



  return (
    <div className="main-cards-container ">
      {mainCardsData.map(card => (
        <div key={card.card_id} className="card card-side mt-5 mb-5 bg-base-100 shadow-xl bg-gray-light">
          <figure>
            <img
              src={card.image_path}
              alt={card.topic}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-5xl">{card.topic}</h2>
            <p className="text-2xl">{card.description}</p>
            {hasButtonDescription(card) && (
              <div className="card-actions justify-end">
                <button type="button" onClick={() => navigate('/menu')}  className="btn bg-main-color px-10 py-2">{card.button_desc}</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPageCard;
