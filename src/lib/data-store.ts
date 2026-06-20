import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), ".data")
const META_FILE = path.join(DATA_DIR, "_meta.json")

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

function storePath(name: string) {
  return path.join(DATA_DIR, `${name}.json`)
}

function readStore<T>(name: string, fallback: T[]): T[] {
  try {
    ensureDir()
    const fp = storePath(name)
    if (fs.existsSync(fp)) {
      return JSON.parse(fs.readFileSync(fp, "utf-8"))
    }
    initStore(name, fallback)
    return fallback
  } catch {
    return fallback
  }
}

function initStore(name: string, data: unknown[]) {
  try {
    ensureDir()
    fs.writeFileSync(storePath(name), JSON.stringify(data, null, 2))
  } catch {
    // silent
  }
}

export function writeStore<T>(name: string, data: T[]) {
  try {
    ensureDir()
    fs.writeFileSync(storePath(name), JSON.stringify(data, null, 2))
  } catch (e) {
    console.error(`[DATA_STORE] Failed to write ${name}:`, e)
  }
}

export function getCollection<T>(name: string, fallback: T[]): T[] {
  return readStore<T>(name, fallback)
}

export function addToCollection<T extends { id: string }>(name: string, item: T, fallback: T[]): T[] {
  const col = readStore<T>(name, fallback)
  col.unshift(item)
  writeStore(name, col)
  return col
}

export function updateInCollection<T extends { id: string }>(name: string, id: string, updates: Partial<T>, fallback: T[]): T[] {
  const col = readStore<T>(name, fallback)
  const idx = col.findIndex((i) => i.id === id)
  if (idx !== -1) {
    col[idx] = { ...col[idx], ...updates }
    writeStore(name, col)
  }
  return col
}

export function removeFromCollection<T extends { id: string }>(name: string, id: string, fallback: T[]): T[] {
  const col = readStore<T>(name, fallback)
  const filtered = col.filter((i) => i.id !== id)
  if (filtered.length !== col.length) writeStore(name, filtered)
  return filtered
}

export function resetCollection(name: string) {
  const meta = getMeta()
  delete meta[name]
  writeMeta(meta)
  const fp = storePath(name)
  if (fs.existsSync(fp)) fs.unlinkSync(fp)
}

function getMeta(): Record<string, number> {
  try {
    ensureDir()
    if (fs.existsSync(META_FILE)) {
      return JSON.parse(fs.readFileSync(META_FILE, "utf-8"))
    }
  } catch {
    // silent
  }
  return {}
}

function writeMeta(meta: Record<string, number>) {
  try {
    ensureDir()
    fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 2))
  } catch {
    // silent
  }
}
