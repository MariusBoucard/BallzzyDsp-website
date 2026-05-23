docker compose -f docker-compose.prod.yml --build
docker tag ballzzy-website-strapi marius44/ballzzydsp-website-strapi:latest
docker tag ballzzy-website-frontend marius44/ballzzydsp-website-frontend:latest
docker push  marius44/ballzzydsp-website-strapi:latest
docker push  marius44/ballzzydsp-website-frontend:latest