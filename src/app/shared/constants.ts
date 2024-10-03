import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Country } from "./enum/country";

export const TODAY = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
export const COUNTRIES = Object.values(Country).filter(item => typeof item === 'string')