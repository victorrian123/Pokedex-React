import React from "react";
import Pagination from "./Pagination";
import Pokemon from "./Pokemon";

const Pokedex = ({ pokemonsAll, loading, page, setPage, totalPages }) => {
  const onLeftClickHandler = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const onRigthClickHandler = () => {
    if (page + 1 !== totalPages) {
      setPage(page + 1);
    }
  };
  return (
    <div>
      <div className='pokedex-header'>
        <h1>Pokedex</h1>
        <Pagination
          page={page + 1}
          totalPages={totalPages}
          onLeftClick={onLeftClickHandler}
          onRigthClick={onRigthClickHandler}
        />
      </div>
      {loading ? (
        <div>Carregando, Aguarde</div>
      ) : (
        <div className='pokedex-grid'>
          {pokemonsAll &&
            pokemonsAll.map((poke, index) => {
              return <Pokemon pokemon={poke} key={index} />;
            })}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
