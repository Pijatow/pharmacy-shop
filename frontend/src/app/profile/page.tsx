"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMyOrders, deleteOrder } from "@/lib/orders";
import { Modal } from "@/components/Modal";
import { formatTomans } from "@/lib/format";

type Order = {
  id: string;
  status: string;
  created_at: string;
  total_paid: number;
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, accessToken } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const userOrders = await getMyOrders();
      setOrders(userOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
      return;
    }
    fetchOrders();
  }, [accessToken, router]);

  const openConfirmationModal = (orderId: string) => {
    setOrderToDelete(orderId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!orderToDelete) return;
    try {
      await deleteOrder(orderToDelete);
      fetchOrders();
    } catch (error) {
      console.error("Failed to delete order:", error);
      alert("خطایی در حذف سفارش رخ داد.");
    } finally {
      setIsModalOpen(false);
      setOrderToDelete(null);
    }
  };

  if (isLoading || !user) {
    return <div className="text-center p-10">در حال بارگذاری...</div>;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[color:var(--color-brand)]">
            حساب کاربری
          </h1>
          <div className="mt-4 bg-[color:var(--color-surface)]/40 p-5 rounded-lg border border-[color:var(--color-accent)]/20 space-y-3">
            <div>
              <h2 className="text-sm font-semibold opacity-70">نام کاربری</h2>
              <p>{user.username}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold opacity-70">ایمیل</h2>
              <p>{user.email}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[color:var(--color-brand)]">
            سفارش‌های من
          </h2>
          {orders.length === 0 ? (
            <p className="mt-4 text-sm opacity-80">
              شما تاکنون سفارشی ثبت نکرده‌اید.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 border rounded-lg bg-white/50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-semibold block">
                        سفارش #{order.id.substring(0, 8)}
                      </span>
                      <span className="text-xs px-2 py-0.5 mt-1 inline-block bg-gray-200 rounded-full">
                        {order.status}
                      </span>
                    </div>
                    <button
                      onClick={() => openConfirmationModal(order.id)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      حذف سفارش
                    </button>
                  </div>
                  <div className="text-sm mt-2 pt-2 border-t opacity-70">
                    <span>
                      تاریخ ثبت:{" "}
                      {new Date(order.created_at).toLocaleDateString("fa-IR")}
                    </span>
                    <span className="mx-2">|</span>
                    <span>
                      مبلغ کل:{" "}
                      {typeof order.total_paid === "number"
                        ? formatTomans(order.total_paid)
                        : "نامشخص"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="تایید حذف سفارش"
      >
        <p>آیا از حذف این سفارش اطمینان دارید؟ این عمل غیرقابل بازگشت است.</p>
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 text-sm font-medium rounded-md border"
          >
            انصراف
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            حذف
          </button>
        </div>
      </Modal>
    </>
  );
}
