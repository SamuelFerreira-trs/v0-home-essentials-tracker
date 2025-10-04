"use client"

import { useState, useEffect } from "react"
import type { HomeItem } from "@/lib/types"
import { getItems, addItem, updateItem, deleteItem } from "@/lib/storage"
import { calculateCategoryStats, calculateTotalStats } from "@/lib/utils-data"
import { CategoryCard } from "@/components/category-card"
import { ItemsTable } from "@/components/items-table"
import { ItemDialog } from "@/components/item-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Plus, Search, Home, DollarSign, CheckCircle2, Clock } from "lucide-react"

const categoryColors: Record<string, string> = {
  Kitchen: "#FFE5B4",
  "Living Room": "#B4D7FF",
  Bedroom: "#FFB4E5",
  Bathroom: "#B4FFE5",
  Laundry: "#E5B4FF",
  "Dining Room": "#FFD7B4",
  "Home Office": "#D7FFB4",
  Outdoor: "#B4FFD7",
  General: "#FFB4B4",
}

export default function HomePage() {
  const [items, setItems] = useState<HomeItem[]>([])
  const [filteredItems, setFilteredItems] = useState<HomeItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedPriority, setSelectedPriority] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<HomeItem | undefined>()
  const [view, setView] = useState<"dashboard" | "table">("dashboard")

  useEffect(() => {
    setItems(getItems())
  }, [])

  useEffect(() => {
    let filtered = items

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.notes.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.room_category === selectedCategory)
    }

    if (selectedPriority !== "all") {
      filtered = filtered.filter((item) => item.priority === selectedPriority)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((item) => item.purchase_status === selectedStatus)
    }

    setFilteredItems(filtered)
  }, [items, searchQuery, selectedCategory, selectedPriority, selectedStatus])

  const handleTogglePurchased = (id: string, purchased: boolean) => {
    updateItem(id, {
      purchase_status: purchased ? "Purchased" : "Not Purchased",
    })
    setItems(getItems())
  }

  const handleSaveItem = (itemData: Omit<HomeItem, "id" | "created_at" | "updated_at"> | HomeItem) => {
    if ("id" in itemData) {
      updateItem(itemData.id, itemData)
    } else {
      addItem(itemData)
    }
    setItems(getItems())
    setEditingItem(undefined)
  }

  const handleEditItem = (item: HomeItem) => {
    setEditingItem(item)
    setDialogOpen(true)
  }

  const handleDeleteItem = (id: string) => {
    deleteItem(id)
    setItems(getItems())
  }

  const handleAddNew = () => {
    setEditingItem(undefined)
    setDialogOpen(true)
  }

  const categoryStats = calculateCategoryStats(items)
  const totalStats = calculateTotalStats(items)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Home Essentials Tracker</h1>
                <p className="text-sm text-gray-600">Plan your new home together</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant={view === "dashboard" ? "default" : "outline"} onClick={() => setView("dashboard")}>
                Dashboard
              </Button>
              <Button variant={view === "table" ? "default" : "outline"} onClick={() => setView("table")}>
                All Items
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {view === "dashboard" ? (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Home className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Items</p>
                    <p className="text-2xl font-bold text-gray-900">{totalStats.total}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Purchased</p>
                    <p className="text-2xl font-bold text-gray-900">{totalStats.purchased}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Remaining</p>
                    <p className="text-2xl font-bold text-gray-900">{totalStats.notPurchased}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Budget</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${totalStats.totalEstimatedCost.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Category Cards */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
                <Button onClick={handleAddNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryStats.map((stat) => (
                  <CategoryCard
                    key={stat.category}
                    stats={stat}
                    color={categoryColors[stat.category] || "#E5E5E5"}
                    onClick={() => {
                      setSelectedCategory(stat.category)
                      setView("table")
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">All Items</h2>
                <Button onClick={handleAddNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categoryStats.map((stat) => (
                      <SelectItem key={stat.category} value={stat.category}>
                        {stat.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Priorities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Not Purchased">Not Purchased</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Purchased">Purchased</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(selectedCategory !== "all" ||
                selectedPriority !== "all" ||
                selectedStatus !== "all" ||
                searchQuery) && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Showing {filteredItems.length} of {items.length} items
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                      setSelectedPriority("all")
                      setSelectedStatus("all")
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>

            {/* Items Table */}
            <ItemsTable
              items={filteredItems}
              onTogglePurchased={handleTogglePurchased}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          </>
        )}
      </main>

      {/* Item Dialog */}
      <ItemDialog open={dialogOpen} onOpenChange={setDialogOpen} item={editingItem} onSave={handleSaveItem} />
    </div>
  )
}
