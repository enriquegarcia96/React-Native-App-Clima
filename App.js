import React, { useState, useEffect } from 'react';
import { View,Text, StyleSheet,Image, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from 'react-native';
import Clima from './components/Clima';


import Formulario from './components/Formulario';

const App = () =>  {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });
  
  const [consultar, guardarConsultar] = useState(false);

  //--- coloco el resultado de la API en el State ---//
  const [resultado, guardarResultado] = useState({});

  //--- Para poder cambiar el color de fondo; dependiendo de la temperatura ---//
  const [bgColor, guardarbgColor] = useState('rgb(71,149,212)');//color de fondo inicial
  const [cargando, setCargando] = useState(false);


  const  { ciudad, pais } = busqueda

  useEffect( ()=> {

      const consultarClima = async () => {
        if (consultar) {

          const appId = '581e26f8ad4aa0000fea938e052e5334';
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
          
            try {

                const respuesta = await fetch(url);
                //console.log(respuesta)
                const resultado = await respuesta.json();
                guardarResultado(resultado);
                guardarConsultar(false);

                //--- Muestra el Spinner, ya que aqui tengo el clima ---//
                setCargando(true);

                //--- Ocultar el spinner y mostrar el resultado ---//
                setTimeout( () =>{

                  setCargando(false)

                  //--- modifica los colores de fondo basado en las temperaturas ---//
                  const kelvin = 273.15
                  const { main } = resultado
                  const actual = main.temp - kelvin;
  
                  if (actual < 10) {
                    guardarbgColor('rgb(105, 108, 149)')
                  }else if( actual >= 10  && actual < 25){
                    guardarbgColor('rgb(71, 149, 212)')
                  }else{
                    guardarbgColor('rgb(178, 28, 61)')
                  }

                }, 2000)

            } catch (error) {
                mostrarAlerta();
            }
        }
      }
      consultarClima();
  }, [consultar]);



  const mostrarAlerta = () => {
    Alert.alert(
        '¡Error!',
        'No hay resultados, intenta con otra ciudad o país',
        [{ text: 'OK' }]
    )
  }

  const ocultarTeclado = () =>{
    Keyboard.dismiss();//para que el usuario pueda salir al presionar la pantalla
  } 

  const bgColorApp = {
      backgroundColor: bgColor
  }


  //--- Muestra el Spinner ---//
  const spinner = cargando ? <ActivityIndicator size='large' color='#323edd' /> : <Clima resultado={resultado} /> // es el resultado que tengo desde la API

  return (
    <>
        <TouchableWithoutFeedback onPress={ () => ocultarTeclado() }>
            <View style={[ styles.app, bgColorApp ]}>
                <View>
                  <Image style={ styles.imgSol } source={ require('./assets/sol.png') } />
                </View>
                <View style={ styles.firmaCotenido }>
                  <Text style={ styles.firma }>Enrique S. García</Text>
                </View>
                <View style={styles.contenido}>

                    <View style={ { marginTop: 40 } }>
                      {spinner}
                    </View>

                    <Formulario 
                      busqueda={ busqueda }
                      guardarBusqueda={ guardarBusqueda }
                      guardarConsultar={ guardarConsultar }
                    />
                    
                </View>
            </View>
        </TouchableWithoutFeedback> 
    </>
  );
};

const styles = StyleSheet.create({

  app:{
    flex: 1,
    justifyContent: 'center'
  },
  contenido:{
    marginHorizontal: '2.5%'
  },
  firma: {
    color: '#f3bad6',
    fontFamily: 'Charmonman-Regular',
    fontSize: 20,
    
  },
  firmaCotenido:{
    marginVertical: 20
  },
  imgSol:{
    width: '100%',
    height: 130,
    marginHorizontal: '2.5%'
  }
  
});

export default App;
