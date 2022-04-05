import { MockMachines, ValueOf } from "../models/MockMachines";
import { RespMachines } from "../models/RespMachines";
import { colors } from "../resources/types";

export const convertMachiners = (machines: RespMachines["payload"]): any => {

    const convertTypology = (type: string) => type === "Temperature" ? "Temperatura" : type === "Humidity" ? "Umidità" : "Pressione";
    const convertMachineTypology = (type: string) => type === "Milk_Tank" ? "Vasca del latte" : type === "Seasoning" ? "Stagionatura" : "Pastorizzazione";
    const convertStatus = (type: string): ValueOf<typeof colors> => type === "OK" ? "#92FA41" : type === "CHECK" ? "#E2DB21" : "#F10808";

   return machines.sensors.map(({typology,id, data, machine: {typology: typologyMachine, status: statusMachine}}) => ({
        id,
        type: convertTypology(typology),
        arrayValue: data.map(({value}) => value),
        applied: convertMachineTypology(typologyMachine),
        status: convertStatus(statusMachine),
        sensorValue: data[data.length - 1].value
    }));

}