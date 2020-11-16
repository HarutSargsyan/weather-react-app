import React from "react";
import SearchBar from "./components/SearchBar";
import Result from "./components/Result";
import styled from "styled-components";
import Footer from "./components/Footer";
import usePostCity from "./hooks/usePostCity";

const ViewWrapper = styled.main`
  padding: 20px 40px;
  background: linear-gradient(to right, #56ab2f, #a8e063);
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
  height: 90vh;
`;

const App =  () => {
  const { onCitySubmit, response, isError, image } = usePostCity();
  return (
    <>
      <ViewWrapper>
        <SearchBar isError={isError} onTermSubmit={onCitySubmit} />
        <Result result={response} imageUrl={image} />
      </ViewWrapper>
      <Footer />
    </>
  );
};

export default App;