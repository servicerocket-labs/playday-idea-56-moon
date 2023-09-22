export const axiosConfig = {
  method: 'get',
  maxBodyLength: Infinity,
  url: process.env.CONF_AUTHO_ENDPOINT};

export const data = (reqCode: any) => {
  return JSON.stringify({
    "grant_type": "authorization_code",
    "client_id": process.env.CONF_CLIENT_ID,
    "client_secret": process.env.CONF_CLIENT_SECRET,
    "code": reqCode,
    "redirect_uri": "http://localhost:3000/api/redirect"
  });
}
export const authData = () => {
  return JSON.stringify({
    "grant_type": "authorization_code",
    "client_id": process.env.CONF_CLIENT_ID,
    "client_secret": process.env.CONF_CLIENT_SECRET,
    "redirect_uri": "http://localhost:3000/api/redirect"
  });
}
export const headers =  (access_token: string): any => {
  return {
    'Authorization': `Bearer ${access_token}`,
    'Content-Type': 'application/json'
  }
}
