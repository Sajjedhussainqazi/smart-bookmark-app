// components/BookmarkList.tsx
"use client";
import { supabase } from "../lib/supabaseClient";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  created_at: string;
};

export default function BookmarkList({ bookmarks }: { bookmarks: Bookmark[] }) {
  const deleteBookmark = async (id: string) => {
    if (!confirm("Delete this bookmark?")) return;
    const { error } = await supabase.from("bookmarks").delete().eq("id", id);
    if (error) {
      console.error("delete error:", error);
      alert("Could not delete");
    }
  };

  if (!bookmarks.length) {
    return <p className="text-gray-600">You have no bookmarks yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {bookmarks.map(b => (
        <li key={b.id} className="p-3 bg-white rounded shadow-sm flex justify-between items-start">
          <div>
            <a href={b.url} target="_blank" rel="noreferrer" className="font-medium text-blue-600">
              {b.title}
            </a>
            <p className="text-xs text-gray-500">{new Date(b.created_at).toLocaleString()}</p>
          </div>
          <button onClick={() => deleteBookmark(b.id)} className="text-sm text-red-600">Delete</button>
        </li>
      ))}
    </ul>
  );
}
