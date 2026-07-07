function atualizarTela(data){

    document.getElementById("temp").textContent =
        data.temperatura.toFixed(1) + " °C";

    document.getElementById("hum").textContent =
        data.umidade.toFixed(1) + " %";

    atualizarCabines(data);

    verificarUmidade(data.umidade);

}
function atualizarCabines(data){

    const cab1 = document.getElementById("movimento1");

    if(data.movimento1 == 0){

        cab1.textContent="Ocupada";

        cab1.className="sensor-value alerta";

    }else{

        cab1.textContent="Livre";

        cab1.className="sensor-value ok";

    }

    const cab2=document.getElementById("movimento2");

    if(data.movimento2 == 0){

        cab2.textContent="Ocupada";

        cab2.className="sensor-value alerta";

    }else{

        cab2.textContent="Livre";

        cab2.className="sensor-value ok";

    }

}
function verificarUmidade(umidade){

    const alerta =
        document.getElementById("alerta-umidade");

    alerta.style.display =
        umidade > 65 ? "block" : "none";

}
conectarMQTT(

    atualizarTela,

    function(conectado){

        const status =
            document.getElementById("status");

        if(conectado){

            status.textContent="Conectado";

            status.className="has-text-centered status-ok";

        }else{

            status.textContent="Reconectando...";

            status.className="has-text-centered status-erro";

        }

    }

);