#!/usr/bin/env bash
cd "$(dirname "$0")"
json-server --watch db.json --routes routes.json
