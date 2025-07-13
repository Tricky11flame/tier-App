function Head() {
    return (
      <header className="bg-neutral-800 text-white px-6 py-3 shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-bold z-5 relative mx-auto">My Kanban Board</h1>
        <div className="flex items-center gap-4">
          {/* Example: profile pic / theme toggle / user name */}
          <span className="text-sm opacity-80">Welcome, Team!</span>
          <div className="h-8 w-8 rounded-full bg-slate-600"></div>
        </div>
      </header>
    );
  }

export default Head