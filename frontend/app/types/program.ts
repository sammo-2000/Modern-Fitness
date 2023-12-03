import type { Workout } from "./workout";

export interface Program {
    _id: string;
    workout: Workout[];
    date: string;
}