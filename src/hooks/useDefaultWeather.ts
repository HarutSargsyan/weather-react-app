import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import weather from "../api/weather";
import imageAPI from "../api/image";
import useGetUserLocation from "./useGetUserLocation";
import { filterUnfitImages } from "../util";

export default () => {
  const [defaultResponse, setDefaultResponse] = useState();
  const [defaultImage, setDefaultImage] = useState<string>();
  const [lat, lon] = useGetUserLocation();

  const fetchData = async () => {
    try {
      const { data } = await weather.get("/weather", {
        params: {
          lat,
          lon,
        },
      });
      setDefaultResponse(data);
      const { name } = data;
      const {
        data: { hits },
      } = await imageAPI.get("/", {
        params: {
          q: name,
          image_type: "photo",
        },
      });
      const image = filterUnfitImages(hits);
      image && setDefaultImage(image?.largeImageURL);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    lat && lon && fetchData();
    return () => {
      source.cancel("axios request cancelled");
    };
  }, [lat, lon]);

  return { defaultResponse, defaultImage };
};
