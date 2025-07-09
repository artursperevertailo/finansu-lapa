# Finanšu Ceļvedis

A modern React + Vite + Sanity CMS financial advisor website with comprehensive testing and CI/CD.

## Features

- 🎯 **Financial Services Landing Page** - Professional financial advisor website
- 📝 **Contact Form** - Integrated with Formspree for lead generation
- 🧠 **Interactive Quiz** - Personalized financial assessment tool
- 📚 **Blog Section** - Content managed through Sanity CMS
- 🎨 **Modern UI** - Built with Tailwind CSS and smooth animations
- 🛡️ **Error Boundaries** - Robust error handling throughout the app
- ✅ **Comprehensive Testing** - 19 tests covering all major functionality

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **CMS**: Sanity.io
- **Testing**: Jest, React Testing Library
- **CI/CD**: GitHub Actions
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd finansu-lapa
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your Sanity project details
```

4. Start the development server:
```bash
npm run dev
```

## Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage
The project maintains 70%+ test coverage across:
- Component rendering
- User interactions
- Form validation
- Error handling
- API integration

## CI/CD Pipeline

### Automated Testing
- **Trigger**: Every push and pull request
- **Runs**: Linting, testing, and building
- **Node.js versions**: 18.x and 20.x
- **Coverage**: Uploaded to Codecov

### Deployment
- **Trigger**: Push to main branch
- **Platform**: GitHub Pages
- **Automatic**: Build and deploy on merge

### Workflow Files
- `.github/workflows/ci.yml` - Main CI pipeline
- `.github/workflows/deploy.yml` - Deployment pipeline

## Project Structure

```
src/
├── __tests__/          # Test files
├── api/               # API clients (Sanity)
├── components/        # Reusable components
├── pages/            # Page components
├── utils/            # Utility functions
└── App.jsx           # Main application
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.
