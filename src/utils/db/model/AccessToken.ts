import { prop } from "@typegoose/typegoose";

export class AccessToken {
  @prop()
  access_token: string;
}
