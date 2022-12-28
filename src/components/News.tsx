import { Avatar, Card, Col, Row, Select } from "antd";
import React, { FC, useState } from "react";
import { useGetCryptosNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";
import { Typography } from "antd";
import moment from "moment";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { currencyTypes } from "./Cryptocurrencies";
const { Title, Text } = Typography;
const { Option } = Select;
interface cryptoNewsProps {
  url: string;
  name: string;
  image: {
    thumbnail: {
      contentUrl: string;
    };
  };
  description: string;
  provider: [
    {
      image: {
        thumbnail: {
          contentUrl: string;
        };
      };
      name: string;
    }
  ];
  datePublished: string;
}
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News: FC<{ simplified: boolean }> = ({ simplified }) => {
  const [newsCategory, setNewCategory] = useState("Cryptocurrency");
  const { data: cryptoList } = useGetCryptosQuery(100);
  const count = simplified ? 6 : 100;
  const { data: cryptoNews } = useGetCryptosNewsQuery({
    newsCategory,
    count,
  });

  if (!cryptoNews?.value) return <Loader />;
  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select<string, { value: string; children: string }>
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value: string) => setNewCategory(value)}
              filterOption={(input, option) =>
                option!.children!.toLowerCase().indexOf(input?.toLowerCase()) >=
                0
              }
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {cryptoList?.data?.coins?.map((coin: currencyTypes) => (
                <Option value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}
      </Row>
      <Row gutter={[24, 24]}>
        {cryptoNews?.value.map((news: cryptoNewsProps, index: number) => {
          return (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card hoverable className="news-card">
                <div className="news-image-container">
                  <div className="news-top">
                    <Title className="news-title" level={4}>
                      {news.name.length > 50
                        ? `${news.name.substring(0, 50)}...`
                        : news.name}
                    </Title>
                    <img
                      src={news?.image?.thumbnail?.contentUrl || demoImage}
                      alt="newsImg"
                      className="img"
                    />
                  </div>
                  <p>
                    {news.description.length > 100
                      ? `${news.description.substring(0, 130)}...`
                      : news.description}
                  </p>
                  <a href={news.url} target="_blank" rel="noreferrer">
                    Read More
                  </a>
                  <div className="provider-container">
                    <div>
                      <Avatar
                        src={
                          news.provider[0]?.image?.thumbnail?.contentUrl ||
                          demoImage
                        }
                        alt="news"
                      />
                      <Text className="provider-name">
                        {news.provider[0]?.name}
                      </Text>
                    </div>
                    <Text>
                      {moment(news.datePublished).startOf("second").fromNow()}
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default News;
