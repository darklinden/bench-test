# Benchmarks

## HTTP

* Start Service

    `docker compose -f docker-compose-http.yml up`

* Run Benchmark

  * Benchmark of go service

    `k6 run k6-http-go.js`

  * Benchmark of node service

    `k6 run k6-http-node.js`

## Websocket

* Start Service
  > Note: The nodejs websocket service can not use cluster mode, so it will only start one instance.

    `docker compose -f docker-compose-ws.yml up`

* Run Benchmark

  * Benchmark of go service

    `k6 run k6-ws-go.js`

  * Benchmark of node service

    `k6 run k6-ws-node.js`
