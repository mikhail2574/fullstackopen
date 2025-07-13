```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: User types note and clicks "Save"

    browser->>browser: JS intercepts form submit (preventDefault)
    browser->>browser: Create note object { content, date }
    browser->>browser: notes.push(note)
    browser->>browser: redrawNotes()

    Note over browser: Prepare JSON & send via fetch/XHR
    browser->>server: POST /new_note_spa (JSON)

    activate server
    Note over server: Content-Type: application/json<br>Body: { content: "...", date: "..." }
    server-->>browser: 201 Created
    deactivate server

    Note over browser: No page reload, note added in UI