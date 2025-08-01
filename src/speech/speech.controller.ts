
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { OpenAIService } from '../speech/speech.service';
import { extname } from 'path';

@Controller('audio')
export class AudioController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post('transcribe')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  async transcribe(@UploadedFile() file: Express.Multer.File) {
    const text = await this.openAIService.transcribeAudio(file.path);
    return { transcription: text };
  }
}
