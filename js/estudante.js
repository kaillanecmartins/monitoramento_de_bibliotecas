function atualizarCabine(id, ocupada){

    const elemento = document.getElementById(id);

    if(ocupada == 0){

        elemento.textContent = "Ocupada";

        elemento.className = "sensor-value alerta";

    }else{

        elemento.textContent = "Disponível";

        elemento.className = "sensor-value ok";

    }

}

conectarMQTT((dados)=>{

    atualizarCabine("movimento1", dados.movimento1);

    atualizarCabine("movimento2", dados.movimento2);

});