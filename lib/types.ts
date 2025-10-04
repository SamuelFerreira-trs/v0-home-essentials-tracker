export type RoomCategory =
  | "Kitchen"
  | "Living Room"
  | "Bedroom"
  | "Bathroom"
  | "Laundry"
  | "Dining Room"
  | "Home Office"
  | "Outdoor"
  | "General"

export type Priority = "High" | "Medium" | "Low"

export type PurchaseStatus = "Not Purchased" | "Purchased" | "In Progress"

export interface HomeItem {
  id: string
  item_name: string
  room_category: RoomCategory
  purchase_status: PurchaseStatus
  priority: Priority
  estimated_cost: number
  actual_cost: number | null
  quantity: number
  notes: string
  created_at: string
  updated_at: string
}

export interface CategoryStats {
  category: RoomCategory
  total: number
  purchased: number
  notPurchased: number
  totalEstimatedCost: number
  totalActualCost: number
}
