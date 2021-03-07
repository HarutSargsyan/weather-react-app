import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Result from "./components/Result";
import styled from "styled-components";
import Footer from "./components/Footer";
import usePostCity from "./hooks/usePostCity";
import useGetDefaultWeather from "./hooks/useDefaultWeather";

const ViewWrapper = styled.main`
  padding: 20px 40px;
  background: linear-gradient(to right, #56ab2f, #a8e063);
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
  height: 90vh;
`;

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onCitySubmit, response, isError, image } = usePostCity({
    setIsLoading,
  });
  const { defaultImage, defaultResponse } = useGetDefaultWeather();
  return (
    <>
      <ViewWrapper>
        <SearchBar isError={isError} onTermSubmit={onCitySubmit} />
        <Result
          isLoading={isLoading}
          result={response ? response : defaultResponse}
          imageUrl={image ? image : defaultImage}
        />
      </ViewWrapper>
      <Footer />
    </>
  );
};
