#!/bin/bash

#
# Add VIP Config to WP Config
#
UPDATE_SEARCH="Happy publishing.*$"
VIP_CODE="\nif \( file_exists\( __DIR__ . '/wp-content/vip-config/vip-config.php' \) \) {\n\
    require_once\( __DIR__ . '/wp-content/vip-config/vip-config.php' \);\n\
}"
sed -i "s|$UPDATE_SEARCH|\0$VIP_CODE|g" /var/www/html/wp-config.php
