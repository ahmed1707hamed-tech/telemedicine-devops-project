# 🚑 Telemedicine DevOps Project

This project is a full-stack **Telemedicine Platform** built using modern **DevOps practices**. It enables users to manage doctors, patients, and appointments through a web-based dashboard.

The application is fully containerized with Docker and deployed on a Kubernetes cluster, ensuring scalability and high availability. A CI/CD pipeline using GitHub Actions automates building, pushing, and deployment processes.

For monitoring and observability, Prometheus collects system metrics while Grafana provides real-time dashboards and alerts.

This project demonstrates a complete DevOps workflow:
Code → Docker → Kubernetes → CI/CD → Monitoring

---

## 🏗️ Architecture Diagram

![Architecture](./docs/arch.png)

---

## 🚀 Application Overview

### 🖥️ Frontend Dashboard

![Dashboard](./docs/screenshots/dashboard.png)

* Admin dashboard to manage system
* View appointments, doctors, and patients
* Built with **Next.js + Tailwind**

---

### 🔗 Backend API (Swagger)

![Backend](./docs/screenshots/backend-swagger.png)

* REST API using **FastAPI**
* Handles:

  * User registration
  * Appointment creation
  * Fetching appointments

---

## 🐳 Docker & Images

![Docker Hub](./docs/screenshots/dockerHub.png)

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

![K8s](./docs/screenshots/architecture-diagram.png.png)

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

![GitHub Actions](./docs/screenshots/github-actions.png)

* Automated pipeline using **GitHub Actions**
* Steps:

  * Build Docker images
  * Push to Docker Hub
  * Deploy updates

---

## 📡 Prometheus Monitoring

![Prometheus Targets](./docs/screenshots/prometheus-target.png)

![Prometheus Alerts](./docs/screenshots/prometheus-alert.png)

* Collects metrics from:

  * Node Exporter
  * Application services

### 🔔 Alerts:

* High CPU Usage
* High Memory Usage

---

## 📊 Grafana Dashboard

![Grafana](./docs/screenshots/grafana.png)

* Visual dashboards for:

  * CPU usage
  * Memory usage
  * System performance

---

## 🌐 Access Application

```bash
http://44.194.99.92:30007
```

Swagger:

```bash
http://44.194.99.92:30007/api/docs
```

---
## 🏁 Conclusion

This project demonstrates a practical implementation of modern DevOps principles applied to a real-world application.

It highlights how different tools and technologies can be integrated to create a seamless workflow — from development to deployment and monitoring. By combining containerization, orchestration, CI/CD automation, and observability, the system achieves scalability, reliability, and maintainability.

Through this project, key DevOps concepts such as infrastructure as code, automation, and continuous delivery are applied in a hands-on manner, making it a strong representation of real industry practices.

This project serves not only as a functional telemedicine system but also as a comprehensive DevOps case study, showcasing the ability to design, deploy, and manage modern cloud-native applications.

## 👨‍💻 Author

**Ahmed Hamed**  
Cloud & DevOps Engineer 🚀

---

## ⭐ Notes

This project demonstrates a full **DevOps lifecycle**:

Code → Docker → Kubernetes → CI/CD → Monitoring
