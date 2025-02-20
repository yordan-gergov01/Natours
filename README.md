# Natours

Natours is a tour booking web application designed to provide users with a seamless experience in exploring and booking various tours. Built with Node.js, Express, MongoDB, and Mongoose, it offers robust functionality and performance while following the **MVC (Model-View-Controller) architecture** for better structure and maintainability.

## Features

- **User Authentication and Authorization**: Secure sign-up, login, and role-based access control.
- **Tour Management**: Browse, search, and book tours with detailed information and pricing.
- **Booking System**: Integrated booking process with payment handling via Stripe.
- **User Profiles**: Manage personal information, view booking history, and update settings.
- **Secure API**: Implemented best security practices to protect user data.

  ![Natours 1](https://github.com/user-attachments/assets/75652f94-fc0a-4fe1-9402-2276a7bce624)
![Natours 2](https://github.com/user-attachments/assets/552f4049-5f88-4060-97a0-51c22f105207)
![Natours 3](https://github.com/user-attachments/assets/2adce807-0d6d-4efc-8a1c-2c81a7373a84)
![Natours 4](https://github.com/user-attachments/assets/c2c084ed-8cf7-4d72-9244-1710bce68d0b)
![Natours 5](https://github.com/user-attachments/assets/e592979d-0a65-4daa-8b1d-8ac53af0b33c)
![Natours 6](https://github.com/user-attachments/assets/d31e841e-868d-48f8-9ab1-cf70353c3d96)
![Natours 7](https://github.com/user-attachments/assets/b353daf8-ce99-4535-8a66-1cc220e47103)
![Natours 8](https://github.com/user-attachments/assets/ef1a1295-71dd-435f-ad4c-196188a0f86c)
![Natours 9](https://github.com/user-attachments/assets/58e3a609-0ef4-4213-881c-7dabab408e08)


## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Architecture**: **MVC (Model-View-Controller) pattern**
- **Templating Engine**: Pug
- **Payment Processing**: Stripe
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Email Service**: Nodemailer, SendGrid
- **Security**: Helmet, xss-clean, express-rate-limit, mongo-sanitize
- **File Uploads**: Multer, Sharp

## Installation

1. Clone the repository:
   git clone https://github.com/yordan-gergov01/Natours.git
   cd Natours

2. Install Dependencies:
   npm install

3. Environment Variables: Create a .env file in the root directory and add the following:
   NODE_ENV=development
   
PORT=3000
DATABASE=<Your MongoDB Connection String>
DATABASE_PASSWORD=<Your MongoDB Password>
JWT_SECRET=<Your JWT Secret>
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
EMAIL_USERNAME=<Your Email Username>
EMAIL_PASSWORD=<Your Email Password>
EMAIL_HOST=<Your Email Host>
EMAIL_PORT=<Your Email Port>
STRIPE_SECRET_KEY=<Your Stripe Secret Key>
STRIPE_WEBHOOK_SECRET=<Your Stripe Webhook Secret>

5. Start the application


**API Endpoints**

**Tours:**

- GET /api/v1/tours: Retrieve all tours
- GET /api/v1/tours/:id: Retrieve a specific tour
- POST /api/v1/tours: Create a new tour
- PATCH /api/v1/tours/:id: Update an existing tour
- DELETE /api/v1/tours/:id: Delete a tour

**Users:**

- POST /api/v1/users/signup: User registration
- POST /api/v1/users/login: User login
- GET /api/v1/users/logout: User logout
- GET /api/v1/users/me: Retrieve logged-in user's profile
- PATCH /api/v1/users/updateMe: Update logged-in user's profile
- DELETE /api/v1/users/deleteMe: Deactivate logged-in user's account

**Bookings:**

- GET /api/v1/bookings: Retrieve all bookings
- GET /api/v1/bookings/:id: Retrieve a specific booking
- POST /api/v1/bookings: Create a new booking
- PATCH /api/v1/bookings/:id: Update an existing booking
- DELETE /api/v1/bookings/:id: Delete a booking
