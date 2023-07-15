# Teet it. - Next.js Application

Teet it. is a Next.js application that utilizes PostgreSQL as the database hosted on Railway.app. It integrates Google Single Sign-On (SSO) for authentication and incorporates React and Tailwind CSS for the frontend. The application is hosted on Vercel.app.

## How to Run the Application

To run the Teet it. application locally, please follow the steps below:

### Prerequisites

Before proceeding, make sure you have the following installed:

- Node.js (v14 or higher)
- PostgreSQL (Railway app instance)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install the dependencies:

   ```bash
   cd teet-it
   npm install
   ```

3. Update env variables:

   - Railway app instance
   - Google secret keys

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to access the Teet it. application.

## Deployment

To deploy the Teet it. application to Vercel.app, follow these steps:

1. Sign up for a Vercel account at [https://vercel.com](https://vercel.com).

2. Connect your Vercel account to the Git repository where the Teet it. application code is hosted.

3. Configure the necessary environment variables in the Vercel app settings, similar to the ones in the `.env.local` file.

4. Trigger a deployment from Vercel, either manually or by pushing changes to the connected Git repository.

5. Once the deployment is complete, Vercel will provide you with the application URL. Access the Teet it. application using this URL.

Now you can access and use the Teet it. application on Vercel.

Please note that the deployment steps might differ slightly based on your specific setup and configuration.

## Conclusion

Congratulations! You now have the Teet it. application up and running locally as well as deployed on Vercel.app. You can start exploring its features and customizing it further to fit your needs. Enjoy using Teet it. for your Next.js development projects!
