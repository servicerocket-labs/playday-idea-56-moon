import axios from "axios";
import {headers} from "../../config/axiosConf";

// @ts-ignore
export default async function handler(req, res) {
  let access_token = req.cookies.miro_access_token;

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.atlassian.com/ex/confluence/e95ac8b3-d09c-493e-99ef-4ba91a7b37e6/rest/api/space',
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
