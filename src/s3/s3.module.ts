import { Module } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';

export const S3_CLIENT = 'S3_CLIENT';

@Module({
  providers: [
    {
      provide: S3_CLIENT,
      useFactory: () => {
        const endpoint = process.env.S3_ENDPOINT!;
        const region = process.env.S3_REGION || 'us-east-1';
        const accessKeyId = process.env.S3_ACCESS_KEY!;
        const secretAccessKey = process.env.S3_SECRET_KEY!;
        const forcePathStyle =
          String(process.env.S3_FORCE_PATH_STYLE ?? 'true') === 'true';
        return new S3Client({
          region,
          endpoint,
          forcePathStyle, // quan trọng cho MinIO
          credentials: { accessKeyId, secretAccessKey },
        });
      },
    },
  ],
  exports: [S3_CLIENT],

})
export class S3Module {}
