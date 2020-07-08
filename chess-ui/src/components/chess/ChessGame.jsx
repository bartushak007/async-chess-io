import React, { useMemo } from "react";
import socket from "../../socket";
import useChess from "./useChess";
import classnames from "classnames";

import Row from "./Row";
import styles from "./chess.module.scss";

function Board() {
  const {
    desk,
    memoPositions,
    whiteChess,
    blackChess,
    movedPieceCoords,
    movedPiece,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
  } = useChess();

  const optimizeRenderGame = useMemo(
    () => (
      <>
        {desk.map((row, i) => (
          <Row key={i} {...{ row, i }} />
        ))}
        {whiteChess.map((position, j) => (
          <div
            key={j}
            className={styles.piece}
            style={{
              top: `${memoPositions[position].y}%`,
              left: `${memoPositions[position].x}%`,
              opacity: +whiteChess[movedPiece] === +position ? "0.5" : "1",
            }}
          />
        ))}
        {blackChess.map((position, j) => (
          <div
            key={j}
            className={classnames(styles.piece, styles["piece--white"])}
            style={{
              top: `${memoPositions[position].y}%`,
              left: `${memoPositions[position].x}%`,
              opacity: +whiteChess[movedPiece] === +position ? "0.5" : "1",
            }}
          />
        ))}
      </>
    ),
    [whiteChess, blackChess, movedPiece]
  );

  return (
    <div className={styles.chess}>
      <button
        onClick={() => {
          socket.emit("changeChessPosition");
        }}
      >
        Start
      </button>
      <div className={styles["board-container"]}>
        <div
          className={styles.board}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          // onTouchMove={(e) => {
          //   const clientX = e.touches[0].clientX;
          //   const clientY = e.touches[0].clientY;

          //   console.log({ clientX, clientY });
          // }}
        >
          {optimizeRenderGame}
          {movedPiece && (
            <div
              className={classnames(styles.piece, {
                [styles["piece--white"]]: blackChess.includes(+movedPiece),
              })}
              style={{
                top: `${movedPieceCoords.y}%`,
                left: `${movedPieceCoords.x}%`,
                transition: "0s",
                cursor: "pointer",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Board;
