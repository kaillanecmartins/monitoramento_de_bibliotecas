## Projeto Sistema de Monitoramento de Bibliotecas 
### Disciplina: Internet das Coisas - Profª Salete Farias
### Aluna: Kaillane Martins

### Problema

A dificuldade de encontrar mesas livres em horários de pico e a ocorrência de "reservas fantasmas" (objetos deixados para segurar lugar). Além disso, o sistema poderá ter como um “plus” resolver a baixa produtividade por condições ambientais inadequadas (excesso de ruído/calor) e o risco de degradação do acervo físico (livros) por controle de umidade.

### Descrição do sistema

Atualizar um dashboard com mapa de ocupação e índices de
silêncio/conforto; acionar um LED RGB local na mesa (ex: pisca em vermelho
se o ruído exceder o limite); e disparar notificações para a manutenção caso a
umidade ameace a integridade dos livros.

### Fluxo de dados

Os Sensores captam os dados físicos → O ESP32 (Processamento) filtra
ruídos irrelevantes e valida a ocupação (ex: se há peso mas não há PIR,
identifica "reserva fantasma") → O sistema atua no LED RGB local e publica
via MQTT os estados para o Dashboard central.

### Lista de componentes
- ESP32;
- Sensor IR;
- Sensor PIR;
- 2 Leds;
- Sensor DHT11;

### Implementações até o momento

Os sensores de presença já funcionam, além dos leds de indicação de ocupação da cabine com duas cabines de simulação. O sistema também possue um alerta para caso o sensor de umidade e temperatura detecte uma umidade acima do que é recomendado para conservação dos livros

## Simulação

Acesse [circuito wokwi](https://wokwi.com/projects/463128722414280705) para visualizar a simulação do projeto

![alt text](https://github.com/kaillanecmartins/monitoramento_de_bibliotecas/blob/main/img/circuito.png "circuito do projeto")
