# Contributing to Datazen Website

Thank you for your interest in contributing to the Datazen Website! This document provides guidelines and instructions for contributing to this project.

## 📋 Branching Strategy

We follow a simplified Git flow for our development process:

- `main` - The production branch. This should always be stable and deployable.
- `develop` - The main development branch where features are integrated.
- `feature/*` - Feature branches for new functionality (e.g., `feature/navbar-animation`).
- `bugfix/*` - Bug fix branches for resolving issues (e.g., `bugfix/mobile-layout`).
- `hotfix/*` - Hot fix branches for urgent production fixes (e.g., `hotfix/broken-link`).

## 🚀 Development Workflow

1. **Fork and Clone**: 
   - Fork the repository on GitHub if you're an external contributor
   - Clone your fork locally: `git clone https://github.com/yourusername/datazen-website.git`

2. **Set Up Development Environment**:
   - Install dependencies: `npm install` or `yarn`
   - Start the development server: `npm run dev` or `yarn dev`

3. **Create a Branch**:
   - Create a new branch from `develop` for your work:
     ```bash
     git checkout develop
     git pull origin develop
     git checkout -b feature/your-feature-name
     ```

4. **Make Changes**:
   - Make your changes in your feature branch
   - Keep commits small and focused
   - Write meaningful commit messages
   - Follow the code style and conventions

5. **Test Your Changes**:
   - Make sure your changes work as expected
   - Test on different screen sizes for responsive design
   - Check for console errors

6. **Push Changes**:
   - Push your changes to your remote branch:
     ```bash
     git push origin feature/your-feature-name
     ```

7. **Create a Pull Request**:
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select `develop` as the base branch and your feature branch as the compare branch
   - Provide a clear title and description of your changes
   - Reference any related issues using #issue-number

## 📝 Coding Guidelines

### General

- Use TypeScript for type safety
- Keep components small and focused on a single responsibility
- Use meaningful variable and function names
- Add comments for complex logic

### React Components

- Use functional components with hooks
- Keep state as local as possible
- Use proper prop types with TypeScript interfaces

### CSS/Styling

- Use Tailwind CSS utility classes
- For custom styles, use the `@apply` directive in CSS files
- Follow mobile-first approach for responsive design

### Animations

- Use Framer Motion for animations
- Keep animations subtle and purposeful
- Ensure animations work across different devices

## 📦 Submitting Changes

- Make sure your code passes all tests
- Update documentation if necessary
- Squash multiple commits into a single meaningful commit if appropriate
- Request reviews from team members
- Address any feedback from code reviews
- Once approved, your changes will be merged into the `develop` branch

## 👥 Communication

- For major changes, open an issue first to discuss what you would like to change
- For questions, use the repository's Discussions section
- Tag relevant team members when needed

## 🙏 Thank You!

Your contributions help make this project better for everyone. We appreciate your time and effort! 