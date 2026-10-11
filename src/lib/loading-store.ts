"use client"

import { useSyncExternalStore } from "react"

let pending = 0
const listeners = new Set<() => void>()

function emit() {
  for (const listener of listeners) listener()
}

/**
 * Register an in-flight data request. Returns an idempotent "done" callback
 * that must be called once the request settles (success or failure).
 */
export function beginLoading(): () => void {
  pending += 1
  emit()

  let ended = false
  return () => {
    if (ended) return
    ended = true
    pending = Math.max(0, pending - 1)
    emit()
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return pending
}

function getServerSnapshot() {
  return 0
}

/** Number of data requests currently in flight across the app. */
export function usePendingFetches() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
