import ChatBox from "./components/ChatBox";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            AI-Powered Assistant
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Get Instant Insights
          </h1>

          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Describe your situation and receive structured guidance in seconds
          </p>
        </div>

        <ChatBox />
      </div>

    </main>
  );
}