// components/BookmarkForm.tsx
"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function BookmarkForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const addBookmark = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !title) return;
    setSaving(true);
    const { error } = await supabase.from("bookmarks").insert([{ user_id: userId, title, url }]);
    if (error) {
      console.error("insert error:", error);
      alert("Could not add bookmark");
    } else {
      setTitle("");
      setUrl("");
    }
    setSaving(false);
  };

  return (
    <form onSubmit={addBookmark} className="space-y-2">
      <div>
        <label className="block text-sm">Title</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="eg. MDN — fetch"/>
      </div>
      <div>
        <label className="block text-sm">URL</label>
        <input value={url} onChange={(e)=>setUrl(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="https://"/>
      </div>
      <div>
        <button type="submit" disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded">
          {saving ? "Saving..." : "Add Bookmark"}
        </button>
      </div>
    </form>
  );
}
