// localStorage の薄いラッパー。利用不可の環境では黙って無視する。
const PREFIX = 'st-textbook:'

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function save<T>(key: string, value: T) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* 保存できない環境では何もしない */
  }
}

export function remove(key: string) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    /* noop */
  }
}

export type ReadingPosition = { hash: string; y: number; at: string }
