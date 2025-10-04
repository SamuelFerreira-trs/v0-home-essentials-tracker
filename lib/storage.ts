import type { HomeItem } from "./types"
import { initialHomeItems } from "./initial-data"

const STORAGE_KEY = "home-essentials-tracker"

export function getItems(): HomeItem[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    // Initialize with default data
    const items = initialHomeItems.map((item, index) => ({
      ...item,
      id: `item-${Date.now()}-${index}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    return items
  }

  return JSON.parse(stored)
}

export function saveItems(items: HomeItem[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function addItem(item: Omit<HomeItem, "id" | "created_at" | "updated_at">): HomeItem {
  const items = getItems()
  const newItem: HomeItem = {
    ...item,
    id: `item-${Date.now()}-${Math.random()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  items.push(newItem)
  saveItems(items)
  return newItem
}

export function updateItem(id: string, updates: Partial<HomeItem>): void {
  const items = getItems()
  const index = items.findIndex((item) => item.id === id)
  if (index !== -1) {
    items[index] = {
      ...items[index],
      ...updates,
      updated_at: new Date().toISOString(),
    }
    saveItems(items)
  }
}

export function deleteItem(id: string): void {
  const items = getItems()
  const filtered = items.filter((item) => item.id !== id)
  saveItems(filtered)
}
