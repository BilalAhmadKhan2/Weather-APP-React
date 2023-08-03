import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import './TempChart.css';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const labels = ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "24:00"];

const TempChart = ({ tempsData }) => {
  const newArray = tempsData;

  const newData = {
    labels,
    datasets: [
      {
        tension: 0.35,
        label: "Temperature (°C)",
        data: newArray,
        borderColor: "#FF0000",
        backgroundColor: "rgba(73, 133, 224, 0.5)",
        borderWidth: 5,
        radius: 3,
        hoverRadius: 10,
        hitRadius: 100,
        pointStyle: "circle",
        color: "#fff",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        display: false,
        color: "#fff",
      },
      x: {
        border: {
          display: false,
          width: 10,
        },
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
          font: {
            family: '"Fira Sans", sans-serif',
            weight: 600,
            size: 15,
          },
        },
      },
    },
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          family: '"Fira Sans", sans-serif',
          size: 15,
        },
        bodyFont: {
          family: '"Fira Sans", sans-serif',
          size: 15,
        },
        padding: 20,
        caretSize: 10,
        displayColors: false,
      },
      legend: {
        display: true,
        position: "bottom",
        title: {
          display: false,
          text: "Yes",
          color: "#000",
        },
        strokeStyle: "#000",
        labels: {
          color: "#fff",
          padding: 20,
          font: {
            family: '"Fira Sans", sans-serif',
            weight: 600,
            size: 25,
          },
          pointStyle: "line",
          usePointStyle: true,
          pointStyleWidth: 0.001,
        },
      },
      title: {
        display: false,
        text: "Weather Chart",
      },
    },
  };

  return (
    <div className="temp-chart">
        <h2>Hourly Forecast</h2>
      <Line data={newData} options={options} />
    </div>
  );
};

export default TempChart;
