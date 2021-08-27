/// A useSWR fetcher that calls "invoke" from the Tauri API
/// and uses that to return data
import { invoke } from '@tauri-apps/api/tauri'
import { useCallback } from 'react'
import useSWR from 'swr'

export const invokeFetcher = async <TArgs extends Record<string, any>, TResult>(
  command: string,
  args: TArgs
): Promise<TResult> => invoke<TResult>(command, args)

export const useInvoke = <TArgs extends Record<string, any>, TResult>(
  args: TArgs,
  getCommand: string,
  setCommand: string
) => {
  // run the invoke command
  const { data, error, mutate } = useSWR<TResult>(
    [getCommand, args],
    invokeFetcher
  )

  // create an update function
  const update = useCallback(
    async (newData: TResult) => {
      mutate(await invoke(setCommand, { ...args }), false)
    },
    [args, mutate, setCommand]
  )

  return {
    data,
    fetching: !data,
    error,
    update,
  }
}
