FROM python:3.12-slim AS build

WORKDIR /app

COPY docs/ ./docs/

RUN pip install --no-cache-dir zensical
RUN cd docs && zensical build --clean

FROM nginx:1.27-alpine
COPY --from=build /app/docs/site /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]