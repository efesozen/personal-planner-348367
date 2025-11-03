'use client';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Your App</h1>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Home</h1>
          <p className="text-xl text-muted-foreground mb-8">Landing page for the personal planner SaaS application.</p>
        </section>
      </main>
      
      <footer className="border-t">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          © 2024 Your App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
