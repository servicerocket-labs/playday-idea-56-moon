import {retrieveAccessToken} from "../../src/utils/db/services/AccessToken";

// @ts-ignore
export default async function handler(req, res) {
  try {
    const access_token = await retrieveAccessToken();
    if (access_token) {
      return res.json({authenticated: true});
    }
    res.json({authenticated: false});
  } catch (e) {
    console.error(e);
    res.json({authenticated: false});
  }
}
