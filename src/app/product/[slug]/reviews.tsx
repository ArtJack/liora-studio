"use client";

import { useState } from "react";
import { Star, Send, CheckCircle } from "lucide-react";

type Review = {
  id: string;
  author: string;
  rating: number;
  body: string;
  createdAt: string;
};

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= rating ? "fill-amber-400 text-amber-400" : "text-border"}
        />
      ))}
    </div>
  );
}

export function ReviewSection({
  productId,
  productSlug,
  reviews,
  averageRating,
}: {
  productId: string;
  productSlug: string;
  reviews: Review[];
  averageRating: number;
}) {
  const [reviewItems, setReviewItems] = useState(reviews);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const currentAverage =
    reviewItems.length > 0
      ? reviewItems.reduce((sum, review) => sum + review.rating, 0) / reviewItems.length
      : averageRating;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !body.trim()) return;
    setSubmitting(true);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, productSlug, author, rating, body }),
    });

    if (res.ok) {
      const newReview = {
        id: crypto.randomUUID(),
        author: author.trim(),
        rating,
        body: body.trim(),
        createdAt: new Date().toISOString(),
      };
      setReviewItems((current) => [newReview, ...current]);
      setSubmitted(true);
      setShowForm(false);
      setAuthor("");
      setBody("");
      setRating(5);
    }
    setSubmitting(false);
  }

  return (
    <section className="mt-12 border-t border-border pt-10">
      {/* Summary bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xs uppercase tracking-[0.22em] text-muted">Customer Reviews</h2>
          <div className="mt-2 flex items-center gap-3">
            {reviewItems.length > 0 ? (
              <>
                <Stars rating={Math.round(currentAverage)} size={16} />
                <span className="text-sm text-foreground">
                  {currentAverage.toFixed(1)} out of 5
                </span>
                <span className="text-sm text-muted">
                  ({reviewItems.length} review{reviewItems.length !== 1 ? "s" : ""})
                </span>
              </>
            ) : (
              <span className="text-sm text-muted">No reviews yet — be the first!</span>
            )}
          </div>
        </div>
        {!showForm && !submitted && (
          <button
            onClick={() => setShowForm(true)}
            className="rounded-full border border-border px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:border-foreground hover:text-foreground"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Submitted confirmation */}
      {submitted && (
        <div className="mt-6 flex items-center gap-2 rounded-[20px] border border-green-300 bg-green-50 p-4 text-sm text-green-800 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400">
          <CheckCircle size={16} />
          Thank you! Your review has been submitted.
        </div>
      )}

      {/* Review form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 surface-panel rounded-[24px] p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">Your Review</p>

          <div className="mb-4">
            <p className="mb-2 text-xs text-muted">Rating</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => setHoverRating(i)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(i)}
                  className="p-0.5"
                >
                  <Star
                    size={22}
                    className={
                      i <= (hoverRating || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-border"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="h-11 w-full rounded-xl border border-border bg-background/35 px-4 text-base sm:text-sm transition-colors focus:border-foreground focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <textarea
              placeholder="What did you think of this piece?"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={3}
              className="w-full resize-none rounded-xl border border-border bg-background/35 px-4 py-3 text-base sm:text-sm transition-colors focus:border-foreground focus:outline-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm uppercase tracking-[0.14em] text-background hover:bg-foreground/90 disabled:opacity-60"
            >
              <Send size={14} />
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full px-5 py-2.5 text-sm text-muted hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Review list */}
      {reviewItems.length > 0 && (
        <div className="mt-8 space-y-4">
          {reviewItems.map((review) => (
            <div
              key={review.id}
              className="rounded-[20px] border border-border/70 bg-background/25 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-xs font-medium uppercase text-accent">
                    {review.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{review.author}</p>
                    <p className="text-[11px] text-muted">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <Stars rating={review.rating} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{review.body}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
