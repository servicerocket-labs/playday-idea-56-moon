import axios from "axios";


export async function retrieveCloudInfo(accessToken: string | null): Promise<any> {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.atlassian.com/oauth/token/accessible-resources',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  };

  const cloudInfo = await axios.request(config);
  return cloudInfo.data;
}
