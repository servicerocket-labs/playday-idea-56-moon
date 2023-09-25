// models/index.ts
import { getModelForClass } from "@typegoose/typegoose";
import {AccessToken} from "./AccessToken";

export const AccessTokenModel = getModelForClass(AccessToken);
// add other models here
