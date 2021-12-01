import { colors, typeSensor, typeApplied } from "./types";
import dayjs from "dayjs";
export const configParameter = {
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

const generateElementGrid = (
  id,
  machinaryId,
  type,
  applied,
  insertMilkDate,
  isEmpty
) => {
  switch (applied) {
    case typeApplied.milkTank:
      return {
        id: id,
        machinaryId: machinaryId,
        status: colors.success,
        type: type,
        insertMilkDate: insertMilkDate,
        isEmpty: isEmpty,
        applied: applied,
        sensorValue: 0,
        arrayValue: [],
      };
    default:
      return {
        id: id,
        machinaryId: machinaryId,
        status: colors.success,
        type: type,
        applied: applied,
        sensorValue: 0,
        arrayValue: [],
      };
  }
};

export const arrayDashboardGrid = [
  generateElementGrid(
    1,
    1,
    typeSensor.temperature,
    typeApplied.milkTank,
    dayjs().subtract(10, "days"),
    false
  ),
  generateElementGrid(
    2,
    2,
    typeSensor.temperature,
    typeApplied.milkTank,
    dayjs().subtract(4, "days"),
    true
  ),
  generateElementGrid(
    3,
    3,
    typeSensor.temperature,
    typeApplied.milkTank,
    dayjs().subtract(1, "days"),
    false
  ),
  generateElementGrid(4, 4, typeSensor.pressure, typeApplied.pasteurization),
  generateElementGrid(5, 5, typeSensor.pressure, typeApplied.pasteurization),
  generateElementGrid(6, 4, typeSensor.temperature, typeApplied.pasteurization),
  generateElementGrid(7, 5, typeSensor.temperature, typeApplied.pasteurization),

  generateElementGrid(8, 6, typeSensor.humidity, typeApplied.seasoning),
  generateElementGrid(9, 7, typeSensor.humidity, typeApplied.seasoning),
  generateElementGrid(10, 8, typeSensor.humidity, typeApplied.seasoning),
  generateElementGrid(11, 9, typeSensor.humidity, typeApplied.seasoning),

  generateElementGrid(12, 6, typeSensor.temperature, typeApplied.seasoning),
  generateElementGrid(13, 7, typeSensor.temperature, typeApplied.seasoning),
  generateElementGrid(14, 8, typeSensor.temperature, typeApplied.seasoning),
  generateElementGrid(15, 9, typeSensor.temperature, typeApplied.seasoning),
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
