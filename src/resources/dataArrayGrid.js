import { colors, typeSensor, typeApplied } from "./types";

export const arrayDashboardGrid = [
  {
    id: 12,
    status: colors.success,
    type: typeSensor.temperature,
    applied: typeApplied.milkTank,
    sensorValue: 0,
  },
  {
    id: 24,
    status: colors.warning,
    type: typeSensor.pressure,
    applied: typeApplied.seasoning,
    sensorValue: 0,
  },
];

export const randomValue = () => {
  return arrayDashboardGrid.map((element) => {
    const number = (Math.random() * 100).toFixed(2);
    return {
      ...element,
      sensorValue: number,
      status: setStatus(number, element.type, element.applied),
    };
  });
};

const setStatus = (number, type, applied) => {
  switch (type) {
    case typeSensor.temperature:
      if (applied === typeApplied.milkTank) {
        return number > 4 && number < 34
          ? colors.success
          : number > 1 && number < 40
          ? colors.warning
          : colors.alarm;
      } else if (typeApplied.pasteurization) {
        return number > 68 && number < 75
          ? colors.success
          : number > 70 && number < 72
          ? colors.warning
          : colors.success;
      } else {
        return number > 15 && number < 18
          ? colors.success
          : number > 18 && number < 22
          ? colors.warning
          : colors.alarm;
      }

    case typeSensor.pressure:
      return number > 70 && number < 90
        ? colors.success
        : number > 75 && number < 85
        ? colors.warning
        : colors.alarm;

    case typeSensor.humidity:
      const numberHumidity = Math.random() * (100 - 60) + 60;
      return numberHumidity > 70 && numberHumidity < 80
        ? colors.success
        : numberHumidity > 65 && numberHumidity < 95
        ? colors.warning
        : colors.alarm;
    default:
      return colors.success;
  }
};
