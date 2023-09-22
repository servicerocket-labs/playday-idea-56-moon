import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse,
) {
  let url = process.env.CONF_AUTHO_ENDPOINT as string;
  res.redirect(url);
}
