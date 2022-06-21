import React from "react";
import styled, { keyframes } from "styled-components";
import useDetailFields from "../hooks/useDetailFields";
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
  min-height: ${(props) => props.isError ? "10rem" : "23rem"};
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
  min-width: 20rem;
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`;

const lazyLoadAnimation = keyframes`
  0% {
    opacity: 100%;
  }

  20%{
    opacity: 50%;
  }

  100%{
    opacity:100%;
  }
`;

const LazyLoader = styled.div`
  width: ${({ width }:{width:string}) => width};
  height: ${({height}:{height: string}) => height};
  background-color: grey;
  margin-bottom: 30px;
  opacity: 0;
  animation: 0.5s ${lazyLoadAnimation} linear infinite;
  border-radius: 8px;
`;

interface Props<T> {
  isLoading: boolean;
  result: T;
  imageUrl: string | undefined;
  isError: boolean;
}

const Result = ({ isLoading, result, imageUrl, isError }: Props<View>) => {
  const details = useDetailFields(result);
  if (!result)
    return (
      <p style={{ textAlign: "center" }}>
        Please, unable us to see your location or type your city name...
      </p>
    );
  return (
    <Card isError={isError}>
      {isLoading ? (
        <LazyLoader width="20rem" height="10rem" />
      ) : (
        <div>
          <Image src={imageUrl} />
        </div>
      )}

      {!isError &&
        (isLoading ? (
          <LazyLoader width="20rem" height="3rem" />
        ) : (
          <div style={{ padding: "10px", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
              {result?.name}
            </h3>
            <hr />
          </div>
        ))}
      {!isError && (
        isLoading ? <LazyLoader width="20rem" height="5rem" /> :
        <ResultsWrepper>
          {details.map(({ Icon, sign, key, text }: Return) => (
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
      )}
    </Card>
  );
};

export default Result;
