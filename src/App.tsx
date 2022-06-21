import React from "react";
import SearchBar from "./components/SearchBar";
import Result from "./components/Result";
import styled from "styled-components";
import Footer from "./components/Footer";
import usePostCity from "./hooks/usePostCity";
import useGetDefaultWeather from "./hooks/useDefaultWeather";

const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const ViewWrapper = styled.main`
  padding: 20px 40px;
  background: linear-gradient(to right, #56ab2f, #a8e063);
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
  height: 90vh;
  padding-bottom: 2.5rem;
`;

export default () => {
  const postCity = usePostCity();
  const { onCitySubmit, response, isError, image, isLoading } = postCity();
  const { defaultImage, defaultResponse } = useGetDefaultWeather();

  return (
    <PageWrapper>
      <ViewWrapper>
        <SearchBar isError={isError} onTermSubmit={onCitySubmit} />
        <Result
          isError = {isError}
          isLoading={isLoading}
          result={response ? response : defaultResponse}
          imageUrl={image ? image : defaultImage}
        />
      </ViewWrapper>
      <Footer />
    </PageWrapper>
  );
};
