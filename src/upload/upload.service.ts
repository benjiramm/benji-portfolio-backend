import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Body, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });
  constructor(private readonly configService: ConfigService) {}

  async upload(originalName: string, file: Buffer) {
    try {
      const fileName = `${uuid()}-${originalName}`;
      const encodedFileName = encodeURIComponent(fileName);
      const bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
      const uploadResult = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'nestjs-uploader-benji',
          Key: fileName,
          Body: file,
        }),
      );

      return `https://${bucketName}.s3.amazonaws.com/${encodedFileName}`;
    } catch (error) {
      throw new error();
    }
  }
}
