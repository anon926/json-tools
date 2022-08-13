package handler

import (
	"fmt"
	"log"

	"github.com/anon926/json-tools/utils"
)

type MultiLayerJsonHandler struct {
	CommonHandler
}

func init() {
	register(NewMultiLayerJsonHandler())
}

func NewMultiLayerJsonHandler() *MultiLayerJsonHandler {
	h := MultiLayerJsonHandler{}
	h.name = "MultiLayerJsonHandler"
	h.prefix = "mlj"
	h.exports = []*ExportMeta{
		{Name: "ParseOnce", Exp: h.ParseOnce},
		{Name: "RecursiveParse", Exp: h.RecursiveParse},
	}
	return &h
}

func (h MultiLayerJsonHandler) ParseOnce(text string) (rst map[string]interface{}, err error) {
	err = utils.UnmarshalString(text, &rst)
	if err != nil {
		log.Println(err)
		return nil, fmt.Errorf("json parse err: %w", err)
	}
	return
}

func (h MultiLayerJsonHandler) RecursiveParse(text string) (rst map[string]interface{}, err error) {
	err = utils.UnmarshalString(text, &rst)
	if err != nil {
		log.Println(err)
		return nil, fmt.Errorf("json parse err: %w", err)
	}
	return
}
