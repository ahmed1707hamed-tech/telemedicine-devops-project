import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartCard = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        padding: 12,
        titleFont: { size: 14, weight: '600' },
        bodyFont: { size: 13 },
        cornerRadius: 8,
        displayColors: false,
        borderColor: '#334155',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { size: 12 } }
      },
      y: {
        grid: { color: '#1e293b' },
        ticks: { color: '#64748b', font: { size: 12 }, stepSize: 1 }
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Appointments',
        data: data.map(d => d.count),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointRadius: 4,
      }
    ]
  };

  return (
    <div className="p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-xl col-span-1 lg:col-span-3">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-100 tracking-tight">Appointment Activity</h3>
          <p className="text-slate-500 text-sm mt-1">Real-time daily patient visits</p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            LIVE DATA
          </span>
        </div>
      </div>
      <div className="h-[320px]">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default ChartCard;
