import React, { useEffect, useState } from 'react'
import { DataTable, Button, Trash2, Edit, Input, Search } from '@/components'
import type { ColumnDef } from '@tanstack/react-table'
import { apiService } from '@/services/apiService'
import toast from 'react-hot-toast'

interface User {
  id: string
  name: string
  email: string
  role: string
  totalDonations: number
  createdAt: string
}

// Type for sorting
type SortField = 'name' | 'email' | 'totalDonations' | 'createdAt' | null
type SortOrder = 'asc' | 'desc'

/**
 * Example component showing how to use:
 * - DataTable with columns and pagination
 * - API integration for data fetching
 * - Row actions (edit, delete)
 */
export function ExampleUserAdminTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  // Get all users (original data)
  const allUsers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'DONOR',
      totalDonations: 5,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'CLAIMANT',
      totalDonations: 0,
      createdAt: '2024-01-20',
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'ADMIN',
      totalDonations: 3,
      createdAt: '2024-01-01',
    },
    {
      id: '4',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'DONOR',
      totalDonations: 12,
      createdAt: '2024-01-10',
    },
    {
      id: '5',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      role: 'CLAIMANT',
      totalDonations: 2,
      createdAt: '2024-01-18',
    },
  ]

  useEffect(() => {
    applyFiltersAndSort()
  }, [searchQuery, sortField, sortOrder])

  const applyFiltersAndSort = () => {
    setLoading(true)
    
    // Filter
    let filtered = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Sort
    if (sortField) {
      filtered.sort((a, b) => {
        let aVal = a[sortField]
        let bVal = b[sortField]

        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase()
          bVal = (bVal as string).toLowerCase()
        }

        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }

    setUsers(filtered)
    setLoading(false)
  }

  const handleDelete = async (userId: string) => {
    if (confirm('Are you sure?')) {
      try {
        // await apiService.deleteUser(userId)
        setUsers(users.filter((u) => u.id !== userId))
        toast.success('User deleted')
      } catch (error) {
        toast.error('Failed to delete user')
      }
    }
  }

  const handleEdit = (userId: string) => {
    // Navigate to edit page or open modal
    console.log('Edit user:', userId)
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ getValue }) => (
        <span className="font-semibold">{getValue() as string}</span>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ getValue }) => {
        const role = getValue() as string
        const colors: Record<string, string> = {
          ADMIN: 'bg-red-100 text-red-800',
          DONOR: 'bg-green-100 text-green-800',
          CLAIMANT: 'bg-blue-100 text-blue-800',
        }
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              colors[role] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {role}
          </span>
        )
      },
    },
    {
      accessorKey: 'totalDonations',
      header: 'Donations',
      cell: ({ getValue }) => (
        <span className="font-semibold text-center block">
          {getValue() as number}
        </span>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Joined',
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string)
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(row.original.id)}
            className="gap-2"
          >
            <Edit size={16} />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
            className="text-red-600 hover:bg-red-50 gap-2"
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      ),
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    )
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600 mt-2">
            Manage all users in the system • Total: {users.length} users
          </p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Search by Name or Email
              </label>
              <input
                type="text"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg
                  focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20"
              />
              {searchQuery && (
                <p className="text-sm text-gray-600 mt-1">
                  Found {users.length} result{users.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📊 Sort By
              </label>
              <select
                value={sortField || ''}
                onChange={(e) => setSortField((e.target.value as SortField) || null)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg
                  focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20"
              >
                <option value="">None</option>
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="totalDonations">Donations</option>
                <option value="createdAt">Join Date</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="md:col-span-3">
              <div className="flex gap-2">
                <Button
                  variant={sortOrder === 'asc' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSortOrder('asc')}
                  disabled={!sortField}
                >
                  ↑ Ascending
                </Button>
                <Button
                  variant={sortOrder === 'desc' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSortOrder('desc')}
                  disabled={!sortField}
                >
                  ↓ Descending
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSortField(null)
                    setSearchQuery('')
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96">
              <p className="text-gray-500 text-lg">No users found</p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your search filters
              </p>
            </div>
          ) : (
            <DataTable columns={columns} data={users} />
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-2xl font-bold text-gray-800">{users.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Donors</p>
            <p className="text-2xl font-bold text-green-600">
              {users.filter((u) => u.role === 'DONOR').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Claimants</p>
            <p className="text-2xl font-bold text-blue-600">
              {users.filter((u) => u.role === 'CLAIMANT').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Admins</p>
            <p className="text-2xl font-bold text-red-600">
              {users.filter((u) => u.role === 'ADMIN').length}
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900 text-sm">
            <strong>💡 Features:</strong> Try searching by name/email, sorting by different columns,
            and toggling between ascending/descending order. Pagination arrows at the bottom of
            the table navigate through pages.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ExampleUserAdminTable
