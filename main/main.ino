#include <WiFi.h>
#include <PubSubClient.h>
#include <WiFiClientSecure.h>
#include <DHT.h>
#include <ArduinoJson.h>

// Credenciais da rede Wi-Fi
const char* ssid = "";
const char* password = "";

// Configurações do broker MQTT
const char* mqtt_server = "broker.emqx.io";
const int mqtt_port = 8883;

// Tópicos MQTT
const char* topic_led = "kai/led";
const char* topic_sensores = "kai/sensores";

// LEDs indicadores
#define ledRG1 19
#define ledRG2 21
#define ledRGB1 5
#define ledRGB2 18

// Sensores
#define DHT_pin 15
#define IR1_pin 4
#define PIR_pin 22

#define DHTTYPE DHT11

WiFiClientSecure espClient;
PubSubClient client(espClient);
DHT dht(DHT_pin, DHTTYPE);

unsigned long lastPublish = 0;

//Conecta o ESP32 à rede Wi-Fi
void conectarWiFi() {

  Serial.println("Conectando ao WiFi...");

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi conectado!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}


//Realiza a conexão com o broker MQTT

void conectarMQTT() {

  while (!client.connected()) {

    Serial.println("Conectando MQTT...");

    // Gera um identificador único para o cliente MQTT
    String clientId =
      "ESP32-" + String(random(0xffff), HEX);

    if (client.connect(clientId.c_str())) {

      Serial.println("MQTT conectado!");

      // Inscrição no tópico de controle dos LEDs
      client.subscribe(topic_led);

    } else {

      Serial.print("Falha MQTT: ");
      Serial.println(client.state());

      delay(2000);
    }
  }
}

void setup() {

  Serial.begin(115200);

  // Configuração dos LEDs como saída
  pinMode(ledRG1, OUTPUT);
  pinMode(ledRG2, OUTPUT);
  pinMode(ledRGB1, OUTPUT);
  pinMode(ledRGB2, OUTPUT);

  // Configuração dos sensores como entrada
  pinMode(DHT_pin, INPUT);
  pinMode(IR1_pin, INPUT);
  pinMode(PIR_pin, INPUT);

  //configuração do sensor DHT11
  dht.begin();
  conectarWiFi();
  client.setServer(mqtt_server, mqtt_port);
  espClient.setInsecure();
}

void loop() {

  // Reconecta ao Wi-Fi caso a conexão seja perdida
  if (WiFi.status() != WL_CONNECTED) {

    Serial.println("WiFi desconectado!");
    conectarWiFi();
  }

  // Reconecta ao broker MQTT caso necessário
  if (!client.connected()) {
    conectarMQTT();
  }

  client.loop();

  // Publica os dados dos sensores a cada 2 segundos
  if (millis() - lastPublish > 2000) {

    lastPublish = millis();

    // Leitura dos sensores de temperatura e umidade
    float temp = dht.readTemperature();
    float hum = dht.readHumidity();

    // Leitura dos sensores de presença
    int presenca2 = digitalRead(PIR_pin);
    int presenca1 = digitalRead(IR1_pin);

    // Verifica falha na leitura do DHT11
    if (isnan(temp) || isnan(hum)) {

      Serial.println("Erro no DHT11");
      return;
    }

    /*
     * Controle dos LEDs do primeiro ambiente.
     * Verde: ambiente livre.
     * Vermelho: presença detectada.
     */
    if (!presenca1) {
      digitalWrite(ledRG1, HIGH);
      digitalWrite(ledRG2, LOW);
    } else if (presenca1) {
      digitalWrite(ledRG1, LOW);
      digitalWrite(ledRG2, HIGH);
    }

    /*
     * Controle dos LEDs do segundo ambiente.
     * Verde: ambiente livre.
     * Vermelho: presença detectada.
     */
    if (!presenca2) {
      digitalWrite(ledRGB1, HIGH);
      digitalWrite(ledRGB2, LOW);
    } else if (presenca2) {
      digitalWrite(ledRGB1, LOW);
      digitalWrite(ledRGB2, HIGH);
    }

    // Criação do objeto JSON para envio dos dados
    StaticJsonDocument<128> doc;

    doc["temperatura"] = temp;
    doc["umidade"] = hum;
    doc["movimento1"] = presenca1;
    doc["movimento2"] = presenca2;

    char buffer[128];

    serializeJson(doc, buffer);

    // Publica os dados dos sensores no tópico MQTT
    client.publish(topic_sensores, buffer);

    // Exibe os dados enviados no monitor serial
    Serial.println(buffer);
  }
}