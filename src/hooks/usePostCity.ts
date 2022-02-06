import { useState } from "react";
import weather from "../api/weather";
import imageAPI from "../api/image";
import { filterUnfitImages, Result } from "../util/index";

interface Image {
  imageWidth: string;
  imageHeight: string;
  largeImageURL: string;
}

export default () => (): Result => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);

  const fetchWeather = async ({ cityName }: { cityName: string }) => {
    setIsLoading(true);
    try {
      const { data } = await weather.get("/weather", {
        params: {
          q: cityName,
        },
      });
      const {
        data: { hits },
      } = await imageAPI.get("/", {
        params: {
          q: cityName,
          image_type: "photo",
        },
      });
      const image = await filterUnfitImages(hits);
      image && setImage(image?.largeImageURL);
      setResponse(data);
    } catch (err) {
      setIsError(true);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      },500)
      // delay to setup the image
    }
  };

  const onCitySubmit = async (cityName: string) => {
    setIsError(false);
    fetchWeather({ cityName });
  };

  return { onCitySubmit, response, isError, image, isLoading };
};
