// ============================================================
//  STORY DATA — Pokémon Edición Bizcochín
//  Contiene todos los diálogos y definiciones de escenas.
// ============================================================
'use strict';

// ─── DIALOGUE NODES ──────────────────────────────────────
// Estructura: { speaker, portrait, text, choices:[{text,goto}], goto, action }
// action: string con nombre de función en Game.actions o item_key

const DIALOGUE = {

  // ── ACTO 0: INTRO ──────────────────────────────────────
  intro_01: {
    speaker: 'PROFESOR DEL DESTINO',
    portrait: 'professor',
    text: '¡Hola a todos! ¡Bienvenidos al maravilloso mundo de los Pokémon!',
    goto: 'intro_02',
  },
  intro_02: {
    speaker: 'PROFESOR DEL DESTINO',
    portrait: 'professor',
    text: 'Mi nombre es el Profesor del Destino. La gente me llama así porque estudio los vínculos mágicos que unen a los corazones.',
    goto: 'intro_03',
  },
  intro_03: {
    speaker: 'PROFESOR DEL DESTINO',
    portrait: 'professor',
    text: 'En este mundo existen criaturas asombrosas que nos acompañan en cada viaje… Pero hoy no estamos aquí por una aventura cualquiera.',
    goto: 'intro_04',
  },
  intro_04: {
    speaker: 'PROFESOR DEL DESTINO',
    portrait: 'professor',
    text: 'Hoy es un día único. Una entrenadora formidable, valiente y de sonrisa luminosa cumple años.',
    goto: 'intro_05',
  },
  intro_05: {
    speaker: 'PROFESOR DEL DESTINO',
    portrait: 'professor',
    text: 'Dime… ¿tu nombre es CRISTINA, verdad?',
    choices: [
      { text: '¡Sí, soy yo!',    goto: 'intro_06' },
      { text: 'Claro que sí',    goto: 'intro_06' },
    ],
  },
  intro_06: {
    speaker: 'PROFESOR DEL DESTINO',
    portrait: 'professor',
    text: '¡Lo sabía! ¡Feliz cumpleaños, Cristina! 🎉',
    goto: 'intro_07',
  },
  intro_07: {
    speaker: 'PROFESOR DEL DESTINO',
    portrait: 'professor',
    text: 'Hoy se abre ante ti una misión que cambiará tu vida para siempre. Una leyenda muy antigua dice que cuando dos personas se quieren de verdad, las estrellas envían al mundo a un ser legendario y milagroso…',
    goto: 'intro_08',
  },
  intro_08: {
    speaker: 'PROFESOR DEL DESTINO',
    portrait: 'professor',
    text: '¡Tu propia aventura está a punto de comenzar!',
    goto: 'intro_end',
  },
  intro_end: {
    speaker: null,
    portrait: null,
    text: '',
    action: 'go_villa_room',
  },

  // ── ACTO 1: VILLA ÑAÑOS — HABITACIÓN ─────────────────
  room_enter_dlg: {
    speaker: null,
    portrait: null,
    text: '¡Buenos días! La luz de la mañana entra por la ventana. Hoy es tu cumpleaños y el mundo parece brillar un poco más.',
    goto: 'room_free',
  },
  room_free: {
    speaker: null,
    portrait: null,
    text: 'Puedes explorar la habitación. ¡Hay varias cosas con las que interactuar!',
    action: 'unlock_room',
  },

  mirror_dlg: {
    speaker: null, portrait: null,
    text: '¡Te miras al espejo! Hoy cumples un año más y te ves más radiante y guapa que nunca. ¡Lista para comerte el mundo!',
    goto: null,
  },
  cake_dlg: {
    speaker: null, portrait: null,
    text: '¡Una deliciosa tarta de cumpleaños con fresas! Huele a gloria. Hay una tarjetita que dice: "Pide un deseo antes de soplar".',
    goto: null,
  },
  photo_dlg: {
    speaker: null, portrait: null,
    text: 'Una foto de Alberto y Cristina en uno de sus viajes favoritos, riendo a carcajadas. El marco tiene grabado: "Nuestra mayor aventura apenas comienza".',
    goto: null,
  },
  console_dlg: {
    speaker: null, portrait: null,
    text: '¡Una consola conectada a la tele! Parece que alguien ha estado programando un juego secreto con muchísimo cariño…',
    goto: null,
  },

  // Alberto entra
  alberto_enter_01: {
    speaker: 'ALBERTO',
    portrait: 'alberto',
    text: '¡Cris! ¡Por fin despiertas, bebecitooo!',
    goto: 'alberto_enter_02',
  },
  alberto_enter_02: {
    speaker: 'ALBERTO',
    portrait: 'alberto',
    text: '¡Muchísimas felicidades, mi amor! ¡Feliz cumpleaños! 🎉',
    choices: [
      { text: '¡Gracias, amor! ¿Qué está pasando?',  goto: 'alberto_r1a' },
      { text: '¿Por qué tienes esa cara de misterio?', goto: 'alberto_r1b' },
    ],
  },
  alberto_r1a: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: '¡Gracias a ti por existir! Y está pasando algo increíble…',
    goto: 'alberto_story',
  },
  alberto_r1b: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: '¡Jeje! Es que no me aguanto la emoción…',
    goto: 'alberto_story',
  },
  alberto_story: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Verás, hoy no solo es tu cumpleaños. Esta mañana los radares de la región han empezado a emitir una señal extraordinaria.',
    goto: 'alberto_story2',
  },
  alberto_story2: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Dicen los ancianos que en lo alto del Santuario de las Nueve Lunas habita una criatura legendaria. Un ser diminuto, dulce y lleno de luz al que llaman… ¡BIZCOCHÍN!',
    goto: 'alberto_story3',
  },
  alberto_story3: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Bizcochín no aparece ante cualquiera. Solo baja a la tierra cuando siente el amor más puro de unos futuros papás… ¡y ha elegido tu corazón!',
    goto: 'alberto_story4',
  },
  alberto_story4: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Cris… sé que serás la mejor entrenadora y la mamá más increíble del universo. ¡Pero antes debemos ir a buscarlo! Toma, esto te lo manda el Profesor. Lo necesitarás para el viaje.',
    goto: 'alberto_items',
  },
  alberto_items: {
    speaker: null, portrait: null,
    text: '★ ¡Has recibido el KIT DE AVENTURA, el GORRO POLLITAL y la legendaria NANA BALL! ★',
    action: 'give_starter_items',
    goto: 'alberto_starter_intro',
  },
  alberto_starter_intro: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Y por supuesto… no puedes viajar sin un compañero fiel a tu lado. ¿A quién eliges para que te cubra las espaldas?',
    action: 'show_starter_screen',
  },
  alberto_after_starter: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: '¡Elección perfecta! Haréis un equipo invencible.',
    goto: 'alberto_goodbye',
  },
  alberto_goodbye: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Yo me adelantaré un poco para despejar la ruta. ¡Nos vemos en el camino, cumpleañera favorita! 💕',
    action: 'alberto_leaves',
  },

  // ── VILLA ÑAÑOS — EXTERIOR ────────────────────────────
  exterior_enter: {
    speaker: null, portrait: null,
    text: 'Saliste a la calle. El sol brilla, hay banderines de cumpleaños en cada esquina y el aire huele a flores recién abiertas.',
    action: 'unlock_exterior',
  },
  andrea_dlg: {
    speaker: 'ANDREA', portrait: 'andrea',
    text: '¡Por fin sales, cumpleañera! ¡Muchísimas felicidades, Cris! ¿Que vas en busca del legendario Bizcochín? ¡Qué ilusión tan grande! Seguro que saca tu sonrisa y tu estilazo. ¡Dale caña a la ruta y dale un abrazo gigante a Alberto de mi parte!',
    goto: null,
  },
  jose_dlg: {
    speaker: 'JOSE', portrait: 'jose',
    text: '¡Esa Cristina! ¡Felicidades, campeona! Hoy no hay excusa para saltarse el entrenamiento: ¡atrapar a un legendario como Bizcochín es la mejor rutina de fuerza y cardio que existe! ¡A darlo todo, Cris, que tú puedes con todo!',
    goto: null,
  },
  sign_dlg: {
    speaker: null, portrait: null,
    text: '«Villa Ñaños: El lugar donde nacen los sueños más dulces. // Ruta 1: El Sendero de los Recuerdos. "Hacia adelante siempre se camina mejor de la mano".»',
    goto: null,
  },

  // ── ACTO 2: RUTA 1 ───────────────────────────────────
  route1_enter: {
    speaker: null, portrait: null,
    text: 'Llegaste a la Ruta 1. El sendero de los recuerdos se abre ante ti: colinas verdes, flores silvestres y el sonido del viento entre los árboles.',
    action: 'unlock_route1',
  },
  marcos_pre: {
    speaker: 'ENTRENADOR MARCOS', portrait: 'marcos',
    text: '¡Alto ahí, entrenadora Cristina! ¡He oído que hoy cumples años y que vas tras la pista de Bizcochín!',
    goto: 'marcos_pre2',
  },
  marcos_pre2: {
    speaker: 'ENTRENADOR MARCOS', portrait: 'marcos',
    text: '¡Para pasar por esta ruta tendrás que demostrar tu energía en un combate de felicitación!',
    action: 'start_battle_marcos',
  },
  marcos_post: {
    speaker: 'ENTRENADOR MARCOS', portrait: 'marcos',
    text: '¡Eres imparable! Como siempre. Toma esto para tu viaje.',
    action: 'give_marcos_items',
    goto: 'marcos_post2',
  },
  marcos_post2: {
    speaker: 'ENTRENADOR MARCOS', portrait: 'marcos',
    text: 'Por cierto, un viajero me dijo que para encontrar a Bizcochín hace falta acumular tres virtudes: ¡Risa, Paciencia y Amor! El primer gimnasio está justo al cruzar la colina.',
    action: 'unlock_ciudad',
  },
  item_entrada_cine: {
    speaker: null, portrait: null,
    text: '¡Has encontrado una ENTRADA DE CINE VIEJA! Te trae recuerdos de vuestras primeras citas y de cuando no os poníais de acuerdo con las palomitas. ♥',
    action: 'give_item_entrada_cine',
  },
  item_foto_escapada: {
    speaker: null, portrait: null,
    text: '¡Has encontrado una FOTO INSTANTÁNEA! Es una foto de una escapada improvisada donde todo salió regular pero os reísteis como nunca.',
    action: 'give_item_foto',
  },

  // ── ACTO 3: CIUDAD TERNURA ────────────────────────────
  ciudad_enter: {
    speaker: null, portrait: null,
    text: 'Llegaste a Ciudad Ternura. Farolas con guirnaldas, una fuente en forma de corazón y al fondo… el majestuoso Gimnasio de la Paciencia.',
    action: 'unlock_ciudad_scene',
  },
  alberto_gym_dlg: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: '¡Cris, llegaste! ¿Has visto qué bonita es esta ciudad?',
    goto: 'alberto_gym_dlg2',
  },
  alberto_gym_dlg2: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Aquí está el Gimnasio de la Paciencia y el Humor. Su líder es especialista en poner a prueba si dos personas saben superar cualquier reto juntas… ¡incluido montar muebles de Ikea sin discutir!',
    goto: 'alberto_gym_dlg3',
  },
  alberto_gym_dlg3: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Entra ahí y demuéstrale lo que vales. ¡Yo estaré en primera fila animándote! 💪',
    action: 'unlock_gym_door',
  },
  gym_tile1: {
    speaker: 'ESTATUA POLLITO', portrait: null,
    text: '¿Cuál es el superpoder secreto de Cristina?',
    choices: [
      { text: 'Sonreír siempre',              goto: 'gym_tile1_ok' },
      { text: 'Tener paciencia con Alberto',  goto: 'gym_tile1_ok' },
    ],
  },
  gym_tile1_ok: {
    speaker: 'ESTATUA POLLITO', portrait: null,
    text: '¡CORRECTO! ¡Ambas son ciertas! ¡La puerta se abre! ✨',
    action: 'open_gym_door1',
  },
  gym_tile2: {
    speaker: 'ESTATUA POLLITO', portrait: null,
    text: '¿Cuál es el ingrediente secreto para superar cualquier día difícil?',
    choices: [
      { text: 'Un abrazo a tiempo',   goto: 'gym_tile2_ok' },
      { text: 'Reírse de todo',       goto: 'gym_tile2_ok' },
      { text: 'Un bizcochito rico',   goto: 'gym_tile2_ok' },
    ],
  },
  gym_tile2_ok: {
    speaker: 'ESTATUA POLLITO', portrait: null,
    text: '¡¡TODAS SON CORRECTAS!! ¡Activando modo confeti! 🎉🎉🎉',
    action: 'open_gym_door2',
  },
  valentin_pre: {
    speaker: 'LÍDER VALENTÍN', portrait: 'valentin',
    text: '¡Bienvenida, Cristina! He seguido tus pasos desde que saliste de Villa Ñaños.',
    goto: 'valentin_pre2',
  },
  valentin_pre2: {
    speaker: 'LÍDER VALENTÍN', portrait: 'valentin',
    text: 'El camino hacia Bizcochín no se gana con ataques feroces, sino con la templanza del corazón. Muchos buscan la perfección, pero el verdadero truco de la vida es saber reírse juntos cuando las cosas se tuercen.',
    goto: 'valentin_pre3',
  },
  valentin_pre3: {
    speaker: 'LÍDER VALENTÍN', portrait: 'valentin',
    text: '¿Estás lista para demostrar tu temple?',
    choices: [
      { text: '¡Nací lista!',       goto: 'valentin_battle_start' },
      { text: '¡Vamos a por ello!', goto: 'valentin_battle_start' },
    ],
  },
  valentin_battle_start: {
    speaker: 'LÍDER VALENTÍN', portrait: 'valentin',
    text: '¡Pues que comience la prueba de la Paciencia!',
    action: 'start_battle_valentin',
  },
  valentin_post: {
    speaker: 'LÍDER VALENTÍN', portrait: 'valentin',
    text: '¡Increíble! Tu determinación es inquebrantable y tu corazón transmite una calma absoluta.',
    goto: 'valentin_medal',
  },
  valentin_medal: {
    speaker: null, portrait: null,
    text: '★ ¡Cristina ha ganado la MEDALLA TERNURA! ★  ¡Pum-pum… pum-pum!',
    action: 'give_medalla_ternura',
    goto: 'valentin_post2',
  },
  valentin_post2: {
    speaker: 'LÍDER VALENTÍN', portrait: 'valentin',
    text: 'Esta medalla simboliza que tienes toda la sabiduría y dulzura necesarias para lo que viene. Escucha atentamente…',
    goto: 'valentin_heartbeat',
  },
  valentin_heartbeat: {
    speaker: 'LÍDER VALENTÍN', portrait: 'valentin',
    text: '¿Lo sientes? Bizcochín ha sentido la fuerza de tu medalla. Está esperándote al otro lado del Bosque de las Nanas.',
    action: 'unlock_bosque',
  },

  // ── ACTO 4: BOSQUE DE LAS NANAS ──────────────────────
  bosque_enter: {
    speaker: null, portrait: null,
    text: 'Llegaste al Bosque de las Nanas. Un bosque nocturno iluminado por miles de luciérnagas doradas. Al pisar la hierba suena un tierno «¡pío, pío!».',
    action: 'unlock_bosque_scene',
  },
  pollito1_dlg: {
    speaker: null, portrait: null,
    text: '¡Has encontrado a un pollito suave que estaba echando una siesta! Da un saltito: ¡Pío! (Nota: Do ♪) y se coloca detrás de ti en fila.',
    action: 'add_pollito_1',
  },
  pollito2_dlg: {
    speaker: null, portrait: null,
    text: '¡El segundo pollito bate sus alitas con emoción: ¡Pío-pío! (Nota: Mi ♪) y se engancha al tren de pollitos detrás de Cristina.',
    action: 'add_pollito_2',
  },
  pollito3_dlg: {
    speaker: null, portrait: null,
    text: '¡El tercer pollito canta una nota brillante: Sol ♪! ¡El tren de pollitos está completo! 🐣🐣🐣',
    action: 'add_pollito_3',
  },
  abuela_dlg: {
    speaker: 'ABUELA TEJEDORA', portrait: 'abuela',
    text: '¡Buenas noches, linda! Mira qué comitiva de pollitos más preciosa llevas detrás. Dicen que a Bizcochín le encantan las nanas y que duerme en un gran nido mullido.',
    goto: 'abuela_dlg2',
  },
  abuela_dlg2: {
    speaker: 'ABUELA TEJEDORA', portrait: 'abuela',
    text: '¡Toma esta Baya Melocotón para el camino! ¡Y mucha suerte, linda!',
    action: 'give_baya_melocoton',
  },
  bosque_puerta: {
    speaker: null, portrait: null,
    text: '¡Los 3 pollitos cantan al unísono la "Nana del Pollito"! La puerta de piedra se abre con destellos dorados. ✨',
    action: 'open_bosque_puerta',
  },

  // ── ACTO 5: PUENTE DEL MAÑANA ────────────────────────
  puente_enter: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Sabía que no tardarías en llegar, campeona.',
    goto: 'puente_02',
  },
  puente_02: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Mira hacia arriba, Cris… Más allá de este puente está la Cima de la Cuna. Allí es donde Bizcochín está esperando.',
    goto: 'puente_03',
  },
  puente_03: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Antes de que des el último paso, quería pararme un segundo aquí contigo. Hemos recorrido mucho camino juntos, hemos superado mudanzas, viajes, momentos fáciles y otros no tanto…',
    goto: 'puente_04',
  },
  puente_04: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Y cada día a tu lado ha sido el mejor regalo de mi vida. Hoy es tu cumpleaños, pero el verdadero afortunado soy yo por tenerte como compañera de viaje.',
    goto: 'puente_05',
  },
  puente_05: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: '¡Y como marca la tradición de los mejores entrenadores… quiero un combate contigo antes del gran momento! ¡Demuéstrame todo lo que tienes, mi amor! 💕',
    action: 'start_battle_alberto',
  },
  puente_post: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: '¡Uau! Eres absolutamente increíble… ¡Bizcochín va a estar en las mejores manos!',
    goto: 'puente_post2',
  },
  puente_post2: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Ha sido el mejor combate de mi vida. La cima está despejada. La Nana Ball está templada en tu mochila. Sube ahí arriba, amor… y dale la bienvenida a nuestro pequeño.',
    goto: 'puente_post3',
  },
  puente_post3: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Yo estaré justo detrás de ti, como siempre. ♥',
    action: 'unlock_cima',
  },

  // ── ACTO 6: CIMA DE LA CUNA ──────────────────────────
  cima_enter: {
    speaker: null, portrait: null,
    text: 'La Cima de la Cuna. Una montaña de cristal rodeada de nubes. La luna llena ilumina una aurora de tonos pastel. En el centro, un Gran Nido hecho de nubes y plumas doradas.',
    goto: 'cima_enter2',
  },
  cima_enter2: {
    speaker: null, portrait: null,
    text: 'La pantalla empieza a brillar. ¡Pum-pum! ¡Pío-pum! ¡Pum-pum! Un huevo de luz resplandeciente desciende del cielo…',
    action: 'start_ritual',
  },

  // ── EPÍLOGO ───────────────────────────────────────────
  epilogue_pokedex: {
    speaker: null, portrait: null,
    text: '¡BIZCOCHÍN ha sido atrapado! ¡Ha decidido unirse a vuestra familia para siempre!',
    action: 'show_pokedex',
  },
  epilogue_mirador: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Lo lograste, mi vida. Lo hemos logrado.',
    goto: 'epilogue_mirador2',
  },
  epilogue_mirador2: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Bizcochín ya está con nosotros en el corazón… y muy pronto lo estará en nuestros brazos.',
    goto: 'epilogue_mirador3',
  },
  epilogue_mirador3: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Hoy celebramos tu cumpleaños, pero el regalo más grande del mundo es el futuro que estamos construyendo juntos.',
    goto: 'epilogue_mirador4',
  },
  epilogue_mirador4: {
    speaker: 'ALBERTO', portrait: 'alberto',
    text: 'Tengo una última cosa para ti antes de guardar la partida…',
    action: 'show_letter',
  },
};

