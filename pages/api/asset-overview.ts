import axios, { AxiosResponse } from "axios"
import type { NextApiRequest, NextApiResponse } from 'next'
import { Asset } from "../../models/asset";
import { ASSET_URL } from '../../shared/constant';

interface ErrorResponse {
  Error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Asset | ErrorResponse>
) {
  try {
    const idToken: string = req.query["idToken"] as string
    const options = {
      headers: {'Authorization': idToken}
    };
    const response: AxiosResponse<Asset> = await axios.get(ASSET_URL, options);
    res.status(200).json(response.data)
  } catch (err) {
    res.status(500).json({ Error: 'Failed to load data' })
  }
}
