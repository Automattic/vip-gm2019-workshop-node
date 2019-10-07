# WordPress with datadog
FROM wordpress:latest

COPY datadog-php-tracer_0.32.0_amd64.deb /src/ddtrace/
RUN dpkg -i /src/ddtrace/datadog-php-tracer_0.32.0_amd64.deb
