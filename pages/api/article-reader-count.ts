import axios, { AxiosResponse } from "axios"
import { ARTICLE_READER_COUNT_URL } from '../../shared/constant';
import type { NextApiRequest, NextApiResponse } from 'next'

interface SuccessData {
  [key: string]: unknown;
}

interface ErrorData {
  Error: string;
}

type ResponseData = SuccessData | ErrorData;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const firstPublished: string = req.query["firstPublished"] as string
    const response: AxiosResponse<SuccessData> = await axios.post(`${ARTICLE_READER_COUNT_URL}?firstPublished=${firstPublished}`);
    res.status(200).json(response.data)
  } catch (err) {
    res.status(500).json({ Error: 'Failed to load data' })
  }
}
