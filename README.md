# School Enquiry Backend

This is the **backend** for the School Enquiry Management System, designed to handle the server-side logic, database operations, and API endpoints for managing prospective student enquiries efficiently. It powers the frontend application by providing secure data storage, retrieval, and management capabilities.

## Features

- **API Endpoints:**
  - Manage enquiry submissions from the user panel (e.g., POST `/api/enquiries`).
  - Retrieve and update enquiry data for the admin panel (e.g., GET `/api/enquiries`, PUT `/api/enquiries/:id`).
  - Support for filtering, sorting, and pagination of enquiries.
  - Handle admin authentication and authorization.
  - Store and retrieve remarks/comments with timestamps and authorship details.

- **Database Management:**
  - Stores enquiry details such as student information, guardian contact details, address, and enquiry source in MongoDB.
  - Maintains an enquiry timeline with chronological updates (e.g., submission, follow-ups, status changes).

- **Security:**
  - Secure admin login with username/password authentication.
  - Role-based access control for remarks visibility (e.g., private or internal).

## Tech Stack
- **Runtime:** Node.js  
- **Framework:** Nest.js  
- **Database:** MongoDB  
- **Other:** Mongoose   

## Prerequisites
Before setting up the project, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- Git

## Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/AnshulAgrawal999/school_enquiry_backend.git
   cd school_enquiry_backend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
   - Replace `your_mongodb_connection_string` with your MongoDB URI.
   - Replace `your_secret_key` with a secure key for JWT authentication (e.g., generate with `openssl rand -base64 32`).
   - Adjust `PORT` if needed.

4. **Run the Server:**
   ```bash
   npm start
   ```
   The server will run on [http://localhost:5000](http://localhost:5000) (or your specified port).

## API Endpoints
Below are example endpoints (adjust based on your actual implementation):
- **POST `/api/enquiries`:** Submit a new enquiry.
- **GET `/api/enquiries`:** Retrieve all enquiries (with optional query params for filtering/sorting).
- **GET `/api/enquiries/:id`:** Retrieve a specific enquiry by ID.
- **PUT `/api/enquiries/:id`:** Update an existing enquiry.
- **POST `/api/auth/login`:** Admin login to obtain a JWT token.
- **POST `/api/enquiries/:id/remarks`:** Add a remark/comment to an enquiry.

> **Note:** Refer to the codebase or update this section with your specific routes once implemented.

## Usage
- Pair this backend with the [School Enquiry Frontend](https://github.com/AnshulAgrawal999/school_enquiry_app) for full functionality.
- Use tools like Postman or cURL to test the API endpoints directly.

## Contact
For questions or feedback, feel free to reach out to [Anshul Agrawal](https://github.com/AnshulAgrawal999) or open an issue on this repository.
