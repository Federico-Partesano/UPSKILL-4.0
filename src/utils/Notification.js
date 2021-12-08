import dayjs from "dayjs";
import { colors, typeApplied, typeSensor } from "../resources/types";
const stringUnit = (element) => {
  return `${
    element.type === typeSensor.temperature
      ? "°"
      : element.type === typeSensor.pressure
      ? " Pa"
      : " g/m³"
  } `;
};

export const notificationCheck = (gridElement, notifications) => {
  if (notifications.some((element) => gridElement.id === element.id)) {
    return false;
  }
  if (gridElement.applied === typeApplied.milkTank) {
    switch (true) {
      case (Math.abs(dayjs().diff(gridElement.insertMilkDate, "days")) > 5 &&
        !gridElement.isEmpty) ||
        gridElement.status === colors.warning ||
        gridElement.status === colors.alarm:
        return true;
      default:
        return false;
    }
  } else {
    if (
      gridElement.status === colors.warning ||
      gridElement.status === colors.alarm
    ) {
      return true;
    } else {
      return false;
    }
  }

  return false;
};

export const generateNotification = (gridElement) => {
  let message1 = "";
  let message2 = "";
  let message3 = "";
  let title = "";
  switch (gridElement.applied) {
    case typeApplied.milkTank:
      if (gridElement.status === colors.warning) {
        title = `Controllo consigliato macchinario ${gridElement.applied}`;
        message2 = `I valori del sensore di ${
          gridElement.id
        } sono vicino al limite ${gridElement.sensorValue}${stringUnit(
          gridElement
        )}, si consiglia un controllo`;
      } else if (gridElement.status === colors.alarm) {
        title = `Controllo tempestivo macchinario ${gridElement.applied}`;
        message2 = `I valori del sensore di ${
          gridElement.id
        } sono oltre il limite ${gridElement.sensorValue}${stringUnit(
          gridElement
        )}, si consiglia un controllo tempestivo!`;
      }
      if (
        Math.abs(dayjs().diff(gridElement.insertMilkDate, "days")) > 5 &&
        !gridElement.isEmpty
      ) {
        message1 = `La vasca ${gridElement.id} del latte riempita il ${dayjs(
          gridElement.insertMilkDate
        ).format(
          "HH:mm YYYY-MM-DD"
        )} sta raggiugendo il tempo limite senza essere stata svuotata!`;
        title = `Vasca del latte da svuotare`;
      } else if (
        Math.abs(dayjs().diff(gridElement.insertMilkDate, "days")) > 2 &&
        !gridElement.isEmpty
      ) {
        message1 = `La vasca ${gridElement.id} del latte riempita il ${dayjs(
          gridElement.insertMilkDate
        ).format("YYYY-MM-DD HH:mm")} è pronta per essere svuotata!`;
        title = `${gridElement.type} pronta`;
      }

      return {
        ...gridElement,
        title: title,
        errors: { message1, message2 },
        date: dayjs().format("HH:mm    YYYY-MM-DD"),
      };

    // return {...gridElement, title: }

    default:
      if (gridElement.status === colors.warning) {
        title = `Controllo consigliato macchinario ${gridElement.applied}`;
        message1 = `I valori del sensore di ${
          gridElement.id
        } sono vicino al limite ${gridElement.sensorValue}${stringUnit(
          gridElement
        )}, si consiglia un controllo`;
      } else if (gridElement.status === colors.alaVarm) {
        title = `Controllo tempestivo macchinario ${gridElement.applied}`;
        message1 = `I valori del sensore di ${
          gridElement.id
        } sono oltre il limite ${gridElement.sensorValue}${stringUnit(
          gridElement
        )}, si consiglia un controllo tempestivo!`;
      }

      return {
        ...gridElement,
        title: title,
        errors: { message1, message2 },
        date: dayjs().format("HH:mm     YYYY-MM-DD"),
      };
  }
};

export default notificationCheck;
