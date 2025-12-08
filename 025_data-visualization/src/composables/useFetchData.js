import { ref, onMounted } from 'vue'

// Mock data for our dashboard
const mockSalesData = [
  { month: 'Jan', sales: 65000, users: 1200, revenue: 75000 },
  { month: 'Feb', sales: 52000, users: 1100, revenue: 68000 },
  { month: 'Mar', sales: 78000, users: 1500, revenue: 92000 },
  { month: 'Apr', sales: 82000, users: 1600, revenue: 98000 },
  { month: 'May', sales: 71000, users: 1450, revenue: 85000 },
  { month: 'Jun', sales: 95000, users: 1900, revenue: 115000 },
  { month: 'Jul', sales: 89000, users: 1800, revenue: 105000 },
  { month: 'Aug', sales: 92000, users: 1850, revenue: 110000 },
  { month: 'Sep', sales: 86000, users: 1750, revenue: 102000 },
  { month: 'Oct', sales: 99000, users: 2000, revenue: 120000 },
  { month: 'Nov', sales: 105000, users: 2100, revenue: 125000 },
  { month: 'Dec', sales: 115000, users: 2300, revenue: 135000 }
]

const mockProductData = [
  { product: 'Laptop', sales: 420, revenue: 315000 },
  { product: 'Phone', sales: 850, revenue: 595000 },
  { product: 'Tablet', sales: 320, revenue: 128000 },
  { product: 'Monitor', sales: 280, revenue: 196000 },
  { product: 'Keyboard', sales: 520, revenue: 104000 }
]

export default function useFetchData() {
  const salesData = ref([])
  const productData = ref([])
  const loading = ref(true)
  const error = ref(null)

  // Simulate API call
  const fetchData = async () => {
    try {
      loading.value = true
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      salesData.value = [...mockSalesData]
      productData.value = [...mockProductData]
      error.value = null
    } catch (err) {
      error.value = 'Failed to fetch data. Please try again later.'
      console.error('Error fetching data:', err)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchData()
  })

  return {
    salesData,
    productData,
    loading,
    error,
    fetchData
  }
}