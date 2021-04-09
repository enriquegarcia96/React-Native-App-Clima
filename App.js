import React, { useState } from 'react';
import { View,Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';



import Formulario from './components/Formulario';

  const ocultarTeclado = () =>{
      Keyboard.dismiss();//para que el usuario pueda salir al presionar la pantalla
  }

const App = () =>  {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  })



  
  return (
    <>
        <TouchableWithoutFeedback onPress={ () => ocultarTeclado() }>
            <View style={styles.app}>
                <View style={styles.contenido}>

                    <Formulario 
                      busqueda={ busqueda }
                      guardarBusqueda={ guardarBusqueda }
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
    backgroundColor: 'rgb(71,149,212)',
    justifyContent: 'center',

  },
  contenido:{
    marginHorizontal: '2.5%'
  }
  
});

export default App;
