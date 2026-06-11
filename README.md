# Projeto Sistema de Monitoramento de Bibliotecas

Disciplina: Internet das Coisas - Profª Salete Farias

Aluna: Kaillane Martins

## Descrição do Sistema

O sistema realiza o monitoramento em tempo real da ocupação das mesas e das condições ambientais da biblioteca.

As informações coletadas são exibidas em um dashboard central, que apresenta um mapa de ocupação dos espaços e indicadores de conforto, como temperatura, umidade e nível de ruído.

Além disso, o sistema pode executar ações automáticas, como:

- Acionar LEDs indicadores nas mesas para informar o estado de ocupação ou alertar sobre excesso de ruído;
- Identificar possíveis casos de reservas fantasmas;
- Enviar notificações para a equipe responsável quando forem detectadas condições ambientais que possam comprometer a conservação do acervo.

## Problema

Durante os horários de pico, estudantes enfrentam dificuldades para encontrar mesas ou cabines disponíveis para estudo. Além disso, é comum a ocorrência de **"reservas fantasmas"**, situação em que objetos pessoais são deixados em uma mesa para simular ocupação, impedindo que outros usuários utilizem o espaço.

Como benefício adicional, o sistema também busca melhorar a experiência dos usuários por meio do monitoramento das condições ambientais da biblioteca, identificando níveis excessivos de ruído e condições inadequadas de temperatura e umidade. O controle desses fatores contribui tanto para o conforto dos estudantes quanto para a preservação do acervo físico, especialmente dos livros, que podem ser danificados pela umidade excessiva.

## Fluxo de Dados

1. Os sensores coletam informações sobre presença, ocupação e condições ambientais.
2. O ESP32 processa os dados recebidos, filtrando leituras inconsistentes e validando a ocupação dos espaços.
3. Caso seja detectado peso ou objetos sem a presença de uma pessoa, o sistema identifica uma possível reserva fantasma.
4. O sistema atualiza os LEDs locais para indicar o estado da mesa ou cabine.
5. As informações processadas são publicadas via MQTT e enviadas ao dashboard central para visualização em tempo real.

## Lista de Componentes

- ESP32
- Sensor IR (simulando um sensor de movimento)
- Sensor de movimento PIR
- 2 LEDs indicadores
- Sensor DHT11 (temperatura e umidade)

## Implementações Realizadas

Atualmente, o sistema possui as seguintes funcionalidades implementadas:

- Detecção de presença utilizando sensores PIR e IR;
- Simulação de duas cabines com monitoramento de ocupação;
- LEDs indicadores para sinalização visual do estado das cabines;
- Monitoramento de temperatura e umidade;
- Geração de alertas quando a umidade ultrapassa os níveis recomendados para a conservação dos livros.

## Circuito

<p align="center">
  <img src="https://github.com/kaillanecmartins/monitoramento_de_bibliotecas/blob/main/img/circuito.png?raw=true"
       alt="Circuito do projeto"
       width="400">
</p>

Acesse o [circuito no Wokwi](https://wokwi.com/projects/463128722414280705) para visualizar a simulação do projeto.

## Instruções de Execução

### Pré Requisitos:

- Arduino IDE instalado;
- Placa ESP32 instalada;
- Bibliotecas WiFi, PubSubClient, DHT e ArduinoJson instaladas;

### Execução:

1. No Arduino IDE abra o código main.ino na pasta main do projeto
2. Incluia suas credenciais de wifi no código
3. Carregue o código na placa ESP32 já com as conexões indicadas no circuito
4. Abra o dashboard do projeto através do link na aba `Dashboard`

## Instruções de uso no simulador

1. Acesse o link do circuito na aba `Circuito`
2. Execute o projeto
3. Acesse o link do dashboard na aba `Dashboard`

## Dashboard

![Dashboard do projeto](https://github.com/kaillanecmartins/monitoramento_de_bibliotecas/blob/main/img/tela_dashboard1.png)

![Dashboard do projeto](https://github.com/kaillanecmartins/monitoramento_de_bibliotecas/blob/main/img/tela_dashboard2.png)

![Dashboard do projeto](https://github.com/kaillanecmartins/monitoramento_de_bibliotecas/blob/main/img/dashboard_alert.png)

Acesse o [dashboard do projeto](https://monitoramentodebibliotecas.vercel.app/) para acompanhar em tempo real os dados de ocupação e monitoramento ambiental.

## Melhorias Futuras

- Separar o sistema em dois dashboards:
  - Dashboard do estudante, focado na consulta de mesas e cabines disponíveis;
  - Dashboard do(a) bibliotecário(a), com informações administrativas e alertas de manutenção.

- Implementar alertas visuais ou notificações para usuários que estiverem gerando excesso de ruído.

- Adicionar um sensor de detecção de ruído para monitoramento do nível sonoro da biblioteca.

- Implementar histórico e geração de relatórios sobre ocupação e condições ambientais.

- Desenvolver notificações em tempo real para a equipe responsável pela biblioteca.
