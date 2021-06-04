import { getPdfUrl } from './storageAPI';

type useStorageType = {
  // eslint-disable-next-line no-unused-vars
  getPdfUrl: (id: string) => Promise<void | string>
}
const useStorage = (): useStorageType => ({ getPdfUrl });

export { useStorage };
