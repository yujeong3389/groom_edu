import { ReactiveVar, makeVar } from "@apollo/client";
import { CartItems } from "./models/CartItems";

export const cartItemVar:ReactiveVar<CartItems>=makeVar<CartItems>([]);