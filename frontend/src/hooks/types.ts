type DebouncedFunction<T extends (...args: any[]) => any> = (
    ...args: Parameters<T>
  ) => void
  
export type UseDebounceResult = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) => DebouncedFunction<T> 