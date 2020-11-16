import { useState } from "react";
import weather from "../api/weather";
import imageAPI from "../api/image";
import { filterUnfitImages, Result } from "../util/index";
import { AxiosResponse } from "axios";

const usePostcity = (): Result => {
  const [response, setResponse] = useState();
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);

  const onCitySubmit = (cityName: string): void => {
    setIsError(false);
    weather
      .get("/weather", {
        params: {
          q: cityName,
        },
      })
      .then((res: AxiosResponse) => {
        setResponse(res.data);
      })
      .then(() => {
        imageAPI
          .get("/", {
            params: {
              q: cityName,
              image_type: "photo",
            },
          })
          .then((res: AxiosResponse) => {
            const image = filterUnfitImages(res.data.hits);
            image && setImage(image?.largeImageURL);
          })

          .catch((err) => {
            console.error(err);
          });
      })
      .catch(() => {
        setIsError(true);
      }); 
  };

  return { onCitySubmit, response, isError, image };
};

export default usePostcity;