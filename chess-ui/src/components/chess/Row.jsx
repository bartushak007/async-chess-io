import React from "react";
import style from "./chess.module.scss";

const Row = ({ row, i }) => {
  return (
    <div className={style.row}>
      {row.map(({ isAccessible }, j) => (
        <div
          key={j}
          className={`${style.cell} ${i % 2 === 0 ? style["cell--even"] : style["cell--odd"]}`}
          data-cell={isAccessible && Math.ceil((j + 1) / 2 + i * 4) - 1}
          data-accessible={+isAccessible}          
        >
          {/* {isAccessible && Math.ceil((j + 1) / 2 + i * 4)} */}
        </div>
      ))}
    </div>
  );
};

export default Row;
