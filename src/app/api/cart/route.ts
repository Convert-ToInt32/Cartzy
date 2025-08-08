import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        cartItems: {
          include: {
            product: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const cartItems = user.cartItems.map(item => ({
      id: item.id,
      productId: item.productId,
      name: item.product.name,
      price: parseFloat(item.product.price.toString()),
      quantity: item.quantity,
      image: item.product.images[0]
    }))

    return NextResponse.json(cartItems)
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { items } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Clear existing cart items
    await prisma.cartItem.deleteMany({
      where: { userId: user.id }
    })

    // Add new cart items
    if (items.length > 0) {
      await prisma.cartItem.createMany({
        data: items.map((item: any) => ({
          userId: user.id,
          productId: item.productId,
          quantity: item.quantity
        }))
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating cart:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
} 