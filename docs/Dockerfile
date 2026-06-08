FROM python:3.12-slim AS build

WORKDIR /app

COPY mkdocs.yml zensical.toml zensical.json ./
COPY . ./docs

RUN pip install --no-cache-dir zensical
RUN zensical build --clean

FROM nginx:1.27-alpine

COPY --from=build /app/site /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]