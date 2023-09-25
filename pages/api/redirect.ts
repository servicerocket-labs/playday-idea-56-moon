import axios from "axios";
import {NextApiRequest, NextApiResponse} from 'next';
import {data} from "../config/axiosConf";
import {storeAccessToken} from "../../src/utils/db/services/AccessToken";

// handle redirect with code and exchange it for the access token
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  let access_token;

  if (req.query.code) {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://auth.atlassian.com/oauth/token',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data(req.query.code)
    };

    async function grabToken() {
      try {
        let oauthResponse = await axios.request(config);

        access_token = oauthResponse.data.access_token;

        if (access_token) {
          await storeAccessToken(access_token)
          res.send('<script>window.close();</script>');
        }
      } catch (err) {
        console.log(`ERROR: ${err}`);
      }
    }

    return grabToken();
  }
}
