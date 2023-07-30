export interface MyInputProps<T> {
  fieldName: keyof T
  label: string
  valueAsNumber?: boolean
  valueAsDate?: boolean
  showLabel?: boolean
  type?: string
  flex?: number
  placeholder?: string
  mb?: number
  size?: Sizes
  searchFn?: ((state: any) => void) | boolean
  watchFor?: string
  triggerUpdate?: boolean
  show?: boolean
  showIf?: [keyof T, string] | boolean
}

export interface ListProps<T> {
  items: T[] | undefined
  isLoading: Boolean
  ListItem: ({ item, onClick, selected }: ListItem<T>) => JSX.Element
  onItemClick: (item: T, selected: boolean) => void
  isSelected: (item: T) => boolean
  filterFunction?: (item: T) => boolean

  fdr?: boolean
  my?: number
}

type ListItem<T> = {
  item: T
  onClick: (item: T) => void
  selected?: boolean
}

export type Sizes = "xs" | "sm" | "md" | "lg"

export type ListGeneric<T> = T &
  ({ _id?: string } | { _id: { day: number; month: number; year: number } })
