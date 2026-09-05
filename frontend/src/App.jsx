import { useRef } from "react";

function App() {
  const fileInputRef = useRef(null);

  const handleAddDocument = () => {
    fileInputRef.current.click();
  };

  const handleFileSelected = (event) => {
    const file = event.target.files[0];

    if (file) {
      console.log("Selected file:", file.name);
    }
  };
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">N</div>
          <span>NoteKeep</span>
        </div>

        <nav>
          <a className="nav-item active">
            <span>⌂</span>
            Dashboard
          </a>

          <a className="nav-item">
            <span>▣</span>
            My Documents
          </a>

          <a className="nav-item">
            <span>◈</span>
            Categories
          </a>

          <a className="nav-item">
            <span>☆</span>
            Templates
          </a>

          <a className="nav-item">
            <span>✦</span>
            AI Assistant
          </a>
        </nav>

        <div className="sidebar-bottom">
          <a className="nav-item">
            <span>⚙</span>
            Settings
          </a>
        </div>
      </aside>

      <main className="main-content">
        <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelected}
        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
        style={{ display: "none" }}
        />
        <header className="topbar">
          <div>
            <h1>Good morning</h1>
            <p>Welcome back to your learning vault.</p>
          </div>

          <div className="topbar-actions">
            <button className="search-button">
               Search your vault
            </button>

            <div className="profile">
              S
            </div>
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <h2>Your knowledge, all in one place.</h2>
            <p>
              Store your assignments, notes, frameworks, case studies
              and other learning materials in one organised space.
            </p>
          </div>

          <button className="upload-button" onClick={handleAddDocument}>
            + Add Document
          </button>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span className="stat-label">Documents</span>
            <strong>0</strong>
            <span className="stat-description">
              Your stored learning materials
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Categories</span>
            <strong>0</strong>
            <span className="stat-description">
              Organised areas of knowledge
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Templates</span>
            <strong>0</strong>
            <span className="stat-description">
              Reusable structures and formats
            </span>
          </div>
        </section>

        <section className="content-section">
          <div className="section-header">
            <div>
              <h3>Recent Documents</h3>
              <p>Your recently added learning materials will appear here.</p>
            </div>

            <button className="view-all">
              View all
            </button>
          </div>

          <div className="empty-state">
            <div className="empty-icon">+</div>

            <h3>Your vault is empty</h3>

            <p>
              Add your first document to start building your
              personal knowledge base.
            </p>

            <button className="upload-button" onClick={handleAddDocument}>
              Add your first document
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;