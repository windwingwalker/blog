import axios from "axios"
import { ARTICLE_READER_COUNT_URL } from '../../shared/constant';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) {
  try {
    const firstPublished: string = req.query["firstPublished"] as string
    const response: any = await axios.post(`${ARTICLE_READER_COUNT_URL}?firstPublished=${firstPublished}`);
    res.status(200).json(response["data"])
  } catch (err) {
    res.status(500).json({ Error: 'Failed to load data' })
  }
}
