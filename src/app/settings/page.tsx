"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Camera, Trash2, Plus, Edit, Eye, EyeOff } from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  dateOfBirth: string
  nationality: string
  address: {
    street: string
    city: string
    country: string
    zipCode: string
  }
  preferences: {
    currency: string
    language: string
    timezone: string
    emailNotifications: boolean
    smsNotifications: boolean
    marketingEmails: boolean
  }
}

interface PaymentMethod {
  id: string
  type: "credit" | "debit"
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
}

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "profile"

  const [user, setUser] = useState<UserProfile | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false)
  const [showEditPaymentDialog, setShowEditPaymentDialog] = useState(false)
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [newPaymentForm, setNewPaymentForm] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchUserData()
    fetchPaymentMethods()
  }, [])

  const fetchUserData = async () => {
    try {
      // Mock user data
      const mockUser: UserProfile = {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        avatar: "/placeholder.svg?height=100&width=100",
        dateOfBirth: "1990-01-15",
        nationality: "United States",
        address: {
          street: "123 Main Street",
          city: "New York",
          country: "United States",
          zipCode: "10001",
        },
        preferences: {
          currency: "USD",
          language: "English",
          timezone: "America/New_York",
          emailNotifications: true,
          smsNotifications: false,
          marketingEmails: true,
        },
      }
      setUser(mockUser)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch user data:", error)
      setLoading(false)
    }
  }

  const fetchPaymentMethods = async () => {
    try {
      // Mock payment methods
      const mockPaymentMethods: PaymentMethod[] = [
        {
          id: "1",
          type: "credit",
          last4: "1234",
          brand: "Visa",
          expiryMonth: 12,
          expiryYear: 2025,
          isDefault: true,
        },
        {
          id: "2",
          type: "credit",
          last4: "5678",
          brand: "Mastercard",
          expiryMonth: 8,
          expiryYear: 2026,
          isDefault: false,
        },
      ]
      setPaymentMethods(mockPaymentMethods)
    } catch (error) {
      console.error("Failed to fetch payment methods:", error)
    }
  }

  const handleProfileUpdate = async (updatedData: Partial<UserProfile>) => {
    try {
      setUser((prev) => (prev ? { ...prev, ...updatedData } : null))
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }
    try {
      // Simulate password change
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully.",
      })
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAvatarChange = () => {
    // Create a file input element
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        // In a real app, you would upload the file to a server
        const reader = new FileReader()
        reader.onload = (e) => {
          const newAvatar = e.target?.result as string
          handleProfileUpdate({ avatar: newAvatar })
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleAddPaymentMethod = () => {
    if (
      !newPaymentForm.cardNumber ||
      !newPaymentForm.expiryMonth ||
      !newPaymentForm.expiryYear ||
      !newPaymentForm.cvv
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newPayment: PaymentMethod = {
      id: Date.now().toString(),
      type: "credit",
      last4: newPaymentForm.cardNumber.slice(-4),
      brand: newPaymentForm.cardNumber.startsWith("4") ? "Visa" : "Mastercard",
      expiryMonth: Number.parseInt(newPaymentForm.expiryMonth),
      expiryYear: Number.parseInt(newPaymentForm.expiryYear),
      isDefault: paymentMethods.length === 0,
    }

    setPaymentMethods((prev) => [...prev, newPayment])
    setShowAddPaymentDialog(false)
    setNewPaymentForm({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      cardholderName: "",
    })
    toast({
      title: "Payment Method Added",
      description: "Your payment method has been added successfully.",
    })
  }

  const handleEditPaymentMethod = () => {
    if (!editingPayment) return

    setPaymentMethods((prev) => prev.map((method) => (method.id === editingPayment.id ? editingPayment : method)))
    setShowEditPaymentDialog(false)
    setEditingPayment(null)
    toast({
      title: "Payment Method Updated",
      description: "Your payment method has been updated successfully.",
    })
  }

  const handleDeletePaymentMethod = (id: string) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id))
    toast({
      title: "Payment Method Deleted",
      description: "Payment method has been removed from your account.",
    })
  }

  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
    toast({
      title: "Default Payment Updated",
      description: "Default payment method has been updated.",
    })
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-lg h-96"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Account Settings</h1>
          <p className="text-gray-600">Manage your account preferences and settings</p>
        </div>

        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="text-lg">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent" onClick={handleAvatarChange}>
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={user.name}
                      onChange={(e) => handleProfileUpdate({ name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => handleProfileUpdate({ email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={user.phone}
                      onChange={(e) => handleProfileUpdate({ phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={user.dateOfBirth}
                      onChange={(e) => handleProfileUpdate({ dateOfBirth: e.target.value })}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                  <h4 className="font-medium">Address</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        value={user.address.street}
                        onChange={(e) =>
                          handleProfileUpdate({
                            address: { ...user.address, street: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={user.address.city}
                        onChange={(e) =>
                          handleProfileUpdate({
                            address: { ...user.address, city: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={user.address.country}
                        onValueChange={(value) =>
                          handleProfileUpdate({
                            address: { ...user.address, country: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={user.address.zipCode}
                        onChange={(e) =>
                          handleProfileUpdate({
                            address: { ...user.address, zipCode: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="space-y-4">
                  <h4 className="font-medium">Preferences</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={user.preferences.currency}
                        onValueChange={(value) =>
                          handleProfileUpdate({
                            preferences: { ...user.preferences, currency: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="CAD">CAD (C$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={user.preferences.language}
                        onValueChange={(value) =>
                          handleProfileUpdate({
                            preferences: { ...user.preferences, language: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="German">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={user.preferences.timezone}
                        onValueChange={(value) =>
                          handleProfileUpdate({
                            preferences: { ...user.preferences, timezone: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="America/Chicago">Central Time</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your saved payment methods</CardDescription>
                  </div>
                  <Dialog open={showAddPaymentDialog} onOpenChange={setShowAddPaymentDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Payment Method</DialogTitle>
                        <DialogDescription>Add a new credit or debit card to your account.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={newPaymentForm.cardNumber}
                            onChange={(e) => setNewPaymentForm((prev) => ({ ...prev, cardNumber: e.target.value }))}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryMonth">Expiry Month</Label>
                            <Select
                              value={newPaymentForm.expiryMonth}
                              onValueChange={(value) => setNewPaymentForm((prev) => ({ ...prev, expiryMonth: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Month" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 12 }, (_, i) => (
                                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                                    {(i + 1).toString().padStart(2, "0")}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expiryYear">Expiry Year</Label>
                            <Select
                              value={newPaymentForm.expiryYear}
                              onValueChange={(value) => setNewPaymentForm((prev) => ({ ...prev, expiryYear: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 10 }, (_, i) => (
                                  <SelectItem key={2024 + i} value={(2024 + i).toString()}>
                                    {2024 + i}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={newPaymentForm.cvv}
                            onChange={(e) => setNewPaymentForm((prev) => ({ ...prev, cvv: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardholderName">Cardholder Name</Label>
                          <Input
                            id="cardholderName"
                            placeholder="John Doe"
                            value={newPaymentForm.cardholderName}
                            onChange={(e) => setNewPaymentForm((prev) => ({ ...prev, cardholderName: e.target.value }))}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddPaymentDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddPaymentMethod}>Add Payment Method</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {method.brand} •••• {method.last4}
                            {method.isDefault && (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            Expires {method.expiryMonth.toString().padStart(2, "0")}/{method.expiryYear}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!method.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent"
                            onClick={() => handleSetDefaultPayment(method.id)}
                          >
                            Set Default
                          </Button>
                        )}
                        <Dialog open={showEditPaymentDialog} onOpenChange={setShowEditPaymentDialog}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent"
                              onClick={() => setEditingPayment(method)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Payment Method</DialogTitle>
                              <DialogDescription>Update your payment method details.</DialogDescription>
                            </DialogHeader>
                            {editingPayment && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="editExpiryMonth">Expiry Month</Label>
                                    <Select
                                      value={editingPayment.expiryMonth.toString()}
                                      onValueChange={(value) =>
                                        setEditingPayment((prev) =>
                                          prev ? { ...prev, expiryMonth: Number.parseInt(value) } : null,
                                        )
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {Array.from({ length: 12 }, (_, i) => (
                                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                                            {(i + 1).toString().padStart(2, "0")}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="editExpiryYear">Expiry Year</Label>
                                    <Select
                                      value={editingPayment.expiryYear.toString()}
                                      onValueChange={(value) =>
                                        setEditingPayment((prev) =>
                                          prev ? { ...prev, expiryYear: Number.parseInt(value) } : null,
                                        )
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {Array.from({ length: 10 }, (_, i) => (
                                          <SelectItem key={2024 + i} value={(2024 + i).toString()}>
                                            {2024 + i}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setShowEditPaymentDialog(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleEditPaymentMethod}>Update Payment Method</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleDeletePaymentMethod(method.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-gray-600">Receive booking confirmations and updates via email</div>
                  </div>
                  <Switch
                    checked={user.preferences.emailNotifications}
                    onCheckedChange={(checked) =>
                      handleProfileUpdate({
                        preferences: { ...user.preferences, emailNotifications: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">SMS Notifications</div>
                    <div className="text-sm text-gray-600">Receive important updates via text message</div>
                  </div>
                  <Switch
                    checked={user.preferences.smsNotifications}
                    onCheckedChange={(checked) =>
                      handleProfileUpdate({
                        preferences: { ...user.preferences, smsNotifications: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Marketing Emails</div>
                    <div className="text-sm text-gray-600">Receive promotional offers and travel deals</div>
                  </div>
                  <Switch
                    checked={user.preferences.marketingEmails}
                    onCheckedChange={(checked) =>
                      handleProfileUpdate({
                        preferences: { ...user.preferences, marketingEmails: checked },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>
                <Button onClick={handlePasswordChange} className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Additional security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
                  </div>
                  <Button variant="outline" className="bg-transparent">
                    Enable
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Login Alerts</div>
                    <div className="text-sm text-gray-600">Get notified when someone logs into your account</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
