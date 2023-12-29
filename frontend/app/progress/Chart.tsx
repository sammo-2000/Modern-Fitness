"use client";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
);

interface LineChartProps {
  numberOfWeeks: number[];
  totalLoadsPerWeek: number[];
  LoggedSets: number | undefined;
  LoggedReps: number | undefined;
  LoggedLoads: number | undefined;
  CreatedLoads: number | undefined;
  CreatedSets: number | undefined;
  CreatedReps: number | undefined;
}
const LineChart: React.FC<LineChartProps> = ({
  numberOfWeeks,
  totalLoadsPerWeek,
  LoggedSets,
  LoggedReps,
  LoggedLoads,
  CreatedLoads,
  CreatedSets,
  CreatedReps,
}) => {
  const data = {
    labels: numberOfWeeks.map((data) => data),
    datasets: [
      {
        label: "Progress",
        data: totalLoadsPerWeek.map((data) => data),
        borderColor: "#1d4ed8",
        borderWidth: 2,
        pointBorderColor: "#cb0c9f",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#f797e1");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true, // Display the legend
        labels: {
          font: {
            size: 20,
            weight: "bold" as "bold",
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          font: {
            size: 17,
            weight: "bold" as "bold",
          },
        },
        title: {
          display: true,
          text: "Workdone",
          padding: {
            bottom: 10,
          },
          font: {
            size: 30,
            style: "italic" as "italic",
            family: "Arial",
          },
        },
        min: 50,
      },
      x: {
        ticks: {
          font: {
            size: 17,
            weight: "bold" as "bold",
          },
        },
        title: {
          display: true,
          text: "Weeks",
          padding: {
            top: 10,
          },
          font: {
            size: 30,
            style: "italic" as "italic",
            family: "Arial",
          },
        },
      },
    },
  };

  return (
    <>
      {/* <h1 className="mb-6 mt-10 text-center text-3xl font-bold text-gray-500">
        Live update of workout progress
      </h1> */}

      <div className=" mb-12 flex w-full flex-wrap justify-center gap-3 shadow-lg">
        <div className=" m-2 min-w-[16rem] flex-grow rounded-lg border border-x-2 border-y-2 p-4 shadow-lg">
          <div className="mt-3 text-center">
            <h2 className=" mb-7 text-lg font-bold text-gray-500">
              {" "}
              Set Achieved
            </h2>
            <p className=" mb-6 text-3xl font-extrabold text-blue-500">
              {LoggedSets}
            </p>
          </div>
          <div className=" float-right">
            <h2 className="mb-2 text-base font-extrabold text-gray-400">
              {" "}
              Goal
            </h2>
            <p className=" mb-3 pl-2 text-sm font-extrabold text-gray-700">
              {CreatedSets}
            </p>
          </div>
        </div>
        <div className=" m-2 min-w-[16rem] flex-grow rounded-lg  border border-x-2 border-y-2 p-4 shadow-lg">
          <div className="mt-4 text-center">
            <h2 className=" mb-7 text-lg font-bold text-gray-500">
              {" "}
              Reps Achieved
            </h2>
            <p className=" mb-6 text-3xl font-extrabold text-blue-500">
              {LoggedReps}
            </p>
          </div>
          <div className=" float-right">
            <h2 className="mb-2 text-base font-extrabold text-gray-400">
              {" "}
              Goal
            </h2>
            <p className=" mb-3 pl-2 text-sm font-extrabold text-gray-700 ">
              {CreatedReps}
            </p>
          </div>
        </div>
        <div className=" m-2 min-w-[16rem] flex-grow rounded-lg  border border-x-2 border-y-2 p-4 shadow-lg ">
          <div className="mt-4 text-center">
            <h2 className=" mb-7 text-lg font-bold text-gray-500">
              {" "}
              Loads Achieved
            </h2>
            <p className=" mb-6 text-3xl font-extrabold text-blue-500">
              {LoggedLoads} kg
            </p>
          </div>
          <div className=" float-right">
            <h2 className="mb-2 text-base font-extrabold text-gray-400">
              {" "}
              Goal
            </h2>
            <p className=" mb-3 pl-2 text-sm font-extrabold text-gray-700">
              {CreatedLoads} kg
            </p>
          </div>
        </div>
      </div>

      <div className="graph-container h-[80vh] w-full p-5">
        <Line data={data} options={options}></Line>
      </div>
    </>
  );
};

export default LineChart;
