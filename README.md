# Kurama API

Um servidor básico de API para fazer o backend de uma aplicação específica.

Além disso, gerencia as models, migrations.

## Primeiro uso

```
yarn install
```

Para rodar as migrations, por enquanto, é necessário desativar temporariamente a diretiva type=module do package.json. Após isso:

```
yarn migrate
```

## Demais usos

```
docker-compose up -d
yarn dev
```

## License

© 2025 dcomp7. All rights reserved.
