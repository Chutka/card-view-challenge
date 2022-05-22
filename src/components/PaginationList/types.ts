import { SetStateAction } from "react";

export interface FilterComponentProps<T> {
    value: T;
    onChange(newValue: SetStateAction<T>): void;
}

export interface BaseItemProps<T> {
    className?: string;
    item: T;
}