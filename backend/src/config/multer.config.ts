import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req: any, file: { originalname: string; fieldname: any; }, callback: (arg0: null, arg1: string) => void) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = extname(file.originalname);
      callback(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    },
  }),
};