import React from "react";

const Pagination = ({ page, totalPages, onLeftClick, onRigthClick }) => {
  return (
    <div className='pagination-container'>
      <button onClick={onLeftClick}>
        <div>◀</div>
      </button>
      <div>
        {page} de {totalPages}
      </div>
      <button onClick={onRigthClick}>
        <div>▶</div>
      </button>
    </div>
  );
};

export default Pagination;
