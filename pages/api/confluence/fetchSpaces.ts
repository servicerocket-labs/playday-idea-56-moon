import axios from "axios";
import {NextApiRequest, NextApiResponse} from 'next';
import {headers} from "../../config/axiosConf";
import {retrieveAccessToken} from "../../../src/utils/db/services/AccessToken";
import {retrieveCloudInfo} from "../../../src/utils/common/cloudInfo";

// @ts-ignore
export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse,
) {
  const access_token = await retrieveAccessToken();
  const cloudID = await retrieveCloudInfo(access_token);
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.atlassian.com/ex/confluence/${cloudID[0].id}/rest/api/space`,
    headers: headers(access_token),
  };

  try {
    const spaces = await axios.request(config);
    res.json({spaces: spaces.data});
  } catch (err) {
    console.log(`ERROR: ${err}`);
    res.json({authenticated: false});
  }
}
