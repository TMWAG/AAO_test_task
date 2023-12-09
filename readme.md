# Тестовое задание для ИП - Агатов Александр Олегович

## Примечания

  * Бесплатные версии API бирж не предоставляют доступ к историческим данным, поэтому для работы сборщику надо поработать хотя бы 20 минут, чтобы собрать данные о курсе

  * Если nginx выдаёт ошибку при dev разработке, то это проблема Nuxt, надо перезапустить контейнер `client` командой

  ```bash
  docker restart client
  ``` 

  или пересоздать сеть 

  ```bash
  docker compose -f docker-compose.dev.yml down --remove-orphans
  docker compose -f docker-compose.dev.yml up -d
  ```

  * Если страница не загружается надо перезапустить nginx командой

  ```bash
  docker restart proxy_nx
  ```

  * Работает на стандартном localhost



## Запуск

### Development 

``` bash 
cd AAO_test_task
docker compose -f docker-compose.dev.yml up -d
```

### Production 

``` bash
cd AAO_test_task
docker compose -f docker-compose.yml up -d
```


