export type SystemId = ReturnType<typeof crypto.randomUUID>

interface Model {
  id: SystemId
  createdById: SystemId
  updatedById: SystemId
  createdAt: Date
  updatedAt: Date
}

export const roles = ['Administrator', 'Front Desk', 'Billing Officer', 'Housekeeping', 'Supervisor'] as const
export type UserRole = typeof roles[number]

export interface User extends Model {
  name: string
  username: string
  password: string
  role: UserRole
}

export interface Guest extends Model {
  name: string
  phoneNumber?: string
  email?: string
  address?: string
  presentId: string
  isVIP: boolean
}

export const seasons = [
  {
    description: 'Low',
    value: 0.5
  },
  {
    description: 'Normal',
    value: 1
  },
  {
    description: 'High',
    value: 2
  },
  {
    description: 'Peak',
    value: 2.7
  }
] as const

export interface SeasonalRate extends Model {
  season: typeof seasons
  roomTypeId: RoomType['id']
}

export interface RoomType extends Model {
  name: string
  rate: number
  description?: string
  accomodation: number
  inclusions: string[]
}

export const roomStatus = ['Vacant', 'Vacant Dirty', 'Maintenance', 'Occupied', 'Out of order'] as const
export type RoomStatus = typeof roomStatus[number]

export interface Room extends Model {
  roomTypeId: RoomType['id']
  number: string
  status: RoomStatus
}

export const bookingStatuses = ['Pending', 'Confirmed', 'Paid', 'In-House', 'Done', 'Cancelled'] as const
export type BookingStatus = typeof bookingStatuses[number]

export interface Booking extends Model {
  startDate: Date
  endDate: Date
  guestId: Guest['id']
  status: BookingStatus
  total: number
  referenceNumber: string
  guestNotes?: string
}

export interface BookingRoom extends Model {
  bookingId: Booking['id']
  roomTypeId: RoomType['id']
}

export interface CheckIn extends Model {
  roomId: Room['id']
  bookingId: Booking['id']
}

export interface CheckOut extends Model {
  roomId: Room['id']
  bookingId: Booking['id']
}

export const payorTypes = ['Guest', 'Staff'] as const

export type Payor = {
  type: typeof payorTypes[number]
  name: string
  billingAddress: string
  email?: string
}
export const currencies = ['PHP'] as const
export type Currency = typeof currencies[number]

export const paymentStatuses = ['Pending', 'Completed', 'Failed'] as const
export type PaymentStatus = typeof paymentStatuses[number]

export const paymentMethods = ['Cash', 'QR', 'Bank'] as const
export type PaymentMethod = typeof paymentMethods[number]
export type PaymentItem = {
  description: string
  amount: string
}
export interface Payment extends Model {
  payor: Payor
  amount: number
  currency: Currency
  status: PaymentStatus
  method: PaymentMethod
  paymentItems: PaymentItem[]
}

export const houseKeepingStatuses = ['Pending', 'Ongoing', 'Completed'] as const
export type HouseKeepingStatus = typeof houseKeepingStatuses[number]

export interface Housekeeping extends Model {
  assigneeId: User['id']
  roomId: Room['id']
  status: HouseKeepingStatus
}

export const guestServiceCycles = ['Pre-arrival', 'Arrival', 'Stay', 'Departure'] as const
export type GuestServiceCycle = typeof guestServiceCycles[number]

export const guestFunctionalCategories = ['Front Desk & Reception', 'Concierge', 'Food & Beverages', 'Wellness & Recreation', 'Business & Technology', 'Logistic & Transportation'] as const
export type GuestFunctionalCategory = typeof guestFunctionalCategories[number]

export const guestServiceLevels = [
  'Limited', // Focuses on efficiency and basic needs like a clean room and complimentary breakfast.
  'Luxury' // Emphasizes personalization, such as remembering guest names, providing turndown service, and offering exclusive access to executive lounges.
] as const
export type GuestServiceLevel = typeof guestServiceLevels[number]

export const guestServiceStatuses = ['Pending', 'Done'] as const
export type guestServiceStatus = typeof guestServiceStatuses[number]

export interface GuestServiceRequest extends Model {
  guestId: Guest['id']
  bookingId: Booking['id']
  roomId?: Room['id']
  timing: GuestServiceCycle
  level: GuestServiceLevel
  functionCategory: GuestFunctionalCategory
  status: guestServiceStatus
}
