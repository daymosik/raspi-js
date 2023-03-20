#!/bin/sh -e

cd /app/

if [[ -f .env ]]; then
  source .env
  export FIREBASE_API_KEY=$FIREBASE_API_KEY
  export FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN
  export FIREBASE_DATABASE_URL=$FIREBASE_DATABASE_URL
  export FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID
  export FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET
  export FIREBASE_MESSAGING_SENDER_ID=$FIREBASE_MESSAGING_SENDER_ID
  export FIREBASE_APP_ID=$FIREBASE_APP_ID
  export FIREBASE_TOKEN=$FIREBASE_TOKEN
else
  export FIREBASE_API_KEY="${FIREBASE_API_KEY}"
  export FIREBASE_AUTH_DOMAIN="${FIREBASE_AUTH_DOMAIN}"
  export FIREBASE_DATABASE_URL="${FIREBASE_DATABASE_URL}"
  export FIREBASE_PROJECT_ID="${FIREBASE_PROJECT_ID}"
  export FIREBASE_STORAGE_BUCKET="${FIREBASE_STORAGE_BUCKET}"
  export FIREBASE_MESSAGING_SENDER_ID="${FIREBASE_MESSAGING_SENDER_ID}"
  export FIREBASE_APP_ID="${FIREBASE_APP_ID}"
  export FIREBASE_TOKEN="${FIREBASE_TOKEN}"
fi

make build
npm run serve --token="${FIREBASE_TOKEN}"
