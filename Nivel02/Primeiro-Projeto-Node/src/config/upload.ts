import multer from 'multer';
import crypto from 'crypto'; // server para gerar hash e criptografia
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp'); // caminho dos arquivos

export default {
  directory: tmpFolder, // expondo o caminho através de um serviço

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const filehash = crypto.randomBytes(10).toString('hex');
      const fileName = `${filehash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
