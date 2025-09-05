import { api } from "@/lib/api-client";
import { z } from "zod";
import type { CartLineItem } from "@/store/cart";

// Zod schema for the checkout form, matching your Django Order model
export const checkoutSchema = z.object({
    first_name: z.string().min(1, "نام الزامی است"),
    last_name: z.string().min(1, "نام خانوادگی الزامی است"),
    email: z.string().email("ایمیل وارد شده صحیح نیست"),
    phone_number: z.string().min(11, "شماره موبایل صحیح نیست"),
    address: z.string().min(5, "آدرس الزامی است"),
    post_code: z.string().min(10, "کد پستی باید ۱۰ رقم باشد").max(10),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

// This function prepares and sends the order data to the backend
export async function createOrder(
    formData: CheckoutInput,
    items: Record<string, CartLineItem>
) {
    const orderData = {
        ...formData,
        items: Object.values(items).map((item) => ({
            product: (item.product as { id: number }).id,
            quantity: item.quantity,
        })),
    };

    const response = await api.post("/api/orders/", orderData);
    return response.data;
}
export async function getMyOrders() {
    const response = await api.get("/api/orders/");
    return response.data;
}

// Add this to the bottom of lib/orders.ts
export async function deleteOrder(orderId: string) {
    const response = await api.delete(`/api/orders/${orderId}/`);
    return response.data;
}