# 🚑 Telemedicine DevOps Project

A full-stack telemedicine system built with **DevOps best practices** including Docker, Kubernetes, CI/CD, and monitoring.

---

## 🏗️ Architecture Diagram

![Architecture](./screenshots/arch-diagram.png)

---

## 🚀 Application Overview

### 🖥️ Frontend Dashboard

![Dashboard](./screenshots/dashboard.png)

* Admin dashboard to manage system
* View appointments, doctors, and patients
* Built with **Next.js + Tailwind**

---

### 🔗 Backend API (Swagger)

![Backend](./screenshots/backend-swagger.png)

* REST API using **FastAPI**
* Handles:

  * User registration
  * Appointment creation
  * Fetching appointments

---

## 🐳 Docker & Images

![Docker Hub](./screenshots/dockerHub.png)

### 🔹 Build & Push Images

```bash
docker build -t ahmed7amed9/telemedicine-backend .
docker push ahmed7amed9/telemedicine-backend

docker build -t ahmed7amed9/telemedicine-frontend .
docker push ahmed7amed9/telemedicine-frontend

docker build -t ahmed7amed9/telemedicine-nginx .
docker push ahmed7amed9/telemedicine-nginx
```

---

## ☸️ Kubernetes Deployment

![K8s](./screenshots/arch.png)

### 🔹 Apply all configs

```bash
kubectl apply -f kubernetes/
```

### 🔹 Check Pods

```bash
kubectl get pods
```

### 🔹 Restart Deployment

```bash
kubectl rollout restart deployment backend
```

---

## 🔄 CI/CD Pipeline

![GitHub Actions](./screenshots/GitHub actions.png)

* Automated pipeline using **GitHub Actions**
* Steps:

  * Build Docker images
  * Push to Docker Hub
  * Deploy updates

---

## 📡 Prometheus Monitoring

![Prometheus Targets](./screenshots/prometheus-target.png)

![Prometheus Alerts](./screenshots/prometheus-alert.png)

* Collects metrics from:

  * Node Exporter
  * Application services

### 🔔 Alerts:

* High CPU Usage
* High Memory Usage

---

## 📊 Grafana Dashboard

![Grafana](./screenshots/grafana.png)

* Visual dashboards for:

  * CPU usage
  * Memory usage
  * System performance

---

## 🌐 Access Application

```bash
http://<EC2-IP>:30007
```

Swagger:

```bash
http://<EC2-IP>:30007/api/docs
```

---

## 👨‍💻 Author

Ahmed Hamed
DevOps Engineer 🚀

---

## ⭐ Notes

This project demonstrates a full **DevOps lifecycle**:

Code → Docker → Kubernetes → CI/CD → Monitoring
