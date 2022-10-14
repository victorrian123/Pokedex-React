import React, { useContext } from "react";
import FavoriteContext from "../contexts/FavoriteContext";

const Navbar = () => {
  const { favoritePokemons } = useContext(FavoriteContext);
  const heart = "❤";
  const urlImage =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";
  return (
    <nav>
      <div>
        <img src={urlImage} alt='Poke-API' className='navbar_img' />
      </div>
      <div>
        {heart}
        {favoritePokemons.length}
      </div>
    </nav>
  );
};

export default Navbar;
