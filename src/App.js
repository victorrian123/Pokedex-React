import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Pokedex from "./components/Pokedex";
import { getPokemon, getPokemonData, searchPokemon } from "./Api";
import { FavoriteProvider } from "./contexts/FavoriteContext";
const favoritesKey = "Favoritos";
function App() {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const itensPerPage = 24;
  const [favorites, setFavorites] = useState([]);
  const [pokemonsAll, setPokemonsAll] = useState([]);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemon(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemonsAll(results);
      setLoading(false);
      setTotalPage(Math.ceil(data.count / itensPerPage));
    } catch (error) {
      console.log("fetch", error);
    }
  };

  const loadFavoritesPokemons = () => {
    const pokemons =
      JSON.parse(window.localStorage.getItem(favoritesKey)) || "";
    setFavorites(pokemons);
  };

  useEffect(() => {
    loadFavoritesPokemons();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites];
    const favoriteIndex = favorites.indexOf(name);
    if (favoriteIndex >= 0) {
      updatedFavorites.splice(favoriteIndex, 1);
    } else {
      updatedFavorites.push(name);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const onSearchHandler = async (pokemon) => {
    if (!pokemon) {
      fetchPokemons();
    }

    setLoading(true);
    setNotFound(false);
    const result = await searchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
    } else {
      setPokemonsAll([result]);
    }
    setLoading(false);
  };

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}>
      <div>
        <Navbar />
        <SearchBar onSearchHandler={onSearchHandler} />
        {notFound ? (
          <div>Nao encontrado</div>
        ) : (
          <Pokedex
            pokemonsAll={pokemonsAll}
            loading={loading}
            page={page}
            setPage={setPage}
            totalPages={totalPage}
          />
        )}
      </div>
    </FavoriteProvider>
  );
}

export default App;
