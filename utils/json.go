package utils

import (
	"github.com/bytedance/sonic"
)

func Marshal(val any) ([]byte, error) {
	ret, err := sonic.Marshal(val)
	return ret, err
}

func MarshalString(val any) (string, error) {
	ret, err := sonic.MarshalString(val)
	return ret, err
}

func DumpStr(val any) string {
	ret, err := sonic.MarshalString(val)
	if err != nil {
		return ""
	}
	return ret
}

func Unmarshal(buf []byte, val any) error {
	err := sonic.Unmarshal(buf, val)
	return err
}

func UnmarshalString(buf string, val any) error {
	err := sonic.UnmarshalString(buf, val)
	return err
}
