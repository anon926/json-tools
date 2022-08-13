package handler

type Exporter interface {
	GetName() string
	GetPrefix() string
	GetExports() []*ExportMeta
}

var registeredExporter = make(map[string]Exporter)

func register(exp Exporter) {
	if exp == nil {
		return
	}
	name := exp.GetName()
	registeredExporter[name] = exp
}

// GetAllExporter get all registered exporter
func GetAllExporter() map[string]Exporter {
	return registeredExporter
}

// GetExporter get registered exporter by key
func GetExporter(key string) Exporter {
	return registeredExporter[key]
}

type CommonHandler struct {
	name    string
	prefix  string
	exports []*ExportMeta
}

func (h *CommonHandler) GetName() string {
	return h.name
}

func (h *CommonHandler) GetPrefix() string {
	return h.prefix
}

func (h *CommonHandler) GetExports() []*ExportMeta {
	return h.exports
}
