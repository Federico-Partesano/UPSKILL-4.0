import { colors, typeApplied, typeSensor } from "../resources/types";

export type ValueOf<A> = A[keyof A] // will be string | number | (() => void)


export interface MockMachines {
    id: number, 
    machinaryId: number,
    status: ValueOf<typeof colors>,
    type: ValueOf<typeof typeSensor>, 
    applied: ValueOf<typeof typeApplied>
    arrayValue: string[],
    insertMilkDate?: Date
}

