import { parse } from 'url'
import { S3 } from 'aws-sdk'

export const s3 = new S3()

/**
 * Reformat the pre-signed url to to one that will be accepted by S3.
 *
 * This is necessary because we used a gov.sg CNAME and configured S3
 * to only accept requests that have that gov.sg CNAME as the path.
 *
 * Broadly speaking, we need to change https://s3.amazonaws.com/file.go.gov.sg/link?search
 * to https://file.go.gov.sg.s3.amazonaws.com/link?search.
 */
const reformatPresignedUrl = (url: string) => {
  const urlObj = parse(url)
  const { pathname, protocol, search } = urlObj
  return `${protocol}//${pathname?.substring(1)}${search}`
}

export const generatePresignedUrl = async (fileName: string, fileType: string) => {
  const params = {
    Bucket: 'file-staging.go.gov.sg',
    Key: fileName,
    ContentType: fileType,
    Expires: 60, // 60 seconds.
  }
  const presignedUrl = await s3.getSignedUrlPromise('putObject', params)
  return reformatPresignedUrl(presignedUrl)
}
