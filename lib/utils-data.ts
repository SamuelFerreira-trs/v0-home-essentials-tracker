import type { HomeItem, CategoryStats, RoomCategory } from "./types"

export function calculateCategoryStats(items: HomeItem[]): CategoryStats[] {
  const categories: RoomCategory[] = [
    "Kitchen",
    "Living Room",
    "Bedroom",
    "Bathroom",
    "Laundry",
    "Dining Room",
    "Home Office",
    "Outdoor",
    "General",
  ]

  return categories
    .map((category) => {
      const categoryItems = items.filter((item) => item.room_category === category)
      const purchased = categoryItems.filter((item) => item.purchase_status === "Purchased")
      const notPurchased = categoryItems.filter((item) => item.purchase_status !== "Purchased")

      return {
        category,
        total: categoryItems.length,
        purchased: purchased.length,
        notPurchased: notPurchased.length,
        totalEstimatedCost: categoryItems.reduce((sum, item) => sum + item.estimated_cost, 0),
        totalActualCost: purchased.reduce((sum, item) => sum + (item.actual_cost || 0), 0),
      }
    })
    .filter((stat) => stat.total > 0)
}

export function calculateTotalStats(items: HomeItem[]) {
  const purchased = items.filter((item) => item.purchase_status === "Purchased")
  const inProgress = items.filter((item) => item.purchase_status === "In Progress")
  const notPurchased = items.filter((item) => item.purchase_status === "Not Purchased")

  return {
    total: items.length,
    purchased: purchased.length,
    inProgress: inProgress.length,
    notPurchased: notPurchased.length,
    totalEstimatedCost: items.reduce((sum, item) => sum + item.estimated_cost, 0),
    totalActualCost: purchased.reduce((sum, item) => sum + (item.actual_cost || 0), 0),
  }
}