// ─── SCENES ──────────────────────────────────────────────
// bg: clave de función en Renderer.backgrounds
// npcs: [{id, label, sprite, x, y (%), dialogue}]
// objects: [{id, label, icon, x, y (%), dialogue, flag}]
// exits: [{label, x, y (%), target, requireFlag}]

const SCENES = {
  intro: {
    id: 'intro',
    name: 'Intro',
    bg: 'stars',
    music: 'intro',
    showHud: false,
    onEnter: 'intro_01',
    npcs: [],
    objects: [],
    exits: [],
  },

  villa_room: {
    id: 'villa_room',
    name: 'Habitación de Cristina',
    bg: 'room',
    music: 'town',
    showHud: true,
    onEnter: 'room_enter_dlg',
    npcs: [
      { id:'alberto_npc', label:'Alberto', sprite:'alberto', x:68, y:38, dialogue:'alberto_enter_01', flag:'alberto_visited', oneshot:true },
    ],
    objects: [
      { id:'mirror',  label:'Espejo',           icon:'🪞', x:12, y:25, dialogue:'mirror_dlg' },
      { id:'cake',    label:'Tarta de Cumpleaños', icon:'🎂', x:50, y:55, dialogue:'cake_dlg' },
      { id:'photo',   label:'Cuadro de fotos',  icon:'🖼️', x:80, y:25, dialogue:'photo_dlg' },
      { id:'console', label:'Consola',           icon:'🎮', x:72, y:55, dialogue:'console_dlg' },
    ],
    exits: [
      { label:'🚪 Salir al exterior', x:50, y:88, target:'villa_exterior', requireFlag:'alberto_visited' },
    ],
  },

  villa_exterior: {
    id: 'villa_exterior',
    name: 'Villa Ñaños',
    bg: 'exterior',
    music: 'town',
    showHud: true,
    onEnter: 'exterior_enter',
    npcs: [
      { id:'andrea_npc', label:'Andrea',     sprite:'andrea', x:20, y:42, dialogue:'andrea_dlg' },
      { id:'jose_npc',   label:'Jose',       sprite:'jose',   x:75, y:42, dialogue:'jose_dlg'   },
    ],
    objects: [
      { id:'sign', label:'Cartel de salida', icon:'🪧', x:90, y:55, dialogue:'sign_dlg' },
    ],
    exits: [
      { label:'➡ Ruta 1', x:50, y:88, target:'route1' },
    ],
  },

  route1: {
    id: 'route1',
    name: 'Ruta 1 – Sendero de los Recuerdos',
    bg: 'route',
    music: 'route',
    showHud: true,
    onEnter: 'route1_enter',
    npcs: [
      { id:'marcos_npc', label:'Entrenador Marcos', sprite:'marcos', x:62, y:40, dialogue:'marcos_pre', flag:'marcos_beaten', oneshot:true },
    ],
    objects: [
      { id:'bush1', label:'Arbusto brillante', icon:'✨', x:20, y:55, dialogue:'item_entrada_cine', flag:'got_entrada_cine', oneshot:true },
      { id:'bench', label:'Banco de madera',   icon:'✨', x:40, y:60, dialogue:'item_foto_escapada', flag:'got_foto', oneshot:true },
    ],
    exits: [
      { label:'⬅ Villa Ñaños',   x:8,  y:88, target:'villa_exterior' },
      { label:'➡ Ciudad Ternura', x:92, y:88, target:'ciudad', requireFlag:'marcos_beaten' },
    ],
  },

  ciudad: {
    id: 'ciudad',
    name: 'Ciudad Ternura',
    bg: 'city',
    music: 'city',
    showHud: true,
    onEnter: 'ciudad_enter',
    npcs: [
      { id:'alberto_gym', label:'Alberto', sprite:'alberto', x:30, y:45, dialogue:'alberto_gym_dlg', flag:'alberto_gym_seen', oneshot:true },
    ],
    objects: [],
    exits: [
      { label:'⬅ Ruta 1',        x:8,  y:88, target:'route1' },
      { label:'🏟 Entrar al Gimnasio', x:50, y:88, target:'gym', requireFlag:'alberto_gym_seen' },
    ],
  },

  gym: {
    id: 'gym',
    name: 'Gimnasio de la Paciencia',
    bg: 'gym',
    music: 'gym',
    showHud: true,
    onEnter: null,
    npcs: [
      { id:'tile1', label:'Estatua Pollito 1', sprite:'statue', x:30, y:50, dialogue:'gym_tile1', flag:'tile1_done', oneshot:true },
      { id:'tile2', label:'Estatua Pollito 2', sprite:'statue', x:65, y:50, dialogue:'gym_tile2', flag:'tile2_done', oneshot:true },
      { id:'valentin', label:'Líder Valentín', sprite:'valentin', x:50, y:25, dialogue:'valentin_pre', flag:'valentin_beaten', oneshot:true },
    ],
    objects: [],
    exits: [
      { label:'⬅ Ciudad Ternura', x:50, y:88, target:'ciudad' },
      { label:'➡ Al Bosque',      x:92, y:88, target:'bosque', requireFlag:'valentin_beaten' },
    ],
  },

  bosque: {
    id: 'bosque',
    name: 'Bosque de las Nanas',
    bg: 'forest',
    music: 'forest',
    showHud: true,
    onEnter: 'bosque_enter',
    npcs: [
      { id:'abuela', label:'Abuela Tejedora', sprite:'abuela', x:75, y:45, dialogue:'abuela_dlg', flag:'abuela_seen', oneshot:true },
    ],
    objects: [
      { id:'pollito1', label:'Pollito durmiendo',     icon:'🐣', x:20, y:55, dialogue:'pollito1_dlg', flag:'pollito1', oneshot:true },
      { id:'pollito2', label:'Pollito en el arroyo',  icon:'🐣', x:45, y:62, dialogue:'pollito2_dlg', flag:'pollito2', oneshot:true },
      { id:'pollito3', label:'Pollito junto a abuela',icon:'🐣', x:68, y:55, dialogue:'pollito3_dlg', flag:'pollito3', oneshot:true },
      { id:'puerta',   label:'Portón del Puente',     icon:'🚪', x:90, y:45, dialogue:'bosque_puerta', flag:'bosque_open', oneshot:true },
    ],
    exits: [
      { label:'⬅ Ciudad Ternura', x:8,  y:88, target:'ciudad'  },
      { label:'➡ El Puente',      x:92, y:88, target:'puente', requireFlag:'bosque_open' },
    ],
  },

  puente: {
    id: 'puente',
    name: 'El Puente del Mañana',
    bg: 'bridge',
    music: 'bridge',
    showHud: true,
    onEnter: 'puente_enter',
    npcs: [],
    objects: [],
    exits: [
      { label:'⬅ Bosque',          x:8,  y:88, target:'bosque' },
      { label:'➡ La Cima',         x:92, y:88, target:'cima', requireFlag:'alberto_beaten' },
    ],
  },

  cima: {
    id: 'cima',
    name: 'Cima de la Cuna',
    bg: 'summit',
    music: 'summit',
    showHud: false,
    onEnter: 'cima_enter',
    npcs: [],
    objects: [],
    exits: [],
  },

  epilogue: {
    id: 'epilogue',
    name: 'Mirador del Amanecer',
    bg: 'epilogue',
    music: 'ending',
    showHud: false,
    onEnter: 'epilogue_mirador',
    npcs: [],
    objects: [],
    exits: [],
  },
};
