FROM rust:1.75 as builder

# Install wasm target
RUN rustup target add wasm32-wasi

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Build all components
RUN cargo build --release --all

# Build web interface
FROM node:18 as web-builder
WORKDIR /app/web
COPY web/package*.json ./
RUN npm install
COPY web/ .
RUN npm run build

# Final runtime image
FROM ubuntu:22.04

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy binaries
COPY --from=builder /app/target/release/stylus /usr/local/bin/
COPY --from=web-builder /app/web/build /var/www/html

# Create non-root user
RUN useradd -m -u 1000 stylus
USER stylus

EXPOSE 3000 8080

CMD ["stylus", "--help"]