const categoryDefinitions = [
  {id:"all",label:"⚡ Todo mezclado"},
  {id:"sports",label:"⚽ Deportes"},
  {id:"math",label:"➗ Matemáticas"},
  {id:"geography",label:"🗺️ Geografía"},
  {id:"science",label:"🧠 Ciencia"},
  {id:"history",label:"📜 Historia"},
  {id:"technology",label:"💻 Tecnología"},
  {id:"entertainment",label:"🎬 Entretenimiento"}
];

const extraCategoryQuestions = [
  {q:"¿Cuántos jugadores tiene un equipo de fútbol en el campo al comenzar un partido?",a:["9","10","11","12"],c:2,category:"sports"},
  {q:"¿Cuánto dura un partido de fútbol reglamentario sin contar el añadido?",a:["80 minutos","90 minutos","100 minutos","120 minutos"],c:1,category:"sports"},
  {q:"¿Qué tarjeta indica expulsión en fútbol?",a:["Azul","Verde","Amarilla","Roja"],c:3,category:"sports"},
  {q:"¿Desde qué distancia se lanza un penalti en fútbol?",a:["9 metros","10 metros","11 metros","12 metros"],c:2,category:"sports"},
  {q:"¿Qué selección ganó el Mundial de fútbol masculino de 2022?",a:["Francia","Argentina","Brasil","Alemania"],c:1,category:"sports"},
  {q:"¿Qué país ganó el primer Mundial de fútbol masculino en 1930?",a:["Brasil","Italia","Uruguay","Argentina"],c:2,category:"sports"},
  {q:"¿Cuántos puntos vale normalmente un triple en baloncesto?",a:["1","2","3","4"],c:2,category:"sports"},
  {q:"¿Cuántos jugadores de cada equipo hay en cancha en baloncesto?",a:["4","5","6","7"],c:1,category:"sports"},
  {q:"¿Cómo se llama la liga profesional de baloncesto más conocida de Estados Unidos?",a:["NFL","MLB","NBA","NHL"],c:2,category:"sports"},
  {q:"¿Cuántos puntos vale un tiro libre en baloncesto?",a:["1","2","3","4"],c:0,category:"sports"},
  {q:"¿Cuántos sets debe ganar un jugador para vencer un partido masculino de Grand Slam?",a:["2","3","4","5"],c:1,category:"sports"},
  {q:"¿En qué superficie se juega tradicionalmente Wimbledon?",a:["Arcilla","Césped","Cemento","Arena"],c:1,category:"sports"},
  {q:"¿Qué puntuación sigue al 30 en un juego de tenis?",a:["35","40","45","50"],c:1,category:"sports"},
  {q:"¿Cuántos anillos tiene el símbolo olímpico?",a:["4","5","6","7"],c:1,category:"sports"},
  {q:"¿Cada cuántos años se celebran normalmente los Juegos Olímpicos de verano?",a:["2","3","4","5"],c:2,category:"sports"},
  {q:"¿En qué deporte se utiliza un scrum?",a:["Rugby","Béisbol","Tenis","Golf"],c:0,category:"sports"},
  {q:"¿Cuántos jugadores por equipo participan en el campo en rugby union?",a:["11","13","15","18"],c:2,category:"sports"},
  {q:"¿Cuántas bases hay en un campo de béisbol contando home?",a:["3","4","5","6"],c:1,category:"sports"},
  {q:"¿Cuántos strikes producen normalmente un out en béisbol?",a:["2","3","4","5"],c:1,category:"sports"},
  {q:"¿En qué deporte se consigue un hoyo en uno?",a:["Golf","Hockey","Béisbol","Rugby"],c:0,category:"sports"},
  {q:"¿Cuántos hoyos tiene una ronda estándar de golf?",a:["9","12","18","24"],c:2,category:"sports"},
  {q:"¿Qué deporte practica un portero que puede usar las manos dentro de su área?",a:["Fútbol","Tenis","Golf","Atletismo"],c:0,category:"sports"},
  {q:"¿Cuál es la distancia oficial de una maratón?",a:["40 km","41 km","42,195 km","45 km"],c:2,category:"sports"},
  {q:"¿Qué prueba combina natación, ciclismo y carrera?",a:["Decatlón","Triatlón","Pentatlón","Heptatlón"],c:1,category:"sports"},
  {q:"¿En qué deporte compiten los pilotos de Fórmula 1?",a:["Motociclismo","Automovilismo","Ciclismo","Rally a pie"],c:1,category:"sports"},
  {q:"¿Qué bandera indica el final de una carrera de automovilismo?",a:["Blanca","Roja","A cuadros","Azul"],c:2,category:"sports"},
  {q:"¿Qué deporte se juega sobre hielo con un puck?",a:["Curling","Hockey sobre hielo","Patinaje artístico","Bobsleigh"],c:1,category:"sports"},
  {q:"¿Cuántos jugadores por equipo están en pista en voleibol?",a:["5","6","7","8"],c:1,category:"sports"},
  {q:"¿Cuántos toques como máximo puede dar un equipo de voleibol antes de pasar el balón?",a:["2","3","4","5"],c:1,category:"sports"},
  {q:"¿En qué deporte se usa una raqueta y un volante?",a:["Squash","Bádminton","Pádel","Tenis de mesa"],c:1,category:"sports"},
  {q:"¿En qué deporte se utiliza una tabla y una ola?",a:["Surf","Esgrima","Judo","Remo"],c:0,category:"sports"},
  {q:"¿Qué arte marcial japonés significa aproximadamente camino de la suavidad?",a:["Judo","Boxeo","Taekwondo","Muay Thai"],c:0,category:"sports"},
  {q:"¿En qué deporte se utilizan florete, espada o sable?",a:["Esgrima","Tiro con arco","Boxeo","Halterofilia"],c:0,category:"sports"},
  {q:"¿Qué deporte tiene categorías de peso y combates dentro de un ring con guantes?",a:["Boxeo","Natación","Golf","Ciclismo"],c:0,category:"sports"},
  {q:"¿Qué país es tradicionalmente asociado con el origen del sumo?",a:["China","Corea del Sur","Japón","Tailandia"],c:2,category:"sports"},
  {q:"¿Qué pieza protege la cabeza de un ciclista?",a:["Guante","Casco","Espinillera","Hombrera"],c:1,category:"sports"},
  {q:"¿Qué gran vuelta ciclista termina tradicionalmente en París?",a:["Giro de Italia","Tour de Francia","Vuelta a España","Tour de Suiza"],c:1,category:"sports"},
  {q:"¿En qué deporte se utiliza una canasta y un tablero?",a:["Baloncesto","Fútbol","Rugby","Tenis"],c:0,category:"sports"},
  {q:"¿Qué posición de fútbol defiende directamente la portería?",a:["Delantero","Extremo","Portero","Mediocampista"],c:2,category:"sports"},
  {q:"¿Qué organismo organiza la Copa Mundial masculina de fútbol?",a:["FIFA","NBA","ATP","FIBA"],c:0,category:"sports"}
];

function inferQuestionCategory(item){
  if(item.category)return item.category;
  const q=item.q.toLowerCase();
  if(/[×÷+−]|cuánto es|número primo|lados tiene|resultado de/.test(q))return "math";
  if(/capital|continente|océano|país|geograf|ciudad/.test(q))return "geography";
  if(/planeta|satélite|gas |químic|órgano|temperatura|agua|cuerpo humano|ciencia/.test(q))return "science";
  if(/comput|internet|software|hardware|program|tecnolog|web|teléfono/.test(q))return "technology";
  if(/película|cine|actor|actriz|música|serie|televisión/.test(q))return "entertainment";
  if(/historia|siglo|guerra|imperio|independencia|revolución/.test(q))return "history";
  return "general";
}
