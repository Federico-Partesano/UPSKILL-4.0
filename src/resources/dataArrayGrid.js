import { colors, typeSensor, typeApplied } from "./types";
const configParameter = {
  milkTank: {
    temperature: { success: { min: 4, max: 34 }, warning: { min: 1, max: 40 } },
  },
  pasteurization: {
    pressure: { success: { min: 70, max: 90 }, warning: { min: 75, max: 85 } },
    temperature: {
      success: { min: 68, max: 75 },
      warning: { min: 70, max: 72 },
    },
  },
};

const generateElementGrid = (id, type, applied) => {
  return {
    id: id,
    status: colors.success,
    type: type,
    applied: applied,
    sensorValue: 0,
    arrayValue: [],
  };
};

export const arrayDashboardGrid = [
  generateElementGrid(1, typeSensor.temperature, typeApplied.milkTank),
  generateElementGrid(2, typeSensor.temperature, typeApplied.milkTank),
  generateElementGrid(3, typeSensor.temperature, typeApplied.milkTank),
  generateElementGrid(4, typeSensor.pressure, typeApplied.pasteurization),
  generateElementGrid(5, typeSensor.pressure, typeApplied.pasteurization),
  generateElementGrid(6, typeSensor.temperature, typeApplied.pasteurization),
  generateElementGrid(7, typeSensor.temperature, typeApplied.pasteurization),
  generateElementGrid(8, typeSensor.humidity, typeApplied.seasoning),
  generateElementGrid(9, typeSensor.humidity, typeApplied.seasoning),
  generateElementGrid(10, typeSensor.humidity, typeApplied.seasoning),
  generateElementGrid(11, typeSensor.humidity, typeApplied.seasoning),
];

export const randomValue = () => {
  return arrayDashboardGrid.map((element) => {
    const arr = element.arrayValue;
    const number = (Math.random() * 100).toFixed(2);
    arr.push(number);
    return {
      ...element,
      sensorValue: number,
      arrayValue: [...arr],
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

export const countWorkingSensors = (array, statusSensor) => {
  const { length } = array;
  const count = array.reduce(
    (acc, { status }) => (status === statusSensor ? acc + 1 : acc),
    0
  );
  return Math.floor((count / length) * 100);
};