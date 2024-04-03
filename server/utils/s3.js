const crypto = require("crypto");
const sharp = require("sharp");

require("dotenv").config();
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

const randomImageName = () => {
  const random = crypto.randomBytes(32).toString("hex");
  return random;
};

const addImageToS3 = async (reqBuffer) => {
  const buffer = await sharp(reqBuffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();

  const randomName = randomImageName();
  const params = {
    Bucket: bucketName,
    Key: randomName,
    Body: buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return randomName;
};

getImages = async (data) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: data.imageName,
  });
  if (!data.imageName) {
    return "";
  }
  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });
  return url;
};
