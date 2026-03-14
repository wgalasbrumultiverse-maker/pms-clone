<script setup lang="ts">
import {
  bookingStatuses,
  guestServiceStatuses,
  houseKeepingStatuses,
  paymentStatuses,
  roomStatus,
  roles,
  seasons,
  type BookingStatus,
  type HouseKeepingStatus,
  type PaymentStatus,
  type RoomStatus
} from '~/types/pms'

const statCards = [
  { label: 'Occupied Rooms', value: '47 / 62', icon: 'i-heroicons-home-modern', tone: 'text-sky-600' },
  { label: 'Today Arrivals', value: '18', icon: 'i-heroicons-arrow-right-on-rectangle', tone: 'text-emerald-600' },
  { label: 'Pending Payments', value: '₱62,450', icon: 'i-heroicons-credit-card', tone: 'text-amber-600' },
  { label: 'Open Service Requests', value: '11', icon: 'i-heroicons-bell-alert', tone: 'text-rose-600' }
]

const rooms: Array<{ number: string; guest: string; status: RoomStatus; type: string }> = [
  { number: '301', guest: 'Walk-in', status: roomStatus[0], type: 'Superior Queen' },
  { number: '205', guest: 'Miguel Santos', status: roomStatus[3], type: 'Deluxe King' },
  { number: '410', guest: 'Celine Tan', status: roomStatus[1], type: 'Twin Suite' },
  { number: '118', guest: 'Blocked', status: roomStatus[2], type: 'Standard Queen' }
]

const housekeeping: Array<{ assignee: string; room: string; status: HouseKeepingStatus; eta: string }> = [
  { assignee: 'A. Reyes', room: '410', status: houseKeepingStatuses[1], eta: '12 mins' },
  { assignee: 'L. Cruz', room: '223', status: houseKeepingStatuses[0], eta: '35 mins' },
  { assignee: 'P. Lim', room: '108', status: houseKeepingStatuses[2], eta: 'Done' }
]

const bookingPipeline: Array<{ status: BookingStatus; count: number }> = [
  { status: bookingStatuses[0], count: 7 },
  { status: bookingStatuses[1], count: 19 },
  { status: bookingStatuses[2], count: 24 },
  { status: bookingStatuses[3], count: 47 },
  { status: bookingStatuses[4], count: 11 },
  { status: bookingStatuses[5], count: 3 }
]

const payments: Array<{ guest: string; method: string; amount: string; status: PaymentStatus }> = [
  { guest: 'Harper Kim', method: 'QR', amount: '₱4,200', status: paymentStatuses[1] },
  { guest: 'Omar Sy', method: 'Cash', amount: '₱8,500', status: paymentStatuses[0] },
  { guest: 'Nova Park', method: 'Bank', amount: '₱12,200', status: paymentStatuses[2] }
]

const guestServices: Array<{ request: string; cycle: string; level: string; status: string }> = [
  { request: 'Airport pickup', cycle: 'Arrival', level: 'Luxury', status: guestServiceStatuses[0] },
  { request: 'Late checkout', cycle: 'Departure', level: 'Limited', status: guestServiceStatuses[0] },
  { request: 'Birthday setup', cycle: 'Stay', level: 'Luxury', status: guestServiceStatuses[1] }
]

const quickActions = [
  { label: 'Create Booking', icon: 'i-heroicons-calendar-days' },
  { label: 'Assign Room', icon: 'i-heroicons-key' },
  { label: 'Check-in Guest', icon: 'i-heroicons-user-plus' },
  { label: 'Post Payment', icon: 'i-heroicons-banknotes' }
]

const statusColor = (status: string) => {
  if (['Occupied', 'In-House', 'Completed', 'Done', 'Paid'].includes(status)) return 'green'
  if (['Pending', 'Vacant Dirty', 'Ongoing'].includes(status)) return 'amber'
  if (['Cancelled', 'Failed', 'Maintenance', 'Out of order'].includes(status)) return 'red'
  return 'blue'
}
</script>

