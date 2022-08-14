package utils

import (
	"reflect"
	"testing"

	"github.com/stretchr/testify/assert"
)

const jsonCase1 = "{\"key1\":9111172036812345678,\"key2\":123.456}"

var jsonCase2 = map[string]any{
	"zz":  1,
	"foo": 2,
	"abc": 3,
}

func TestMarshal(t *testing.T) {
	v, err := Marshal(jsonCase2)
	assert.Nil(t, err)
	assert.Equal(t, "{\"abc\":3,\"foo\":2,\"zz\":1}", string(v))
}

func TestMarshalString(t *testing.T) {
	v, err := MarshalString(jsonCase2)
	assert.Nil(t, err)
	assert.Equal(t, "{\"abc\":3,\"foo\":2,\"zz\":1}", v)
}

func TestDumpStr(t *testing.T) {
	v := DumpStr(jsonCase2)
	assert.Equal(t, "{\"abc\":3,\"foo\":2,\"zz\":1}", v)
}

func TestUnmarshal(t *testing.T) {
	var r any
	_ = Unmarshal([]byte(jsonCase1), &r)
	assert.Equal(t, int64(9111172036812345678), r.(map[string]any)["key1"])
	assert.Equal(t, 123.456, r.(map[string]any)["key2"])
}

func TestUnmarshalString(t *testing.T) {
	var r any
	_ = UnmarshalString(jsonCase1, &r)
	assert.Equal(t, int64(9111172036812345678), r.(map[string]any)["key1"])
	assert.Equal(t, 123.456, r.(map[string]any)["key2"])
}

func TestUnmarshalStringErr(t *testing.T) {
	var r any
	err := UnmarshalString("[\"a1\",\"a2\"][\"b1\"]", &r)
	assert.NotNil(t, err)
}

func TestUnmarshalType(t *testing.T) {
	ty := func(buf string) string {
		var v any
		_ = UnmarshalString(buf, &v)
		if v == nil {
			return "nil"
		}
		return reflect.TypeOf(v).Kind().String()
	}

	tests := []struct {
		name string
		args string
		want string
	}{
		{
			name: "string",
			args: "\"str\"",
			want: "string",
		},
		{
			name: "int64",
			args: "123",
			want: "int64",
		},
		{
			name: "float64",
			args: "123.456",
			want: "float64",
		},
		{
			name: "bool",
			args: "true",
			want: "bool",
		},
		{
			name: "null",
			args: "null",
			want: "nil",
		},
		{
			name: "array",
			args: "[1,2,3]",
			want: "slice",
		},
		{
			name: "object",
			args: "{\"key1\":123}",
			want: "map",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equalf(t, tt.want, ty(tt.args), "UnmarshalType(%v)", tt.args)
		})
	}
}
