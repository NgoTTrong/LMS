"use client";
import React, { useEffect, useState } from "react";
import LineConnector from "./line-connector";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { PROBLEM_SET } from "./problem-sets";

import {
  ConnectPoint,
  Point,
} from "@/interfaces/mini-game/mini-game-interface";

export default function Hello() {
  const delimiter = "-";
  const [pageIdx, setPageIdx] = useState<number>(0);
  const [left, setLeft] = useState<string[]>([]);
  const [right, setRight] = useState<string[]>([]);
  const [connectPoints, setConnectPoints] = useState<ConnectPoint[]>([]);
  const [from, setFrom] = useState<Point>();
  const [to, setTo] = useState<Point>();

  useEffect(() => {
    setLeft(PROBLEM_SET[pageIdx].left);
    setRight(PROBLEM_SET[pageIdx].right);
    setConnectPoints([]);
    setFrom(undefined);
    setTo(undefined);
  }, [pageIdx]);

  const handleSelectLeft = (event: any, valueLeft: string) => {
    const rect = event.target.getBoundingClientRect();
    const centerX = rect.left + rect.width;
    const centerY = rect.top + rect.height / 2;
    setFrom({
      value: valueLeft,
      x: centerX,
      y: centerY,
    });
  };

  const handleSelectRight = (event: any, valueRight: string) => {
    const rect = event.target.getBoundingClientRect();
    const centerX = rect.left;
    const centerY = rect.top + rect.height / 2;
    const to = {
      value: valueRight,
      x: centerX,
      y: centerY,
    };
    setTo(to);
    if (from && to) {
      const connectPoint: ConnectPoint = {
        from: from,
        to: to,
      };
      const filterExistConnectionPoints = connectPoints.filter(
        (e) => e.from.value !== from.value && e.to.value !== to.value
      );
      setConnectPoints([...filterExistConnectionPoints, connectPoint]);
    }
  };

  const goToPreviousPage = () => {
    if (pageIdx !== 0) {
      setPageIdx(pageIdx - 1);
    }
  };

  const goToNextPage = () => {
    if (pageIdx < PROBLEM_SET.length - 1) {
      setPageIdx(pageIdx + 1);
    }
  };

  const isComplete = PROBLEM_SET[pageIdx].answer.every((key) =>
    connectPoints
      .map((e) => `${e.from.value}${delimiter}${e.to.value}`)
      .includes(key)
  );

  return (
    <div className="py-5">
      <div className="p-3">
        <span className="text-green-500 flex h-6">
          {isComplete ? (
            <div>
              Congratulations on completing the mini-game, please proceed to the
              next level.
            </div>
          ) : (
            ""
          )}
        </span>
      </div>
      <div className="flex justify-around items-center px-20">
        <div>
          {left.map((item, index) => (
            <div
              key={index}
              className={`bg-[wheat] p-4 rounded-lg ${
                index === left.length - 1 ? "" : "mb-2"
              } cursor-pointer`}
              onClick={(event) => handleSelectLeft(event, item)}
            >
              {item}
            </div>
          ))}
        </div>
        <div>
          {right.map((item, index) => (
            <div
              key={index}
              className={`bg-[antiquewhite]  p-4 rounded-lg ${
                index === right.length - 1 ? "" : "mb-2"
              } cursor-pointer`}
              onClick={(event) => handleSelectRight(event, item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {connectPoints.map((item, index) => (
        <LineConnector
          key={index}
          from={item.from}
          to={item.to}
          pageIdx={pageIdx}
        />
      ))}
      <div className="flex justify-center p-4">
        <button
          className="px-4"
          onClick={goToPreviousPage}
          disabled={pageIdx === 0}
        >
          <ChevronLeft
            size="24"
            className={pageIdx === 0 ? "text-gray-400" : "text-black"}
          />
        </button>
        <p>{pageIdx}</p>
        <button
          className="px-4"
          onClick={goToNextPage}
          disabled={pageIdx === PROBLEM_SET.length - 1}
        >
          <ChevronRight
            size="24"
            className={
              pageIdx === PROBLEM_SET.length - 1
                ? "text-gray-400"
                : "text-black"
            }
          />
        </button>
      </div>
    </div>
  );
}
