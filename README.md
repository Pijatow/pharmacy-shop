# Shirazdaroo Pharmacy Shop

Welcome to the official repository for Shirazdaroo, a full-stack e-commerce website for a modern pharmacy. This project is built with a Django backend and a Next.js frontend, providing a robust, scalable, and user-friendly experience tailored for a Persian-speaking audience.
✨ Features

The platform is divided into two main parts: a powerful backend API and a dynamic frontend application.

#### Backend (Django & Django REST Framework)

- __RESTful API__: A comprehensive API for managing all aspects of the store.

- __JWT Authentication__: Secure user registration and login using JSON Web Tokens.

- __Product Management__: Full CRUD (Create, Read, Update, Delete) operations for products, brands, and collections.

- __Image Handling__: Automatic generation of multiple image sizes (low, medium, high quality) upon upload to optimize performance.

- __Product Tagging__: A flexible tagging system (django-taggit) to categorize and filter products.

- __Order Processing__: Endpoints for creating and managing customer orders.

- __User Profiles__: A dedicated endpoint for users to retrieve their profile information.

- __Commenting System__: Users can post comments on product pages.

#### Frontend (Next.js & React)

- __Complete E-commerce Flow__: Browse products, view details, add to cart, and complete the checkout process.

- __Persian (Farsi) UI__: Fully localized for a Persian audience with a Right-to-Left (RTL) layout.

- __User Accounts__: Seamless user registration, login, and a profile page to view order history.

- __Dynamic Shopping Cart__: Client-side state management with Zustand for a fast and responsive cart experience.

- __Interactive Product Pages__: View product details, images, and user-submitted comments.

- __Static Pages__: Includes "About Us," "Contact Us," and "FAQ" pages.

- __Type-Safe Forms__: Robust form validation using Zod and React Hook Form.

## 🛠️ Tech Stack

    Category

    Technology

    Backend

    Python, Django, Django REST Framework, PostgreSQL

    Frontend

    TypeScript, React, Next.js, Tailwind CSS

    State Mgt

    Zustand (for Frontend)

    Database

    PostgreSQL (recommended), SQLite3 (default)

## 🚀 Getting Started

Follow these instructions to get both the backend and frontend development servers running on your local machine.
Prerequisites

    Python 3.8+ and pip

    Node.js 18.18+ and npm

    A running PostgreSQL server (recommended) or SQLite3.

---

### Clone the Repository

    git clone <your-repository-url>
    cd pharmacy-shop

### Backend Setup (Django)

The Django backend runs from the project's root directory.

1. Create a Virtual Environment

    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

2. Install Dependencies:

    pip install -r requirements.txt

3. Configure Environment Variables:

    The backend requires a .env file in the project's root directory for its configuration. Create this file by copying the example:

        cp .env.example .env

    Now, open the .env file and fill in your specific details, such as your database credentials and a new secret key.

4. Run Database Migrations:

        python manage.py migrate

5. Create a Superuser (Admin):

        python manage.py createsuperuser

6. Run the Backend Server:

        python manage.py runserver

The Django API should now be running at <http://127.0.0.1:8000>.

### Frontend Setup (Next.js)

The frontend configuration is located in the frontend/ directory.

1. Navigate to the Frontend Directory:

        cd frontend

2. Install Dependencies:

        npm install

3. Environment Configuration:

    The frontend's API URL is configured directly within the frontend/next.config.ts file. By default, it's set to connect to the local Django server:

        cp frontend/.env.example frontend/.env

4. Run the Frontend Server:

        # development
        npm run dev


        # production
        npm run build
        npm run start

The Next.js application should now be running at <http://localhost:3000>.

### ⚙️ Environment Variables

> Root .env (for Django Backend)

- This file is required for the backend to run. It should contain sensitive keys and database credentials. Do not commit your .env file to version control.

        SECRET_KEY: A long, random string used for cryptographic signing.

        POSTGRES_NAME: The name of your PostgreSQL database.

        POSTGRES_USER: Your database username.

        POSTGRES_PASSWORD: Your database password.

        POSTGRES_HOST: The database host (e.g., localhost).

        POSTGRES_PORT: The database port (e.g., 5432).

> frontend/.env (for Next.js Frontend)

This file is required. It is used to override the default settings in next.config.ts for your local development environment. This file should not be committed to version control.

    NEXT_PUBLIC_API_BASE_URL: The full URL of the Django API if it's not running on the default http://127.0.0.1:8000.

    NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000

    # Components of the API URL, used for the Next.js Image component configuration

    NEXT_PUBLIC_API_PROTOCOL=http
    NEXT_PUBLIC_API_HOSTNAME=127.0.0.1
    NEXT_PUBLIC_API_PORT=8000

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for more details.
