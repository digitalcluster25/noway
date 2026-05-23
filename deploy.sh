#!/usr/bin/env bash
set -euo pipefail
cd /home/deploy/noway
GIT_SSH_COMMAND="ssh -i /home/deploy/.ssh/noway_github -o IdentitiesOnly=yes" git pull --ff-only
docker compose up -d --build
