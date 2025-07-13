```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET /spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET /main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET /spa.js
    activate server
    server-->>browser: JavaScript SPA file
    deactivate server

    Note right of browser: Browser renders SPA, registers event listener on form submit

    browser->>browser: User types note and clicks "Save"

    Note right of browser: JS intercepts submit with `preventDefault()` and builds JSON

    browser->>browser: notes.push(note)\nredrawNotes()

    browser->>server: POST /new_note_spa\nHeaders: Content-Type: application/json\nBody: { content, date }
    activate server
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: Browser remains on the same page (no reload)
