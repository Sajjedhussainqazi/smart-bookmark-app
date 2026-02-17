// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Smart Bookmark App",
  description: "Simple bookmark manager with Supabase and Next.js (App Router)"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto p-4">
          <header className="mb-6">
            <h1 className="text-2xl font-bold">Smart Bookmark App</h1>
            <p className="text-sm text-gray-600">Sign in with Google — bookmarks are private and realtime.</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
