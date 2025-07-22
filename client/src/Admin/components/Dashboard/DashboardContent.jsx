/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardContent = () => {
  const salesChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total Sales (AED)",
        data: [800, 950, 1100, 1000, 1150, 1256],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const ordersChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Orders",
        data: [15, 18, 20, 22, 23, 24],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const customersChartData = {
    labels: ["New", "Returning"],
    datasets: [
      {
        label: "Customers",
        data: [92, 50],
        backgroundColor: [
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: ["rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const productsChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Products",
        data: [70, 75, 80, 85, 87, 89],
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
              if (context.dataset.label === "Total Sales (AED)") {
                label += " AED";
              }
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 gap-4 py-4 mb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <div className="p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 lg:text-base">
                Total Sales
              </h3>
              <p className="text-2xl font-bold text-green-600 lg:text-3xl">
                1,256.00 AED
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <span className="font-medium text-green-600">+12.5%</span> from last
            month
          </div>
        </div>

        <div className="p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 lg:text-base">
                Orders
              </h3>
              <p className="text-2xl font-bold text-blue-600 lg:text-3xl">24</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <span className="font-medium text-blue-600">+8.2%</span> from last
            month
          </div>
        </div>

        <div className="p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 lg:text-base">
                Customers
              </h3>
              <p className="text-2xl font-bold text-purple-600 lg:text-3xl">
                142
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <span className="font-medium text-purple-600">+15.3%</span> from
            last month
          </div>
        </div>

        <div className="p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 lg:text-base">
                Products
              </h3>
              <p className="text-2xl font-bold text-orange-600 lg:text-3xl">
                89
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <span className="font-medium text-orange-600">+5.1%</span> from last
            month
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
          <h3 className="mb-4 text-sm font-medium text-gray-500 lg:text-base">
            Total Sales
          </h3>
          <div className="h-48">
            <Line data={salesChartData} options={chartOptions} />
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <span className="font-medium text-green-600">+12.5%</span> from last
            month
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
          <h3 className="mb-4 text-sm font-medium text-gray-500 lg:text-base">
            Orders
          </h3>
          <div className="h-48">
            <Bar data={ordersChartData} options={chartOptions} />
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <span className="font-medium text-blue-600">+8.2%</span> from last
            month
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
          <h3 className="mb-4 text-sm font-medium text-gray-500 lg:text-base">
            Customers
          </h3>
          <div className="h-48">
            <Pie data={customersChartData} options={chartOptions} />
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <span className="font-medium text-purple-600">+15.3%</span> from
            last month
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md sm:col-span-2 lg:col-span-1">
          <h3 className="mb-4 text-sm font-medium text-gray-500 lg:text-base">
            Products
          </h3>
          <div className="h-48">
            <Line data={productsChartData} options={chartOptions} />
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <span className="font-medium text-orange-600">+5.1%</span> from last
            month
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DashboardContent;
