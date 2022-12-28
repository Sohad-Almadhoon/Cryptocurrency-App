import { FC } from "react";
import { Typography, Row, Col } from "antd";
import React from "react";
import { Line} from "react-chartjs-2";
import Loader from "./Loader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
const { Title } = Typography;

const LineChart: FC<{
  coinHistory: any;
  currentPrice: string;
  coinName: string;
}> = ({ coinHistory, currentPrice, coinName }) => {
  if (!coinHistory) return <Loader />;
  const change = coinHistory?.data?.change;
  const history = coinHistory?.data?.history;
  const prices: string[] = [];
  const timestamps: string[] = [];
  for (let i = 0; i < history?.length; i++) {
    prices.push(history[i]?.price);
    timestamps.push(
      new Date(history[i]?.timestamp * 1000).toLocaleDateString()
    );
  }
  console.log(timestamps);
  const data = {
    labels: timestamps.reverse(),
    datasets: [
      {
        label: `Price of ${coinName} in USD`,
        data: prices.reverse(),
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Chart Price
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
          <Line data={data}/>
    </>
  );
};

export default LineChart;
