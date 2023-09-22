// import axios from "axios";
// import { serialize } from "cookie";
// import {data} from "../config/axiosConf";

// @ts-ignore
export default function handler(req, res) {
  let access_token = req.cookies.miro_access_token;

  console.log(req.cookies)
  console.log(access_token)

  // User is signed in
  if (access_token) {
    return res.json({ authenticated: true });
  }

  // User signed in before, but access token expired
  // if (access_token === undefined) {
  //   return res.json({ authenticated: false });
  //   // let config = {
  //   //   method: 'post',
  //   //   maxBodyLength: Infinity,
  //   //   url: 'https://auth.atlassian.com/oauth/token',
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //   },
  //   //   data : data(req.query.code)
  //   // };
  //   // async function refreshToken() {
  //   //   try {
  //   //     let oauthResponse = await axios.request(config);
  //   //
  //   //     access_token = oauthResponse.data.access_token;
  //   //
  //   //     if (access_token) {
  //   //       res.setHeader("Set-Cookie", [
  //   //         serialize("miro_access_token", access_token, {
  //   //           httpOnly: true,
  //   //           sameSite: "none",
  //   //           secure: true,
  //   //           maxAge: 3600,
  //   //         })
  //   //       ]);
  //   //     }
  //   //     res.json({ authenticated: true }).end();
  //   //   } catch (err) {
  //   //     console.log(`ERROR: ${err}`);
  //   //   }
  //   // }
  //
  //   // return refreshToken();
  // }

  res.json({ authenticated: false });
}
