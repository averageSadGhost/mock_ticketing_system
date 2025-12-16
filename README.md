# RailWay - Train Ticketing System

A modern, full-featured mock train ticketing system built with React, TypeScript, and Tailwind CSS.

## Features

- **Train Search**: Search trains by origin, destination, date, and passenger count
- **Seat Selection**: Interactive seat map with different coach classes (First, Business, Economy)
- **Booking Flow**: Complete booking process with passenger details
- **Mock Payment**: Simulated payment processing with card validation
- **Ticket Management**: View, manage, and cancel bookings
- **User Authentication**: Mock login/register with localStorage persistence
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Option 1: Docker (Recommended)

#### Prerequisites
- Docker and Docker Compose

#### Production Mode
```bash
# Build and run production container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop container
docker-compose down
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Development Mode (with hot reloading)
```bash
# Build and run development container
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop container
docker-compose -f docker-compose.dev.yml down
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

#### Docker Commands Reference
```bash
# Build image only
docker build -t railway-ticketing .

# Run container manually
docker run -d -p 3000:80 --name railway railway-ticketing

# Check container health
docker ps
docker inspect railway-ticketing --format='{{.State.Health.Status}}'

# View container logs
docker logs -f railway-ticketing

# Stop and remove container
docker stop railway-ticketing && docker rm railway-ticketing

# Remove image
docker rmi railway-ticketing
```

### Option 2: Local Development

#### Prerequisites
- Node.js 18+ and npm

#### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

#### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button.tsx    # Button with variants
│   │   ├── Input.tsx     # Form input field
│   │   ├── Select.tsx    # Dropdown select
│   │   ├── Card.tsx      # Card container
│   │   ├── Modal.tsx     # Modal dialog
│   │   ├── Loading.tsx   # Loading spinner
│   │   └── Badge.tsx     # Status badges
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # Navigation header
│   │   ├── Footer.tsx    # Page footer
│   │   └── Layout.tsx    # Main layout wrapper
│   ├── train/            # Train-related components
│   │   ├── TrainSearch.tsx    # Search form
│   │   ├── TrainCard.tsx      # Train result card
│   │   ├── TrainList.tsx      # Search results list
│   │   └── SeatSelector.tsx   # Seat selection map
│   ├── booking/          # Booking components
│   │   ├── PassengerForm.tsx  # Passenger details form
│   │   ├── BookingSummary.tsx # Booking summary card
│   │   └── PaymentForm.tsx    # Payment form
│   └── auth/             # Authentication components
│       ├── LoginForm.tsx      # Login form
│       └── RegisterForm.tsx   # Registration form
├── pages/
│   ├── Home.tsx          # Landing page with search
│   ├── SearchResults.tsx # Train search results
│   ├── SeatSelection.tsx # Seat selection page
│   ├── Booking.tsx       # Passenger details page
│   ├── Payment.tsx       # Payment page
│   ├── Confirmation.tsx  # Booking confirmation
│   ├── MyTickets.tsx     # User's bookings
│   ├── Login.tsx         # Login page
│   └── Register.tsx      # Registration page
├── context/
│   ├── AuthContext.tsx   # Authentication state
│   └── BookingContext.tsx # Booking flow state
├── hooks/
│   ├── useAuth.ts        # Auth context hook
│   ├── useBooking.ts     # Booking context hook
│   └── useTrains.ts      # Train search hook
├── services/
│   └── mockData.ts       # Mock data and functions
├── types/
│   └── index.ts          # TypeScript interfaces
├── utils/
│   ├── formatters.ts     # Date/currency formatters
│   └── validators.ts     # Form validation
├── App.tsx               # Main app with routing
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## Available Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with train search |
| `/search` | Search results |
| `/seats` | Seat selection |
| `/booking` | Passenger details |
| `/payment` | Payment processing |
| `/confirmation` | Booking confirmation |
| `/my-tickets` | User's bookings |
| `/login` | Login page |
| `/register` | Registration page |

