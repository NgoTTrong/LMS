import { ConnectPoint } from "@/interfaces/mini-game/mini-game-interface";
import React from "react";
import { PROBLEM_SET } from "./problem-sets";

const LineConnector: React.FC<ConnectPoint> = ({ from, to, pageIdx }) => {
  const delimiter = "-";
  const answer = PROBLEM_SET[pageIdx ?? 0].answer;
  if (from.x >= to.x) {
    return null;
  }
  const calculateLengthAndAngle = (): {
    length: number;
    angle: number;
    lineConnectorColor: string;
  } => {
    const length = Math.sqrt(
      Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)
    );
    const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);

    let lineConnectorColor = "red";

    if (answer.includes(`${from.value}${delimiter}${to.value}`)) {
      lineConnectorColor = "green";
    }

    return { length, angle, lineConnectorColor };
  };

  const { length, angle, lineConnectorColor } = calculateLengthAndAngle();

  return (
    <div
      className="absolute z-[-1] h-[1px]"
      style={{
        top: `${from.y}px`,
        left: `${from.x}px`,
        width: `${length}px`,
        backgroundColor: lineConnectorColor,
        transformOrigin: "0 0",
        transform: `rotate(${angle}deg)`,
      }}
    ></div>
  );
};

export default LineConnector;
