import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    getBalance(id: bigint): Promise<{
        __kind__: "ok";
        ok: bigint;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getUser(id: bigint): Promise<{
        __kind__: "ok";
        ok: {
            id: bigint;
            balance: bigint;
            name: string;
            mobile: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
    login(mobile: string, password: string): Promise<{
        __kind__: "ok";
        ok: {
            id: bigint;
            balance: bigint;
            name: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
    register(name: string, mobile: string, password: string): Promise<{
        __kind__: "ok";
        ok: {
            id: bigint;
            balance: bigint;
            name: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
}
