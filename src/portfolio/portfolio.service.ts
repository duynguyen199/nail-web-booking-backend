import {
  PutObjectAclCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NotificationType } from '../types/prisma';
import { extname } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3_CLIENT } from 'src/s3/s3.module';

@Injectable()
export class PortfolioService {
  private bucket = process.env.S3_BUCKET;
  constructor(
    @Inject(S3_CLIENT) private readonly s3: S3Client,
    private prisma: PrismaService,
  ) {}

  async uploadPortfolio(file: Express.Multer.File, techId: string) {
    if (!file) throw new NotFoundException('File is not found');
    const tech = await this.prisma.user.findUnique({ where: { id: techId } });
    if (!tech) throw new NotFoundException('Tech Id not found');
    const key = `portfolio/${techId}/${randomUUID()}${extname(file.originalname)}`;

    //upload to S3/MinIo
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );
    const url = `${process.env.S3_ENDPOINT}/${this.bucket}/${key}`;

    // Save record to DB
    const image = await this.prisma.portfolioImage.create({
      data: { techId, key, url },
    });
    // Create a notification
    await this.prisma.notification.create({
      data: {
        userId: techId,
        type: NotificationType.PORTFOLIO_UPLOAD,
        title: 'New Portfolio Uploaded',
        body: `You uploaded ${file.originalname}`,
      },
    });
    return image;
  }
  async getPortfolioByTechId(techId:string){
    return this.prisma.portfolioImage.findMany({
        where: { techId },
        orderBy: { createdAt: 'desc' },
    })
  }
}
