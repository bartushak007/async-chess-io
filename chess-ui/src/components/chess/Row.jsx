import React from "react";
import style from "./chess.module.scss";

const Row = ({ row, i }) => {
  return (
    <div className={style.row}>
      {row.map(({ isAccessible }, j) => (
        <div
          className={`${style.cell} ${i % 2 === 0 ? style["cell--even"] : style["cell--odd"]}`}
          data-cell={isAccessible && Math.ceil((j + 1) / 2 + i * 4) - 1}
          data-accessible={+isAccessible}
          key={j}
        >
          {isAccessible && Math.ceil((j + 1) / 2 + i * 4)}
          {/* y: {y}
          x: {x} */}
          {/* z: {isAccessible && "cool"} */}
          {/* {elem !== o && (
            <div className={`piece ${elem === x ? "piece--white" : ""}`} />
          )} */}
        </div>
      ))}
    </div>
  );
};

export default Row;
