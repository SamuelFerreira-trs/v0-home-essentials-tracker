"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { HomeItem, RoomCategory, Priority, PurchaseStatus } from "@/lib/types"

interface ItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item?: HomeItem
  onSave: (item: Omit<HomeItem, "id" | "created_at" | "updated_at"> | HomeItem) => void
}

const roomCategories: RoomCategory[] = [
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

const priorities: Priority[] = ["High", "Medium", "Low"]
const statuses: PurchaseStatus[] = ["Not Purchased", "In Progress", "Purchased"]

export function ItemDialog({ open, onOpenChange, item, onSave }: ItemDialogProps) {
  const [formData, setFormData] = useState<Partial<HomeItem>>(
    item || {
      item_name: "",
      room_category: "Kitchen",
      purchase_status: "Not Purchased",
      priority: "Medium",
      estimated_cost: 0,
      actual_cost: null,
      quantity: 1,
      notes: "",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (item) {
      onSave({ ...item, ...formData } as HomeItem)
    } else {
      onSave(formData as Omit<HomeItem, "id" | "created_at" | "updated_at">)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Item" : "Add New Item"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="item_name">Item Name *</Label>
              <Input
                id="item_name"
                value={formData.item_name}
                onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="room_category">Room Category *</Label>
              <Select
                value={formData.room_category}
                onValueChange={(value) => setFormData({ ...formData, room_category: value as RoomCategory })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roomCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="purchase_status">Purchase Status *</Label>
              <Select
                value={formData.purchase_status}
                onValueChange={(value) => setFormData({ ...formData, purchase_status: value as PurchaseStatus })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority *</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value as Priority })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) || 1 })}
                required
              />
            </div>

            <div>
              <Label htmlFor="estimated_cost">Estimated Cost ($) *</Label>
              <Input
                id="estimated_cost"
                type="number"
                min="0"
                step="0.01"
                value={formData.estimated_cost}
                onChange={(e) => setFormData({ ...formData, estimated_cost: Number.parseFloat(e.target.value) || 0 })}
                required
              />
            </div>

            <div>
              <Label htmlFor="actual_cost">Actual Cost ($)</Label>
              <Input
                id="actual_cost"
                type="number"
                min="0"
                step="0.01"
                value={formData.actual_cost || ""}
                onChange={(e) =>
                  setFormData({ ...formData, actual_cost: e.target.value ? Number.parseFloat(e.target.value) : null })
                }
                placeholder="Leave empty if not purchased"
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{item ? "Update Item" : "Add Item"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
