import React from 'react';

const Footer = () => {
  return (
    <footer className="sticky top-[100vh]  w-full p-5 justify-between  bg-main-color mb-auto">
      <div className="flex justify-center text-lg">
        <div className="grid grid-flow-col gap-4">
          <a href="https://github.com/tomekkzielinski/CoffeeApp" target="_blank" className="font-bold text-blue-600 hover:text-blue-800">GitHub</a>
          <a href="https://trello.com/b/h9LTHq53/in%C5%BCynierka" target="_blank" className="font-bold text-blue-600 hover:text-blue-800">Trello</a>
        </div>
      </div> 
      <aside className="w-full mx-auto">
        <p className="text-center">Copyright © 2024 - All right reserved by Ola & Krystian & Tomek :)</p>
      </aside>
    </footer>
  );
};

export default Footer;
