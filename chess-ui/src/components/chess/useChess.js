import { useEffect, useState, useMemo } from "react";
import socket from "../../socket";

const useChess = ({
  whiteChess,
  bleckChess,
}) => {
  const desk = useMemo(
    () =>
      [
        ["o", "o", "o", "o", "o", "o", "o", "o"],
        ["o", "o", "o", "o", "o", "o", "o", "o"],
        ["o", "o", "o", "o", "o", "o", "o", "o"],
        ["o", "o", "o", "o", "o", "o", "o", "o"],
        ["o", "o", "o", "o", "o", "o", "o", "o"],
        ["o", "o", "o", "o", "o", "o", "o", "o"],
        ["o", "o", "o", "o", "o", "o", "o", "o"],
        ["o", "o", "o", "o", "o", "o", "o", "o"],
      ].map((row, rowIndex) =>
        row.map((_, cellIndex) => {
          const isAccessible = !!(rowIndex % 2
            ? !(cellIndex % 2)
            : cellIndex % 2);

          return {
            y: (100 / 8) * rowIndex + 100 / 8 / 2,
            x: (100 / 8) * cellIndex + 100 / 8 / 2,
            isAccessible,
          };
        })
      ),
    []
  );

  const memoPositions = useMemo(
    () =>
      desk.reduce(
        (arr, row, rowIndex) => [
          ...arr,
          ...row.reduce((arr, cell, cellIndex) => {
            const isAccessible = !!(rowIndex % 2
              ? !(cellIndex % 2)
              : cellIndex % 2);

            return isAccessible ? [...arr, { ...cell }] : arr;
          }, []),
        ],
        []
      ),
    []
  );



  const [movedPieceCoords, setMovedPieceCoords] = useState({ x: 0, y: 0 });
  const [movedPiece, setMovedPiece] = useState(null);

  useEffect(() => {
    socket.on("gameRoomWasCreated", (...rest) => {
      console.log({ rest });
      // setWhiteChess(positionsWhite);
      // setBleckChess(positionsBleck);
    });
  }, []);

  const handleMouseMove = (event) => {
    let currentTargetRect = event.currentTarget.getBoundingClientRect();

    const event_offsetX = event.pageX - currentTargetRect.left;
    const event_offsetY = event.pageY - currentTargetRect.top;
    const x = event_offsetX * (100 / event.currentTarget.offsetWidth);
    const y = event_offsetY * (100 / event.currentTarget.offsetHeight);
    setMovedPieceCoords({ x, y });
  };

  const handleMouseDown = ({ target }) => {
    const cellNum = target.getAttribute("data-cell");
    cellNum && setMovedPiece(+cellNum);
  };

  const handleMouseUp = ({ target }) => {
    const cellNum = target.getAttribute("data-cell");
    const isAccessible = !!+target.getAttribute("data-accessible");

    if (cellNum && isAccessible) {
      setMovedPiece(null);
      socket.emit(
        "changeChessPosition",
        whiteChess.map((e) => (e === movedPiece ? +cellNum : e)),
        bleckChess.map((e) => (e === movedPiece ? +cellNum : e))
      );
    }
    setMovedPiece(null);
  };

  return {
    desk,
    memoPositions,
    whiteChess,
    // setWhiteChess,
    bleckChess,
    // setBleckChess,
    movedPieceCoords,
    setMovedPieceCoords,
    movedPiece,
    setMovedPiece,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
  };
};

export default useChess;
