export type alarm = {
    id: string;
    time:string;
    days: Day[]
    active: boolean;
}
export type Day = {
    dayOfWeek:string,
    active:boolean
}
