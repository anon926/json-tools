package handler

import (
	"github.com/anon926/json-tools/utils"
)

type MultiLevelJsonHandler struct {
	CommonHandler
}

func init() {
	register(NewMultiLevelJsonHandler())
}

func NewMultiLevelJsonHandler() *MultiLevelJsonHandler {
	h := MultiLevelJsonHandler{}
	h.name = "MultiLevelJsonHandler"
	h.prefix = "mlj"
	h.exports = []*ExportMeta{
		{Name: "ParseOnce", Exp: h.ParseOnce},
		{Name: "RecursiveParse", Exp: h.RecursiveParse},
	}
	return &h
}

func (h MultiLevelJsonHandler) ParseOnce(text string) (rst any) {
	err := utils.UnmarshalString(text, &rst)
	if err != nil {
		rst = text
	}
	return
}

func (h MultiLevelJsonHandler) RecursiveParse(text string) (rst any) {
	rst = recursiveParseJson(text, 0)
	return
}

func recursiveParseJson(input any, level int) any {
	if input == nil || level > RecursiveParseMaxLevel {
		return input
	}

	switch inType := input.(type) {
	case string:
		var val any
		err := utils.UnmarshalString(inType, &val)
		if err != nil {
			return inType
		}
		return recursiveParseJson(val, level+1)
	case int64:
		return inType
	case float64:
		return inType
	case bool:
		return inType
	case []any:
		for i, item := range inType {
			inType[i] = recursiveParseJson(item, level)
		}
		return inType
	case map[string]any:
		for k, item := range inType {
			inType[k] = recursiveParseJson(item, level)
		}
		return inType
	default:
		return inType
	}
}
