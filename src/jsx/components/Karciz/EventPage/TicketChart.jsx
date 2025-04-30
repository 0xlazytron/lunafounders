import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
class TicketChart extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Sales Stats",
          backgroundColor: [
            "rgba(180, 19, 19, 0.1)",
            "rgba(108, 3, 3, 0.1)",
            "rgba(180, 19, 19, 0.1)",
            "rgba(108, 3, 3, 0.1)",
            "rgba(180, 19, 19, 0.1)",
            "rgba(108, 3, 3, 0.1)",
            "rgba(180, 19, 19, 0.1)",
            "rgba(108, 3, 3, 0.1)",
            "rgba(180, 19, 19, 0.1)",
            "rgba(108, 3, 3, 0.1)",
            "rgba(180, 19, 19, 0.1)",
            "rgba(108, 3, 3, 0.1)",
            "rgba(180, 19, 19, 0.1)",
            "rgba(108, 3, 3, 0.1)",
            "rgba(180, 19, 19, 0.1)",
            "rgba(108, 3, 3, 0.1)",
            "rgba(180, 19, 19, 0.1)",
            "rgba(108, 3, 3, 0.1)",
            "rgba(180, 19, 19, 0.1)",
            "rgba(108, 3, 3, 0.1)",
          ],
          borderColor: "#B41313",
          pointBorderColor: "#B41313",
          borderWidth: 4,
          borderRadius: 10,
          tension: 0.5,
          fill: true,
          pointHoverBackgroundColor: "#B41313",
          pointHoverBorderColor: "#6C0303",
          data: [0, 2, 4, 3, 6],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
          intersect: false,
          mode: "nearest",

          padding: 10,
          caretPadding: 10,
        },
        responsive: !0,
        maintainAspectRatio: !1,
        hover: {
          mode: "index",
        },
      },
      /* title: {
				display: !1
			}, */
      /* tooltips: {
				intersect: !1,
				mode: "nearest",
				xPadding: 10,
				yPadding: 10,
				caretPadding: 10
			}, */
      /* legend: {
				display: false
			}, */

      /* hover: {
				mode: "index"
			}, */
      scales: {
        x: {
          display: !1,
          gridLines: !1,
          scaleLabel: {
            display: !0,
            labelString: "Month",
          },
        },
        y: {
          display: !1,
          gridLines: !1,
          scaleLabel: {
            display: !0,
            labelString: "Value",
          },
          ticks: {
            beginAtZero: false,
          },
        },
      },
      elements: {
        point: {
          radius: 0,
          borderWidth: 0,
        },
        line: {
          tension: 0,
        },
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 5,
          bottom: 0,
        },
      },
    };
    return (
      <>
        <Line data={data} height={85} options={options} />
      </>
    );
  }
}

export default TicketChart;
