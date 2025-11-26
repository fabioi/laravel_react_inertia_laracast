# format changed files

git diff --name-only --diff-filter=d | grep -E '\.(ts|tsx|js|jsx)$' | xargs -r npx prettier --write