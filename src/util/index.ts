export const KelvinToCelsius = (kelvin: number) => Math.ceil(kelvin - 272.15);
export const filterUnfitImages = (images: Image[]) => {
  return images.find((img: any) => img.imageWidth - img.imageHeight > 0);
};

export interface View {
  name: string;
  wind: {
    speed: number;
  };
  main: {
    temp: number;
    pressure: number;
  };
}

export interface Return {
  Icon: any;
  text: number;
  sign: string;
  key: number;
}

export interface Result {
  onCitySubmit(cityName: string): void;
  response: any;
  isError: boolean;
  image: string;
  isLoading: boolean;
}

interface Image {
  imageWidth: string;
  imageHeight: string;
  largeImageURL: string;
}
