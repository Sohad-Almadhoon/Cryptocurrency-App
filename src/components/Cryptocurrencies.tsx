import React, { FC, useState, useEffect } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import { Row, Col, Card, Input } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";
export interface currencyTypes {
  uuid: string;
  name: string;
  rank: number;
  iconUrl: string;
  marketCap: number;
  change: number;
  price: number;
}
const Cryptocurrencies: FC<{ simplified: boolean }> = ({ simplified }) => {
  const { data: cryptoList, isFetching } = useGetCryptosQuery(simplified ? 10 : 100);
  let [crypto, setCrypto] = useState <currencyTypes[]>();
  const [term, setSearchTerm] = useState("");
  useEffect(() => {
    const filterdItems = cryptoList?.data?.coins?.filter(
      (coin: currencyTypes) => coin.name.toLowerCase().includes(term)
    );
    setCrypto(filterdItems);
  }, [cryptoList, term]);
  if (isFetching) return <Loader />;
  return (
    <>
      <div>
        {!simplified && (
          <div className="search-crypto">
            <Input
              placeholder="search"
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
          </div>
        )}
      </div>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {crypto?.map((currency: currencyTypes) => {
          
          return (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={currency.uuid}
            >
              <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  title={`${currency.name} - ${currency.rank}`}
                  extra={
                    <img
                      src={currency.iconUrl}
                      className="crypto-image"
                      alt="crypto-img"
                    />
                  }
                  hoverable
                >
                  <p> Price: {millify(currency.price)}</p>
                  <p> Market Cap: {millify(currency.marketCap)}</p>
                  <p> Daily Changes: {millify(currency.change)}%</p>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
