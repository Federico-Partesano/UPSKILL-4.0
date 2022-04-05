
    export interface Machine {
        id: string;
        typology: string;
        status: string;
    }

    export interface Range {
        min: number;
        max: number;
    }

    export interface Datum {
        value: number;
        timestamp: any;
    }

    export interface Sensor {
        machine: Machine;
        id: string;
        range: Range;
        typology: string;
        data: Datum[];
    }

    export interface Payload {
        _id: string;
        idDevice: string;
        idUser: string;
        sensors: Sensor[];
        __v: number;
    }

    export interface RespMachines {
        message: string;
        payload: Payload;
    }



