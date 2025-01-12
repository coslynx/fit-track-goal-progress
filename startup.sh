#!/bin/bash
set -euo pipefail

PROJECT_ROOT=$(pwd)
LOG_FILE="$PROJECT_ROOT/startup.log"
PID_FILE="$PROJECT_ROOT/server.pid"
FRONTEND_PID_FILE="$PROJECT_ROOT/frontend.pid"
NODE_ENV="${NODE_ENV:-development}"
export NODE_ENV
DEFAULT_MONGO_URI="mongodb://localhost:27017/fitness_tracker"
DEFAULT_JWT_SECRET="your_jwt_secret"
DEFAULT_PORT="5000"
DEFAULT_CLIENT_URL="http://localhost:3000"
export MONGO_URI
export JWT_SECRET
export PORT
export CLIENT_URL

if [ -f "$PROJECT_ROOT/.env" ]; then
  source "$PROJECT_ROOT/.env"
  if [ -z "$MONGO_URI" ]; then
    MONGO_URI="$DEFAULT_MONGO_URI"
  fi
   if [ -z "$JWT_SECRET" ]; then
    JWT_SECRET="$DEFAULT_JWT_SECRET"
  fi
  if [ -z "$PORT" ]; then
   PORT="$DEFAULT_PORT"
  fi
  if [ -z "$CLIENT_URL" ]; then
   CLIENT_URL="$DEFAULT_CLIENT_URL"
  fi
  export MONGO_URI
  export JWT_SECRET
  export PORT
  export CLIENT_URL
  echo "$(date '+%Y-%m-%d %H:%M:%S') INFO: Loaded environment variables from .env" >> "$LOG_FILE"
else
  MONGO_URI="$DEFAULT_MONGO_URI"
  JWT_SECRET="$DEFAULT_JWT_SECRET"
  PORT="$DEFAULT_PORT"
  CLIENT_URL="$DEFAULT_CLIENT_URL"
  export MONGO_URI
  export JWT_SECRET
  export PORT
  export CLIENT_URL
  echo "$(date '+%Y-%m-%d %H:%M:%S') INFO: .env file not found, using default environment variables" >> "$LOG_FILE"
fi
if [ -z "$NODE_ENV" ]; then
   NODE_ENV="development"
   export NODE_ENV
   echo "$(date '+%Y-%m-%d %H:%M:%S') INFO: NODE_ENV variable not set, using default development mode" >> "$LOG_FILE"
fi
log_info() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') INFO: $1" >> "$LOG_FILE"
}
log_error() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') ERROR: $1" >&2
  echo "$(date '+%Y-%m-%d %H:%M:%S') ERROR: $1" >> "$LOG_FILE"
}
cleanup() {
  log_info "Cleaning up..."
  if [ -f "$PID_FILE" ]; then
    kill "$(cat "$PID_FILE")" 2>/dev/null
    rm "$PID_FILE"
    log_info "Backend process stopped."
  fi
  if [ -f "$FRONTEND_PID_FILE" ]; then
     kill "$(cat "$FRONTEND_PID_FILE")" 2>/dev/null
     rm "$FRONTEND_PID_FILE"
     log_info "Frontend process stopped"
  fi
  log_info "Cleanup completed."
}

check_dependencies(){
    if ! command -v npm &> /dev/null
    then
        log_error "npm is not installed. Aborting."
       exit 1
    fi
}
check_port(){
   local port=$1
   if  netstat -tuln | awk '{print $4}' | grep -q ":${port}\$"; then
       log_error "Port ${port} is already in use. Aborting"
       exit 1
   fi
}
start_backend() {
    log_info "Starting backend server..."
    which npm
    npm run dev > "$LOG_FILE" 2>&1 &
    BACKEND_PID=$!
     echo "$BACKEND_PID" > "$PID_FILE"
    log_info "Backend server started with PID $BACKEND_PID on port $PORT"
}
start_frontend(){
     log_info "Starting frontend server..."
     which npm
      cd client
     npm start > "$LOG_FILE" 2>&1 &
     FRONTEND_PID=$!
      echo "$FRONTEND_PID" > "$FRONTEND_PID_FILE"
     log_info "Frontend server started with PID $FRONTEND_PID on port 3000"
      cd ..
}
trap cleanup EXIT ERR INT TERM

check_dependencies
check_port "$PORT"
start_backend
start_frontend

log_info "Application startup completed"
echo "Backend running on port: $PORT"
echo "Frontend running on: http://localhost:3000"