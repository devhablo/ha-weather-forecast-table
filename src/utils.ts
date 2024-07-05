const checkRange = (value: number) => {
  if (value <= 0) {
    return 0;
  }
  if (value > 255) {
    return 255;
  }
  return value;
};

export const  setForegroundColor = (r:number, g:number, b:number) => {
  var sum = Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);
  return (sum > 128) ? 'black' : 'white';
}

export const tempToColor = (t: number, min = -10, max = 42) => {
  if (min > max) {
    throw new Error("minimum cannot be greater than maximum");
  }
  if (t < min) {
    t = min;
  } else if (t > max) {
    t = max;
  }
  const nT = (t - min) / (max - min);
  let rValue = 255;
  let gValue = 255;
  let bValue = 255;

  const regions = [1 / 4, (1 / 4) * 2, (1 / 4) * 3];
  if (nT <= regions[0]) {
    rValue = 0;
    gValue = 4 * nT * 255.999;
    bValue = 255;
  } else if (nT > regions[0] && nT <= regions[1]) {
    rValue = 0;
    gValue = 255;
    bValue = 512 - 4 * nT * 255.999;
  } else if (nT > regions[1] && nT <= regions[2]) {
    rValue = 512 - 4 * (1 - nT) * 255.999;
    gValue = 255;
    bValue = 0;
  } else {
    rValue = 255;
    gValue = 4 * (1 - nT) * 255.999;
    bValue = 0;
  }

  return {
    r: checkRange(Math.trunc(rValue)),
    g: checkRange(Math.trunc(gValue)),
    b: checkRange(Math.trunc(bValue)),
  };
};
export const precipitationToColor = (p: number, min = 0.1, max = 4) => {
  if (min > max) {
    throw new Error("minimum cannot be greater than maximum");
  }
  if (p < min) {
    p = min;
  } else if (p > max) {
    p = max;
  }

  const gValue = 255- Math.floor( (255 / (max - min))* p)

  return {
    r: checkRange(Math.trunc(0)),
    g: checkRange(Math.trunc(gValue)),
    b: checkRange(Math.trunc(255)),
  };
};
const conditionIcon :Record<string, string>= {
  "clear": "weather-sunny",
  "clear-night": "weather-night",
  "cloudy": "weather-cloudy",
  "fog": "weather-fog",
  "hail": "weather-hail",
  "lightning": "weather-lightning",
  "lightning-rainy": "weather-lightning-rainy",
  "partlycloudy": "weather-partly-cloudy",
  "pouring": "weather-pouring",
  "rainy": "weather-rainy",
  "snowy": "weather-snowy",
  "snowy-rainy": "weather-snowy-rainy",
  "sunny": "weather-sunny",
  "windy": "weather-windy",
  "windy-variant": "weather-windy",
};

export const getConditionIcon = (condition:string) : string => {
  return conditionIcon[condition];
};
