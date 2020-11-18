import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import weather from "../api/weather";
import imageAPI from "../api/image";
import useGetUserLocation from "./useGetUserLocation";
import { filterUnfitImages } from "../util";

const useDefaultWeather = () => {
  const [response, setResponse] = useState();
  const [image, setImage] = useState<string>();
  const [lat, lon] = useGetUserLocation();
  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    lat &&
      lon &&
      weather
        .get("/weather", {
          params: {
            lat,
            lon,
          },
        })
        .then((res: AxiosResponse) => {
          setResponse(res.data);
          return res.data.name;
        })
        .then((name) => {
          imageAPI
            .get("/", {
              params: {
                q: name,
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
        .catch((err) => {
          console.error(err);
        });
    return () => {
      source.cancel("axios request cancelled");
    };
  }, [lat, lon]);

  return { defaultResponse: response, defaultImage: image };
};

export default useDefaultWeather;
