import { useEffect, useState } from "react";

export default () => {
  const [lat, setLat] = useState<number>();
  const [lon, setLon] = useState<number>();
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const {
          coords: { latitude, longitude },
        } = position;
        setLat(latitude);
        setLon(longitude);
      });
    } else {
      console.log("Not Available");
    }
  }, []);
  return [lat, lon];
};

