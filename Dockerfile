FROM node:18-alpine as builder
ARG env
ARG registry
WORKDIR /build-dir
COPY package.json .npmrc pnpm-workspace.yaml turbo.json ./
COPY apps/h5/package.json ./apps/h5/package.json
COPY apps/h5/scripts ./apps/h5/scripts
COPY packages/shared/package.json ./packages/shared/package.json
COPY patches ./patches
COPY resource ./resource
COPY scripts ./scripts
# RUN corepack enable && 
RUN npm install pnpm@8.1.0 -g --registry ${registry}&& pnpm install --registry ${registry}
COPY . .
RUN pnpm build:${env}


FROM node:18-alpine as runner
WORKDIR /app-h5
COPY --from=builder ./build-dir/apps/h5/.output/   /app-h5
EXPOSE 80
ENV PORT=80
ENV HOST=0.0.0.0

CMD ["sh", "-c", "node server/index.mjs"]