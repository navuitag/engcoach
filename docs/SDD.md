# Software Design Document (SDD)
# English 60 Days Coach

## Architecture
Presentation Layer
Application Layer
Data Layer

## Modules
- Dashboard
- Planner
- Vocabulary
- Grammar
- Listening
- Reading
- Speaking
- Writing
- Quiz
- Progress

## IndexedDB Design
Stores:
- user
- progress
- vocabulary
- notes

## Routing
/dashboard
/plan
/vocabulary
/grammar
/listening
/reading
/speaking
/writing
/progress

## Service Layer
resource.service.js
planner.service.js
progress.service.js
db.service.js
