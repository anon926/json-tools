package main

import (
	"embed"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"

	"github.com/anon926/lorca"

	"github.com/anon926/json-tools/handler"
)

//go:embed ui/build
var fs embed.FS

func main() {
	// Create UI with basic HTML passed via data URI
	ui, err := lorca.New("", "", 1024, 768)
	if err != nil {
		log.Fatal(err)
	}
	defer func(ui lorca.UI) {
		_ = ui.Close()
	}(ui)

	// Bind All Handlers
	err = bindHandler(ui)
	if err != nil {
		log.Fatal(err)
	}

	// Load HTML
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		log.Fatal(err)
	}
	defer func(ln net.Listener) {
		_ = ln.Close()
	}(ln)
	go func() {
		err := http.Serve(ln, http.FileServer(http.FS(fs)))
		if err != nil {
			log.Fatal(err)
		}
	}()
	err = ui.Load(fmt.Sprintf("http://%s/ui/build", ln.Addr()))
	if err != nil {
		log.Fatal(err)
	}

	// Wait until the interrupt signal arrives or browser window is closed
	signalChan := make(chan os.Signal)
	signal.Notify(signalChan, os.Interrupt)
	select {
	case <-signalChan:
	case <-ui.Done():
	}

	log.Println("exiting...")
}

func bindHandler(ui lorca.UI) error {
	exporters := handler.GetAllExporter()
	for _, exp := range exporters {
		expName := exp.GetName()
		prefix := exp.GetPrefix()
		for _, meta := range exp.GetExports() {
			err := ui.Bind(prefix+meta.Name, meta.Exp)
			if err != nil {
				return fmt.Errorf("ui bind error, handler:%s, name:%s, err: %w", expName, meta.Name, err)
			}
		}
	}
	return nil
}
