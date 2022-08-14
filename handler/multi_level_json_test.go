package handler

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

var mljHandler = NewMultiLevelJsonHandler()

func TestMultiLevelJsonHandler_RecursiveParse_Basic(t *testing.T) {
	var rst any
	rst = mljHandler.RecursiveParse("")
	assert.Equal(t, "", rst)

	rst = mljHandler.RecursiveParse("\"abc\"")
	assert.Equal(t, "abc", rst)

	rst = mljHandler.RecursiveParse("\"123.4\"")
	assert.Equal(t, "123.4", rst)

	rst = mljHandler.RecursiveParse("123")
	assert.Equal(t, "123", rst)

	rst = mljHandler.RecursiveParse("123.456")
	assert.Equal(t, "123.456", rst)

	rst = mljHandler.RecursiveParse("9111172036812345678")
	assert.Equal(t, "9111172036812345678", rst)

	rst = mljHandler.RecursiveParse("true")
	assert.Equal(t, "true", rst)

	rst = mljHandler.RecursiveParse("null")
	assert.Equal(t, "null", rst)
}

func TestMultiLevelJsonHandler_RecursiveParse_Array(t *testing.T) {
	var rst any
	rst = mljHandler.RecursiveParse("[1,2.2,null,true,\"q\"]")
	assert.Equal(t, []interface{}{int64(1), 2.2, nil, true, "q"}, rst)

	rst = mljHandler.RecursiveParse("\"\\\"\\\\\\\"[1,2.2,null,true,\\\\\\\\\\\\\\\"q\\\\\\\\\\\\\\\"]\\\\\\\"\\\"\"")
	assert.Equal(t, []interface{}{int64(1), 2.2, nil, true, "q"}, rst)

	j := `
		[
			1,
			2.2,
			null,
			true,
			"q",
			"123.456",
			[
				1.1,
				"q",
				true,
				[
					3.3
				],
				{
					"a": "z"
				}
			],
			{
				"a": 1,
				"b": 2.2,
				"c": null,
				"d": false,
				"e": "e",
				"f":
				[
					2.2
				],
				"g":
				{
					"a": false,
					"b": "{\"a\":3.3}"
				}
			}
		]
	`
	exp := []interface{}{
		int64(1), 2.2, nil, true, "q", "123.456",
		[]interface{}{
			1.1, "q", true, []interface{}{3.3}, map[string]interface{}{"a": "z"},
		},
		map[string]interface{}{
			"a": int64(1), "b": 2.2, "c": nil, "d": false, "e": "e", "f": []interface{}{2.2},
			"g": map[string]interface{}{
				"a": false,
				"b": map[string]interface{}{
					"a": 3.3,
				},
			},
		},
	}
	rst = mljHandler.RecursiveParse(j)
	assert.Equal(t, exp, rst)

	j = `
		[
			{
				"a": {
					"b": "[1.1,\"abc\",[2.2,\"bcd\",\"[2.2,\\\"bcd\\\"]\"]]",
					"c": "[true,\"[{\\\"a\\\":{\\\"b\\\":\\\"[1.1,\\\\\\\"abc\\\\\\\",[2.2,\\\\\\\"bcd\\\\\\\",\\\\\\\"[2.2,\\\\\\\\\\\\\\\"bcd\\\\\\\\\\\\\\\"]\\\\\\\"]]\\\"}}]\"]"
				}
			}
		]
	`
	exp = []interface{}{
		map[string]interface{}{
			"a": map[string]interface{}{
				"b": []interface{}{
					1.1, "abc",
					[]interface{}{
						2.2, "bcd",
						[]interface{}{2.2, "bcd"},
					},
				},
				"c": []interface{}{
					true,
					[]interface{}{
						map[string]interface{}{
							"a": map[string]interface{}{
								"b": []interface{}{
									1.1, "abc",
									[]interface{}{
										2.2, "bcd",
										[]interface{}{2.2, "bcd"},
									},
								},
							},
						},
					},
				},
			},
		},
	}
	rst = mljHandler.RecursiveParse(j)
	assert.Equal(t, exp, rst)
}
