"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {

  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState<any[]>([]);



  useEffect(() => {

    supabase.auth.getSession().then(({ data }) => {

      if (data.session?.user) {

        setUser(data.session.user);
        fetchBookmarks(data.session.user.id);
        setupRealtime(data.session.user.id);

      }

    });


    const { data: listener } = supabase.auth.onAuthStateChange(

      (_event, session) => {

        if (session?.user) {

          setUser(session.user);
          fetchBookmarks(session.user.id);
          setupRealtime(session.user.id);

        } else {

          setUser(null);
          setBookmarks([]);

        }

      }

    );


    return () => {

      listener.subscription.unsubscribe();

    };

  }, []);



  function setupRealtime(userId: string) {

    const channel = supabase

      .channel("bookmarks")

      .on(

        "postgres_changes",

        {

          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,

        },

        () => fetchBookmarks(userId)

      )

      .subscribe();


    return () => supabase.removeChannel(channel);

  }



  async function fetchBookmarks(userId: string) {

    const { data } = await supabase

      .from("bookmarks")

      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    setBookmarks(data || []);

  }



  async function signInWithGoogle() {

    await supabase.auth.signInWithOAuth({

      provider: "google",

    });

  }



  async function signOut() {

    await supabase.auth.signOut();

  }



  async function addBookmark() {

    if (!title || !url) return;

    await supabase.from("bookmarks").insert({

      title,
      url,
      user_id: user.id,

    });

    setTitle("");
    setUrl("");

  }



  async function deleteBookmark(id: string) {

    await supabase.from("bookmarks").delete().eq("id", id);

  }



  // LOGIN SCREEN
  if (!user) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">

        <div className="bg-white p-8 rounded-xl shadow-xl text-center">

          <h1 className="text-2xl font-bold mb-4">

            Smart Bookmark Manager

          </h1>

          <button
            onClick={signInWithGoogle}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign in with Google
          </button>

        </div>

      </div>

    );

  }



  // MAIN APP UI
  return (

    <div className="min-h-screen bg-gray-100 p-6">


      <div className="max-w-2xl mx-auto">


        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">

            Smart Bookmarks

          </h1>

          <button
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

        </div>



        {/* Add Bookmark Card */}

        <div className="bg-white p-4 rounded-xl shadow mb-6">

          <h2 className="font-semibold mb-2">

            Add Bookmark

          </h2>


          <input
            className="w-full border p-2 rounded mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />


          <input
            className="w-full border p-2 rounded mb-2"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />


          <button
            onClick={addBookmark}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Bookmark
          </button>

        </div>



        {/* Bookmarks List */}

        <div className="space-y-3">

          {bookmarks.map((b) => (

            <div
              key={b.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >

              <a
                href={b.url}
                target="_blank"
                className="text-blue-600 font-medium hover:underline"
              >
                {b.title}
              </a>


              <button
                onClick={() => deleteBookmark(b.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>

            </div>

          ))}

        </div>


      </div>


    </div>

  );

}
