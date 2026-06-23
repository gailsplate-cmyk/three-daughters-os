#!/usr/bin/env bash
set -e

BASE="http://127.0.0.1:8000"

echo "Health check"
curl -s "$BASE/health" | python -m json.tool

echo "Monday planning"
curl -s "$BASE/planning/monday?week_start=2026-06-22" | python -m json.tool
