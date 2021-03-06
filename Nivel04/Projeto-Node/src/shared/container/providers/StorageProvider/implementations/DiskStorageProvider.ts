import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file), // Origem do arquivo
      path.resolve(uploadConfig.uploadsFolder, file), // Destino do arquivo
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath); // Busca as informações do arquivo, se não retornar nada, ele dá erro
    } catch {
      return;
    }

    await fs.promises.unlink(filePath); // Deleta o arquivo
  }
}

export default DiskStorageProvider;
