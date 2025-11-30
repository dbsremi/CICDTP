#!/bin/bash
set -e

# Créer le répertoire logs si n'existe pas
mkdir -p /var/logs/crud

echo "Démarrage de Node.js..."
# Logs vers stdout (Cloud Run) + fichier (Fluent Bit)
node index.js 2>&1 | tee /var/logs/crud/app.log &

echo "Démarrage de Nginx..."
nginx -g "daemon off;"
