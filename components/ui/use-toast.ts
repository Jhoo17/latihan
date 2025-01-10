import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast"
import { useState, useEffect, ReactNode } from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: ReactNode
  description?: ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type State = {
  toasts: ToasterToast[]
}

type UseToastReturn = {
  toast: (props: Omit<ToasterToast, "id">) => void
  toasts: ToasterToast[]
  dismiss: (toastId?: string) => void
}

let useToastReturn: UseToastReturn

export function useToast() {
  const [state, setState] = useState<State>({ toasts: [] })

  const toast = ({ ...props }: Omit<ToasterToast, "id">) => {
    const id = genId()

    setState((state) => {
      if (state.toasts.length >= TOAST_LIMIT) {
        return state
      }

      return {
        ...state,
        toasts: [
          ...state.toasts,
          { ...props, id },
        ],
      }
    })

    return {
      id,
      dismiss: () => setState((state) => ({
        ...state,
        toasts: state.toasts.filter((t) => t.id !== id),
      })),
    }
  }

  const utils = {
    toast,
    toasts: state.toasts,
    dismiss: (toastId?: string) => setState((state) => ({
      ...state,
      toasts: state.toasts.filter((t) => t.id !== toastId),
    })),
  }

  useToastReturn = utils

  return utils
}

export const toast = (props: Omit<ToasterToast, "id">) => {
  return useToastReturn?.toast(props)
}
