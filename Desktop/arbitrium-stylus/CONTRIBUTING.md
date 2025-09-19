# Contributing to Arbitrum Stylus IDE

Thank you for your interest in contributing to the Arbitrum Stylus IDE! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Rust 1.75+ with `wasm32-wasi` target
- Node.js 18+ and npm
- Git

### Development Setup
```bash
git clone https://github.com/your-org/arbitrum-stylus-ide
cd arbitrum-stylus-ide

# Install Rust dependencies and build
cargo build --all

# Install web dependencies
cd web && npm install
```

## 🏗️ Project Structure

- `core/` - Wasmer-based execution engine
- `harness/` - Test framework and runner
- `cli/` - Command-line interface
- `web/` - React-based web IDE
- `examples/` - Sample contracts and tests

## 🧪 Testing

```bash
# Run all Rust tests
cargo test --all

# Run web tests
cd web && npm test

# Integration tests
cargo test --test integration
```

## 📝 Code Style

### Rust
- Use `cargo fmt` for formatting
- Use `cargo clippy` for linting
- Follow standard Rust naming conventions
- Add documentation for public APIs

### JavaScript/React
- Use Prettier for formatting
- Follow ESLint rules
- Use functional components with hooks
- Add PropTypes or TypeScript types

## 🔄 Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `cargo test --all`
6. Format code: `cargo fmt --all`
7. Run linter: `cargo clippy --all`
8. Commit with descriptive message
9. Push to your fork: `git push origin feature/amazing-feature`
10. Create a Pull Request

## 🐛 Bug Reports

When filing bug reports, please include:
- Operating system and version
- Rust version (`rustc --version`)
- Steps to reproduce
- Expected vs actual behavior
- Relevant logs or error messages

## 💡 Feature Requests

For feature requests, please:
- Check existing issues first
- Describe the use case
- Explain why it would be valuable
- Consider implementation complexity

## 🏷️ Commit Messages

Use conventional commit format:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

Example: `feat: add gas profiling breakdown visualization`

## 📋 Code Review Guidelines

### For Contributors
- Keep PRs focused and small
- Write clear descriptions
- Respond to feedback promptly
- Update documentation as needed

### For Reviewers
- Be constructive and respectful
- Focus on code quality and maintainability
- Test the changes locally
- Approve when ready

## 🎯 Areas for Contribution

### High Priority
- Performance optimizations
- Additional language support
- Enhanced debugging features
- Better error messages

### Medium Priority
- UI/UX improvements
- Documentation improvements
- Example contracts
- Integration tests

### Good First Issues
- Documentation fixes
- Code formatting
- Simple bug fixes
- Adding tests

## 📚 Resources

- [Arbitrum Stylus Documentation](https://docs.arbitrum.io/stylus)
- [Wasmer Documentation](https://docs.wasmer.io/)
- [React Documentation](https://react.dev/)
- [Monaco Editor API](https://microsoft.github.io/monaco-editor/)

## 🤝 Community

- Discord: [Join our community](https://discord.gg/stylus-ide)
- GitHub Discussions: For questions and ideas
- Issues: For bugs and feature requests

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the Arbitrum Stylus IDE! 🚀