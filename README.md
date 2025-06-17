# 🧠 Brain Boosters

**Brain Boosters** is an **AI-powered e-learning platform** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It enables educators to create and sell courses while allowing learners to access high-quality content, track progress, and even get help from AI tools.

---

## 🚀 Key Features

- 🎓 **Course Creation & Selling**
  - Instructors can create and publish full-fledged courses with video lectures, thumbnails, and pricing.
  - Demo video support for potential students to preview the course.

- 👨‍🏫 **Creator Dashboard**
  - View course analytics, revenue, enrolled students, and performance graphs.

- 👨‍🎓 **Learner Dashboard**
  - Track course progress, completed videos, and learning stats.

- 💳 **Secure Payments**
  - Integrated with **Stripe** for secure and smooth course purchase experience.

- 🧠 **AI-Powered Tools**
  - **AI Chat Assistant** using **Gemini API** for doubt-solving.
  - **AI Code Reviewer** to help students understand and improve their coding assignments.

- 📹 **Live Video Calling**
  - Real-time video classes via **ZegoCloud**, similar to Google Meet.


- 🔐 **Authentication**
  - Secure login and registration system using JWT tokens stored in cookies.

- ⚙️ **CI/CD Pipeline**
  - Automatic deployment using **GitHub Actions** and **Render**.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, ShadCN UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT, bcrypt
- **Payments:** Stripe
- **AI:** Gemini API (Chat Assistant), Custom Code Reviewer
- **Live Streaming:** ZegoCloud
- **Deployment:** GitHub Actions, Render

---


## 🛠️ Installation


# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Run the development servers
npm run dev  # Runs both client and server
