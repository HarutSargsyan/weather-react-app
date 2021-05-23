import { useState } from "react";
import weather from "../api/weather";
import imageAPI from "../api/image";
import { filterUnfitImages, Result } from "../util/index";
import { AxiosResponse } from "axios";

export default ({
  setIsLoading,
}: {
  setIsLoading(isLoading: boolean): void;
}): Result => {
  const [response, setResponse] = useState();
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);

  const fetchWeather = async ({ cityName }: { cityName: string }) => {
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

      const image = filterUnfitImages(hits);
      image && setImage(image?.largeImageURL);
      setResponse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onCitySubmit = (cityName: string): void => {
    setIsError(false);
    setIsLoading(true);
    fetchWeather({ cityName });
  };

  return { onCitySubmit, response, isError, image };
};
