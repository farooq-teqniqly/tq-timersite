# TQ Timer Site

A lightweight, responsive countdown timer web application built with vanilla JavaScript.

## Features

- Set custom countdown durations (hours, minutes, seconds)
- Start, pause, and reset timer functionality
- Clean, intuitive user interface
- Maximum timer duration of 5 hours
- Automatic state management using a state machine pattern
- Visual indication when timer completes

## Demo

The application is deployed on Azure Static Web Apps at: [https://polite-glacier-0a127361e.2.azurestaticapps.net](https://polite-glacier-0a127361e.2.azurestaticapps.net)

## Getting Started

### Prerequisites

- Node.js (latest LTS recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/tq-timersite.git
cd tq-timersite

# Install dependencies
npm install

# Start the development server
npx http-server
```

Then open your browser to http://localhost:8080

## Development

### Project Structure

```
├── js/
│   ├── constants.js    # Application constants
│   ├── main.js         # Renders UI
│   ├── state.js        # State machine for UI management
│   ├── timer.js        # Core timer functionality
│   └── utils.js        # Helper functions
├── tests/
│   ├── features/        # Cucumber feature files
│   │   └── *.feature    # BDD specifications
│   ├── step_definitions/
│   │   └── *.steps.js   # Step implementations
│   └── constants.js     # Test constants
│   └── utils.js         # Test helper functions
├── index.html           # Main application entry point
├── styles.css           # Application styles
└── ...                  # Configuration files
```

### Code Quality Tools

This project uses several tools to maintain code quality:

- **ESLint**: JavaScript linting with custom configuration
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Run linters on staged files
- **gitleaks**: Pre-commit secret scanning
- **commitlint**: Enforces Conventional Commits format

### Commands

```bash
# Run linting
npm run lint

# Format code
npm run format

# Run acceptance tests
npm run test:acceptance
```

## Deployment

The application is automatically deployed to Azure Static Web Apps through GitHub Actions:

- Pushes to `main` branch trigger production deployment
- Pull requests create preview environments
- Closing a PR removes the preview environment

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

### Pre-commit Hooks

This project uses Husky to install Git hooks that run automatically before each commit. The hooks will:

- Run linters (ESLint, Prettier) on staged files via lint-staged
- Scan for secrets with gitleaks
- Validate your commit message format with commitlint

If any checks fail, the commit will be blocked until you fix the issues.


1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes following Conventional Commits format
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
