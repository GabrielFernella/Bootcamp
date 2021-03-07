export default interface IStorageProvider {
  saveFile(file: string): Promise<string>; // retorna o caminho do arquivo
  deleteFile(file: string): Promise<void>;
}
