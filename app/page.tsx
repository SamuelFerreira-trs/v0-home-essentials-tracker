"use client"

import { useState, useEffect } from "react"
import type { HomeItem } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { calculateCategoryStats, calculateTotalStats } from "@/lib/utils-data"
import { CategoryCard } from "@/components/category-card"
import { ItemsTable } from "@/components/items-table"
import { ItemDialog } from "@/components/item-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Plus, Search, Home, DollarSign, CheckCircle2, Clock, LogOut } from "lucide-react"
import { translations, formatCurrency } from "@/lib/translations"
import { useRouter } from "next/navigation"

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
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchUser()
    fetchItems()

    // Subscribe to real-time changes
    const channel = supabase
      .channel("enxoval_items_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "enxoval_items",
        },
        () => {
          console.log("[v0] Real-time update received, refetching items")
          fetchItems()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchItems = async () => {
    try {
      console.log("[v0] Fetching items from Supabase")
      const { data, error } = await supabase.from("enxoval_items").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("[v0] Error fetching items:", error.message)
        throw error
      }

      console.log("[v0] Fetched items:", data?.length || 0)
      setItems(data || [])
    } catch (error: any) {
      console.error("[v0] Error fetching items:", error.message)
    } finally {
      setLoading(false)
    }
  }

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

  const handleTogglePurchased = async (id: string, purchased: boolean) => {
    const { error } = await supabase
      .from("enxoval_items")
      .update({
        purchase_status: purchased ? "Purchased" : "Not Purchased",
      })
      .eq("id", id)

    if (error) {
      console.error("[v0] Error updating item:", error)
    }
  }

  const handleSaveItem = async (itemData: Omit<HomeItem, "id" | "created_at" | "updated_at"> | HomeItem) => {
    if ("id" in itemData) {
      // Update existing item
      const { error } = await supabase
        .from("enxoval_items")
        .update({
          item_name: itemData.item_name,
          room_category: itemData.room_category,
          purchase_status: itemData.purchase_status,
          priority: itemData.priority,
          estimated_cost: itemData.estimated_cost,
          actual_cost: itemData.actual_cost,
          quantity: itemData.quantity,
          notes: itemData.notes,
        })
        .eq("id", itemData.id)

      if (error) {
        console.error("[v0] Error updating item:", error)
      }
    } else {
      // Insert new item
      const { error } = await supabase.from("enxoval_items").insert({
        ...itemData,
        user_id: user?.id,
      })

      if (error) {
        console.error("[v0] Error inserting item:", error)
      }
    }

    setEditingItem(undefined)
  }

  const handleEditItem = (item: HomeItem) => {
    setEditingItem(item)
    setDialogOpen(true)
  }

  const handleDeleteItem = async (id: string) => {
    const { error } = await supabase.from("enxoval_items").delete().eq("id", id)

    if (error) {
      console.error("[v0] Error deleting item:", error)
    }
  }

  const handleAddNew = () => {
    setEditingItem(undefined)
    setDialogOpen(true)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const categoryStats = calculateCategoryStats(items)
  const totalStats = calculateTotalStats(items)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Home className="h-7 w-7 text-white" />
          </div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

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
                <h1 className="text-2xl font-bold text-gray-900">{translations.appTitle}</h1>
                <p className="text-sm text-gray-600">{translations.appSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant={view === "dashboard" ? "default" : "outline"} onClick={() => setView("dashboard")}>
                {translations.dashboard}
              </Button>
              <Button variant={view === "table" ? "default" : "outline"} onClick={() => setView("table")}>
                {translations.allItems}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} title={translations.logout}>
                <LogOut className="h-5 w-5" />
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
                    <p className="text-sm text-gray-600">{translations.totalItems}</p>
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
                    <p className="text-sm text-gray-600">{translations.purchased}</p>
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
                    <p className="text-sm text-gray-600">{translations.remaining}</p>
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
                    <p className="text-sm text-gray-600">{translations.totalBudget}</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalStats.totalEstimatedCost)}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Category Cards */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Categorias</h2>
                <Button onClick={handleAddNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  {translations.addItem}
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
                <h2 className="text-2xl font-bold text-gray-900">{translations.allItems}</h2>
                <Button onClick={handleAddNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  {translations.addItem}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={translations.searchItems}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder={translations.allCategories} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{translations.allCategories}</SelectItem>
                    {categoryStats.map((stat) => (
                      <SelectItem key={stat.category} value={stat.category}>
                        {translations.categories[stat.category as keyof typeof translations.categories]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder={translations.allPriorities} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{translations.allPriorities}</SelectItem>
                    <SelectItem value="High">{translations.priority.High}</SelectItem>
                    <SelectItem value="Medium">{translations.priority.Medium}</SelectItem>
                    <SelectItem value="Low">{translations.priority.Low}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder={translations.allStatuses} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{translations.allStatuses}</SelectItem>
                    <SelectItem value="Not Purchased">{translations.status["Not Purchased"]}</SelectItem>
                    <SelectItem value="In Progress">{translations.status["In Progress"]}</SelectItem>
                    <SelectItem value="Purchased">{translations.status.Purchased}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(selectedCategory !== "all" ||
                selectedPriority !== "all" ||
                selectedStatus !== "all" ||
                searchQuery) && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {translations.showingItems
                      .replace("{count}", filteredItems.length.toString())
                      .replace("{total}", items.length.toString())}
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
                    {translations.clearFilters}
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
