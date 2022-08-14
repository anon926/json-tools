package utils

import (
	"github.com/bytedance/sonic/decoder"
	"github.com/bytedance/sonic/encoder"
)

func Marshal(val any) ([]byte, error) {
	ret, err := encoder.Encode(val, encoder.SortMapKeys)
	return ret, err
}

func MarshalString(val any) (string, error) {
	ret, err := encoder.Encode(val, encoder.SortMapKeys)
	return Bytes2Str(ret), err
}

func DumpStr(val any) string {
	ret, err := encoder.Encode(val, encoder.SortMapKeys)
	if err != nil {
		return ""
	}
	return Bytes2Str(ret)
}

func Unmarshal(buf []byte, val any) error {
	return UnmarshalString(string(buf), val)
}

func UnmarshalString(buf string, val any) error {
	dc := decoder.NewDecoder(buf)
	dc.UseInt64()
	err := dc.Decode(val)
	if err != nil {
		return err
	}
	return checkTrailing(buf, dc.Pos())
}

const SpaceMask = (1 << ' ') | (1 << '\t') | (1 << '\r') | (1 << '\n')

func checkTrailing(buf string, pos int) error {
	// skip all the trailing spaces
	if pos != len(buf) {
		for pos < len(buf) && (SpaceMask&(1<<buf[pos])) != 0 {
			pos++
		}
	}
	// then it must be at EOF
	if pos == len(buf) {
		return nil
	}
	// junk after JSON value
	return decoder.SyntaxError{
		Src:  buf,
		Pos:  pos,
		Code: 2,
	}
}
