import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Exportamos las constantes y funciones auxiliares desde el módulo
export const CATEGORIAS_DISPONIBLES = [
  'Alimentación',
  'Transporte',
  'Entretenimiento',
  'Salud',
  'Otros'
];

export const calcularMetricas = (gastos) => {
  const totalGastado = gastos.reduce((acumulado, item) => acumulado + item.monto, 0);
  const gastoMasAlto = gastos.length > 0
    ? gastos.reduce((max, item) => (item.monto > max.monto ? item : max), gastos[0])
    : null;

  return { totalGastado, gastoMasAlto };
};

// Componente visual modularizado
export default function ResumenFinanciero({ gastos }) {
  const { totalGastado, gastoMasAlto } = calcularMetricas(gastos);

  return (
    <View style={styles.cardResumen}>
      <Text style={styles.etiquetaResumen}>Total Gastado</Text>
      <Text style={styles.valorResumen}>${totalGastado.toLocaleString('es-AR')}</Text>
      
      <View style={styles.separadorMetricas} />
      
      <View style={styles.filaMetricas}>
        <View style={styles.columnaMetrica}>
          <Text style={styles.etiquetaSecundaria}>Cantidad de Gastos</Text>
          <Text style={styles.valorSecundario}>{gastos.length}</Text>
        </View>
        <View style={styles.columnaMetrica}>
          <Text style={styles.etiquetaSecundaria}>Gasto Más Alto</Text>
          <Text style={styles.valorSecundario}>
            {gastoMasAlto ? `$${gastoMasAlto.monto.toLocaleString('es-AR')}` : '$0'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardResumen: {
    backgroundColor: '#1e3a8a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3
  },
  etiquetaResumen: {
    fontSize: 14,
    color: '#93c5fd',
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  valorResumen: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 4
  },
  separadorMetricas: {
    height: 1,
    backgroundColor: '#3b82f6',
    marginVertical: 12
  },
  filaMetricas: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  columnaMetrica: {
    flex: 1
  },
  etiquetaSecundaria: {
    fontSize: 12,
    color: '#bfdbfe'
  },
  valorSecundario: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 2
  }
});