<template>
  <div class="min-h-screen soft-gradient p-6 md:p-10">
    <div class="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <UCard :ui="{ body: { padding: 'p-6 sm:p-8' } }">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p class="text-sm font-medium text-primary-500">Hotel Operations Hub</p>
            <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">Fast, seamless, and guest-first operations</h1>
            <p class="mt-2 text-gray-600">One workspace for front desk, billing, and housekeeping teams inspired by modern hospitality workflows.</p>
          </div>
          <div class="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <UButton
              v-for="action in quickActions"
              :key="action.label"
              :icon="action.icon"
              color="primary"
              variant="soft"
              size="md"
            >
              {{ action.label }}
            </UButton>
          </div>
        </div>
      </UCard>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <UCard v-for="stat in statCards" :key="stat.label">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-gray-500">{{ stat.label }}</p>
              <p class="mt-2 text-2xl font-bold text-gray-900">{{ stat.value }}</p>
            </div>
            <UIcon :name="stat.icon" class="h-6 w-6" :class="stat.tone" />
          </div>
        </UCard>
      </div>

      <div class="grid gap-4 xl:grid-cols-3">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="font-semibold">Live Room Board</h2>
              <UBadge color="blue" variant="soft">{{ roomStatus.length }} states</UBadge>
            </div>
          </template>
          <div class="space-y-3">
            <div v-for="room in rooms" :key="room.number" class="rounded-lg border border-gray-100 p-3">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <p class="font-semibold text-gray-900">Room {{ room.number }} · {{ room.type }}</p>
                  <p class="text-sm text-gray-500">{{ room.guest }}</p>
                </div>
                <UBadge :color="statusColor(room.status)" variant="soft">{{ room.status }}</UBadge>
              </div>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="font-semibold">Booking Pipeline</h2>
              <UBadge color="primary" variant="soft">{{ bookingStatuses.length }} stages</UBadge>
            </div>
          </template>
          <div class="space-y-3">
            <div v-for="stage in bookingPipeline" :key="stage.status" class="space-y-1">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">{{ stage.status }}</span>
                <span class="font-semibold text-gray-900">{{ stage.count }}</span>
              </div>
              <UProgress :value="Math.min(stage.count * 2, 100)" />
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="font-semibold">Housekeeping Dispatch</h2>
              <UBadge color="emerald" variant="soft">Real-time</UBadge>
            </div>
          </template>
          <div class="space-y-3">
            <div v-for="task in housekeeping" :key="`${task.room}-${task.assignee}`" class="rounded-lg bg-gray-50 p-3">
              <p class="text-sm font-semibold text-gray-800">Room {{ task.room }} · {{ task.assignee }}</p>
              <div class="mt-2 flex items-center justify-between">
                <UBadge :color="statusColor(task.status)" variant="subtle">{{ task.status }}</UBadge>
                <span class="text-xs text-gray-500">ETA {{ task.eta }}</span>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <div class="grid gap-4 lg:grid-cols-2">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="font-semibold">Billing Snapshot</h2>
              <UBadge color="amber" variant="soft">{{ paymentStatuses.join(' · ') }}</UBadge>
            </div>
          </template>
          <UTable :rows="payments" :columns="[
            { key: 'guest', label: 'Guest' },
            { key: 'method', label: 'Method' },
            { key: 'amount', label: 'Amount' },
            { key: 'status', label: 'Status' }
          ]">
            <template #status-data="{ row }">
              <UBadge :color="statusColor(row.status)">{{ row.status }}</UBadge>
            </template>
          </UTable>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="font-semibold">Guest Service Desk</h2>
              <UBadge color="rose" variant="soft">Cycle-aware</UBadge>
            </div>
          </template>
          <div class="space-y-3">
            <div v-for="service in guestServices" :key="service.request" class="rounded-lg border border-gray-100 p-3">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <p class="font-semibold text-gray-900">{{ service.request }}</p>
                <UBadge :color="statusColor(service.status)" variant="soft">{{ service.status }}</UBadge>
              </div>
              <p class="mt-2 text-sm text-gray-600">{{ service.cycle }} · {{ service.level }}</p>
            </div>
          </div>
        </UCard>
      </div>

      <UCard>
        <template #header>
          <h2 class="font-semibold">System Model Coverage</h2>
        </template>
        <div class="grid gap-3 text-sm text-gray-600 sm:grid-cols-2 xl:grid-cols-4">
          <p><span class="font-semibold text-gray-900">Roles:</span> {{ roles.join(', ') }}</p>
          <p><span class="font-semibold text-gray-900">Seasons:</span> {{ seasons.map((s) => s.description).join(', ') }}</p>
          <p><span class="font-semibold text-gray-900">Guest Service Status:</span> {{ guestServiceStatuses.join(', ') }}</p>
          <p><span class="font-semibold text-gray-900">Room States:</span> {{ roomStatus.join(', ') }}</p>
        </div>
      </UCard>
    </div>
  </div>
</template>
