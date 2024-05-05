export interface Point {
  value: string;
  x: number;
  y: number;
}

export interface ConnectPoint {
  from: Point;
  to: Point;
  pageIdx?: number;
}
