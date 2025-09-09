"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";
import { postComment, fetchComments } from "@/lib/comments";
import Link from "next/link";

type Comment = {
  id: number;
  author: string; // We now get the email from the API
  text: string;
  created_at: string;
};

type CommentSectionProps = {
  productId: string | number | null;
  initialComments: Comment[];
};

const commentSchema = z.object({
  text: z.string().min(1, "متن نظر نمی‌تواند خالی باشد").max(1000),
});

type CommentInput = z.infer<typeof commentSchema>;

export function CommentSection({
  productId,
  initialComments,
}: CommentSectionProps) {
  const { user } = useAuthStore();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isLoading, setIsLoading] = useState(initialComments.length === 0);

  // This hook fixes the "disappearing comments" bug on reload
  useEffect(() => {
    async function loadComments() {
      if (productId) {
        setIsLoading(true);
        try {
          const fetchedData = await fetchComments({ product: productId });
          setComments(fetchedData.results as Comment[]);
        } catch (error) {
          console.error("Failed to fetch comments on client", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    loadComments();
  }, [productId]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentInput>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit: SubmitHandler<CommentInput> = async (data) => {
    if (!productId || !user) return;
    try {
      const newComment = await postComment({
        product: productId,
        text: data.text,
      });
      setComments((prevComments) => [newComment, ...prevComments]);
      reset();
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold">نظرات</h2>

      {user ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <textarea
            {...register("text")}
            rows={3}
            className="w-full p-2 border rounded-md bg-transparent"
            placeholder="نظر خود را بنویسید..."
          />
          {errors.text && (
            <p className="text-red-500 text-xs">{errors.text.message}</p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[color:var(--color-brand)] text-white font-semibold rounded-md hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? "در حال ارسال..." : "ارسال نظر"}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-sm text-center p-4 border rounded-md bg-gray-50">
          برای ثبت نظر، لطفاً{" "}
          <Link
            href={`/login?next=/products/${productId}`}
            className="font-semibold underline"
          >
            وارد شوید
          </Link>
          .
        </div>
      )}

      <div className="space-y-4">
        {isLoading ? (
          <p className="text-sm opacity-70">در حال بارگذاری نظرات...</p>
        ) : comments.length === 0 ? (
          <div key="no-comments" className="text-sm opacity-70">
            هنوز نظری ثبت نشده است.
          </div>
        ) : (
          comments.map((comment) => (
            // The key prop is now correctly on the top-level element in the map
            <div
              key={comment.id}
              className="p-3 rounded border border-[color:var(--color-accent)]/30 bg-[color:var(--color-surface)]/40 text-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold">{comment.author}</p>
                <p className="text-xs opacity-60">
                  {new Date(comment.created_at).toLocaleDateString("fa-IR")}
                </p>
              </div>
              <p className="opacity-90">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
