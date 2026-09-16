const { useState, useEffect, useMemo } = React;

/* ===================== ICONOS PROPIOS (reemplazo de lucide-react para CDN suelto) ===================== */
function Icon({
  children,
  size = 16,
  color = "currentColor"
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, children);
}
function Flame(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
  }));
}
function Volume2(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polygon", {
    points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
  }));
}
function Check(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }));
}
function X(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }));
}
function ChevronRight(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  }));
}
function ChevronLeft(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "15 18 9 12 15 6"
  }));
}
function RotateCcw(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "1 4 1 10 7 10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
  }));
}
function Award(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "7"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "8.21 13.89 7 23 12 20 17 23 15.79 13.88"
  }));
}
function HomeIcon(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "9 22 9 12 15 12 15 22"
  }));
}
function Sparkles(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3z"
  }));
}
function Lock(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 0 1 10 0v4"
  }));
}
function Calendar(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "2",
    x2: "16",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "10",
    x2: "21",
    y2: "10"
  }));
}

/* ===================== PALETA ===================== */
const C = {
  bg: "#1C1B18",
  bgSoft: "#242320",
  marble: "#EDE6D6",
  marbleDim: "#B8AF9C",
  bronze: "#8A6D3B",
  bronzeLight: "#C9A768",
  gold: "#D9B24C",
  verdigris: "#4A5D52",
  terracotta: "#7A2E2E",
  line: "#3A3730"
};
const serif = "Georgia, 'Times New Roman', serif";
const sans = "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";
const EFFECTIVENESS_THRESHOLD = 0.85;
const INTERVALS = [1, 2, 4, 7, 14, 30];
const TOTAL_DAYS = 150;

// ===================== CURRICULO DE 21 SEMANAS (150 dias) =====================
// Cada semana: vocab (5), structures (3 frases modelo), ancla, pool (8 pares ES/EN)
// bridge: 'be' | 'have' | 'been' | 'modal' | 'mixed' | null

