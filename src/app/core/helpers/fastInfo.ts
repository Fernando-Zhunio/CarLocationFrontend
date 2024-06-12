import { ICar } from "../types/car";
import { IUser } from "../types/user";

export class FastInfo {
    private static _instance: FastInfo;
    private static user: IUser | null = null;
    private static car: ICar[]  = [];

    private constructor() { }

    public static get Instance(): FastInfo {
        if (!FastInfo._instance) {
            FastInfo._instance = new FastInfo();
        }
        return FastInfo._instance;
    }

    getUser() {
        return FastInfo.user
    }

    setUser(user: IUser | null) {
        FastInfo.user = user
    }

    getCar() {
        return FastInfo.car
    }

    setCar(car: ICar[]) {
        FastInfo.car = car
    }

}