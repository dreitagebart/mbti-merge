FROM node:20-alpine AS base

# set working directory for base stage
WORKDIR /app

FROM base AS builder
# some basic installation steps for alpine image
# check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# install turbo globally
RUN yarn global add turbo

# copy all files 
COPY . .

# prune the monorepo for building up the container
RUN turbo prune @mbti/playground --docker

# add lockfile and package.json's of isolated subworkspace
FROM base AS installer

# some basic installation steps for alpine image
RUN apk add --no-cache libc6-compat
RUN apk update

# copy all necessary files for this stage
# and install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn turbo build --filter=@mbti/playground^...

FROM base AS runner

# security: don't run all that stuff as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 mbti
USER mbti

COPY --from=installer /app/apps/playground/next.config.js .
COPY --from=installer /app/apps/playground/package.json .

# some steps for reducing image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=mbti:nodejs /app/apps/playground/.next/standalone ./
COPY --from=installer --chown=mbti:nodejs /app/apps/playground/.next/static ./apps/playground/.next/static
COPY --from=installer --chown=mbti:nodejs /app/apps/playground/public ./apps/playground/public

CMD node apps/playground/server.js
