# Safar Saarthi 🛡️🧭

<p align="center">
  <img src="URL_TO_YOUR_UPLOADED_LOGO.png" alt="Safar Saarthi Logo" width="200"/>
</p>

<p align="center">
  <strong>A proactive tourist safety monitoring and incident response system for the Smart India Hackathon 2025.</strong>
  <br />
  Safar Saarthi leverages AI, Blockchain, and Geo-fencing to create a secure and intelligent ecosystem that protects travelers before danger strikes.
</p>

<p align="center">
    <img src="https://img.shields.io/badge/SIH-2025-blue.svg" alt="SIH 2025">
    <img src="https://img.shields.io/badge/platform-Flutter%20%7C%20Web-green.svg" alt="Platform">
    <img src="https://img.shields.io/badge/license-MIT-lightgrey.svg" alt="License">
</p>

---

## 🚀 The Problem

Tourists often face safety challenges in unfamiliar areas, especially in regions with poor connectivity. There is a lack of a unified, proactive system for authorities to monitor tourist well-being and respond efficiently to incidents, which can hinder the growth of tourism.

## ✨ Our Solution: Safar Saarthi

**Safar Saarthi** (Your Travel Companion) is a complete ecosystem connecting tourists, authorities, and intelligent systems to create a safety net for every traveler. Our solution is built on a proactive "predict and prevent" model rather than a reactive one.

---

## 🔑 Key Features

### 📱 For Tourists (Flutter App)

* **Blockchain Digital ID:** A secure, tamper-proof, and time-bound digital identity for quick verification.
* **Real-time Geo-fencing Alerts:** Automatically warns tourists if they are about to enter a restricted or high-risk zone.
* **Instant SOS Button:** A one-tap panic button that sends the user's live location and digital ID to the nearest authorities.
* **Offline Capability:** Critical alerts are sent via SMS when internet connectivity is poor, ensuring help is always within reach.
* **AI-Powered Safety Score:** A dynamic score that alerts users to potentially risky behavior patterns.

### 👮 For Authorities (React Web Dashboard)

* **Live Dashboard:** A real-time map showing tourist locations, active alerts, and incident hotspots.
* **AI-Driven Heatmaps:** Visualizes tourist density and clusters identified by our DBSCAN model to predict potential overcrowding.
* **Instant Alert Panels:** Receives and manages SOS requests and low safety score alerts from tourists.
* **Secure Verification:** Authorities can instantly verify a tourist's identity using their blockchain ID.

---

## 📸 Screenshots & Demo

![Safar Saarthi App UI](URL_TO_YOUR_UPLOADED_SCREENSHOT.png)

*A live demo link will be available soon!*

---

## 🛠️ Tech Stack & System Architecture

Our system is built on a modern, scalable microservices architecture.

| Category                | Technologies                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------- |
| **Mobile Application** | `Flutter`, `Mapbox`, `Firebase Auth (JWT)`                                            |
| **Authority Dashboard** | `React`, `Next.js`, `D3.js`, `WebSockets`                                             |
| **Backend Services** | `Python`, `FastAPI`                                                                   |
| **AI & Machine Learning** | `PyTorch`, `LSTM`, `DBSCAN`, `ARIMA`, `GeoPandas`                                       |
| **Database** | `PostgreSQL`, `PostGIS` (for geospatial queries), `TimescaleDB` (for time-series data) |
| **Data Ingestion** | `RabbitMQ` (High-throughput message queue)                                            |
| **Blockchain** | `Hyperledger Fabric` (Permissioned Blockchain)                                        |
| **DevOps & Deployment** | `Docker`, `Render` (Cloud Platform), `GitHub Actions` (CI/CD)                           |

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Git
* Node.js & npm
* Flutter SDK
* Python 3.9+
* Docker

### Installation

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/ayushmatters/Safar_Saarthi.git](https://github.com/ayushmatters/Safar_Saarthi.git)
    cd Safar_Saarthi
    ```
2.  **Setup the Backend (Server)**
    *Navigate to the `server` directory and follow the setup instructions in its `README.md`.*

3.  **Setup the Frontend (Client)**
    *Navigate to the `client` directory and follow the setup instructions in its `README.md`.*

---

## 🧑‍💻 Our Team: CodeMatrix

This project is proudly developed by **Team CodeMatrix** for the Smart India Hackathon 2025.

| Name               | Role                           | GitHub Profile                               |
| ------------------ | ------------------------------ | -------------------------------------------- |
| *[Your Name]* | *e.g., Team Lead & Backend Dev* | *[Link to your GitHub profile]* |
| *[Member 2 Name]* | *e.g., Flutter Developer* | *[Link to member 2's GitHub profile]* |
| *[Member 3 Name]* | *e.g., AI/ML Specialist* | *[Link to member 3's GitHub profile]* |
| *[Member 4 Name]* | *e.g., Frontend Dev & UI/UX* | *[Link to member 4's GitHub profile]* |
| *[Member 5 Name]* | *e.g., Blockchain & DevOps* | *[Link to member 5's GitHub profile]* |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
