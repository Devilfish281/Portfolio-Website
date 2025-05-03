# Portfolio Website

A professional, responsive portfolio website built with HTML5, CSS3, JavaScript (ES6+), and Bootstrap 5.

## Features

- Left sidebar navigation available on all pages
- Responsive design for desktop, tablet, and iPhone
- Dedicated pages: Home, About, Projects, Skills, Contact
- Project showcase with descriptions and technologies used
- Unique interactive elements and personal branding touches
- Contact form powered by a locally hosted Express server (`server.js`)

## Technologies

- HTML5
- CSS3 (Flexbox & CSS Grid)
- JavaScript (ES6+)
- Bootstrap 5
- Node.js + Express (for the contact form)

---

## Installation & Running the Project

This project is a local full-stack setup with:

- A static frontend served via [`http-server`](https://www.npmjs.com/package/http-server)
- A local backend API using Express (`server.js`) to process contact form submissions

You’ll run **two separate processes** in parallel:

1. A **Node.js server** for the contact form API (`server/server.js`)
2. A **static file server** for the frontend (`http-server`)

---

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Portfolio-Website.git
cd Portfolio-Website
````

---

### . Install and Run the Backend (Contact Form API)

Ensure you have Node.js installed. Then install backend dependencies:

```bash
cd server
npm install express cors
```

To run the backend:

```bash
node server.js
```

The server will start on:

```
http://127.0.0.1:5000/api/contact
```

> This handles POST requests from the contact form.

---

### Install and Run the Front-End (Static Website)

If you haven’t installed it yet, install `http-server` globally:

```bash
npm install -g http-server
```

Then return to the root directory:

```bash
cd ..
http-server -p 8080
```

Now your website will be accessible at:

```
http://127.0.0.1:8080
```

> Make sure the **backend server is running** on port 5000 before testing the contact form.

---

## Contact Form Integration

The contact form on `contact.html` sends a `POST` request via JavaScript to:

```
http://127.0.0.1:5000/api/contact
```

If successful:

* The message is logged in the backend terminal
* The user sees a success alert

Make sure:

* Your browser does not block mixed content
* Both servers are up and running before submitting

---

## File Structure

```
Portfolio-Website/
├── about.html
├── contact.html
├── index.html
├── projects.html
├── skills.html
├── README.md
├── package.json
├── package-lock.json
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── fonts/
│   ├── images/
│   │   └── avatar.jpg
│   ├── mov/
│   │   └── Matthew.mov
│   └── resume/
│       ├── MATTHEW DOBLEY Resume.pdf
└── server/
    └── server.js
```

---

## Notes

* If your browser blocks cross-origin requests (CORS), verify both frontend (`http://127.0.0.1:8080`) and backend (`http://127.0.0.1:5000`) are running locally.
* This setup is intended for **local development only**.


---

## Summary of Commands

```bash
# Start backend
cd Portfolio-Website/server
node server.js

# In a new terminal - start frontend
cd Portfolio-Website
http-server -p 8080
```


