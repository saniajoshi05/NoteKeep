import { useRef, useEffect, useState } from "react";

function App() {
  const [documents, setDocuments] = useState([]);

  const fileInputRef = useRef(null);

  // Load documents from the backend when the page opens
  useEffect(() => {
    fetch("http://localhost:8000/api/documents")
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data);
      })
      .catch((error) => {
        console.error("Could not load documents:", error);
      });
  }, []);

  // Open the computer's file picker
  const handleAddDocument = () => {
    fileInputRef.current.click();
  };

  // Upload the selected document
  const handleFileSelected = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:8000/api/documents",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      console.log("Upload successful:", data);

      alert(`${file.name} uploaded successfully!`);

      // Add the uploaded document to the dashboard
      setDocuments((currentDocuments) => [
        ...currentDocuments,
        {
          filename: data.stored_filename,
          original_filename: data.original_filename,
        },
      ]);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("There was a problem uploading the document.");
    }

    // Allow the same file to be selected again later
    event.target.value = "";
  };

  return (
    <div className="app">

      {/* Sidebar */}
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

      {/* Main content */}
      <main className="main-content">

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelected}
          accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
          style={{ display: "none" }}
        />

        {/* Top bar */}
        <header className="topbar">

          <div>
            <h1>Hello There!</h1>

            <p>
              Welcome back to your learning vault.
            </p>
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

        {/* Welcome section */}
        <section className="welcome-section">

          <div>
            <h2>
              Your knowledge, all in one place.
            </h2>

            <p>
              Store your assignments, notes, frameworks, case studies
              and other learning materials in one organised space.
            </p>
          </div>

          <button
            className="upload-button"
            onClick={handleAddDocument}
          >
            + Add Document
          </button>

        </section>

        {/* Statistics */}
        <section className="stats">

          <div className="stat-card">

            <span className="stat-label">
              Documents
            </span>

            <strong>
              {documents.length}
            </strong>

            <span className="stat-description">
              Your stored learning materials
            </span>

          </div>

          <div className="stat-card">

            <span className="stat-label">
              Categories
            </span>

            <strong>
              0
            </strong>

            <span className="stat-description">
              Organised areas of knowledge
            </span>

          </div>

          <div className="stat-card">

            <span className="stat-label">
              Templates
            </span>

            <strong>
              0
            </strong>

            <span className="stat-description">
              Reusable structures and formats
            </span>

          </div>

        </section>

        {/* Recent Documents */}
        <section className="content-section">

          <div className="section-header">

            <div>
              <h3>
                Recent Documents
              </h3>

              <p>
                Your recently added learning materials will appear here.
              </p>
            </div>

            <button className="view-all">
              View all
            </button>

          </div>

          {/* Empty state */}
          {documents.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                +
              </div>

              <h3>
                Your vault is empty
              </h3>

              <p>
                Add your first document to start building
                your personal knowledge base.
              </p>

              <button onClick={handleAddDocument}>
                Add your first document
              </button>

            </div>

          ) : (

            /* Document list */
            <div className="document-list">

              {documents.map((document, index) => (

                <div
                  className="document-item"
                  key={index}
                >

                  <div>

                    <strong>
                      {document.original_filename || document.filename}
                    </strong>

                    <p>
                      Stored in your NoteKeep vault
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default App;