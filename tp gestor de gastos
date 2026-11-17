import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';

// Importamos el módulo creado
import ResumenFinanciero, { CATEGORIAS_DISPONIBLES } from './ResumenFinanciero';

export default function App() {
  const [gastos, setGastos] = useState([
    { id: '1', descripcion: 'Supermercado', monto: 15000, categoria: 'Alimentación' },
    { id: '2', descripcion: 'Nafta', monto: 20000, categoria: 'Transporte' },
    { id: '3', descripcion: 'Café', monto: 3500, categoria: 'Alimentación' }
  ]);

  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(CATEGORIAS_DISPONIBLES[0]);
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');

  const handleAgregarGasto = () => {
    const descripcionLimpia = descripcion.trim();
    const montoNumerico = parseFloat(monto.replace(',', '.'));

    if (!descripcionLimpia) {
      Alert.alert('Validación', 'Por favor, ingrese una descripción válida para el gasto.');
      return;
    }

    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      Alert.alert('Validación', 'Por favor, ingrese un monto numérico mayor a cero.');
      return;
    }

    const nuevoGasto = {
      id: Date.now().toString(),
      descripcion: descripcionLimpia,
      monto: montoNumerico,
      categoria: categoriaSeleccionada
    };

    setGastos((prevGastos) => [nuevoGasto, ...prevGastos]);
    setDescripcion('');
    setMonto('');
  };

  const handleEliminarGasto = (id) => {
    setGastos((prevGastos) => prevGastos.filter((gasto) => gasto.id !== id));
  };

  const gastosFiltrados = filtroCategoria === 'Todas'
    ? gastos
    : gastos.filter((item) => item.categoria === filtroCategoria);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Encabezado Principal */}
        <View style={styles.header}>
          <Text style={styles.tituloApp}>Gestor de Gastos Personales</Text>
          <Text style={styles.subtituloApp}>Control de finanzas e interactividad</Text>
        </View>

        {/* Módulo Importado de Resumen Financiero */}
        <ResumenFinanciero gastos={gastos} />

        {/* Desglose de Gastos por Categoría */}
        <View style={styles.seccionCard}>
          <Text style={styles.tituloSeccion}>Distribución por Categoría</Text>
          {CATEGORIAS_DISPONIBLES.map((cat) => {
            const subtotal = gastos
              .filter((g) => g.categoria === cat)
              .reduce((acc, curr) => acc + curr.monto, 0);
            return (
              <View key={cat} style={styles.filaCategoria}>
                <Text style={styles.textoCategoriaNombre}>{cat}</Text>
                <Text style={styles.textoCategoriaMonto}>${subtotal.toLocaleString('es-AR')}</Text>
              </View>
            );
          })}
        </View>

        {/* Formulario de Entrada de Datos */}
        <View style={styles.seccionCard}>
          <Text style={styles.tituloSeccion}>Registrar Nuevo Gasto</Text>
          <Text style={styles.labelInput}>Descripción</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Supermercado, Alquiler..."
            placeholderTextColor="#9ca3af"
            value={descripcion}
            onChangeText={setDescripcion}
          />
          <Text style={styles.labelInput}>Monto ($)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 15000"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
            value={monto}
            onChangeText={setMonto}
          />
          <Text style={styles.labelInput}>Seleccionar Categoría</Text>
          <View style={styles.contenedorSelectores}>
            {CATEGORIAS_DISPONIBLES.map((cat) => {
              const estaSeleccionada = categoriaSeleccionada === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.chipBoton,
                    estaSeleccionada && styles.chipBotonActivo
                  ]}
                  onPress={() => setCategoriaSeleccionada(cat)}
                >
                  <Text
                    style={[
                      styles.chipTexto,
                      estaSeleccionada && styles.chipTextoActivo
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity style={styles.botonSubmit} onPress={handleAgregarGasto}>
            <Text style={styles.botonSubmitTexto}>Agregar Gasto</Text>
          </TouchableOpacity>
        </View>

        {/* Barra de Filtro de Categoría */}
        <View style={styles.seccionFiltro}>
          <Text style={styles.tituloSeccion}>Filtrar Gastos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollFiltros}>
            {['Todas', ...CATEGORIAS_DISPONIBLES].map((cat) => {
              const activo = filtroCategoria === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.botonFiltro, activo && styles.botonFiltroActivo]}
                  onPress={() => setFiltroCategoria(cat)}
                >
                  <Text style={[styles.textoFiltro, activo && styles.textoFiltroActivo]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Lista de Registros */}
        <View style={styles.seccionLista}>
          <Text style={styles.tituloSeccion}>
            Historial de Gastos ({gastosFiltrados.length})
          </Text>
          {gastosFiltrados.length === 0 ? (
            <View style={styles.contenedorVacio}>
              <Text style={styles.textoVacio}>No existen gastos asociados a este criterio.</Text>
            </View>
          ) : (
            gastosFiltrados.map((item) => (
              <View key={item.id} style={styles.itemGasto}>
                <View style={styles.infoGasto}>
                  <Text style={styles.descripcionGasto}>{item.descripcion}</Text>
                  <Text style={styles.categoriaGasto}>{item.categoria}</Text>
                </View>
                <View style={styles.accionesGasto}>
                  <Text style={styles.montoGasto}>
                    ${item.monto.toLocaleString('es-AR')}
                  </Text>
                  <TouchableOpacity
                    style={styles.botonEliminar}
                    onPress={() => handleEliminarGasto(item.id)}
                  >
                    <Text style={styles.textoEliminar}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6'
  },
  container: {
    padding: 16,
    paddingBottom: 40
  },
  header: {
    marginBottom: 20,
    alignItems: 'center'
  },
  tituloApp: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827'
  },
  subtituloApp: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4
  },
  seccionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12
  },
  filaCategoria: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  textoCategoriaNombre: {
    fontSize: 14,
    color: '#4b5563'
  },
  textoCategoriaMonto: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827'
  },
  labelInput: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    marginTop: 6
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#111827',
    marginBottom: 10
  },
  contenedorSelectores: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8
  },
  chipBoton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    marginBottom: 6,
    marginRight: 6
  },
  chipBotonActivo: {
    backgroundColor: '#2563eb'
  },
  chipTexto: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500'
  },
  chipTextoActivo: {
    color: '#ffffff',
    fontWeight: '700'
  },
  botonSubmit: {
    backgroundColor: '#059669',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6
  },
  botonSubmitTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  seccionFiltro: {
    marginBottom: 16
  },
  scrollFiltros: {
    flexDirection: 'row',
    marginTop: 4
  },
  botonFiltro: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  botonFiltroActivo: {
    backgroundColor: '#1f2937',
    borderColor: '#1f2937'
  },
  textoFiltro: {
    fontSize: 13,
    color: '#4b5563',
    fontWeight: '500'
  },
  textoFiltroActivo: {
    color: '#ffffff',
    fontWeight: 'bold'
  },
  seccionLista: {
    marginBottom: 20
  },
  itemGasto: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1
  },
  infoGasto: {
    flex: 1
  },
  descripcionGasto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827'
  },
  categoriaGasto: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2
  },
  accionesGasto: {
    alignItems: 'flex-end'
  },
  montoGasto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6
  },
  botonEliminar: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },
  textoEliminar: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '600'
  },
  contenedorVacio: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 24,
    alignItems: 'center'
  },
  textoVacio: {
    color: '#9ca3af',
    fontSize: 14,
    fontStyle: 'italic'
  }
});
