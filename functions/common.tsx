import { SSMClient, GetParameterCommand, GetParameterCommandInput, GetParameterCommandOutput } from "@aws-sdk/client-ssm";
import { S3Client, PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, GetObjectCommand , GetObjectCommandInput, GetObjectCommandOutput } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-providers";
import { useMediaQuery } from "react-responsive";
import { LARGE_SCREEN_MIN_WIDTH, SMALL_SCREEN_MAX_WIDTH } from '../shared/constant';

export const getParameterFromSSM = async (ssmPath: string): Promise<string> => {
  const client: SSMClient = new SSMClient({ region: "us-east-1", credentials: {accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!, secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!}});
  const params: GetParameterCommandInput = {Name: ssmPath};
  const command: GetParameterCommand = new GetParameterCommand(params);
  const response: GetParameterCommandOutput = await client.send(command);

  if (response["$metadata"]["httpStatusCode"] != 200) throw new Error(`SSM response status code is ${response["$metadata"]["httpStatusCode"]}`);
  if (response["Parameter"] == null) throw new Error(`SSM parameter path ${ssmPath} not found`);

  return response["Parameter"]["Value"]!;
}

export const getS3ObjectFromS3 = async (bucketName: string, objectKey: string): Promise<any | Blob | ReadableStream> => {
  const client: S3Client = new S3Client({ region: "us-east-1", credentials: {accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!, secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!}});
  const params: GetObjectCommandInput = {Bucket: bucketName, Key: objectKey};
  const command: GetObjectCommand = new GetObjectCommand(params);
  const response: GetObjectCommandOutput = await client.send(command);

  if (response["$metadata"]["httpStatusCode"] != 200) throw new Error(`S3 response status code is ${response["$metadata"]["httpStatusCode"]}`);
  return response["Body"];
}

export const getJSONInJSObjectFromS3 = async (fileName: string): Promise<any> => {
  const bucketName: string = await getParameterFromSSM("/blog/s3-bucket-name");
  const dataInStream = await getS3ObjectFromS3(bucketName, fileName);
  const data: any = await getJavaScriptObjectFromS3JSON(dataInStream);
  return data;
}

export const getJavaScriptObjectFromS3JSON = async (s3Object: any | Blob | ReadableStream): Promise<any | object | object[]> => {
  const dataInString = await getStringFromStream(s3Object);
  const dataInObject: any | object | object[] = await JSON.parse(dataInString);
  return dataInObject;
}

export const getStringFromStream = async (stream: any): Promise<string> => {
  const chunks: any = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err: any) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  })
}

export const getS3ObjectFromJavaScriptObject = async (data: any | object): Promise<any | Blob | ReadableStream> => {
  return Buffer.from(JSON.stringify(data));
}

export const isSmallScreen = (): boolean => {
  return useMediaQuery({query: `(max-width: ${SMALL_SCREEN_MAX_WIDTH}px)`});
}

export const isMiddleScreen = (): boolean => {
  return useMediaQuery({query: `(max-width: ${LARGE_SCREEN_MIN_WIDTH-1}px)`});
}

export const isLargeScreen = (): boolean => {
  return useMediaQuery({query: `(min-width: ${LARGE_SCREEN_MIN_WIDTH}px)`});
}