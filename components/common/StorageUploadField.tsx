"use client";

import { ChangeEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type StorageUploadFieldProps = {
  name: string;
  label: string;
  folder: string;
  bucket?: string;
  accept?: string;
  defaultValue?: string | null;
};

function sanitizeFileName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
}

export function StorageUploadField({
  name,
  label,
  folder,
  bucket = "portal-uploads",
  accept = "image/*",
  defaultValue
}: StorageUploadFieldProps) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage("");
    try {
      const supabase = createClient();
      const extension = file.name.split(".").pop() ?? "file";
      const filePath = `${folder}/${Date.now()}-${sanitizeFileName(file.name.replace(`.${extension}`, ""))}.${sanitizeFileName(extension)}`;

      const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file, {
        cacheControl: "3600",
        upsert: true
      });
      if (uploadError) {
        setMessage(uploadError.message);
        return;
      }

      const {
        data: { publicUrl }
      } = supabase.storage.from(bucket).getPublicUrl(filePath);

      if (!publicUrl) {
        setMessage("Upload complete, but public URL was not generated.");
        return;
      }
      setUrl(publicUrl);
      setMessage("Upload successful.");
    } catch {
      setMessage("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const isImage = /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(url);
  const isVideo = /\.(mp4|mov|m4v|webm|avi)$/i.test(url);

  return (
    <div className="grid gap-2">
      <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[#bdae8a]">
        {label}
      </label>
      <input type="hidden" name={name} value={url} />
      <input
        type="file"
        accept={accept}
        onChange={onFileChange}
        className="theme-input rounded-lg px-3 py-2 text-sm file:mr-3 file:rounded-sm file:border-0 file:bg-[#b31313] file:px-3 file:py-1 file:text-xs file:font-semibold file:text-white"
      />
      <input
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="Or paste media URL"
        className="theme-input rounded-lg px-3 py-2 text-xs"
      />
      {message && <p className="text-xs text-[#cdbf9f]">{loading ? "Uploading..." : message}</p>}
      {url && isImage && <img src={url} alt="Uploaded preview" className="h-16 w-16 rounded-lg object-cover" />}
      {url && isVideo && (
        <video src={url} controls className="h-20 w-32 rounded-lg border border-white/10 bg-black/40" />
      )}
    </div>
  );
}

