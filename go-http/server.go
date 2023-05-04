package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
	"runtime"
)

func main() {
	fmt.Println("Version:", runtime.Version())
	fmt.Println("NumCPU:", runtime.NumCPU())
	fmt.Println("GOMAXPROCS:", runtime.GOMAXPROCS(0))

	fmt.Println("Listening on port 3011")
	err := http.ListenAndServe(":3011", http.HandlerFunc(handler))
	fmt.Println(err)
}

func handler(w http.ResponseWriter, r *http.Request) {
	s, _ := ioutil.ReadAll(r.Body)  // read the body
	fmt.Fprintf(w, "%s", s)        // print the body to the client
}