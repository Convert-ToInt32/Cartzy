import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.review.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  console.log('🗑️ Cleared existing data')

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'GPU',
        description: 'High-performance graphics cards for gaming and professional use',
        image: 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=400&h=300&fit=crop'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Table',
        description: 'Quality furniture for home and office',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Refrigerator',
        description: 'Modern refrigeration solutions for every home',
        image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&h=300&fit=crop'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Dress',
        description: 'Elegant clothing for special occasions and everyday wear',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop'
      }
    })
  ])

  console.log('📂 Created categories')

  // Create products with diverse images
  const products = [
    // GPUs - Different GPU images
    {
      name: "NVIDIA RTX 4090",
      price: 1599.99,
      categoryId: categories[0].id,
      images: ["https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=400&h=300&fit=crop"],
      description: "The most powerful gaming GPU with 24GB GDDR6X memory",
      stock: 5
    },
    {
      name: "AMD RX 7900 XTX",
      price: 999.99,
      categoryId: categories[0].id,
      images: ["https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop"],
      description: "High-performance gaming graphics card with 24GB GDDR6",
      stock: 8
    },
    {
      name: "NVIDIA RTX 4080",
      price: 1199.99,
      categoryId: categories[0].id,
      images: ["https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=400&h=300&fit=crop"],
      description: "Excellent 4K gaming performance with 16GB GDDR6X",
      stock: 12
    },
    {
      name: "AMD RX 7900 XT",
      price: 899.99,
      categoryId: categories[0].id,
      images: ["https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop"],
      description: "Powerful gaming GPU with 20GB GDDR6 memory",
      stock: 6
    },
    {
      name: "NVIDIA RTX 4070 Ti",
      price: 799.99,
      categoryId: categories[0].id,
      images: ["https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=400&h=300&fit=crop"],
      description: "Great 1440p gaming performance with 12GB GDDR6X",
      stock: 15
    },

    // Tables - Different table images
    {
      name: "Modern Dining Table",
      price: 299.99,
      categoryId: categories[1].id,
      images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
      description: "Elegant wooden dining table for 6-8 people",
      stock: 10
    },
    {
      name: "Glass Coffee Table",
      price: 199.99,
      categoryId: categories[1].id,
      images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
      description: "Contemporary glass coffee table with metal frame",
      stock: 7
    },
    {
      name: "Office Desk",
      price: 399.99,
      categoryId: categories[1].id,
      images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
      description: "Spacious office desk with cable management",
      stock: 20
    },
    {
      name: "Console Table",
      price: 149.99,
      categoryId: categories[1].id,
      images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
      description: "Slim console table perfect for entryways",
      stock: 12
    },
    {
      name: "Outdoor Patio Table",
      price: 249.99,
      categoryId: categories[1].id,
      images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
      description: "Weather-resistant patio table with umbrella hole",
      stock: 8
    },

    // Refrigerators - Different fridge images
    {
      name: "French Door Refrigerator",
      price: 1299.99,
      categoryId: categories[2].id,
      images: ["https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&h=300&fit=crop"],
      description: "Large capacity French door fridge with ice maker",
      stock: 3
    },
    {
      name: "Side-by-Side Refrigerator",
      price: 1099.99,
      categoryId: categories[2].id,
      images: ["https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&h=300&fit=crop"],
      description: "Convenient side-by-side design with water dispenser",
      stock: 5
    },
    {
      name: "Bottom Freezer Refrigerator",
      price: 899.99,
      categoryId: categories[2].id,
      images: ["https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&h=300&fit=crop"],
      description: "Energy-efficient bottom freezer design",
      stock: 7
    },
    {
      name: "Compact Refrigerator",
      price: 299.99,
      categoryId: categories[2].id,
      images: ["https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&h=300&fit=crop"],
      description: "Perfect for small spaces and dorm rooms",
      stock: 25
    },
    {
      name: "Smart Refrigerator",
      price: 1899.99,
      categoryId: categories[2].id,
      images: ["https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&h=300&fit=crop"],
      description: "WiFi-enabled smart fridge with touchscreen",
      stock: 2
    },

    // Dresses - Different dress images
    {
      name: "Evening Gown",
      price: 299.99,
      categoryId: categories[3].id,
      images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop"],
      description: "Elegant black evening gown for special occasions",
      stock: 15
    },
    {
      name: "Summer Dress",
      price: 89.99,
      categoryId: categories[3].id,
      images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop"],
      description: "Light and comfortable summer dress with floral pattern",
      stock: 30
    },
    {
      name: "Cocktail Dress",
      price: 149.99,
      categoryId: categories[3].id,
      images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop"],
      description: "Perfect cocktail dress for parties and events",
      stock: 20
    },
    {
      name: "Wedding Dress",
      price: 899.99,
      categoryId: categories[3].id,
      images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop"],
      description: "Beautiful white wedding dress with lace details",
      stock: 5
    },
    {
      name: "Casual Dress",
      price: 59.99,
      categoryId: categories[3].id,
      images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop"],
      description: "Comfortable casual dress for everyday wear",
      stock: 40
    }
  ]

  await prisma.product.createMany({
    data: products
  })

  console.log('📦 Created products')

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 