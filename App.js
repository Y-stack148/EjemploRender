import React, { useState, memo } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

// ==========================================
// 1. COMPONENTE FORMULARIO
// ==========================================
const Formulario = ({ producto, setProducto, agregarProducto }) => {
  console.log("Renderizando Formulario...");
  return (
    <View style={styles.formulario}>
      <Text style={styles.titulo}>Registrar Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={producto}
        onChangeText={setProducto}
      />
      <Button title="Agregar" onPress={agregarProducto} />
    </View>
  );
};

// ==========================================
// 2. NUEVO COMPONENTE: CONTADOR DE PRODUCTOS
// (Inicia con mayúscula y recibe el array de productos)
// ==========================================
const ContadorProductos = ({ total }) => {
  console.log("Renderizando ContadorProductos...");
  return (
    <View style={styles.contadorContainer}>
      <Text style={styles.textoContador}>
        Total de productos registrados: <Text style={styles.numero}>{total}</Text>
      </Text>
    </View>
  );
};

// ==========================================
// 3. COMPONENTE LISTA DE PRODUCTOS
// ==========================================
const ListaProductos = memo(({ productos }) => {
  console.log("Renderizando ListaProductos...");
  return (
    <View style={styles.lista}>
      <Text style={styles.titulo}>Lista de Productos</Text>
      <FlatList
        data={productos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      />
    </View>
  );
});

// ==========================================
// 4. COMPONENTE PRINCIPAL (App)
// ==========================================
export default function App() {
  const [producto, setProducto] = useState('');
  const [productos, setProductos] = useState([]);

  const agregarProducto = () => {
    if (producto.trim() === '') return;
    setProductos([...productos, producto]);
    setProducto('');
  };

  return (
    <View style={styles.container}>
      {/* Formulario para registrar */}
      <Formulario 
        producto={producto} 
        setProducto={setProducto} 
        agregarProducto={agregarProducto} 
      />

      {/* Nuevo componente contador utilizando la propiedad .length */}
      <ContadorProductos total={productos.length} />

      {/* Lista de productos */}
      <ListaProductos productos={productos} />
    </View>
  );
}

// ==========================================
// 5. ESTILOS DE LA APLICACIÓN
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  formulario: {
    marginBottom: 15,
  },
  contadorContainer: {
    padding: 10,
    backgroundColor: '#e6f2ff',
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  textoContador: {
    fontSize: 16,
    color: '#004080',
  },
  numero: {
    fontWeight: 'bold',
    color: '#0066cc',
  },
  lista: {
    flex: 1,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    fontSize: 16,
  },
});