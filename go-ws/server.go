package main

import (
 	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)
 
var upgrader = websocket.Upgrader{} // use default options

func echo(w http.ResponseWriter, r *http.Request) {
	// fmt.Println("echo")
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Print("upgrade:", err)
		return
	}
	// fmt.Println("upgraded")
	defer c.Close()
	for {
		mt, message, err := c.ReadMessage()
		if err != nil {
			// fmt.Println("read:", err)
			break
		}
		// fmt.Printf("recv: %s", message)
		err = c.WriteMessage(mt, message)
		if err != nil {
			fmt.Println("write:", err)
			break
		}
	}
}

func main() {
	fmt.Println("Listening on port 3022")
 	err := http.ListenAndServe(":3022", http.HandlerFunc(echo))
	fmt.Println(err)
}