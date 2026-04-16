"use client";

import { useRef, useState } from "react";
import { Upload, X, ImageIcon, Images, LoaderCircle } from "lucide-react";

type Category = { id: string; name: string };

type ProductData = {
  name: string;
  description: string;
  price: number;
  comparePrice: number | null;
  categoryId: string;
  sizes: string | null;
  colors: string | null;
  material: string | null;
  gemstone: string | null;
  weight: number | null;
  featured: boolean;
  inStock: boolean;
  images: { url: string }[];
};

type Props = {
  categories: Category[];
  product?: ProductData;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
};

type UploadState = {
  url: string;
  status: "done" | "uploading" | "error";
  label: string;
};

export function ProductForm({ categories, product, action, submitLabel }: Props) {
  const [imageUploads, setImageUploads] = useState<UploadState[]>(
    product?.images.map((image, index) => ({
      url: image.url,
      status: "done",
      label: `Image ${index + 1}`,
    })) ?? []
  );
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function removeImage(index: number) {
    setImageUploads((current) => current.filter((_, currentIndex) => currentIndex !== index));
  }

  async function uploadSingleFile(file: File) {
    const placeholderId = `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`;

    setImageUploads((current) => [
      ...current,
      {
        url: placeholderId,
        status: "uploading",
        label: file.name,
      },
    ]);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });

    if (!res.ok) {
      const payload = (await res.json().catch(() => null)) as { error?: string } | null;
      throw new Error(payload?.error ?? "Upload failed. Please try again.");
    }

    const data = (await res.json()) as { url: string };

    setImageUploads((current) =>
      current.map((image) =>
        image.url === placeholderId
          ? {
              url: data.url,
              status: "done",
              label: file.name,
            }
          : image
      )
    );
  }

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;

    setUploadError(null);
    setIsUploading(true);

    const files = Array.from(fileList);

    try {
      await Promise.all(files.map((file) => uploadSingleFile(file)));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed. Please try again.";
      setUploadError(message);
      setImageUploads((current) => current.filter((image) => image.status !== "uploading"));
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <form action={action} className="space-y-8">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_380px]">
        <section className="surface-panel rounded-[28px] p-5 sm:rounded-[32px] sm:p-8">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">Product Details</p>
            <h2 className="font-display mt-3 text-3xl leading-none text-foreground sm:text-4xl">
              Core information
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted">
                Product Name *
              </label>
              <input
                name="name"
                defaultValue={product?.name}
                required
                className="h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
                placeholder="e.g. Classic Leather Tote"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted">
                Description *
              </label>
              <textarea
                name="description"
                defaultValue={product?.description}
                required
                rows={5}
                className="w-full resize-none rounded-[22px] border border-border bg-surface px-4 py-3 text-sm transition-colors focus:border-foreground focus:outline-none"
                placeholder="Describe the product..."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted">
                  Price *
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={product?.price}
                  required
                  className="h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted">
                  Compare Price
                </label>
                <input
                  name="comparePrice"
                  type="number"
                  step="0.01"
                  defaultValue={product?.comparePrice ?? ""}
                  className="h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
                  placeholder="Original price (optional)"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted">
                Category *
              </label>
              <select
                name="categoryId"
                defaultValue={product?.categoryId}
                required
                className="h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted">
                  Material
                </label>
                <input
                  name="material"
                  defaultValue={product?.material ?? ""}
                  className="h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
                  placeholder="e.g. Gold-Plated Brass, Silver-Tone Plated Brass"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted">
                  Gemstone
                </label>
                <input
                  name="gemstone"
                  defaultValue={product?.gemstone ?? ""}
                  className="h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
                  placeholder="e.g. Diamond, Pearl, None"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted">
                  Weight <span className="normal-case text-muted/60">(grams)</span>
                </label>
                <input
                  name="weight"
                  type="number"
                  step="0.1"
                  defaultValue={product?.weight ?? ""}
                  className="h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted">
                  Sizes <span className="normal-case text-muted/60">(comma separated)</span>
                </label>
                <input
                  name="sizes"
                  defaultValue={product?.sizes ?? ""}
                  className="h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
                  placeholder="5, 6, 7, 8, 9"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wide text-muted">
                  Colors <span className="normal-case text-muted/60">(comma separated)</span>
                </label>
                <input
                  name="colors"
                  defaultValue={product?.colors ?? ""}
                  className="h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
                  placeholder="Gold, Silver, Rose Gold"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 rounded-[24px] border border-border/70 bg-background/25 px-5 py-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={product?.featured ?? false}
                  className="rounded border-border"
                />
                Featured product
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="inStock"
                  defaultChecked={product?.inStock ?? true}
                  className="rounded border-border"
                />
                In stock
              </label>
            </div>
          </div>
        </section>

        <aside className="surface-panel rounded-[28px] p-5 sm:rounded-[32px] sm:p-8">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">Media</p>
            <h2 className="font-display mt-3 text-3xl leading-none text-foreground sm:text-4xl">
              Image gallery
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Drop multiple files here or browse your device. Uploaded images will appear as
              cards, and the raw URLs stay hidden in the form.
            </p>
          </div>

          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDraggingFiles(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setIsDraggingFiles(false);
              }
            }}
            onDrop={(event) => {
              event.preventDefault();
              setIsDraggingFiles(false);
              void handleFiles(event.dataTransfer.files);
            }}
            className={`rounded-[24px] border border-dashed p-5 text-center transition-colors sm:rounded-[28px] sm:p-6 ${
              isDraggingFiles
                ? "border-accent bg-accent/8"
                : "border-border bg-background/30 hover:border-accent/50"
            }`}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border/70 bg-surface">
              {isUploading ? (
                <LoaderCircle size={20} className="animate-spin text-accent" />
              ) : (
                <Images size={20} className="text-accent" />
              )}
            </div>
            <h3 className="font-display mt-5 text-2xl text-foreground sm:text-3xl">
              Drag & drop product images
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Select several files at once or drop them here. JPG, PNG, WebP, AVIF, GIF, and SVG
              up to 10MB each.
            </p>
            <label className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm uppercase tracking-[0.16em] text-background hover:-translate-y-0.5 hover:bg-foreground/92">
              <Upload size={15} />
              Choose Images
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(event) => {
                  void handleFiles(event.target.files);
                }}
              />
            </label>
            {isUploading && (
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-accent">
                Uploading images...
              </p>
            )}
            {uploadError && <p className="mt-4 text-sm text-red-600">{uploadError}</p>}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {imageUploads.length > 0 ? (
              imageUploads.map((image, index) => (
                <div
                  key={`${image.url}-${index}`}
                  className="rounded-[24px] border border-border/70 bg-background/30 p-3"
                >
                  <input type="hidden" name="imageUrls" value={image.status === "done" ? image.url : ""} />
                  <div className="relative overflow-hidden rounded-[18px] border border-border bg-surface">
                    <div className="aspect-[4/3]">
                      {image.status === "done" ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={image.url} alt={image.label} className="h-full w-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/75"
                            aria-label={`Remove image ${index + 1}`}
                          >
                            <X size={15} />
                          </button>
                        </>
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-background/60 text-muted">
                          <LoaderCircle size={20} className="animate-spin text-accent" />
                          <span className="text-xs uppercase tracking-[0.18em]">Uploading</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.18em] text-muted">
                        Image {index + 1}
                      </p>
                      <p className="mt-1 truncate text-sm text-foreground">{image.label}</p>
                    </div>
                    {image.status === "done" && (
                      <div className="rounded-full border border-border/70 bg-surface px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted">
                        Ready
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex min-h-48 flex-col items-center justify-center rounded-[24px] border border-border/70 bg-background/25 px-5 text-center text-muted">
                <ImageIcon size={22} className="text-accent/80" />
                <p className="mt-4 text-sm">No images uploaded yet</p>
                <p className="mt-2 max-w-xs text-xs leading-6">
                  Add a few product shots and they will appear here as soon as the uploads finish.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      <div className="flex justify-stretch sm:justify-end">
        <button
          type="submit"
          disabled={isUploading}
          className="w-full rounded-full bg-foreground px-8 py-3.5 text-sm uppercase tracking-[0.14em] text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
