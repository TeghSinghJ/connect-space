
# ConnectSpace

ConnectSpace is a video conferencing platform developed using Next.js, Tailwind CSS, Shadcn UI, Stream platform, Clerk authentication, and TypeScript. It aims to provide a Zoom-like experience with features for instant meetings, scheduling meetings, recording sessions, and managing personal rooms.

## Features

- **Instant Meetings:** Quickly start ad-hoc video conferences.
- **Scheduled Meetings:** Schedule meetings for future dates.
- **Recording:** Record meetings for later review.
- **Playback:** View and manage recorded sessions.
- **Personal Rooms:** Dedicated virtual rooms for individual users.

## Technologies Used

- **Next.js:** React framework for building the frontend.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Shadcn UI:** UI components for enhanced user interface.
- **Stream Platform:** Integration for real-time video and chat functionality.
- **Clerk Authentication:** Authentication and user management.
- **TypeScript:** Typed JavaScript for improved developer experience and code quality.

## Getting Started

To get a local copy of this project up and running, follow these steps:

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/yourusername/connectspace.git
   cd connectspace
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables:**
   Create a \`.env.local\` file in the root directory and add the necessary environment variables. Below is an example template:

   \`\`\`plaintext
   NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
   CLERK_FRONTEND_API=your_clerk_frontend_api
   CLERK_API_KEY=your_clerk_api_key
   \`\`\`

4. **Run database migrations (if applicable):**
   If your project uses a database and requires migrations, run the migration command:
   \`\`\`bash
   npm run migrate
   # or
   yarn migrate
   \`\`\`

5. **Run the development server:**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

6. **Open your browser:**
   Visit \`http://localhost:3000\` to see ConnectSpace in action.

