import axios from "axios";
import { serialize } from "cookie";
import {NextApiRequest, NextApiResponse} from 'next';
import {data} from "../config/axiosConf";

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
      data : data(req.query.code)
    };
    async function grabToken() {
      try {
        let oauthResponse = await axios.request(config);

        access_token = oauthResponse.data.access_token;

        if (access_token) {
          res
            .setHeader("Set-Cookie", [
              serialize("miro_access_token", access_token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 3600,
              }),
            ]);
          res.send('<script>window.close();</script>');
        }
      } catch (err) {
        console.log(`ERROR: ${err}`);
      }
    }
    return grabToken();
  }
}
