import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput,TouchableWithoutFeedback, Animated, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';


const Formulario = ( { busqueda, guardarBusqueda } ) => {

    //--- destructuro el objeto de usestare ---//
    const { pais, ciudad } = busqueda;


    //--- para poner animaciones ---//
    const [ animacionBoton ] = useState(new Animated.Value(1));// 1 => es el tamaño o escala

    const consultarClima = () => {

        if (pais.trim() === '' || ciudad.trim() === '') {
            mostrarAlerta();
            return;
        }

    }

    const mostrarAlerta = () => {
        Alert.alert(
            '¡Error!',
            'Agrega una ciudad y pais para la busqueda',
            [{ text: 'Entendido' }]
        )
    }


    //--- funciones de las animaciones de entrada y salida ---//
    //--- solo se pueden utilizar dentro de TouchableWithoutFeedback ---//
    const animacionEntrada = () => {
        //console.log('entrada...')

        Animated.spring( animacionBoton, {
            toValue: .75, //aqui puedo hacer que  el boton se haga mas pequeño
            useNativeDriver: true,
        }).start();//aqui arranco la animacion
    }



    const animacionSalida = () => {
        //console.log('salida...')

        //--- Animacion ---//
        Animated.spring(animacionBoton, {
            toValue: 1,
            friction: 2, //controlar el rebote que tiene el boton
            tension: 110, //entre mas menor sea el numero es mas suave el movimiento 
            useNativeDriver: true
        }).start();
        
    }

    const estiloAnimacion = {
        transform: [{ scale: animacionBoton }]
    }


    return ( 
        <>    
            <View >
                <View>

                    <TextInput 
                        value={ ciudad }
                        style={styles.input}

                        //permite leer lo que el usuario escriba
                        onChangeText={ NuevaCiudad => guardarBusqueda({...busqueda,
                            NuevaCiudad}) }                              //^ copia del state
                        placeholder='Ciudad'
                        placeholderTextColor='#666'//le da un color al texto del input
                    />

                </View>

                <View>
                    <Picker
                        selectedValue={ pais }
                        itemStyle={{ height: 120, backgroundColor: '#FFF' }}
                        onValueChange={ NuevoPais => guardarBusqueda({ ...busqueda, 
                            NuevoPais }) }                                    //^ copia del state
                    >
                        <Picker.Item label='-- Seleccione Un País --' value=''/>
                        <Picker.Item label='Honduras' value='HN' />
                        <Picker.Item label='Estados Unidos' value='US' />
                        <Picker.Item label='México' value='MX' />
                        <Picker.Item label='Argentina' value='AR' />
                        <Picker.Item label='Colombia' value='CO' />
                        <Picker.Item label='Costa Rica' value='CR' />
                        <Picker.Item label='España' value='ES' />
                        <Picker.Item label='Perú' value='PE' />
                    </Picker>
                </View>

                <TouchableWithoutFeedback
                    onPressIn={ () => animacionEntrada() }
                    onPressOut={ ()  => animacionSalida() }
                    onPress={ () => consultarClima() }
                >
                    <Animated.View
                        style={ [styles.btnBuscar, estiloAnimacion] }// le paso los estilos 
                    >
                        <Text style={ styles.textoBuscar }>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
     );
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar:{
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    textoBuscar: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }
})

 
export default Formulario;