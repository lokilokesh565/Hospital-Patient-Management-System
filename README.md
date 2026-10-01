# 🏥 Hospital Patient Management System

A full-stack Hospital Patient Management System developed to manage patient records efficiently through a user-friendly web interface.

The system allows users to register patients, view patient records, search patients, edit existing patient details, and delete patient records.

---

## 📌 Project Overview

The Hospital Patient Management System provides a simple digital solution for maintaining patient information.

Instead of managing patient information manually, the system stores patient records in a database and provides a web-based interface for performing CRUD operations.

### Main Operations

- ➕ Add new patients
- 👁️ View all patients
- 🔍 Search patients by name or phone number
- ✏️ Edit existing patient information
- 🗑️ Delete patient records
- 📊 Display total number of patients

---

## 🚀 Features

### 👤 Patient Registration

Users can register a patient with:

- Patient Name
- Age
- Gender
- Phone Number
- Disease
- Treatment Given
- Medications
- Doctor
- Admission Date

### 🔍 Patient Search

Patients can be searched using:

- Patient Name
- Phone Number

### ✏️ Edit Patient

Existing patient records can be loaded into the registration form and updated without creating a new patient record.

### 🗑️ Delete Patient

Users can delete an existing patient record after confirmation.

### 📋 View All Patients

The system can retrieve and display all registered patients.

### 📊 Patient Count

The dashboard displays the total number of registered patients.

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Maven

### Database

- Microsoft SQL Server

### Development Tools

- Visual Studio Code
- Git
- GitHub
- SQL Server

---

## 🏗️ System Architecture

```text
                ┌─────────────────────┐
                │      Frontend       │
                │                     │
                │ HTML + CSS + JS     │
                └──────────┬──────────┘
                           │
                           │ HTTP / REST API
                           ▼
                ┌─────────────────────┐
                │       Backend       │
                │                     │
                │    Spring Boot     │
                │       Java          │
                └──────────┬──────────┘
                           │
                           │ JPA / Hibernate
                           ▼
                ┌─────────────────────┐
                │      Database       │
                │                     │
                │   SQL Server        │
                └─────────────────────┘

