## Project Folders

### /Controllers
Purpose: API endpoint controllers
Contains: All controller classes for REST API endpoints

### /Services
Purpose: Business logic layer
Contains: Service classes that implement business rules

### /Repositories
Purpose: Data access layer
Contains: Repository classes for entity persistence

### /Models/Entities
Purpose: Database entities (EF Core models)
Contains: Entity classes mapping to database tables

### /Models/DTOs
Purpose: Data Transfer Objects for API requests/responses
Contains: DTO classes for validation, shaping data external to API

### /Models/ViewModels
Purpose: Specialized models for views (optional)
Contains: Custom view models (not usually for APIs)

### /Data
Purpose: Database context (EF Core) and migrations
Contains: AppDbContext, migration files

### /wwwroot
Purpose: Static frontend files
Contains: HTML, CSS, JS, assets. Structured by business process where applicable

### /Documents/Processes
Purpose: Technical documentation for each business process
Contains: Markdown documentation for workflow, technical details, API, DB
