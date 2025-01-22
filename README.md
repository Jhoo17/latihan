# GDA Consulting Web Application

A modern web application for GDA Consulting, providing geological consulting services, blog management, and interactive features.

## Description

GDA Consulting's web application is a comprehensive platform that showcases geological consulting services, manages blog posts and publications, and provides interactive features for users. The application is built with modern web technologies and follows best practices for performance, security, and user experience.

## Features

- **Content Management**
  - Blog posts and publications management through Contentful CMS
  - Rich text editing with support for images and formatting
  - Tag-based categorization and filtering
  - Automated social media content generation

- **Authentication & Authorization**
  - Secure user authentication with NextAuth.js
  - Multiple authentication providers (Email/Password, Google OAuth)
  - Role-based access control (Admin, GDA User, Regular User)
  - Protected admin routes and features

- **Service Showcase**
  - Comprehensive service listings
  - Detailed service descriptions and capabilities
  - Interactive service navigation

- **Social Media Integration**
  - Automated post generation for multiple platforms
  - Platform-specific content optimization
  - Scheduling and publishing management
  - Support for Twitter, LinkedIn, Facebook, and Instagram

- **Interactive Features**
  - Responsive and modern UI
  - Dynamic content filtering
  - Interactive geological mapping (coming soon)
  - Real-time content updates

## Tech Stack

- **Frontend**
  - Next.js 14 (React Framework)
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
  - Lucide Icons

- **Backend**
  - Next.js API Routes
  - PostgreSQL Database
  - Prisma ORM
  - NextAuth.js for Authentication
  - Vercel KV for Key-Value Storage

- **Content Management**
  - Contentful Headless CMS
  - OpenAI GPT-4 for Content Generation

- **Infrastructure**
  - Docker for Development
  - PostgreSQL Container
  - Vercel for Deployment

## Architecture

The application follows a modern full-stack architecture:

- **Frontend Layer**: Next.js with App Router for server-side rendering and client-side interactivity
- **API Layer**: Next.js API Routes for backend functionality
- **Data Layer**: 
  - PostgreSQL for user data and social media posts
  - Contentful for blog content
  - Vercel KV for configuration storage
- **Service Layer**: Dedicated services for business logic
- **Authentication Layer**: NextAuth.js with multiple providers
- **Integration Layer**: OpenAI and social media platform integrations

## Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd gda-web-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://gda_admin:gda123@localhost:5432/gda_db?schema=public"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret-key"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Contentful
   CONTENTFUL_SPACE_ID="your-space-id"
   CONTENTFUL_ACCESS_TOKEN="your-access-token"
   CONTENTFUL_MANAGEMENT_TOKEN="your-management-token"

   # OpenAI
   OPENAI_API_KEY="your-openai-api-key"

   # Admin
   ADMIN_EMAIL="your-admin@email.com"
   ```

4. **Start PostgreSQL Database**
   ```bash
   docker-compose up -d
   ```

5. **Initialize Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

7. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Additional Information

### Prerequisites
- Node.js 18 or later
- Docker Desktop
- Git

### Database Management
- Access Prisma Studio: `npx prisma studio`
- Reset Database: `npx prisma db push --force-reset`

### Content Management
1. Set up a Contentful account
2. Create content model with ID `blogPage-3`
3. Configure content fields as per the schema

### Social Media Integration
1. Configure social media credentials in admin settings
2. Set up platform-specific API keys and tokens
3. Test post generation and scheduling

## Implementation Status

### Completed Features
- ✅ Blog and Publication System
  - Content management through Contentful
  - Tag-based filtering
  - Responsive grid layout
  - Publication/Blog type differentiation

- ✅ Core Pages
  - Home page with service highlights
  - About page with company information
  - Services listing page
  - Blog/Publications page

- ✅ Navigation and Layout
  - Main navigation with dynamic routing
  - Responsive design
  - Modern UI components with Shadcn

### In Development
- 🚧 Authentication System
  - Basic structure implemented
  - Database models defined
  - Pending: Google OAuth integration
  - Pending: Role-based access control

- 🚧 Social Media Integration
  - Models and schemas defined
  - Pending: OpenAI content generation
  - Pending: Platform-specific posting
  - Pending: Post scheduling system

- 🚧 Database Integration
  - PostgreSQL container setup complete
  - Prisma schema defined
  - Pending: Stable connection configuration
  - Pending: Production deployment setup

### Planned Features
- 📋 Interactive Geological Map
  - Feature specification in progress
  - Implementation planned for future release

- 📋 Admin Dashboard
  - User management interface
  - Content moderation tools
  - Analytics and reporting

- 📋 API Integrations
  - Additional social media platforms
  - Analytics services
  - Email notification system

## Contributing

Please read our contributing guidelines and code of conduct before submitting pull requests.

## License

This project is proprietary software owned by GDA Consulting.
