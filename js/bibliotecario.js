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

function verificarAlertas(data){

    const alertaTemp =
        document.getElementById("alerta-temperatura");

    const alertaHum =
        document.getElementById("alerta-umidade");

    const alertaRuido =
        document.getElementById("alerta-ruido");

    const semAlertas =
        document.getElementById("sem-alertas");

    let existeAlerta = false;

    // Temperatura

    if(data.temperatura > 24){

        alertaTemp.style.display = "block";

        existeAlerta = true;

    }else{

        alertaTemp.style.display = "none";

    }

    // Umidade

    if(data.umidade > 65){

        alertaHum.style.display = "block";

        existeAlerta = true;

    }else{

        alertaHum.style.display = "none";

    }

    // Ruído

    if(data.ruido > 50){

        alertaRuido.style.display = "block";

        existeAlerta = true;

    }else{

        alertaRuido.style.display = "none";

    }

    semAlertas.style.display =
        existeAlerta ? "none" : "block";

}