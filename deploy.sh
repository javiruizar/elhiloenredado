#!/bin/bash

# Configuración de variables
IMAGE_NAME="elhiloenredado-web"
VERSION=$1 
DEPLOY_DIR="artifact"
# Definimos el nombre del archivo tar con la versión para evitar confusiones
TAR_FILENAME="$IMAGE_NAME-$VERSION.tar"
TAR_PATH="$DEPLOY_DIR/$TAR_FILENAME"

if [ -z "$VERSION" ]; then
  echo "Error: Debes proporcionar una versión. Ejemplo: ./deploy.sh 1.0.0"
  exit 1
fi

echo "1. Limpiando y preparando directorio de despliegue para v$VERSION..."
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

echo "2. Compilando la imagen de Docker..."
# Etiquetamos con la versión específica
docker build -t $IMAGE_NAME:$VERSION .

echo "3. Exportando la imagen a archivo .tar..."
docker save -o $TAR_PATH $IMAGE_NAME:$VERSION

echo "4. Copiando archivos de configuración..."
cp docker-compose.yml $DEPLOY_DIR/
cp env/pro/.env $DEPLOY_DIR/.env

# Guardamos la versión en un archivo de texto para que el NAS la lea
echo "$VERSION" > $DEPLOY_DIR/VERSION

echo "5. Creando script de ejecución remota (run.sh)..."

echo '#!/bin/bash' > $DEPLOY_DIR/run.sh
echo 'VERSION=$(cat VERSION)' >> $DEPLOY_DIR/run.sh
echo 'IMAGE_FULL_NAME="'$IMAGE_NAME':$VERSION"' >> $DEPLOY_DIR/run.sh
echo 'echo "Comprobando si la versión $VERSION ya existe en el NAS..."' >> $DEPLOY_DIR/run.sh
echo 'if ! docker image inspect "$IMAGE_FULL_NAME" > /dev/null 2>&1; then' >> $DEPLOY_DIR/run.sh
echo '    echo "Versión nueva detectada. Importando imagen..."' >> $DEPLOY_DIR/run.sh
echo '    docker load -i "'$TAR_FILENAME'"' >> $DEPLOY_DIR/run.sh
echo 'else' >> $DEPLOY_DIR/run.sh
echo '    echo "La versión $VERSION ya está instalada. Saltando carga de imagen."' >> $DEPLOY_DIR/run.sh
echo 'fi' >> $DEPLOY_DIR/run.sh
echo 'echo "Creando directorios en el NAS..."' >> $DEPLOY_DIR/run.sh
echo 'mkdir -p /home/javi/web-projects/elhiloenredado/public/product' >> $DEPLOY_DIR/run.sh
echo 'echo "Reiniciando contenedores con versión $VERSION..."' >> $DEPLOY_DIR/run.sh
echo 'export IMAGE_TAG=$VERSION' >> $DEPLOY_DIR/run.sh
echo 'docker compose down' >> $DEPLOY_DIR/run.sh
echo 'docker compose up -d' >> $DEPLOY_DIR/run.sh
echo 'echo "Esperando 10 segundos a que la base de datos PostgreSQL arranque por completo..."' >> $DEPLOY_DIR/run.sh
echo 'sleep 10' >> $DEPLOY_DIR/run.sh
echo 'echo "Ejecutando sincronización de base de datos..."' >> $DEPLOY_DIR/run.sh
echo 'docker exec elhiloenredado-web npx -y prisma@5.22.0 db push --skip-generate' >> $DEPLOY_DIR/run.sh
echo 'echo "------------------------------------------------"' >> $DEPLOY_DIR/run.sh
echo 'echo "¡Despliegue de la v$VERSION completado con éxito en el puerto 3002!"' >> $DEPLOY_DIR/run.sh

# Dar permisos de ejecución al run.sh generado
chmod +x $DEPLOY_DIR/run.sh

echo "6. Sincronizando con el servidor (NAS)..."
# Copiamos la carpeta artifact al NAS usando rsync
rsync -avz $DEPLOY_DIR/ minipc:web-projects/elhiloenredado/

# Sincronizamos también las imágenes iniciales para que el volumen no esté vacío
rsync -avz public/product/ minipc:web-projects/elhiloenredado/public/product/

echo "================================================"
echo "PROCESO FINALIZADO"
echo "Ejecuta ./run.sh en tu NAS (dentro de web-projects/elhiloenredado/)"
echo "================================================"
