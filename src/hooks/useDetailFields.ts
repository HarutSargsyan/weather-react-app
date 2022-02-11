import { View } from "../util/index";
import { KelvinToCelsius, Return } from "../util/index";
import { ReactComponent as Thermometer } from "../icons/thermometer.svg";
import { ReactComponent as Wind } from "../icons/wind.svg";
import { ReactComponent as Gauge } from "../icons/gauge.svg";

export default (result: View): Return[] => {
  return [
    {
      Icon: Thermometer,
      text: KelvinToCelsius(result?.main?.temp),
      sign: "C",
      key: 1,
    },
    {
      Icon: Wind,
      text: result?.wind?.speed,
      sign: "m/s",
      key: 2,
    },
    {
      Icon: Gauge,
      text: result?.main?.pressure,
      sign: "pH",
      key: 3,
    },
  ];
};
