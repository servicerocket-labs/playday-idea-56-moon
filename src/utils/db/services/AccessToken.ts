import {AccessTokenModel} from "../model";
import dbConnect from "../db";

export async function storeAccessToken(token: string) {
  await dbConnect();

  const accessToken = new AccessTokenModel({ access_token: token });
  await accessToken.save();
}

export async function retrieveAccessToken(): Promise<string | null> {
  await dbConnect();

  const accessToken = await AccessTokenModel.findOne();
  return accessToken ? accessToken.access_token : null;
}
