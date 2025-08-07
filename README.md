# Sports Leagues Application

A React-based single-page application that displays sports leagues with filtering and search capabilities.

## Features

- **League Display**: Shows all sports leagues with name, sport type, and alternate name
- **Search Functionality**: Filter leagues by name (searches both primary and alternate names)
- **Sport Filter**: Dropdown to filter leagues by sport type
- **Interactive Badges**: Click on any league to load and display its season badge
- **Responsive Design**: Works on desktop and mobile devices
- **API Caching**: Responses are cached to avoid repeat API calls

## Tech Stack

- **React 18**: Component-based architecture without TypeScript
- **Vanilla CSS**: Responsive grid layout with modern styling
- **Fetch API**: For HTTP requests to TheSportsDB API
- **In-memory Caching**: Custom cache implementation for API responses

## API Endpoints

- **All Leagues**: `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
- **Season Badges**: `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=<id>`

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Architecture

### Component Structure

- `App.js`: Main application component managing state and API calls
- `LeagueCard.js`: Individual league display with badge loading functionality
- `SearchFilter.js`: Search input and sport filter dropdown
- `utils/api.js`: API interaction functions with error handling
- `utils/cache.js`: Simple in-memory cache for API responses

### Key Design Decisions

1. **Component-Based Architecture**: Separated concerns into reusable components
2. **State Management**: Used React hooks for local state management (no external state library needed)
3. **Caching Strategy**: Implemented simple in-memory cache with 5-minute expiration
4. **Error Handling**: Graceful error handling for API failures
5. **Responsive Design**: CSS Grid with mobile-first approach
6. **Performance**: Memoized expensive operations (filtering, sport list generation)

### Caching Implementation

- API responses cached for 5 minutes to reduce server load
- Separate cache keys for leagues list and individual badges
- Automatic cache expiration and cleanup

## AI Tools and Development Notes

### AI Assistance Used

This application was developed with assistance from **Claude (Anthropic's AI assistant)**:

- **Code Generation**: Claude helped structure the initial React components, component architecture, and CSS styling patterns
- **API Integration**: Assistance with fetch implementation, error handling patterns, and caching strategy design
- **Responsive Design**: CSS Grid and Flexbox layout suggestions for mobile-first responsive design

### Development Approach

1. Started with basic project structure and dependencies
2. Created utility functions for API calls and caching first
3. Built components incrementally (filters, cards, main app)
4. Added responsive styling and error handling
5. Implemented caching to improve performance

### Design Philosophy

- **Simplicity**: Clean, functional design focused on usability
- **Performance**: Caching and memoization to minimize API calls
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Mobile-First**: Responsive design that works on all screen sizes
