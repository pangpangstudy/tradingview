import { useEffect, useRef } from "react";
import "./App.css";
import { ColorType, createChart } from "lightweight-charts";
const initialData = [
  { time: "2018-12-22", value: 32.51 },
  { time: "2018-12-23", value: 31.11 },
  { time: "2018-12-24", value: 27.02 },
  { time: "2018-12-25", value: 27.32 },
  { time: "2018-12-26", value: 25.17 },
  { time: "2018-12-27", value: 28.89 },
  { time: "2018-12-28", value: 25.46 },
  { time: "2018-12-29", value: 23.92 },
  { time: "2018-12-30", value: 22.68 },
  { time: "2018-12-31", value: 22.67 },
];
function Simple() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };
    const chart = createChart(chartContainerRef.current!, {
      layout: {
        background: { type: ColorType.Solid, color: "black" },
        textColor: "red",
      },
      width: chartContainerRef.current!.clientWidth,
      height: 300,
    });
    const newSeries = chart.addAreaSeries({
      lineColor: "red",
      topColor: "black",
      bottomColor: "red",
    });
    chart.timeScale().fitContent();
    newSeries.setData(initialData);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);
  return <div ref={chartContainerRef} style={{ width: "500px" }}></div>;
}

export default Simple;
