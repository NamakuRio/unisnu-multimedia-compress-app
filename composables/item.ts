import { useSingleton } from './utils'

const [provideGlobalSearch, useGlobalSearch] =
  useSingleton<(open: boolean) => void>()

const [providePreviewImage, usePreviewImage] =
  useSingleton<(photo: any) => void>()

export {
  usePreviewImage,
  providePreviewImage,
  useGlobalSearch,
  provideGlobalSearch,
}
