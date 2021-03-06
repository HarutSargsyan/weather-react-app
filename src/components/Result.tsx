import React from "react";
import styled from "styled-components";
import useResultFields from "../hooks/useResultFields";
import { View, Return } from "../util/index";

const ResyultsWrepper = styled.div`
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
  height: 30px;
  width: 30px;
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
        <h3 style={{ fontSize: "37px", marginBottom: "10px" }}>
          {result?.name}
        </h3>
        <hr />
      </div>
      <ResyultsWrepper>
        {results.map((result: Return) => (
          <ResultWrapper key={result.key}>
            <IconWrapper>
              <result.icon />
            </IconWrapper>
            <p style={{ fontSize: "20px", color: "grey" }}>
              {result.text} {result.sign}
            </p>
          </ResultWrapper>
        ))}
      </ResyultsWrepper>
    </Card>
  );
};

export default Result;
