export interface alarm {
    id: string;
    time:string;
    days: Day[]
    active: boolean;
}
export interface Day {
    dayOfWeek:string,
    active:boolean
}
