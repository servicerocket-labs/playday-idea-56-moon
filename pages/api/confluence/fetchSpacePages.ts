import axios from "axios";
import {NextApiRequest, NextApiResponse} from 'next';
import {headers} from "../../config/axiosConf";
import {retrieveAccessToken} from "../../../src/utils/db/services/AccessToken";
import {retrieveCloudInfo} from "../../../src/utils/common/cloudInfo";

// @ts-ignore
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  console.log('req', req.query)
  const access_token = await retrieveAccessToken();
  const cloudID = await retrieveCloudInfo(access_token);
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.atlassian.com/ex/confluence/${cloudID[0].id}/api/v2/spaces/${req.query.id}/pages?depth=all`,
    headers: headers(access_token),
  };

  try {
    const pages = await axios.request(config);
    res.json({pages: pages.data});
  } catch (err) {
    console.log(`ERROR: ${err}`);
    res.json({authenticated: false});
  }
}