const WEEKS = [{
  id: 1,
  range: [1, 7],
  title: "Futuro Continuo",
  bridge: "be",
  priority: 3,
  vocab: [["to endure", "soportar, aguantar"], ["resilience", "resiliencia"], ["setback", "contratiempo"], ["to brace yourself for", "prepararte para"], ["to let go", "soltar"]],
  structures: ["At this time tomorrow, I will be facing the same problem.", "She'll be dealing with it her own way.", "We won't be worrying about things we can't control."],
  ancla: "I'll be handling it, one step at a time.",
  pool: [["Esta noche estaré trabajando tarde otra vez.", "I'll be working late again tonight."], ["Él no estará pensando en eso mañana.", "He won't be thinking about it tomorrow."], ["A esta hora la próxima semana, estaré viajando.", "This time next week, I'll be traveling."], ["Ellos estarán esperando afuera.", "They'll be waiting outside."], ["No estaremos discutiendo por tonterías.", "We won't be arguing over little things."], ["Ella no estará esperando disculpas.", "She won't be expecting an apology."], ["Estaremos enfrentando decisiones difíciles pronto.", "We'll be facing tough decisions soon."], ["¿Vas a estar trabajando el sábado?", "Will you be working on Saturday?"]]
}, {
  id: 2,
  range: [8, 14],
  title: "Present Perfect",
  bridge: "have",
  priority: 2,
  vocab: [["to accept", "aceptar"], ["to overcome", "superar"], ["adversity", "adversidad"], ["to reflect on", "reflexionar sobre"], ["to let it slide", "dejarlo pasar"]],
  structures: ["I have already accepted it.", "She has never done that before.", "We've been here since morning."],
  ancla: "I've already made peace with it.",
  pool: [["Ya hice las paces con eso.", "I've already made peace with it."], ["Ella ya ha aceptado el resultado.", "She's already accepted the outcome."], ["No he terminado todavía.", "I haven't finished yet."], ["Hemos estado aquí antes.", "We've been here before."], ["¿Ya has comido?", "Have you eaten yet?"], ["Él nunca ha dicho eso.", "He's never said that."], ["Él ya ha superado eso.", "He's already overcome that."], ["No hemos hablado de eso todavía.", "We haven't talked about that yet."]]
}, {
  id: 3,
  range: [15, 21],
  title: "Past Perfect",
  bridge: "have",
  priority: 2,
  vocab: [["turning point", "punto de inflexión"], ["to come to terms with", "hacer las paces con"], ["to dwell on", "darle vueltas a"], ["in hindsight", "en retrospectiva"], ["looking back", "mirando atrás"]],
  structures: ["I had already left when she called.", "He'd finished before I arrived.", "We hadn't expected that."],
  ancla: "By the time I understood, it had already changed.",
  pool: [["Ya había terminado cuando llegaron.", "I had already finished when they arrived."], ["Ella ya se había ido.", "She'd already left."], ["No habíamos visto nada igual.", "We hadn't seen anything like it."], ["Él había cruzado esa línea antes.", "He'd crossed that line before."], ["Para entonces, ya habíamos decidido.", "By then, we'd already decided."], ["¿Habías estado ahí antes?", "Had you been there before?"], ["Ya habíamos decidido antes de hablar.", "We'd already decided before we talked."], ["Él no había dicho nada hasta ese momento.", "He hadn't said anything until that moment."]]
}, {
  id: 4,
  range: [22, 28],
  title: "Futuro Perfecto",
  bridge: "have",
  priority: 3,
  vocab: [["milestone", "hito"], ["to picture something", "imaginarte algo"], ["to settle down", "asentarte"], ["dichotomy of control", "dicotomía del control"], ["decade", "década"]],
  structures: ["By the end of the day, I will have accepted what I couldn't control.", "She'll have moved on by then.", "We'll have worked this out before Friday."],
  ancla: "By then, I will have accepted what I couldn't control.",
  pool: [["Para el final del día, ya habré aceptado lo que no pude controlar.", "By the end of the day, I will have accepted what I couldn't control."], ["Ella ya habrá pasado la página para entonces.", "She'll have moved on by then."], ["Para la próxima semana, ya me lo habré sacudido de encima.", "By next week, I'll have shaken it off."], ["Habremos resuelto esto antes del viernes.", "We'll have worked this out before Friday."], ["Él ya habrá superado esa adversidad.", "He'll have overcome that adversity."], ["Para cuando llegues, ya habré reflexionado sobre eso.", "By the time you arrive, I'll have reflected on it."], ["Para el próximo mes, habré aceptado el resultado.", "By next month, I will have accepted the outcome."], ["Para cuando sea viejo, habré construido la vida que siempre imaginé.", "By the time I'm old, I will have built the life I always pictured."]]
}, {
  id: 5,
  range: [29, 35],
  title: "Present Perfect Continuous",
  bridge: "been",
  priority: 2,
  vocab: [["consistency", "constancia"], ["to cultivate a habit", "cultivar un hábito"], ["self-mastery", "autodominio"], ["journey", "camino"], ["to struggle with", "luchar con"]],
  structures: ["I've been working on this for weeks.", "She's been trying her best.", "We've been improving little by little."],
  ancla: "I've been building this, little by little.",
  pool: [["He estado pensando en eso todo el día.", "I've been thinking about it all day."], ["Ella ha estado esperando pacientemente.", "She's been waiting patiently."], ["Hemos estado trabajando en esto por horas.", "We've been working on this for hours."], ["No he estado durmiendo bien.", "I haven't been sleeping well."], ["¿Has estado practicando?", "Have you been practicing?"], ["Él ha estado evitando el tema.", "He's been avoiding the topic."], ["Él ha estado mejorando cada día.", "He's been improving every day."], ["No he estado descansando lo suficiente.", "I haven't been resting enough."]]
}, {
  id: 6,
  range: [36, 42],
  title: "Past Perfect Continuous",
  bridge: "been",
  priority: 3,
  vocab: [["burnout", "agotamiento extremo"], ["to spiral out of control", "descontrolarse"], ["to hold it together", "mantenerse entero"], ["rough patch", "mal momento"], ["to beat yourself up", "castigarte"]],
  structures: ["I had been struggling with anger before I discovered Stoicism.", "She'd been holding it together.", "We'd been going through a rough patch."],
  ancla: "I'd been losing my cool for weeks — not anymore.",
  pool: [["Había estado luchando contra la ira durante meses.", "I had been struggling with anger for months."], ["Él se había estado castigando por eso.", "He'd been beating himself up over it."], ["Habíamos estado pasando por un mal momento.", "We'd been going through a rough patch."], ["Ella se había estado manteniendo entera.", "She'd been holding it together."], ["Yo había estado evitando el problema.", "I'd been avoiding the problem."], ["Le había estado dando vueltas en mi cabeza por horas.", "I'd been going back and forth in my head for hours."], ["Habían estado descontrolándose poco a poco.", "They'd been spiraling out of control for weeks."], ["Él había estado cargando ese peso solo.", "He'd been carrying that weight alone."]]
}, {
  id: 7,
  range: [43, 49],
  title: "Futuro Perfecto Continuo",
  bridge: "been",
  priority: 3,
  vocab: [["to grind away", "dedicarle esfuerzo constante"], ["non-stop", "sin parar"], ["to chase consistency", "perseguir la constancia"], ["to build something", "construir algo"], ["decade", "década"]],
  structures: ["By the time I turn 40, I will have been practicing this for a decade.", "We'll have been putting up with a lot by then.", "By June, she'll have been working on it non-stop."],
  ancla: "By then, I'll have been building this for years.",
  pool: [["Para cuando cumpla 40, habré estado practicando esto por una década.", "By the time I turn 40, I will have been practicing this for a decade."], ["Habremos estado aguantando mucho para entonces.", "We'll have been putting up with a lot by then."], ["Para junio, ella habrá estado trabajando en eso sin parar.", "By June, she'll have been working on it non-stop."], ["Habré estado dándole duro a esto por años.", "I'll have been grinding away at this for years."], ["Él habrá estado cultivando ese hábito por meses.", "He'll have been cultivating that habit for months."], ["Para entonces, habremos estado construyendo esto juntos.", "By then, we'll have been building this together."], ["Habré estado en ese camino por mucho tiempo.", "I'll have been on that journey for a long time."], ["Ella habrá estado buscando la constancia todo el año.", "She'll have been chasing consistency all year."]]
}, {
  id: 8,
  range: [50, 56],
  title: "Modal: can't have / could've",
  bridge: "modal",
  priority: 3,
  vocab: [["outcome", "resultado"], ["reaction", "reacción"], ["self-control", "autocontrol"], ["to withstand", "resistir"], ["to snap at", "explotar con"]],
  structures: ["That can't have been easy.", "I could've lost it right there.", "She could've handled that better."],
  ancla: "I could've reacted badly — I chose not to.",
  pool: [["Eso no puede haber sido fácil.", "That can't have been easy."], ["No puede haberlo dicho en serio.", "He can't have meant it."], ["Me pude haber descontrolado ahí mismo.", "I could've lost it right there."], ["Ella pudo haberlo manejado mejor.", "She could've handled that better."], ["No puede haber sido tan malo.", "It can't have been that bad."], ["Pudimos haber evitado esa discusión.", "We could've avoided that argument."], ["Él no puede haber dicho eso en serio.", "He can't have meant that seriously."], ["Pude haber reaccionado peor.", "I could've reacted worse."]]
}, {
  id: 9,
  range: [57, 63],
  title: "Modal: may have / might've",
  bridge: "modal",
  priority: 2,
  vocab: [["uncertainty", "incertidumbre"], ["deduction", "deducción"], ["possibility", "posibilidad"], ["to overreact", "reaccionar exageradamente"], ["misunderstanding", "malentendido"]],
  structures: ["She may have known.", "He might've overreacted.", "She might not have understood it."],
  ancla: "It might not be easy, but I must accept it.",
  pool: [["Ella puede haberlo sabido.", "She may have known."], ["Puede haber sido un malentendido.", "It may have been a misunderstanding."], ["Puede que él haya reaccionado exageradamente.", "He might've overreacted."], ["Puede que ella no lo haya entendido.", "She might not have understood it."], ["Puede que haya sido un error.", "It may have been a mistake."], ["Puede que ellos no hayan visto el mensaje.", "They might not have seen the message."], ["Puede que ella haya cambiado de opinión.", "She may have changed her mind."], ["Pudo haber sido peor, la verdad.", "It might have been worse, honestly."]]
}, {
  id: 10,
  range: [64, 70],
  title: "Modal: will have been",
  bridge: "modal",
  priority: 3,
  vocab: [["milestone", "hito"], ["decade", "década"], ["non-stop", "sin parar"], ["journey", "camino"], ["to anchor", "anclarse"]],
  structures: ["I'll have been at this for years by then.", "They'll have been waiting a long time.", "She'll have been chasing consistency all year."],
  ancla: "By then, I'll have been building this for years.",
  pool: [["Habré estado en esto por años para entonces.", "I'll have been at this for years by then."], ["Ellos habrán estado esperando mucho tiempo.", "They'll have been waiting a long time."], ["Para entonces, habré estado construyendo esto por años.", "By then, I'll have been building this for years."], ["Ella habrá estado esperando pacientemente.", "She'll have been waiting patiently."], ["Habremos estado trabajando juntos por una década.", "We'll have been working together for a decade."], ["Él habrá estado ahorrando por meses.", "He'll have been saving up for months."], ["Para el próximo año, habré estado aprendiendo inglés por mucho tiempo.", "By next year, I'll have been learning English for a long time."], ["Habrán estado viviendo ahí por años.", "They'll have been living there for years."]]
}, {
  id: 11,
  range: [71, 77],
  title: "Modal: would've / I'd've",
  bridge: "modal",
  priority: 3,
  vocab: [["I'd rather... than...", "prefiero... que..."], ["to hold back", "contenerse"], ["in hindsight", "en retrospectiva"], ["differently", "distinto"], ["if only", "ojalá"]],
  structures: ["I would've done it differently.", "I'd've done it differently if I could go back.", "I'd rather fight for peace than stay silent."],
  ancla: "I'd rather fight for peace than lose myself in the war.",
  pool: [["Yo lo hubiera hecho distinto.", "I would've done it differently."], ["Lo hubiera hecho distinto si pudiera volver.", "I'd've done it differently if I could go back."], ["Ella hubiera preferido esperar.", "She would've rather waited."], ["Yo no hubiera dicho eso.", "I wouldn't have said that."], ["Él lo hubiera manejado distinto.", "He would've handled it differently."], ["Hubiéramos llegado antes si hubiéramos salido temprano.", "We would've arrived earlier if we had left sooner."], ["Ella no lo hubiera hecho de esa forma.", "She wouldn't have done it that way."], ["Yo hubiera preferido decírselo directo.", "I'd've rather told him directly."]]
}, {
  id: 12,
  range: [78, 84],
  title: "Modal: must've",
  bridge: "modal",
  priority: 3,
  vocab: [["deduction", "deducción"], ["inevitable", "inevitable"], ["to come to grips with", "asumir, hacerse a la idea"], ["certainty", "certeza"], ["to assume", "suponer"]],
  structures: ["That must've been rough.", "I must have looked more upset than I thought.", "You must accept what has already happened."],
  ancla: "It might not be easy, but I must accept it.",
  pool: [["Eso debió haber sido duro.", "That must've been rough."], ["Debo haber parecido más molesto de lo que pensaba.", "I must have looked more upset than I thought."], ["Debió haber sido difícil para ellos.", "It must've been hard for them."], ["Ella debe haber sabido la verdad.", "She must have known the truth."], ["Debemos haber cometido un error.", "We must have made a mistake."], ["Él debe haber llegado tarde otra vez.", "He must have arrived late again."], ["Debiste haber estado muy cansado.", "You must have been very tired."], ["Deben haber olvidado la reunión.", "They must have forgotten the meeting."]]
}, {
  id: 13,
  range: [85, 91],
  title: "Modal: should've been able to",
  bridge: "modal",
  priority: 3,
  vocab: [["to earn your place", "ganarte tu lugar"], ["to prove yourself", "demostrar lo que vales"], ["learning curve", "curva de aprendizaje"], ["to work your way up", "ir escalando"], ["dues", "derecho de piso"]],
  structures: ["I should have been able to figure it out alone.", "You shouldn't have gotten upset about that.", "She should be able to prove herself soon."],
  ancla: "I'm still working my way up — one step at a time.",
  pool: [["Debería haber podido resolverlo solo.", "I should have been able to figure it out alone."], ["No debiste haberte molestado por eso.", "You shouldn't have gotten upset about that."], ["Debería haber podido manejar esto solo.", "I should have been able to handle this alone."], ["Ella debería haber podido terminarlo a tiempo.", "She should have been able to finish it on time."], ["No debiste haber esperado tanto.", "You shouldn't have waited so long."], ["Deberíamos haber podido resolverlo juntos.", "We should have been able to work it out together."], ["Él debería haberlo sabido mejor.", "He should've known better."], ["No debería haber dicho eso.", "I shouldn't have said that."]]
}, {
  id: 14,
  range: [92, 98],
  title: "Modal: ought to have",
  bridge: "modal",
  priority: 1,
  vocab: [["formal obligation", "obligación formal"], ["hindsight", "retrospectiva"], ["responsibility", "responsabilidad"], ["to know better", "saber mejor"], ["expectation", "expectativa"]],
  structures: ["He ought to have known better.", "We ought to have arrived earlier.", "You ought to have checked that first."],
  ancla: "In hindsight, I ought to have known better.",
  pool: [["Él debió haber sabido mejor.", "He ought to have known better."], ["Deberíamos haber llegado antes.", "We ought to have arrived earlier."], ["Ella debió haber avisado antes.", "She ought to have let us know sooner."], ["Deberíamos haber sido más cuidadosos.", "We ought to have been more careful."], ["Él debió haber pedido ayuda.", "He ought to have asked for help."], ["Debiste haber revisado eso primero.", "You ought to have checked that first."], ["Deberían haber llegado a tiempo.", "They ought to have arrived on time."], ["Debí haberlo pensado mejor.", "I ought to have thought it through."]]
}, {
  id: 15,
  range: [99, 105],
  title: "Condicional tipo 2 (hipotético presente)",
  bridge: "modal",
  priority: 3,
  vocab: [["to lose your edge", "perder el filo/hambre"], ["to let your guard down", "bajar la guardia"], ["what if...", "qué tal si..."], ["to hold back", "contenerse"]],
  structures: ["If I let myself enjoy it more, I might lose that hunger.", "If I let my guard down more often, it'd be easier, but riskier too.", "If I could change one thing, it'd be my tone of voice."],
  ancla: "If I stay hungry, I'll keep growing.",
  pool: [["Si me dejara disfrutar más, podría perder esa hambre.", "If I let myself enjoy it more, I might lose that hunger."], ["Si bajara la guardia más seguido, sería más fácil, pero más riesgoso.", "If I let my guard down more often, it'd be easier, but riskier too."], ["Si no tuviera hambre, no crecería.", "If I didn't have that hunger, I wouldn't grow."], ["Si me quedara en el momento, ¿qué perdería?", "If I stayed in the moment, what would I lose?"], ["Si pudiera cambiar algo, sería mi tono de voz.", "If I could change one thing, it'd be my tone of voice."], ["Si me contuviera menos, sería más honesto.", "If I held back less, I'd be more honest."], ["Si confiara más fácil, perdería mi ventaja.", "If I trusted easily, I'd lose my edge."], ["Si soltara el control, ¿qué pasaría?", "If I let go of control, what would happen?"]]
}, {
  id: 16,
  range: [106, 112],
  title: "Condicional tipo 3 (hipotético pasado)",
  bridge: "modal",
  priority: 3,
  vocab: [["to know then what I know now", "saber lo que sé ahora"], ["looking back", "mirando atrás"], ["in hindsight", "en retrospectiva"]],
  structures: ["If I had known then what I know now, I would've started sooner.", "I wouldn't have wasted so much time if I had trusted myself more.", "Looking back, I would've done things differently."],
  ancla: "In hindsight, every mistake was worth it.",
  pool: [["Si hubiera sabido entonces lo que sé ahora, habría empezado antes.", "If I had known then what I know now, I would've started sooner."], ["No habría perdido tanto tiempo si hubiera confiado más en mí.", "I wouldn't have wasted so much time if I had trusted myself more."], ["Mirando atrás, habría hecho las cosas distinto.", "Looking back, I would've done things differently."], ["Si no hubiera cruzado esa línea, todavía confiaría en él.", "If he hadn't crossed that line, I'd still trust him."], ["En retrospectiva, valió la pena cada error.", "In hindsight, every mistake was worth it."], ["Si hubiera pedido ayuda antes, habría sido más fácil.", "If I had asked for help sooner, it would've been easier."], ["Ella no habría reaccionado así si hubiera sabido la verdad.", "She wouldn't have reacted that way if she had known the truth."], ["Si hubiera confiado en mi instinto, habría evitado ese error.", "If I had trusted my gut, I would've avoided that mistake."]]
}, {
  id: 17,
  range: [113, 119],
  title: "Integración: tiempos perfectos mezclados",
  bridge: "mixed",
  priority: 2,
  vocab: [["to reflect on", "reflexionar sobre"], ["turning point", "punto de inflexión"], ["consistency", "constancia"], ["burnout", "agotamiento"]],
  structures: ["I've been thinking about it, but I hadn't decided until today.", "By next year, I'll have been living here for a decade.", "She'd already moved on before I even asked."],
  ancla: "Every tense tells the same story — mine.",
  pool: [["He estado pensando en eso, pero no había decidido hasta hoy.", "I've been thinking about it, but I hadn't decided until today."], ["Para el próximo año, habré vivido aquí por una década.", "By next year, I'll have been living here for a decade."], ["Ella ya había pasado la página antes de que yo preguntara.", "She'd already moved on before I even asked."], ["Hemos estado construyendo esto, y ya hemos aprendido mucho.", "We've been building this, and we've already learned a lot."], ["Para cuando hables con él, ya habré terminado.", "By the time you talk to him, I will have finished."], ["Había estado evitando el tema hasta que por fin lo hablamos.", "I had been avoiding the topic until we finally talked about it."], ["Ella habrá estado esperando, y ya habrá perdido la paciencia.", "She'll have been waiting, and she'll have lost her patience."], ["Habíamos aceptado el resultado antes de que llegaran las noticias.", "We had accepted the outcome before the news arrived."]]
}, {
  id: 18,
  range: [120, 126],
  title: "Integración: modales mezclados",
  bridge: "mixed",
  priority: 2,
  vocab: [["deduction", "deducción"], ["hindsight", "retrospectiva"], ["possibility", "posibilidad"], ["obligation", "obligación"]],
  structures: ["It must've been hard, but you should've asked for help.", "She could've said something, but she might not have known.", "We ought to have prepared better."],
  ancla: "Every modal is a shade of the same truth.",
  pool: [["Debió ser difícil, pero debiste haber pedido ayuda.", "It must've been hard, but you should've asked for help."], ["Ella pudo haber dicho algo, pero puede que no lo haya sabido.", "She could've said something, but she might not have known."], ["Deberíamos haber estado mejor preparados.", "We ought to have prepared better."], ["No puede haber sido tan grave como parecía.", "It can't have been as bad as it seemed."], ["Él debería haber podido resolverlo antes.", "He should have been able to solve it sooner."], ["Yo lo hubiera hecho distinto, sinceramente.", "I would've done it differently, honestly."], ["Puede que ellos hayan cambiado de opinión.", "They may have changed their minds."], ["Debiste haberlo sabido, pero no puedo culparte del todo.", "You must have known, but I can't fully blame you."]]
}, {
  id: 19,
  range: [127, 133],
  title: "Integración: condicionales + modales",
  bridge: "mixed",
  priority: 3,
  vocab: [["hindsight", "retrospectiva"], ["hunger", "hambre (ambición)"], ["edge", "filo, ventaja"], ["anchor", "ancla"]],
  structures: ["If I had known, I would've stayed hungry from the start.", "If I let my guard down, I might lose my edge.", "I should've anchored myself sooner."],
  ancla: "Whatever it takes, I'll anchor myself to what matters.",
  pool: [["Si lo hubiera sabido, me hubiera mantenido con hambre desde el inicio.", "If I had known, I would've stayed hungry from the start."], ["Si bajo la guardia, podría perder mi ventaja.", "If I let my guard down, I might lose my edge."], ["Debí haberme anclado antes.", "I should've anchored myself sooner."], ["Si hubiera confiado más, no habría dudado tanto.", "If I had trusted more, I wouldn't have hesitated so much."], ["Puede que hubiera sido diferente si hubiera actuado antes.", "It might've been different if I had acted sooner."], ["Si me quedara callado, probablemente me arrepentiría.", "If I stayed silent, I'd probably regret it."], ["Debería haber podido verlo venir.", "I should have been able to see it coming."], ["Si hubiera sido más paciente, habría evitado ese error.", "If I had been more patient, I would've avoided that mistake."]]
}, {
  id: 20,
  range: [134, 140],
  title: "Oraciones complejas (although / unless / once)",
  bridge: null,
  priority: 2,
  vocab: [["although / though", "aunque"], ["since", "ya que / desde que"], ["unless", "a menos que"], ["once", "una vez que"], ["even though", "a pesar de que"]],
  structures: ["Although he faced a setback, he stayed calm.", "If I had known about the event, I would have attended.", "Once you accept it, the weight lifts."],
  ancla: "Even though it's hard, I stay stoic.",
  pool: [["Aunque él trabaja muchas horas, siempre encuentra tiempo para su familia.", "Although he works long hours, he always finds time for his family."], ["Ella no pasará el examen a menos que estudie mucho.", "She won't pass the exam unless she studies a lot."], ["Si hubiera sabido sobre el evento, habría asistido.", "If I had known about the event, I would have attended."], ["Una vez que aceptas algo, el peso se libera.", "Once you accept something, the weight lifts."], ["El habría ido a la fiesta si no hubiera estado tan cansado.", "He would have gone to the party if he hadn't been so tired."], ["A pesar de que dolió, no reaccioné.", "Even though it hurt, I didn't react."], ["Hablaré, siempre y cuando valga la pena la pelea.", "I'll speak my mind, provided that it's worth the fight."], ["Mi mente corre, mientras que mi cuerpo se queda quieto.", "My mind races, whereas my body stays still."]]
}, {
  id: 21,
  range: [141, 150],
  title: "Repaso final integrador",
  bridge: "mixed",
  priority: 2,
  vocab: [["to stay hungry", "tener hambre en la vida"], ["to anchor myself", "anclarme"], ["fire and blood", "sangre y fuego"], ["stepping stone", "trampolín"]],
  structures: ["I can't control what happens, only how I'll be responding.", "I should've stayed stoic, but I'm human — and that's okay.", "Whatever happens, I've got this."],
  ancla: "Whatever comes next, I can handle it. Stay stoic.",
  pool: [["No puedo controlar lo que pasa, solo cómo responderé.", "I can't control what happens, only how I'll be responding."], ["Debería haberme quedado tranquilo, pero soy humano.", "I should've stayed calm, but I'm human."], ["Había estado cargando ese peso por mucho tiempo.", "I'd been carrying that weight for too long."], ["Puede que las cosas no salgan como planeo, pero ya lo acepté.", "Things might not go as planned, but I've already accepted that."], ["Pase lo que pase, podría manejarlo.", "Whatever happens, I could handle it."], ["Todavía estoy aprendiendo y creciendo.", "I'm still learning, and I'm still growing."], ["Estaré enfrentando lo que venga, un obstáculo a la vez.", "I'll be facing whatever's ahead, one obstacle at a time."], ["Para el final de esto, habré cambiado mi mentalidad.", "By the end of this, I will have changed my mindset."], ["Siempre he sido sangre y fuego.", "I've always been fire and blood."], ["Mantengo el hambre, porque sin hambre no hay nada.", "I stay hungry, because without hunger, there's nothing."], ["Una vez que mi familia esté asentada, estaré anclado donde debo.", "Once my family is settled, I'll be anchored right where I'm supposed to be."], ["Cada error debió haber sido parte del plan.", "Every mistake must have been part of the plan."], ["Voy a seguir construyendo, un paso a la vez.", "I'm gonna keep building, one step at a time."], ["Si hubiera sabido esto antes, habría empezado antes.", "If I had known this before, I would've started sooner."], ["Un logro es solo un trampolín hacia algo más grande.", "An achievement is just a stepping stone to something bigger."], ["Whatever it takes, me ancle a lo que importa.", "Whatever it takes, I'll anchor myself to what matters."]]
}];

