import { SSMClient, GetParameterCommand, GetParameterCommandInput, GetParameterCommandOutput } from "@aws-sdk/client-ssm";
import { S3Client, PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, GetObjectCommand , GetObjectCommandInput, GetObjectCommandOutput } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-providers";
import { useMemo } from 'react';
import { useMediaQuery } from "react-responsive";
import { LARGE_SCREEN_MIN_WIDTH, SMALL_SCREEN_MAX_WIDTH } from '../shared/constant';

const getParameterFromSSM = async (ssmPath: string): Promise<string> => {
  const client: SSMClient = new SSMClient({ region: "us-east-1", credentials: {accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!, secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!}});
  const params: GetParameterCommandInput = {Name: ssmPath};
  const command: GetParameterCommand = new GetParameterCommand(params);
  const response: GetParameterCommandOutput = await client.send(command);

  if (response["$metadata"]["httpStatusCode"] != 200) throw new Error(`SSM response status code is ${response["$metadata"]["httpStatusCode"]}`);
  if (response["Parameter"] == null) throw new Error(`SSM parameter path ${ssmPath} not found`);

  return response["Parameter"]["Value"]!;
}

const getS3ObjectFromS3 = async (bucketName: string, objectKey: string): Promise<ReadableStream | Blob | undefined> => {
  const client: S3Client = new S3Client({ region: "us-east-1", credentials: {accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!, secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!}});
  const params: GetObjectCommandInput = {Bucket: bucketName, Key: objectKey};
  const command: GetObjectCommand = new GetObjectCommand(params);
  const response: GetObjectCommandOutput = await client.send(command);

  if (response["$metadata"]["httpStatusCode"] != 200) throw new Error(`S3 response status code is ${response["$metadata"]["httpStatusCode"]}`);
  return response["Body"] as ReadableStream | Blob | undefined;
}

const getJavaScriptObjectFromS3JSON = async <T = unknown>(s3Object: ReadableStream | Blob | undefined): Promise<T> => {
  const dataInString = await getStringFromStream(s3Object);
  const dataInObject: T = JSON.parse(dataInString);
  return dataInObject;
}

export const getJSONInJSObjectFromS3 = async <T = unknown>(fileName: string): Promise<T> => {
  const bucketName: string = await getParameterFromSSM("/blog/s3-bucket-name");
  const dataInStream = await getS3ObjectFromS3(bucketName, fileName);
  const data: T = await getJavaScriptObjectFromS3JSON<T>(dataInStream);
  return data;
}

const getStringFromStream = async (stream: ReadableStream | Blob | undefined): Promise<string> => {
  if (!stream) {
    throw new Error('Stream is undefined');
  }

  // Handle Node.js stream (has 'on' method)
  if ('on' in stream && typeof stream.on === 'function') {
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      (stream as any).on('data', (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
      (stream as any).on('error', (err: Error) => reject(err));
      (stream as any).on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
  }

  // Handle Blob
  if (stream instanceof Blob) {
    return await stream.text();
  }

  // Handle ReadableStream (browser)
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  const concatenated = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
  let position = 0;
  for (const chunk of chunks) {
    concatenated.set(chunk, position);
    position += chunk.length;
  }

  return new TextDecoder().decode(concatenated);
}

export const getS3ObjectFromJavaScriptObject = async (data: object): Promise<Buffer> => {
  return Buffer.from(JSON.stringify(data));
}

export const useSmallScreen = (): boolean => {
  const query = useMemo(
    () => `(max-width: ${SMALL_SCREEN_MAX_WIDTH}px)`,
    []
  );
  return useMediaQuery({ query });
};

export const useMiddleScreen = (): boolean => {
  const query = useMemo(
    () => `(max-width: ${LARGE_SCREEN_MIN_WIDTH - 1}px)`,
    []
  );
  return useMediaQuery({ query });
};

export const useLargeScreen = (): boolean => {
  const query = useMemo(
    () => `(min-width: ${LARGE_SCREEN_MIN_WIDTH}px)`,
    []
  );
  return useMediaQuery({ query });
};

