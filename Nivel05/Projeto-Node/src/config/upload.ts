import multer, { StorageEngine } from 'multer'; // middleware de manuseio de arquivos
import crypto from 'crypto'; // server para gerar hash e criptografia (que será passado no nome)
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp'); // caminho dos arquivos

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder, // Destino dos arquivos
      filename(request, file, callback) {
        const filehash = crypto.randomBytes(10).toString('hex'); // gerando nome randomigo
        const fileName = `${filehash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'app-gobarber-2',
    },
  },
} as IUploadConfig;
