package handler

import (
	"testing"
)

func TestMultiLayerJsonHandler(t *testing.T) {
	h := MultiLayerJsonHandler{}
	h.name = "123"
	n := h.GetName()
	t.Log(n)
}
