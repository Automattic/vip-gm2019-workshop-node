# Using WordPress official image
FROM wordpress:latest

ARG DD_TRACE_VERSION=0.27.2

# Install DDTrace deb
ADD https://github.com/DataDog/dd-trace-php/releases/download/${DD_TRACE_VERSION}/datadog-php-tracer_${DD_TRACE_VERSION}_amd64.deb datadog-php-tracer.deb
RUN dpkg -i datadog-php-tracer.deb


# Set the working directory to /app
#WORKDIR /app

#COPY ./patches.sh /app/

# Update the config.php file
# RUN /bin/bash /app/patches.sh