// ===================== BANCO EXTRA: IDIOMS + FRASES PERSONALES =====================
// Generado desde Pautas_StayStoic.txt (Secciones A y B) — 386 idioms + 156 frases personales

const IDIOM_BANK = ["Break the ice", "Piece of cake", "Hit the nail on the head", "Nailed it", "Cost an arm and a leg", "Under the weather", "Let the cat out of the bag", "Once in a blue moon", "The best of both worlds", "Speak of the devil", "Actions speak louder than words", "Every cloud has a silver lining", "It's raining cats and dogs", "On the same page", "Out of the blue", "Easier said than done", "Don't judge a book by its cover", "Kill two birds with one stone", "A blessing in disguise", "Better late than never", "Cut to the chase", "A leopard can't change its spots", "A bird in the hand is worth two in the bush", "A dime a dozen", "A drop in the bucket", "A friend in need is a friend indeed", "Against the clock", "All bark and no bite", "All in the same boat", "All or nothing", "All that glitters is not gold", "An apple a day keeps the doctor away", "An eye for an eye", "A penny saved is a penny earned", "A picture is worth a thousand words", "You can't put lipstick on a pig", "An axe to grind", "Appearances can be deceptive", "Apple of my eye", "A rolling stone gathers no moss", "A slap on the wrist", "A taste of your own medicine", "At the drop of a hat", "As dead as a doornail", "As easy as pie", "As fit as a fiddle", "Sick as a dog", "As mad as a hatter", "As high as a kite", "A watched pot never boils", "See eye to eye", "Don't see eye to eye", "Stab someone in the back", "Get along like a house on fire", "Burn bridges", "Get on someone's nerves", "Give someone the benefit of the doubt", "Rub someone the wrong way", "Two-faced", "Thick as thieves", "On thin ice", "Bury the hatchet", "Give someone the cold shoulder", "Pull someone's leg", "A people person", "Hit it off", "Turn over a new leaf", "Through thick and thin", "Blood is thicker than water", "Not quite over someone", "In the same boat", "A chip off the old block", "A chip on your shoulder", "Birds of a feather flock together", "Bite your tongue", "Different strokes for different folks", "Don't count your chickens before they hatch", "Don't look a gift horse in the mouth", "Every Tom Dick and Harry", "Great minds think alike", "Have a heart of gold", "Keep someone at arm's length", "The apple doesn't fall far from the tree", "Behind someone's back", "Wear your heart on your sleeve", "Think outside the box", "Get the ball rolling", "Back to square one", "The bottom line", "In a nutshell", "Touch base", "Up in the air", "Go back to the drawing board", "A long shot", "Ahead of the curve", "Ballpark figure", "Bring to the table", "By the book", "Call the shots", "Down the road", "Game changer", "Get down to business", "Red tape", "Learn the ropes", "Know the ropes", "Pull strings", "Cutting corners", "Raise the bar", "Hands-on experience", "To be short of", "To do well", "Get down to brass tacks", "Golden handshake", "Graveyard shift", "Bite off more than you can chew", "Can I put you on hold?", "Get through (to someone)", "Get cut off", "Put someone through", "Reach someone", "Are we still on for...?", "Could I jump in here?", "Discuss something (nunca \"discuss about\")", "Comes in (para productos)", "Ahead of", "on", "behind schedule", "For the time being", "Within the hour", "From now on", "Can I get a rain check?", "Short notice", "Call it a day", "Cross that bridge when you come to it", "So far so good", "Play it by ear", "Tied up", "Held up", "Fed up with", "To be spent", "pooped", "To be stuffed", "Get out of hand", "Hang in there", "Chip in", "A win-win situation", "On me", "It was dirt cheap", "Filthy rich", "Scraping by", "Rip-off", "Nest egg", "Penny wise pound foolish", "Look after the pennies and the pounds will look after themselves", "No wonder", "It slipped my mind", "Beats me", "Sounds great!", "Shoot!", "I'm positive", "What are you up to these days?", "My mind went blank", "Deal with it", "Bear with me", "Have a good one", "Ring a bell", "Take it with a grain of salt", "Wrap your head around", "Make a long story short", "That's funny (irónico)", "I live for", "I'm crazy about", "Bite the bullet", "Keep your chin up", "No pain no gain", "Face the music", "Come hell or high water", "By the skin of your teeth", "Leave no stone unturned", "Barking up the wrong tree", "The elephant in the room", "Move on", "Get your act together", "Sit on the fence", "On the fence", "Wait and see", "Between a rock and a hard place", "Beggars can't be choosers", "Bend over backwards", "Bundle up", "It's drizzling", "Hit the sack", "To do something in your sleep", "wanna = want to", "gotta = have got to", "gonna = going to", "whatcha = what are you", "lemme = let me", "dunno = don't know", "kinda = kind of", "Add fuel to the fire", "A drop in the bucket/ocean", "(To be) all fingers and thumbs", "All mouth and no trousers", "An eye for an eye and a tooth for a tooth", "Tit for tat", "Any port in a storm", "A piece of cake", "A place for everything and everything in its place", "(To be) as dead as a doornail", "(To be) as easy as pie", "(To be) as fit as a fiddle", "(To be) sick as a dog", "(To be) as mad as a hatter", "(To be) as red as a beetroot", "(To be) as high as a kite", "Back seat driver", "(To) beat", "flog a dead horse", "Beauty is in the eye of the beholder", "Back to the drawing board", "Beauty is only skin deep", "(To) bend over backwards", "(To) be between a rock and a hard place", "Better the Devil you know than the devil you don't", "Better to be safe than sorry", "(To) bite off more than you can chew", "(To) bite your tongue", "(Once in a) Blue moon", "Break a leg", "Business is business", "Buy a lemon", "By the skin of our teeth", "Cast iron stomach", "Clothes make the man", "Can't cut the mustard", "(To have a) chip on his shoulder", "Close but no cigar", "Cock and bull story", "Cook the books", "To crack someone up", "Fingers Crossed", "to cross your fingers", "(To) cry wolf", "Curiosity killed the cat", "Dark horse", "Dead ringer", "(To play) Devil's advocate", "Don't bite off more than you can chew", "Don't put all your eggs in one basket", "Drastic times call for drastic measures", "(To) drink like a fish", "(To) drive someone up the wall", "Dropping like flies", "Dry Run", "Easy come easy go", "Every dog has its day", "Everyone to his own taste", "Everything but the kitchen sink", "Excuse my French", "(A) feeding frenzy", "(A) field day", "(To) find your feet", "(A) flash in the pan", "(To) foam at the mouth", "Fools rush in where angels fear to tread", "(The) full Monty", "(A) gatecrasher", "(To) get down to brass tacks", "(To) get up on the wrong side of the bed", "Give him an inch and he'll take a mile", "(To) give someone the slip", "(To) go for broke", "(To) go out on a limb", "(To) go the extra mile", "(A) golden handshake", "(A) good samaritan", "(The) graveyard shift", "(A) gut feeling", "(The) hair of the dog", "(To be) hair-raising", "Haste makes waste", "(A) hat trick", "(To) have an axe to grind", "(To be) head over heels", "(To) go down like a lead balloon", "He that fights and runs away lives to fight another day", "He who laughs last laughs the longest", "He who lives by the sword shall die by the sword", "He who pays the piper calls the tune", "(A) high five", "His bark is worse than his bite", "(To) hit the nail on the head", "(To) hit the sack", "(To) hit the spot", "Hold Your Horses", "Home is where the heart is", "Honesty is the best policy", "(To be a) horse of a different colour", "Hope for the best and prepare for the worst", "(The) icing on the cake", "To hit the books", "(It's) in the bag", "(To be) in the heat of the moment", "If a job is worth doing it's worth doing well", "If at first you don't succeed try try again", "If you can't stand the heat get out of the kitchen", "Imitation is the sincerest form of flattery", "To be in stitches", "(To be) in the driver's seat", "It never rains but it pours", "It's (a question of) swings and roundabouts", "It cost an arm and a leg", "It's all Greek to me", "It takes two to tango", "It's a small world", "It's all downhill from here", "It's like talking to a brick wall", "It's like water off a duck's back", "It's not the end of the world", "It's no use crying over spilled milk", "In for a penny in for a pound", "It's six of one and half a dozen of the other", "It's the pot calling the kettle black", "(To) keep an eye on someone", "(To) keep your chin up", "(To) kick the bucket", "Knock on wood", "Touch wood", "(To) know the ropes", "Last but not least", "Laughter is the best medicine", "(To) leave no stone unturned", "Less is more", "Let bygones be bygones", "Let sleeping dogs lie", "(To) let the cat out of the bag", "(A) level playing field", "Lightning never strikes twice", "(To be) like a chicken with its head cut off", "Like father like son", "Live and let live", "(To be) long in the tooth", "Look before you leap", "Look on the bright side", "(To) lose your head", "Loose cannon", "Love at first sight", "Love is blind", "Make hay while the sun shines", "(To) make no bones about something", "Many hands make light work", "(There's) method to my madness", "Money makes the world go round", "Money talks", "Mum's the word", "Necessity is the mother of invention", "Never bite the hand that feeds you", "(There's) no room to swing a cat", "Nothing lasts forever", "Nothing ventured nothing gained", "(To be/get) off on the wrong foot", "(To be) off the hook", "(To be) Off the record", "Once bitten twice shy", "One bad apple can spoil the whole barrel", "Only the good die young", "(To be) on pins and needles", "(To be) on the fence", "(To be) on the same page", "Out of the frying pan into the fire", "On the right track", "On second thought", "Out of sight out of mind", "(To be) out on a limb", "Over my dead body", "(To be) over the moon", "(To) pass the buck", "Practice makes perfect", "Prevention is better than cure", "(To) pull the plug", "(To) pull strings", "(To) put a sock in it", "(To) put on a brave face", "Put your foot in your mouth", "Put your cards on the table"];
const PERSONAL_BANK = [{
  "topic": "Rutina y primera reacción ante frustración",
  "phrase": "I try to keep a lid on it"
}, {
  "topic": "Rutina y primera reacción ante frustración",
  "phrase": "I'm paying my dues"
}, {
  "topic": "Rutina y primera reacción ante frustración",
  "phrase": "I try not to react in the heat of the moment"
}, {
  "topic": "Rutina y primera reacción ante frustración",
  "phrase": "I'm making my presence known"
}, {
  "topic": "Rutina y primera reacción ante frustración",
  "phrase": "I'm letting them know I'm here"
}, {
  "topic": "Batallas que vale la pena pelear — el ajedrez",
  "phrase": "I keep my cards close to my chest"
}, {
  "topic": "Batallas que vale la pena pelear — el ajedrez",
  "phrase": "I try to play my cards right"
}, {
  "topic": "Batallas que vale la pena pelear — el ajedrez",
  "phrase": "It's a losing battle"
}, {
  "topic": "Batallas que vale la pena pelear — el ajedrez",
  "phrase": "I come in guns blazing"
}, {
  "topic": "Batallas que vale la pena pelear — el ajedrez",
  "phrase": "I brush them off"
}, {
  "topic": "Decisiones difíciles / cuando alguien te decepciona",
  "phrase": "to cross the Rubicon"
}, {
  "topic": "Decisiones difíciles / cuando alguien te decepciona",
  "phrase": "After the storm comes the calm"
}, {
  "topic": "Decisiones difíciles / cuando alguien te decepciona",
  "phrase": "trial and error"
}, {
  "topic": "Decisiones difíciles / cuando alguien te decepciona",
  "phrase": "They lose that privilege"
}, {
  "topic": "Decisiones difíciles / cuando alguien te decepciona",
  "phrase": "They're out"
}, {
  "topic": "Celebrar un logro / cómo eras hace 5 años",
  "phrase": "I see it as a stepping stone to something bigger"
}, {
  "topic": "Celebrar un logro / cómo eras hace 5 años",
  "phrase": "I'm bursting with joy"
}, {
  "topic": "Celebrar un logro / cómo eras hace 5 años",
  "phrase": "a tight circle"
}, {
  "topic": "Celebrar un logro / cómo eras hace 5 años",
  "phrase": "my inner circle"
}, {
  "topic": "Celebrar un logro / cómo eras hace 5 años",
  "phrase": "life puts you to the test"
}, {
  "topic": "Celebrar un logro / cómo eras hace 5 años",
  "phrase": "I've become a lot more calculated"
}, {
  "topic": "Celebrar un logro / cómo eras hace 5 años",
  "phrase": "behind closed doors"
}, {
  "topic": "Procesar la emoción en soledad / redes sociales",
  "phrase": "wasting my breath"
}, {
  "topic": "Procesar la emoción en soledad / redes sociales",
  "phrase": "Pride is for outsiders"
}, {
  "topic": "Procesar la emoción en soledad / redes sociales",
  "phrase": "I save my pride for the outside world"
}, {
  "topic": "Procesar la emoción en soledad / redes sociales",
  "phrase": "don't waste time with the people you love"
}, {
  "topic": "Procesar la emoción en soledad / redes sociales",
  "phrase": "I thank God for it"
}, {
  "topic": "Procesar la emoción en soledad / redes sociales",
  "phrase": "to be more grateful"
}, {
  "topic": "Fe en Dios / perdonarte a ti mismo",
  "phrase": "I feel blessed and protected"
}, {
  "topic": "Fe en Dios / perdonarte a ti mismo",
  "phrase": "the weight of carrying a mindset"
}, {
  "topic": "Fe en Dios / perdonarte a ti mismo",
  "phrase": "I truly forgive, and I try to let it go"
}, {
  "topic": "Fe en Dios / perdonarte a ti mismo",
  "phrase": "I haven't forgiven myself"
}, {
  "topic": "Fe en Dios / perdonarte a ti mismo",
  "phrase": "There are things I still haven't made peace with"
}, {
  "topic": "Perdonar a otros / liderazgo en el trabajo",
  "phrase": "They already showed their true colors"
}, {
  "topic": "Perdonar a otros / liderazgo en el trabajo",
  "phrase": "They crossed a line"
}, {
  "topic": "Perdonar a otros / liderazgo en el trabajo",
  "phrase": "There's no going back"
}, {
  "topic": "Perdonar a otros / liderazgo en el trabajo",
  "phrase": "hold on to the good memories"
}, {
  "topic": "Perdonar a otros / liderazgo en el trabajo",
  "phrase": "I haven't turned it up to eleven"
}, {
  "topic": "Perdonar a otros / liderazgo en el trabajo",
  "phrase": "I don't want to come on too strong"
}, {
  "topic": "Perdonar a otros / liderazgo en el trabajo",
  "phrase": "to play the victim"
}, {
  "topic": "Tipo de líder que serás / cosas que evitas decir",
  "phrase": "working my way up from the bottom"
}, {
  "topic": "Tipo de líder que serás / cosas que evitas decir",
  "phrase": "lead by example"
}, {
  "topic": "Tipo de líder que serás / cosas que evitas decir",
  "phrase": "looking for a confrontation"
}, {
  "topic": "Tipo de líder que serás / cosas que evitas decir",
  "phrase": "picking a fight"
}, {
  "topic": "Tipo de líder que serás / cosas que evitas decir",
  "phrase": "they might not agree, but at least they get it"
}, {
  "topic": "Tipo de líder que serás / cosas que evitas decir",
  "phrase": "when my guard is down"
}, {
  "topic": "Confianza con gente nueva / razón vs paz",
  "phrase": "that's where you're tested under pressure"
}, {
  "topic": "Confianza con gente nueva / razón vs paz",
  "phrase": "I don't trust easily"
}, {
  "topic": "Confianza con gente nueva / razón vs paz",
  "phrase": "You have to fight for peace"
}, {
  "topic": "Confianza con gente nueva / razón vs paz",
  "phrase": "If you want peace, prepare for war"
}, {
  "topic": "Confianza con gente nueva / razón vs paz",
  "phrase": "exhaust every last option"
}, {
  "topic": "Confianza con gente nueva / razón vs paz",
  "phrase": "I gave it my all"
}, {
  "topic": "Confianza con gente nueva / razón vs paz",
  "phrase": "I left it all on the table"
}, {
  "topic": "Dar todo tu esfuerzo y perder / bajar la guardia con alguien",
  "phrase": "That weight lifts"
}, {
  "topic": "Dar todo tu esfuerzo y perder / bajar la guardia con alguien",
  "phrase": "a weight is lifted off me"
}, {
  "topic": "Dar todo tu esfuerzo y perder / bajar la guardia con alguien",
  "phrase": "I emptied myself into it"
}, {
  "topic": "Dar todo tu esfuerzo y perder / bajar la guardia con alguien",
  "phrase": "I gave it everything I had"
}, {
  "topic": "Dar todo tu esfuerzo y perder / bajar la guardia con alguien",
  "phrase": "You can't save someone who doesn't want to be saved"
}, {
  "topic": "Dar todo tu esfuerzo y perder / bajar la guardia con alguien",
  "phrase": "let my guard down"
}, {
  "topic": "Dar todo tu esfuerzo y perder / bajar la guardia con alguien",
  "phrase": "no filter"
}, {
  "topic": "Dar todo tu esfuerzo y perder / bajar la guardia con alguien",
  "phrase": "unfiltered"
}, {
  "topic": "Tu esposa / algo que te cuesta lograr ahora",
  "phrase": "Her eyes are a mirror to my soul"
}, {
  "topic": "Tu esposa / algo que te cuesta lograr ahora",
  "phrase": "She strips away my defenses"
}, {
  "topic": "Tu esposa / algo que te cuesta lograr ahora",
  "phrase": "she lays my vulnerabilities bare"
}, {
  "topic": "Tu esposa / algo que te cuesta lograr ahora",
  "phrase": "Everything changes, and that's the only thing that stays the same"
}, {
  "topic": "Tu esposa / algo que te cuesta lograr ahora",
  "phrase": "unlock my potential"
}, {
  "topic": "Tu esposa / algo que te cuesta lograr ahora",
  "phrase": "tap into my potential"
}, {
  "topic": "Tu esposa / algo que te cuesta lograr ahora",
  "phrase": "what's holding me back"
}, {
  "topic": "Tu esposa / algo que te cuesta lograr ahora",
  "phrase": "don't hold back"
}, {
  "topic": "Tu esposa / algo que te cuesta lograr ahora",
  "phrase": "spare no detail"
}, {
  "topic": "Tu esposa / algo que te cuesta lograr ahora",
  "phrase": "self-directed learning"
}, {
  "topic": "Tu esposa / algo que te cuesta lograr ahora",
  "phrase": "figuring it out on my own"
}, {
  "topic": "Tu esposa / algo que te cuesta lograr ahora",
  "phrase": "get my degree validated"
}, {
  "topic": "Tu esposa / algo que te cuesta lograr ahora",
  "phrase": "recognized"
}, {
  "topic": "Estudiar por tu cuenta / pensar como ingeniero filósofo",
  "phrase": "I'm overthinking less and just talking more"
}, {
  "topic": "Estudiar por tu cuenta / pensar como ingeniero filósofo",
  "phrase": "I don't care about being perfect, I just want to learn"
}, {
  "topic": "Estudiar por tu cuenta / pensar como ingeniero filósofo",
  "phrase": "I'd burn myself out"
}, {
  "topic": "Estudiar por tu cuenta / pensar como ingeniero filósofo",
  "phrase": "what caused it, what effect it might have"
}, {
  "topic": "Estudiar por tu cuenta / pensar como ingeniero filósofo",
  "phrase": "I don't think I'm anything special"
}, {
  "topic": "Estudiar por tu cuenta / pensar como ingeniero filósofo",
  "phrase": "climbing the ladder"
}, {
  "topic": "Estudiar por tu cuenta / pensar como ingeniero filósofo",
  "phrase": "I don't know how far my potential can take me"
}, {
  "topic": "Cómo te ha ido / cultura de Estados Unidos",
  "phrase": "All good, just been a bit busy lately"
}, {
  "topic": "Cómo te ha ido / cultura de Estados Unidos",
  "phrase": "thank God"
}, {
  "topic": "Cómo te ha ido / cultura de Estados Unidos",
  "phrase": "I haven't quite cracked it yet"
}, {
  "topic": "Cómo te ha ido / cultura de Estados Unidos",
  "phrase": "I just care about getting by and being functional"
}, {
  "topic": "Chiste que no entiendes / cambiarías tu voz",
  "phrase": "I don't want to look lost"
}, {
  "topic": "Chiste que no entiendes / cambiarías tu voz",
  "phrase": "I don't want to look clueless"
}, {
  "topic": "Chiste que no entiendes / cambiarías tu voz",
  "phrase": "I don't react"
}, {
  "topic": "Chiste que no entiendes / cambiarías tu voz",
  "phrase": "I just let it slide"
}, {
  "topic": "Chiste que no entiendes / cambiarías tu voz",
  "phrase": "I don't care what's going on"
}, {
  "topic": "Chiste que no entiendes / cambiarías tu voz",
  "phrase": "a more commanding voice"
}, {
  "topic": "Chiste que no entiendes / cambiarías tu voz",
  "phrase": "more masculine"
}, {
  "topic": "Lugar para desconectar / explicar tu trabajo en Amazon",
  "phrase": "my go-to place to unwind"
}, {
  "topic": "Lugar para desconectar / explicar tu trabajo en Amazon",
  "phrase": "when I'm overwhelmed"
}, {
  "topic": "Lugar para desconectar / explicar tu trabajo en Amazon",
  "phrase": "her advice, her wisdom"
}, {
  "topic": "Lugar para desconectar / explicar tu trabajo en Amazon",
  "phrase": "making sure the work gets done"
}, {
  "topic": "Lugar para desconectar / explicar tu trabajo en Amazon",
  "phrase": "keeping a visible presence"
}, {
  "topic": "Lugar para desconectar / explicar tu trabajo en Amazon",
  "phrase": "making my presence felt"
}, {
  "topic": "Lugar para desconectar / explicar tu trabajo en Amazon",
  "phrase": "keeping people on their toes"
}, {
  "topic": "Consejo de tu mamá / hobby fuera del trabajo — los relojes",
  "phrase": "someone who helps you let go of that weight"
}, {
  "topic": "Consejo de tu mamá / hobby fuera del trabajo — los relojes",
  "phrase": "she really lifts your spirits"
}, {
  "topic": "Consejo de tu mamá / hobby fuera del trabajo — los relojes",
  "phrase": "the work belongs to God, not man"
}, {
  "topic": "Consejo de tu mamá / hobby fuera del trabajo — los relojes",
  "phrase": "to mark certain milestones in my life"
}, {
  "topic": "Consejo de tu mamá / hobby fuera del trabajo — los relojes",
  "phrase": "in honor of my family"
}, {
  "topic": "Consejo de tu mamá / hobby fuera del trabajo — los relojes",
  "phrase": "I've got a few projects I've let fall by the wayside"
}, {
  "topic": "Consejo de tu mamá / hobby fuera del trabajo — los relojes",
  "phrase": "everything piled up at once"
}, {
  "topic": "El reloj de tu hermano / ver fútbol solo o acompañado",
  "phrase": "it's my way of honoring him"
}, {
  "topic": "El reloj de tu hermano / ver fútbol solo o acompañado",
  "phrase": "it's got its complications"
}, {
  "topic": "El reloj de tu hermano / ver fútbol solo o acompañado",
  "phrase": "I have no filter, no restraint"
}, {
  "topic": "El reloj de tu hermano / ver fútbol solo o acompañado",
  "phrase": "I let loose"
}, {
  "topic": "El reloj de tu hermano / ver fútbol solo o acompañado",
  "phrase": "I just let go"
}, {
  "topic": "El reloj de tu hermano / ver fútbol solo o acompañado",
  "phrase": "that's where I let it all out"
}, {
  "topic": "En diez años / un sueño no práctico",
  "phrase": "just thinking about it gets me excited"
}, {
  "topic": "En diez años / un sueño no práctico",
  "phrase": "running around in the yard"
}, {
  "topic": "En diez años / un sueño no práctico",
  "phrase": "nothing fancy"
}, {
  "topic": "En diez años / un sueño no práctico",
  "phrase": "nothing out of the ordinary"
}, {
  "topic": "En diez años / un sueño no práctico",
  "phrase": "a love I won't be able to fight"
}, {
  "topic": "En diez años / un sueño no práctico",
  "phrase": "it'll anchor me here"
}, {
  "topic": "En diez años / un sueño no práctico",
  "phrase": "the kind of things that make me lose myself"
}, {
  "topic": "Anclarte: pérdida o llegar donde debías / última vez que reíste",
  "phrase": "making one plan and ending up on a completely different one"
}, {
  "topic": "Anclarte: pérdida o llegar donde debías / última vez que reíste",
  "phrase": "faster than I expected"
}, {
  "topic": "Anclarte: pérdida o llegar donde debías / última vez que reíste",
  "phrase": "staying anchored to the people I love"
}, {
  "topic": "Anclarte: pérdida o llegar donde debías / última vez que reíste",
  "phrase": "I'm not a bitter person"
}, {
  "topic": "Anclarte: pérdida o llegar donde debías / última vez que reíste",
  "phrase": "I laugh a lot, but only with the people who really get me"
}, {
  "topic": "Qué te da miedo de verdad / lección a tus futuros hijos",
  "phrase": "the possibility of losing her crept in"
}, {
  "topic": "Qué te da miedo de verdad / lección a tus futuros hijos",
  "phrase": "the drop"
}, {
  "topic": "Qué te da miedo de verdad / lección a tus futuros hijos",
  "phrase": "nothing but open air"
}, {
  "topic": "Qué te da miedo de verdad / lección a tus futuros hijos",
  "phrase": "it's the worst fear I've ever felt"
}, {
  "topic": "Qué te da miedo de verdad / lección a tus futuros hijos",
  "phrase": "it's more caution than fear"
}, {
  "topic": "Qué te da miedo de verdad / lección a tus futuros hijos",
  "phrase": "build their own destiny"
}, {
  "topic": "Qué te da miedo de verdad / lección a tus futuros hijos",
  "phrase": "stay hungry"
}, {
  "topic": "Qué te da miedo de verdad / lección a tus futuros hijos",
  "phrase": "without hunger, there's nothing"
}, {
  "topic": "Primera impresión que das / error en el trabajo",
  "phrase": "it doesn't match who I really am on the inside"
}, {
  "topic": "Primera impresión que das / error en el trabajo",
  "phrase": "I read people really well"
}, {
  "topic": "Primera impresión que das / error en el trabajo",
  "phrase": "it doesn't leave room for me to be kind to that person"
}, {
  "topic": "Primera impresión que das / error en el trabajo",
  "phrase": "I give off the wrong impression"
}, {
  "topic": "Primera impresión que das / error en el trabajo",
  "phrase": "find a way to fix it"
}, {
  "topic": "Primera impresión que das / error en el trabajo",
  "phrase": "find a workaround"
}, {
  "topic": "Primera impresión que das / error en el trabajo",
  "phrase": "flag it"
}, {
  "topic": "Primera impresión que das / error en el trabajo",
  "phrase": "report it"
}, {
  "topic": "Qué dejaste en Venezuela / qué tipo de abuelo serás",
  "phrase": "a life that isn't mine anymore"
}, {
  "topic": "Qué dejaste en Venezuela / qué tipo de abuelo serás",
  "phrase": "someone I'm not anymore"
}, {
  "topic": "Qué dejaste en Venezuela / qué tipo de abuelo serás",
  "phrase": "give unsolicited advice"
}, {
  "topic": "Qué dejaste en Venezuela / qué tipo de abuelo serás",
  "phrase": "let them be the bad cop"
}, {
  "topic": "Qué dejaste en Venezuela / qué tipo de abuelo serás",
  "phrase": "I don't mind"
}, {
  "topic": "Qué dejaste en Venezuela / qué tipo de abuelo serás",
  "phrase": "I'm good with that"
}, {
  "topic": "Tu lema / la paz se siente aburrida / qué te sorprendió",
  "phrase": "I'm fire and blood"
}, {
  "topic": "Tu lema / la paz se siente aburrida / qué te sorprendió",
  "phrase": "I like watching the world burn"
}, {
  "topic": "Tu lema / la paz se siente aburrida / qué te sorprendió",
  "phrase": "as long as I'm not the one caught in it"
}, {
  "topic": "Tu lema / la paz se siente aburrida / qué te sorprendió",
  "phrase": "it just feels boring"
}, {
  "topic": "Tu lema / la paz se siente aburrida / qué te sorprendió",
  "phrase": "nothing to execute"
}, {
  "topic": "Tu lema / la paz se siente aburrida / qué te sorprendió",
  "phrase": "nothing to carry out"
}, {
  "topic": "Cambiarías el aburrimiento / agradecido con Dios / cierre",
  "phrase": "You wage war to find peace"
}, {
  "topic": "Cambiarías el aburrimiento / agradecido con Dios / cierre",
  "phrase": "I feel like an impostor"
}, {
  "topic": "Cambiarías el aburrimiento / agradecido con Dios / cierre",
  "phrase": "I don't feel like I deserve everything he's given me"
}, {
  "topic": "Cambiarías el aburrimiento / agradecido con Dios / cierre",
  "phrase": "even if it doesn't seem that way"
}];
const EXTRA_BANK = [...IDIOM_BANK.map((p, i) => ({
  id: 'idiom_' + i,
  kind: 'idiom',
  phrase: p
})), ...PERSONAL_BANK.map((p, i) => ({
  id: 'personal_' + i,
  kind: 'personal',
  phrase: p.phrase,
  topic: p.topic
}))];

/* ===================== BANCO PLANO DE GRAMATICA ===================== */
