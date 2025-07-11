// BarChart.jsx
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, scales } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ labels, dataValues }) {
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Facturas vencidas',
                data: dataValues,
                backgroundColor: '#c9ced6ff',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // 👈 elimina líneas verticales
                },
            },
            y: {
                grid: {
                    display: false, // 👈 elimina líneas horizontales
                },
            },
        },
    };

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <Bar data={data} options={options} />
        </div>
    );
}

export default BarChart;