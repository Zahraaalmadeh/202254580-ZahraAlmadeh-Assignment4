# 📘 Technical Documentation

## 1. Overview

This project is a client-side web application built using:

- HTML
- CSS
- JavaScript

It combines all course concepts into a final professional portfolio.

---

## 2. Technologies Used

- HTML5 → Structure
- CSS3 → Styling & responsiveness
- JavaScript → Logic & interactivity
- GitHub API → Dynamic data
- localStorage → State management

---

## 3. Application Structure
index.html → structure  
styles.css → styling  
script.js → logic  

## 4. Features

### 4.1 Theme Toggle
- Saves theme in localStorage
- Restores on reload

### 4.2 Project Filtering
- Uses data-category
- Shows/hides projects dynamically

### 4.3 Project Sorting
**Sorting options:**
- A–Z
- Z–A
- Newest
- Oldest

### 4.4 Contact Form Validation
**Checks:**
- Empty fields
- Valid email format
- Minimum message length

### 4.5 GitHub API
**Fetches repositories:**
https://api.github.com/users/Zahraaalmadeh/repos

### 4.6 State Management
**Stored in localStorage:**
- Theme
- Visitor name

### 4.7 Timer
**Tracks session time:**

setInterval(() => {
  seconds++;
}, 1000);

### 4.8 Innovation Feature
**Project Spotlight:**
-Randomly selects a project
-Highlights it
-Scrolls into view
### 5. Performance
   **Optimizations:** 
   -Lazy loading images
   -Minimal DOM updates
   -Reusable functions
### 6. User Experience
   **Improvements:**
   Instructions shown to user
   Helpful error messages
   Responsive layout
   Clean UI
### 7. Compatibility
   Tested on:
   Chrome
   Edge
   Mobile screens
### 8. Future Improvements
   Project modal
   Backend contact form
   Animations
### 9. Conclusion
   This project demonstrates:
   API integration
   Advanced logic
   State management
   Professional UI
   It meets all Assignment 4 requirements.