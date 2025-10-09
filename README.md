# 🗓️ Interview Scheduling System

## 📖 Overview
A full-stack **interview scheduling application** built with **Next.js 13.5**, **Redux Toolkit**, and **MongoDB**.  
The system allows **recruiters** to create and manage interview sessions, while **candidates** can book available time slots seamlessly.

---

## ✨ Features

### 🔐 Authentication System
- **User Registration & Login** – Secure authentication using JWT tokens  
- **Persistent Sessions** – Automatic login state restoration via `localStorage`  
- **Protected Routes** – Restricts access based on authentication status  

### 🧩 Interview Management
- **Create Interviews** – Recruiters can create interviews with custom details  
- **Interview Dashboard** – View and manage all created interviews  
- **Update Interviews** – Modify title, duration, or activation status  
- **Delete Interviews** – Remove interviews when no longer needed  

### ⏰ Time Slot Management
- **Shareable Interview Links** – Generate unique URLs for candidates  
- **Time Slot Booking** – Candidates can book available slots with personal details  
- **Real-time Availability** – Automatically updates booked/available time slots  
- **Reservation Management** – View and cancel existing reservations  

### 👩‍💼 Candidate Features
- **Reservation Access** – Candidates can view their scheduled interviews  
- **Cancellation** – Cancel bookings when necessary  
- **Email-based Tracking** – Each reservation is tied to a candidate email  

---

## 🧠 Technical Stack

### 🎨 Frontend
- **Next.js 13.5** – React framework using App Router  
- **Redux Toolkit** – Centralized state management with async thunks  
- **TypeScript** – Ensures type safety across the app  

### ⚙️ Backend & Database
- **MongoDB** – NoSQL database for storing users, interviews, and reservations  
- **RESTful API** – Custom endpoints for all CRUD operations  
- **JWT Authentication** – Secure token-based user sessions  

--