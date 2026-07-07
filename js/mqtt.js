const client = new Paho.MQTT.Client(
    "broker.emqx.io",
    8084,
    "web_" + Math.random()
);

function conectarMQTT(onData, onStatus) {

    client.onMessageArrived = function (message) {

        const dados = JSON.parse(message.payloadString);

        onData(dados);
    };

    client.connect({

        useSSL: true,

        onSuccess() {

            if (onStatus)
                onStatus(true);

            client.subscribe("kai/sensores");
        },

        onFailure() {

            if (onStatus)
                onStatus(false);

            setTimeout(() => conectarMQTT(onData, onStatus), 2000);
        }

    });

}