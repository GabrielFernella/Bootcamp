import multer from 'multer'; // middleware de manuseio de arquivos
import crypto from 'crypto'; // server para gerar hash e criptografia (que será passado no nome)
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp'); // caminho dos arquivos

export default {
  directory: tmpFolder, // expondo o caminho através de um serviço

  storage: multer.diskStorage({
    destination: tmpFolder, // Destino dos arquivos
    filename(request, file, callback) {
      const filehash = crypto.randomBytes(10).toString('hex'); // gerando nome randomigo
      const fileName = `${filehash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
