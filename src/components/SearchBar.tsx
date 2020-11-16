import React, { ChangeEvent, FormEvent, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as Logo } from "../icons/cloudy.svg";
import { ReactComponent as WarnIcon } from "../icons/warning.svg";

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 20px auto;
`;

const NotFoundTransition = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Text = styled.p`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
  text-align: center;
`;

const Input = styled.input`
  min-width: 30vw;
  background: white;
  border-radius: 4px;
  border: transparent;
  height: 3rem;
  padding: 0 0.5rem;
  :focus {
    outline: none !important;
  }
`;

const Button = styled.button`
  background-color: #75bdf7;
  color: white;
  outline: none;
  padding: 0 0.5rem;
  border-radius: 4px;
  border: transparent;
  cursor: pointer;
  font-size: 1rem;
`;

const ErrorWrapper = styled.div`
  margin: 0.5rem auto;
  display: flex;
  animation: 0.3s ${NotFoundTransition} ease-out;
`;

const SearchBar = ({
  isError,
  onTermSubmit,
}: {
  isError: boolean;
  onTermSubmit?(cityName: string): void;
}) => {
  const [cityName, setCityName] = useState<string>("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCityName("");
    onTermSubmit && onTermSubmit(cityName);
  };

  return (
    <SearchBarWrapper>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "3.7rem", height: "3.7rem", marginRight: "10px" }}>
          <Logo />
        </div>
        <Text>Weather Search</Text>
      </div>
      <div style={{ margin: "auto" }}>
        <form onSubmit={onSubmit}>
          <div style={{ display: "flex" }}>
            <Input
              placeholder="Type your city name..."
              type="text"
              value={cityName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCityName(e.target.value);
              }}
            />
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>

      {isError && (
        <ErrorWrapper>
          <div style={{ height: "1rem", width: "1rem" }}>
            <WarnIcon />
          </div>
          <p
            style={{
              color: "red",
              marginLeft: "3px",
            }}
          >
            City is not found
          </p>
        </ErrorWrapper>
      )}
    </SearchBarWrapper>
  );
};

export default SearchBar;
