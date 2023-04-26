const AWS = require('aws-sdk');
const AWSXRay = require('aws-xray-sdk');

const XAWS = AWSXRay.captureAWS(AWS);

const imageBucketName = process.env.IMAGE_S3_BUCKET;
const urlExpiration = process.env.SIGNED_URL_EXPIRATION;
const targetBucket = new XAWS.S3({ signatureVersion: 'v4' });

export const S3BucketImageUpload = (imageId) => {
  const s3SignedUrl = targetBucket.getSignedUrl('putObject', {
    Bucket: imageBucketName,
    Key: imageId,
    Expires: Number(urlExpiration),
  });
  let uploadUrl = `https://${imageBucketName}.s3.amazonaws.com/${imageId}`;
  return {
    s3SignedUrl,
    uploadUrl,
  };
};
