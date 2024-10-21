// PriorityChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PriorityChart = () => {
  // Sample data for the chart
  const taskData = {
    labels: ["High Priority", "Medium Priority", "Low Priority"],
    datasets: [
      {
        label: "Number of Tasks",
        data: [5, 10, 3], // Replace these values with actual task counts
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // High Priority color
          "rgba(255, 206, 86, 0.6)", // Medium Priority color
          "rgba(75, 192, 192, 0.6)", // Low Priority color
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // High Priority border
          "rgba(255, 206, 86, 1)", // Medium Priority border
          "rgba(75, 192, 192, 1)", // Low Priority border
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Task Priorities",
      },
    },
  };

  return (
    <div className="p-6">
      <Bar data={taskData} options={options} />
    </div>
  );
};

export default PriorityChart;
