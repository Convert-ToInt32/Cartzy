import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: {
          where: {
            isActive: true,
          },
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    // Log the first category to debug
    console.log('First category:', JSON.stringify(categories[0], null, 2))

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    )
  }
} 