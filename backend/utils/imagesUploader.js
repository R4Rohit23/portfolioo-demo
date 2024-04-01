const multer = require("multer");
const storage = multer.memoryStorage();
const S3Utils = require("../utils/s3")
const path = require("path");

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, JPG and PNG files are allowed.")
    );
  }
};

module.exports.upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});


module.exports.uploadImages = async (files, email) => {
  const uploadedImages = {};

  if (files && files.profileImg) {
    const fileKey = `${email}-professional-profile.jpeg`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: files.profileImg[0].buffer,
      ContentType: files.profileImg[0].mimetype,
    };
    const uploadResult = await S3Utils.uploadFileToS3(params);
    uploadedImages.profileImg = uploadResult.Location;
  }

  if (files && files.coverImg) {
    const fileKey = `${email}-professsional-cover.jpeg`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: files.coverImg[0].buffer,
      ContentType: files.coverImg[0].mimetype,
    };
    const uploadResult = await S3Utils.uploadFileToS3(params);
    uploadedImages.coverImg = uploadResult.Location;
  }

  if (files && files.degreeCertificate) {
    const originalFileName = files.degreeCertificate[0].originalname;
    const originalFileExtension = path.extname(originalFileName);

    const degreeCertificateKey = `${email}-degree-certificate${originalFileExtension}`;
    const degreeCertificateParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: degreeCertificateKey,
      Body: files.degreeCertificate[0].buffer,
      ContentType: files.degreeCertificate[0].mimetype,
    };
    const degreeCertificateUploadResult = await S3Utils.uploadFileToS3(
      degreeCertificateParams
    );
    uploadedImages.degreeCertificate = degreeCertificateUploadResult.Location;
  }

  if (files && files.mediaFiles && files.mediaFiles.length > 0) {
    // @TODO
    // Previous files should not be overwrite
    uploadedImages["mediaFiles"] = [];

    for (let i = 0; i < files.mediaFiles.length; i++) {
      const mediaFile = files.mediaFiles[i];

      const originalFileName = mediaFile.originalname;
      const originalFileExtension = path.extname(originalFileName);

      const mediaFileKey = `${email}-media-file-${i}${originalFileExtension}`;

      const mediaFileParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: mediaFileKey,
        Body: mediaFile.buffer,
        ContentType: mediaFile.mimetype,
      };

      const mediaFileUploadResult = await S3Utils.uploadFileToS3(
        mediaFileParams
      );
      uploadedImages.mediaFiles.push(mediaFileUploadResult.Location);
    }
  }

  return uploadedImages;
}