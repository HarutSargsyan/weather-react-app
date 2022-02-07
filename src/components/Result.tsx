import React from "react";
import styled from "styled-components";
import useResultFields from "../hooks/useResultFields";
import { View, Return } from "../util/index";

const ResultsWrepper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ResultWrapper = styled.div`
  display: flex;
  margin-bottom: 13px;
`;

const Card = styled.div`
  position: relative;
  width: 20rem;
  min-height: 23rem;
  background-color: white;
  border-radius: 12px;
  padding: 5px;
  margin: 0 auto;
`;

const IconWrapper = styled.div`
  height: 1.7rem;
  width: 1.7rem;
  margin-right: 5px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
  filter: ${({ isLoading }: { isLoading: boolean }) =>
    isLoading ? "blur(5px)" : ""};
`;

interface Props<T> {
  isLoading: boolean;
  result: T;
  imageUrl: string | undefined;
}

const Result = ({ isLoading, result, imageUrl }: Props<View>) => {
  const results = useResultFields(result);
  if (!result)
    return (
      <p style={{ textAlign: "center" }}>
        Please, unable us to see your location or type your city name...
      </p>
    );
  return (
    <Card>
      <div>
        <Image isLoading={isLoading} src={imageUrl} />
      </div>
      <div style={{ padding: "10px", marginBottom: "20px" }}>
        <h3 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
          {result?.name}
        </h3>
        <hr />
      </div>
      <ResultsWrepper>
        {results.map(({Icon, sign, key, text}: Return) => (
          <ResultWrapper key={key}>
            <IconWrapper>
              <Icon />
            </IconWrapper>
            <p style={{ fontSize: "1.3rem", color: "grey" }}>
              {text} {sign}
            </p>
          </ResultWrapper>
        ))}
      </ResultsWrepper>
    </Card>
  );
};

export default Result;
