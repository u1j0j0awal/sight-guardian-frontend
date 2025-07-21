
I've created the SecureSight CCTV Dashboard with all the mandatory components. Here's what I've implemented:
Mandatory Features ✅
1. Navbar

SecureSight branding with MANDLACX logo
Navigation menu with Dashboard, Cameras, Scenes, Incidents, Users
User profile section with avatar and email

2. Incident Player (Left Side)

Large video frame area with "MANDATORY" overlay
Video playback controls (play/pause, skip, timeline)
Current time display (11/7/2025 - 03:12:37)
Three camera thumbnail strip at bottom showing Camera 01, 02, 03

3. Incident List (Right Side)

Header showing "15 Unresolved Incidents" with count
Filter buttons for "Unresolved" vs "All" incidents
List of incidents with:

Thumbnails
Colored type icons (Gun Threat=red, Unauthorised Access=orange, etc.)
Camera location
Start-end timestamps
"Resolve →" button with optimistic UI


Real-time count updates when incidents are resolved

Key Features:

Data Model Simulation: Mock data for cameras and incidents
Optimistic UI: Resolve buttons update immediately before API call
Color-coded Incident Types: Different colors for different threat levels
Responsive Design: Clean, modern interface matching the security theme
Interactive Elements: Clickable incidents, playback controls, filter buttons

Optional Timeline:

Placeholder for the 24-hour timeline feature (marked as "OPTIONAL / EXTRA CREDIT")

Next Steps for Full Implementation:
For a complete full-stack solution, you would need:

Backend API (Next.js API routes):
GET /api/incidents?resolved=false
PATCH /api/incidents/:id/resolve

Database Schema (Prisma):
prismamodel Camera {
  id       Int @id @default(autoincrement())
  name     String
  location String
  incidents Incident[]
}

model Incident {
  id           Int @id @default(autoincrement())
  cameraId     Int
  camera       Camera @relation(fields: [cameraId], references: [id])
  type         String
  tsStart      DateTime
  tsEnd        DateTime
  thumbnailUrl String
  resolved     Boolean @default(false)
}

Seed Data: 12+ incidents across different threat types

This dashboard provides a professional security monitoring interface with all the core functionality specified in your requirements!
