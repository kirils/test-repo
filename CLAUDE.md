# CLAUDE.md

This file provides guidance to AI assistants (Claude and others) working with this repository.

## Repository Overview

**Name:** test-repo
**Owner:** kirils
**Purpose:** A demonstration/test repository used for experimentation and learning.
**License:** MIT

This is a minimal repository currently containing only foundational documentation. It serves as a base for testing workflows, tooling, and development practices.

## Repository Structure

```
test-repo/
├── README.md       # Project overview and getting started guide
└── CLAUDE.md       # This file — guidance for AI assistants
```

As the project grows, new directories and files should be added here.

## Git Workflow

### Branches

- `main` / `master` — the stable production branch; do not push directly
- `claude/<description>-<session-id>` — feature branches used by AI-assisted development sessions

### Development Flow

1. Always develop on a feature branch, never directly on `main` or `master`.
2. Branch names for AI sessions follow the pattern: `claude/<short-description>-<sessionId>`
3. Commit changes with clear, descriptive messages explaining *why*, not just *what*.
4. Push with tracking: `git push -u origin <branch-name>`
5. Open a pull request against `main`/`master` when work is complete.

### Commit Style

- Use imperative mood: "Add feature", "Fix bug", "Update docs"
- Keep subject lines under 72 characters
- Reference related issues or PRs when applicable
- Do not amend commits unless explicitly instructed — create new commits instead

### Git Configuration Notes

- Commits are GPG-signed via SSH key (`commit.gpgsign=true`)
- Do not skip signing with `--no-gpg-sign`
- Do not force-push to `main`/`master`

## Development Conventions

### General Principles

- Keep changes minimal and focused — avoid over-engineering
- Only add code, comments, or abstractions that are directly needed
- Delete unused code rather than commenting it out or leaving `_unused` markers
- Validate only at system boundaries (user input, external APIs); trust internal framework guarantees
- Prefer editing existing files over creating new ones

### File Naming

- Use lowercase with hyphens for directories and most files (e.g., `my-module/`)
- Documentation files use UPPERCASE by convention (e.g., `README.md`, `CLAUDE.md`)

### Documentation

- Keep `README.md` updated when project structure or setup steps change
- Update `CLAUDE.md` when new conventions, tools, or workflows are introduced
- Do not create unnecessary documentation files unless explicitly requested

## Working With This Repository

### Before Making Changes

1. Read the relevant files before modifying them
2. Understand the existing code before proposing modifications
3. Check git log to understand the history and intent behind existing decisions

### Security

- Never commit secrets, credentials, `.env` files, or API keys
- Avoid introducing OWASP Top 10 vulnerabilities (SQLi, XSS, command injection, etc.)
- If security-sensitive code is added, flag it explicitly in the PR description

### Adding New Features

When this repository grows to include source code:

- Add the language/framework details to this file
- Document how to install dependencies, run tests, and build the project
- Include linter and formatter configuration details

## Commands Reference

Since this is currently a documentation-only repository, the primary commands are git operations:

```bash
# Clone the repository
git clone https://github.com/kirils/test-repo.git

# Create a feature branch
git checkout -b claude/<description>-<sessionId>

# Stage and commit
git add <specific-files>
git commit -m "Your descriptive commit message"

# Push with tracking
git push -u origin <branch-name>
```

## Updating This File

This file should be updated whenever:

- New tools, languages, or frameworks are added to the project
- Build, test, or lint commands change
- New conventions or team agreements are established
- The directory structure changes significantly

When updating, keep descriptions accurate to the *current* state of the repository — not aspirational future states.
