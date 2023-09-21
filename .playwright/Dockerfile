FROM mcr.microsoft.com/playwright:v1.36.0-jammy

RUN \
  apt update -y && \
  apt upgrade -y && \
  # Install requirements for Shopify CLI
  apt install -y curl gcc g++ make && \
  apt install -y ruby-full && \
  apt install -y ruby-dev && \
  apt install -y git && \
  gem install bundler && \
  # Install Shopify CLI
  npm install -g @shopify/cli @shopify/theme && \
  # Install required browsers for Playwright
  npx playwright install --with-deps chrome
