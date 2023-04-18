export interface RepositoriesResultProps<T> {
  ok: boolean
  data: T | null
  msg?: string
}
