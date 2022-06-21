import { useEffect, useState } from "react";
import weather from "../api/weather";
import imageAPI from "../api/image";
import noImage from "../icons/no-image.jpeg";
import { filterUnfitImages, Result } from "../util/index";

const fecthWeatherData = async (cityName: string) => {
  const { data } = await weather.get("/weather", {
    params: {
      q: cityName,
    },
  });
  return data;
};

const fetchImage = async (cityName: string) => {
  const {
    data: { hits },
  } = await imageAPI.get("/", {
    params: {
      q: cityName,
      image_type: "photo",
    },
  });
  const image = filterUnfitImages(hits);
  return image;
};

export default () => (): Result => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if(isLoading) setIsLoading(false);
  },[image])

  const fetchWeather = async ({ cityName }: { cityName: string }) => {
    setIsLoading(true);
    try {
      const [data, image] = await Promise.all([
        fecthWeatherData(cityName),
        fetchImage(cityName),
      ]);

      if (!image) setImage(noImage);
      image && setImage(image?.largeImageURL);
      setResponse(data);
    } catch (err) {
      setIsLoading(false);
      setImage(noImage);
      setIsError(true);
    }
  };

  const onCitySubmit = async (cityName: string) => {
    setIsError(false);
    fetchWeather({ cityName });
  };

  return { onCitySubmit, response, isError, image, isLoading };
};
