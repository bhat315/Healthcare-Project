# Healthcare SaaS Platform 🏥

A comprehensive B2B Healthcare SaaS UI application built with React, TypeScript, and modern web technologies.

## Features ✨

### Core Features
- **🔐 Authentication**: Firebase-based login and signup with validation
- **📊 Dashboard**: Comprehensive overview with patient statistics and quick actions
- **👥 Patient Management**: Full CRUD operations with Grid and List view modes
- **📈 Analytics**: Interactive charts and metrics using Recharts
- **🔔 Notifications**: Service Worker integration for push and local notifications
- **🎨 Responsive Design**: Mobile-first, fully responsive UI
- **⚡ State Management**: Zustand for efficient state management

### Bonus Features
- **🎯 Clean Architecture**: Organized folder structure for scalability
- **📱 Mobile Responsive**: Works seamlessly on all device sizes
- **🔄 Real-time Updates**: Service Worker for background sync
- **⚙️ Performance Optimized**: Lazy loading and code splitting ready
- **🎨 Modern UI/UX**: Gradient designs and smooth animations

## Tech Stack 🛠️

- **Frontend**: React 18.2
- **Language**: TypeScript
- **State Management**: Zustand
- **Authentication**: Firebase
- **Build Tool**: Vite
- **Charts**: Recharts
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: CSS3 with CSS Grid and Flexbox

## Project Structure 

```
src/
├── components/        # Reusable components
│   ├── Navigation.tsx
│   ├── StatCard.tsx
│   └── NotificationContainer.tsx
├── pages/            # Page components
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── PatientsPage.tsx
│   └── AnalyticsPage.tsx
├── store/            # State management (Zustand)
│   └── store.ts
├── config/           # Configuration files
│   └── firebase.ts
├── styles/           # CSS files
│   ├── App.css
│   ├── Login.css
│   ├── Dashboard.css
│   ├── Patients.css
│   ├── Analytics.css
│   ├── Navigation.css
│   └── Notification.css
├── App.tsx          # Main App component
└── main.tsx         # Entry point
public/
├── sw.js            # Service Worker
└── index.html       # HTML template
```

## Getting Started 🚀

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm build

# Preview production build
npm preview
```

The application will open at `http://localhost:3000`

## Usage Guide 📖

### Login
1. Click on "Try Demo Login" for quick access
2. Or create an account with email and password (min 6 characters)
3. Default demo credentials work instantly

### Dashboard
- View patient statistics and quick metrics
- Access recent patients list
- Quick action buttons for different modules

### Patient Management
- **Grid View**: Visual card layout for patient information
- **List View**: Tabular view with inline actions
- **Add Patient**: Create new patient records
- **Edit Patient**: Update existing patient information
- **Delete Patient**: Remove patient records
- **View Details**: See full patient information in modal

### Analytics
- **Status Distribution**: Pie chart showing active vs inactive patients
- **Visit Trends**: Monthly visit statistics
- **Appointment Distribution**: Hourly appointment breakdown
- **Key Metrics**: Important healthcare KPIs

### Notifications
- Click "Send Notification" on dashboard
- Service Worker will display notification
- Real-time push notifications supported

## Service Worker Features 

The application includes a fully functional Service Worker (`sw.js`) that handles:
- Local notifications
- Push notifications
- Background sync
- Offline support (ready for enhancement)
- Notification interactions and actions

## Authentication 

### Firebase Setup
The project is configured for Firebase authentication. To enable real authentication:

1. Create a Firebase project at https://console.firebase.google.com
2. Update `src/config/firebase.ts` with your Firebase config
3. Enable Email/Password authentication in Firebase Console

### Demo Mode
The application includes a demo mode that doesn't require Firebase setup, perfect for testing and presentation.

## State Management 

Uses Zustand for lightweight, efficient state management:
- `useAuthStore`: Authentication state
- `usePatientsStore`: Patient data and view mode
- `useNotificationStore`: Notification queue

## Responsive Design 

- **Desktop**: Full layout with side panels
- **Tablet**: Adjusted grid layouts
- **Mobile**: Single column, optimized navigation

## Performance Optimizations 

- Code splitting ready with Vite
- Lazy loading components
- CSS Grid for layout efficiency
- Minimal re-renders with Zustand
- Service Worker caching support

## Browser Support 

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Available Scripts 

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Key Features Implementation Details 🔧

### Grid/List View Toggle
Patient data can be displayed in two modes:
- **Grid**: Card-based layout with 3 columns (responsive)
- **List**: Table-based layout with horizontal scroll on mobile

### Service Worker Integration
- Automatic registration on app load
- Message passing from UI to Service Worker
- Notification permission handling
- Background sync for appointments

### State Persistence
- Session-based state management
- Form validation and error handling
- Real-time data updates

## Best Practices Implemented 

- TypeScript strict mode
- Component composition
- DRY principle
- Semantic HTML
- Accessibility considerations
- Mobile-first responsive design
- Clean code structure
- Error handling and validation

## Troubleshooting 

### Service Worker not registering
- Check browser console for errors
- Ensure HTTPS is used in production
- Clear browser cache and service workers

### Notifications not showing
- Grant notification permissions when prompted
- Check browser notification settings
- Verify Service Worker is active

### Build errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf dist`
- Check Node.js version compatibility


