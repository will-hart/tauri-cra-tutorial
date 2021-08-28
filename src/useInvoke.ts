/// A useSWR fetcher that calls "invoke" from the Tauri API
/// and uses that to return data
import { invoke } from '@tauri-apps/api/tauri'
import { useCallback } from 'react'
import useSWR from 'swr'

export const invokeFetcher = async <TArgs extends Record<string, any>, TResult>(
  command: string,
  id: number,
  args: TArgs
): Promise<TResult> => invoke<TResult>(command, { id, ...args })

export const useInvoke = <TResult>(
  id: number,
  getCommand: string,
  setCommand: string
) => {
  // run the invoke command to get by ID
  const { data, error, mutate } = useSWR<TResult>(
    [getCommand, id, null],
    invokeFetcher
  )

  // create an update function
  const update = useCallback(
    async (newData: TResult) => {
      mutate(await invoke(
        setCommand,
        { id, ...newData }
      ), false)
    },
    [mutate, id, setCommand]
  )

  return {
    data,
    fetching: !data,
    error,
    update,
  }
}
