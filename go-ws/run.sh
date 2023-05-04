#!/bin/bash

echo "Cleanup go-ws"
rm -rf server

echo "Running go-ws"
go mod tidy

echo "Building go-ws"
go build -o server.bin server.go

echo "Running go-ws"
./server.bin
