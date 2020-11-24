import { View } from "../util/index";
import { KelvinToCelsius, Return } from "../util/index";
import { ReactComponent as Thermometer } from "../icons/thermometer.svg";
import { ReactComponent as Wind } from "../icons/wind.svg";
import { ReactComponent as Gauge } from "../icons/gauge.svg";

const useResultFields = (result: View): Return[] => {
  return [
    {
      icon: Thermometer,
      text: KelvinToCelsius(result?.main?.temp),
      sign: "C",
      key: 1,
    },
    {
      icon: Wind,
      text: result?.wind?.speed,
      sign: "m/s",
      key: 2,
    },
    {
      icon: Gauge,
      text: result?.main?.pressure,
      sign: "pH",
      key: 3,
    },
  ];
};

export default useResultFields;