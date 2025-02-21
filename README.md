# Kurama API

Um servidor básico de API para fazer o backend de uma aplicação específica.

Além disso, gerencia as models, migrations.

## Contexto do projeto

Estou no momento sem contrato profissional relevante, então para ocupar o tempo aceitei em fazer um app por um preço modesto para uma amiga, em troca posso praticar nodejs / react / flutter (como um cara que veio do php, gostaria de codar mais nestas tecnologias) e manter o copyright do código.

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
