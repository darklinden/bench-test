#!/bin/bash

echo "Cleanup go-http"
rm -rf server

echo "Running go-http"
go mod tidy

echo "Building go-http"
go build -o server.bin server.go

echo "Running go-http"
./server.bin
