// 8-Bit Retro: Old School Gaming
Summative Lab: React-Based Personal Project Showcase

8-Bit Retro is a Single Page Application (SPA) designed as a digital storefront and administrator portal for retro video games and consoles. This project demonstrates advanced React concepts including custom hooks, context-driven state management, persistent CRUD operations via a simulated backend,


// Features
Dynamic Rendering: Displays products fetched from a db.json server.
Search & Filter: Real-time search functionality and category filtering (Console vs. Game).
Shopping Cart: Full cart management (add, remove, and quantity updates) powered by React Context.
Administrator Portal
Create: Add new products to the store via a controlled form modal.
Read: View a dedicated list of all published inventory.
Update (Patch): Modify product prices dynamically with immediate database persistence.
Delete: Permanently remove inventory from the store.
Responsive Design: Mobile-first approach with a functional hamburger menu and persistent navigation.


// Technical Stack
Frontend: React (Vite)
Routing: React Router v6
State Management: React Context API & Custom Hooks
Styling: CSS3 (Flexbox/Grid, Animations)
Backend: JSON Server (Simulated REST API)
Testing: Vitest & React Testing Library


Installation & Setup
1. Clone the repository:
```
git clone [your-repo-link]
cd 8-bit-retro
```

2. Install dependencies:
```
npm install
```

3. Start the JSON Server: The application requires a backend to persist data.
```
json-server --watch db.json --port 3001
```

4. Start the React App: In a separate terminal, run:
```
npm run dev
```

5. Run Tests:
```
npm test
```


// Architecture
Component Hierarchy
The app follows a centralized state pattern to ensure data consistency across the Shop and Admin pages.
useProducts Hook: Encapsulates all fetch logic (GET, POST, PATCH, DELETE).
ProductsContext: Distributes product data and cart logic globally.
Shop Page: Consumes context to filter and display products.
Admin Page: Interacts with the custom hook to modify the db.json database.


// Testing Features
The project includes a suite of tests to ensure core features remain functional:
ProductCard Rendering: Validates that props are correctly displayed.
Search Logic: Ensures the filter accurately hides/shows products based on user input.
Admin Actions: Mocks window events to verify price editing and deletion triggers.