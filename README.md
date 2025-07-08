# 🔐 React + Django Authentication App

This project is a **full-stack authentication system** built with **Django** (backend) and **React** (frontend). It was created to better understand authentication flows, API integration, and the core concepts of Django.

---

## 🚀 Features
- ✅ React frontend with protected routes
- ✅ Django REST Framework APIs
- ✅ TailwindCSS styling

---

## 🛠 Tech Stack
- **Backend:** Django, Django REST Framework
- **Frontend:** ReactJS
- **Authentication:** JWT (via `djangorestframework-simplejwt`)

---

## 📂 Project Structure

```
Authentication_Django/
├── backend/ # Django backend
│ ├── manage.py
│ ├── settings.py
│ ├── urls.py
│ └── ...
├── frontend/ # React frontend
│ ├── src/
│ ├── package.json
│ └── ...
├── requirements.txt # Python dependencies
├── tailwind.config.js # Tailwind config (if used)
└── .env # Environment variables (excluded from Git)
```


---

## ⚙️ Setup Instructions

### Backend (Django)
1. Navigate to the backend folder:
   ```
   git clone https://github.com/AbhinavDev18/Authentication-Django.git
   cd backend
   ```

2. Create a virtual environment and activate it:
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
3. Install dependencies:
```
pip install Django djangorestframework django-cors-headers pymongo sqlparse dnspython djongo
```
4. Apply migrations:
```
python manage.py migrate
```
5. Start the Django server:
```
python manage.py runserver
```
### Frontend (React)
1. Navigate to the frontend folder:
```
cd frontend
```
2. Install dependencies:
```
npm install
```
3. Start the development server:
```
npm start
```
