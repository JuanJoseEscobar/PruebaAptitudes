
//objeto Elevador y sus atributos
const Elevador = {
    pisos:  [5,29,13,10],//los pisos que han llamado al elevador
    pisoTarget: 5,
    PisoActual: 4,
    Direccion: 1,
}

pisosAingresar = [[5,2],[29,10],[13,1],[10,1]];//El arreglo que contiene los pisos que se añadiran al arreglo que contiene los pisos que llamaron al Elevador

MoverElevador = () => { //Metodo que mueve al elevador

    //El Elevador Elige que piso se desplazara y lo elimina de la lista de pisos
    for( i = 0 ; i < Elevador.pisos.length ; i++)
    {
        if(Elevador.pisoTarget == Elevador.pisos[i])
        {
            Elevador.pisos.splice(i,1);
        }
    }
    
    CalcularDireccion();//calcula la direccion en que se mueve el Elevador

    console.log(Elevador.Direccion > 0 ? "Elevador Subiendo" : "Elevador Bajando" );//imprime en consola Si el elevador sube o baja
    
    Elevador.PisoActual = Elevador.pisoTarget;//el elevador llega al piso objetivo

    //indica que el elevador se detiene y en que piso esta
    console.log(`Elevador en piso ${Elevador.PisoActual}`);
    console.log(`Elevador se detien ->[${Elevador.pisos}]`);
    
    NuevoPiso();//Se revisa si en el piso que paro, llaman un piso nuevo.
    
    Elevador.pisoTarget = Elevador.pisos[0];// Se le asigna un nuevo target al Elevador

    CalcularDireccion();// se calcula si el elevador baja o sube

    MejorarRuta();//Se revisa si hay un piso mas cercano en la ruta 
    
}

MejorarRuta = () =>
{
    for( i = 1; i < Elevador.pisos.length ; i++)
    {
        if(Elevador.Direccion > 0)
        {
            Elevador.pisoTarget = Elevador.pisoTarget > Elevador.pisos[i] && Elevador.pisos[i] > Elevador.PisoActual? Elevador.pisos[i] : Elevador.pisoTarget ;
        }
        else
        {
            Elevador.pisoTarget = Elevador.pisoTarget < Elevador.pisos[i] && Elevador.pisos[i] < Elevador.PisoActual ? Elevador.pisos[i] : Elevador.pisoTarget ;
        }
    }
}

NuevoPiso = ()=>{
    pisosAingresar.forEach(piso => {
        if(Elevador.PisoActual == piso[0])
        {
            if(Elevador.pisos[Elevador.pisos.length-1] != piso[1])
            {
                Elevador.pisos.push(piso[1]);//se ingresa el piso a la cola de pisos
                console.log(`piso ingresado ${piso[1]} ->[${Elevador.pisos}]`);//se imprime los pisos faltantes
            }
        }
    })

}

CalcularDireccion = () => {
    if(Elevador.PisoActual < Elevador.pisoTarget)
    {
        Elevador.Direccion = 1;
    }
    else
    {
        Elevador.Direccion = -1;
    }
}

//main
Main = ()=> {
    console.log(`Elevador en piso ${Elevador.PisoActual}`);

    //Se ejecuta los movimientos del Elevador mientras Tenga pisos en cola.
    while (Elevador.pisos.length > 0) {
        MoverElevador();
    }
}

Main();