## Mock Data

### Demo Credentials
- Email: `demo@example.com`
- Password: `demo123`

### Test Payment Card
- Card Number: `4111 1111 1111 1111`
- Expiry: `12/25`
- CVV: `123`

### Available Routes
- New York ↔ Boston
- New York ↔ Washington DC
- New York ↔ Chicago
- Boston ↔ Washington DC
- Washington DC ↔ Richmond
- Philadelphia ↔ New York
- Chicago ↔ Pittsburgh

### Train Types
- **High-Speed**: Fastest, includes all classes
- **Express**: Mid-tier, business and economy
- **Regional**: Budget-friendly, economy focus

## Components Documentation

### Common Components

#### Button
```tsx
<Button
  variant="primary" // primary | secondary | outline | danger
  size="md"         // sm | md | lg
  isLoading={false}
  leftIcon={<Icon />}
  rightIcon={<Icon />}
>
  Click me
</Button>
```

#### Input
```tsx
<Input
  label="Email"
  type="email"
  error="Invalid email"
  leftIcon={<Mail />}
/>
```

#### Card
```tsx
<Card hover padding="md">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

#### Modal
```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Modal Title"
  size="md" // sm | md | lg | xl
>
  Modal content
</Modal>
```

### Hooks

#### useAuth
```tsx
const {
  user,
  isAuthenticated,
  isLoading,
  login,
  register,
  logout
} = useAuth();
```

#### useBooking
```tsx
const {
  searchParams,
  selectedTrain,
  selectedSeats,
  passengers,
  setSearchParams,
  setSelectedTrain,
  addSeat,
  removeSeat,
  setPassengers,
  completeBooking,
  resetBooking,
  getTotalAmount
} = useBooking();
```

#### useTrains
```tsx
const {
  trains,
  isLoading,
  error,
  search,
  getStations
} = useTrains();
```

## Data Persistence

The app uses localStorage for:
- User session (`railway_auth`)
- Registered users (`railway_users`)
- Bookings (`railway_bookings`)

## Customization

### Adding New Stations

Edit `src/services/mockData.ts`:
```typescript
export const stations: Station[] = [
  { id: 'sta-1', code: 'NYC', name: 'New York Penn Station', city: 'New York', state: 'NY' },
  // Add more stations...
];
```

### Adding New Routes

Edit the `routeSchedules` array in `src/services/mockData.ts`:
```typescript
const routeSchedules: RouteSchedule[] = [
  {
    origin: stations[0],
    destination: stations[1],
    trains: [
      { type: 'high-speed', name: 'Express', departures: ['06:00', '12:00'], duration: '2h 30m' },
    ],
  },
];
```

### Styling

The project uses Tailwind CSS. Customize the theme in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Custom primary colors
      },
    },
  },
}
```

## Docker Architecture

### Production Setup
The production Docker setup uses a multi-stage build:

1. **Stage 1 (deps)**: Installs Node.js dependencies
2. **Stage 2 (builder)**: Builds the React application
3. **Stage 3 (runner)**: Serves the built files using Nginx

Benefits:
- Small final image (~25MB)
- Optimized for production
- Health checks included
- Gzip compression enabled
- Security headers configured

### Development Setup
The development Docker setup:
- Uses Node.js with Vite dev server
- Hot reloading via volume mounts
- Source code changes reflect immediately

### Files
| File | Description |
|------|-------------|
| `Dockerfile` | Multi-stage production build |
| `Dockerfile.dev` | Development build with hot reload |
| `docker-compose.yml` | Production orchestration |
| `docker-compose.dev.yml` | Development orchestration |
| `nginx.conf` | Nginx configuration for SPA |
| `.dockerignore` | Files excluded from build |

### Ports
| Environment | Port | URL |
|-------------|------|-----|
| Production | 3000 | http://localhost:3000 |
| Development | 5173 | http://localhost:5173 |

## License

MIT License - Feel free to use this project for learning and development.
