/* Application State Variables */
let currentScene = 1;
let boyfriendPhone = localStorage.getItem('bf_whatsapp_number') || '+919656320417';
let candleBlown = false;
let heartTaps = 0;
let mwhhhTaps = 0;
let isMusicPlaying = false;
let audioCtx = null;
let melodyInterval = null;

// 4 Stationery Pens State
let penOpenState = { 1: false, 2: false, 3: false, 4: false };
let penCollections = {
  1: [
    { id: 101, title: "Your Warm Heart", content: "Nte kujjiii paaaveeee,ponnnummm kattte ithhhh ithronnnummm cheyyyannn pattummm ennn njn karuthiyathalla but nthoo cheyyanamm enn thoniii ninak venndii😻🫶" },
    { id: 102, title: "Secret Sanctuary", content: "nthooo eee pennn athreemmm athremmm precious annnedaaa nthooo nammllle memmories fulfil avannel athilll oru big part ee pen thannneyannnu 😁🙈 " }
  ],
  2: [
    { id: 201, title: "Midnight Calls", content: "Kujjjipennne ninakkk oooormmma ndooo vaveee nmmmlll rathriiii mute akkki 2 hr okkke calll akkkunnnne nthhh rassalle athokkkke , da pattti sheikkkummmm i miss you soo much😩🫠" },
    { id: 202, title: "When I Miss You", content: "Shuttumaniiii ninak ariyoooo njn ninnne ethra miss cheyyynd ennn ninnne kaanathirikkkammmm pattunnnillladooo, No words can explain the way iam missing youhhh, Miss youhhh soo muchhhh, Mwhhhhhhhhhhhhhh💋😩, love youuu ponnnehh💋🫶" }
  ],
  3: [
    { id: 301, title: "For my kujji pavathin", content: "Nte kujjjipennnneee, pinnnedallooo ennne vittt povallle tto enikkk sathyttumm vere arooolaaaa I LOVE YOUHHHH so muchhhhh💋😩 " },
    { id: 302, title: "To my sonthammm wifen", content: "Happy Birthday to the most special person in my life! On your special day, I just want you to know how much you mean to me.You bring light, laughter, and so much love wherever you go.May your day be filled with all the happiness you deserve, and may this year bring you endless success, peace, and joy.Always stay the amazing person you the world is better with you in are it, I LOVE YOUHHH SOOO SOO MUCHHHH🥹😽" }
  ],
  4: [
    { id: 401, title: "Achummmmmmoyyyyyy", content: "In english we say I LOVE YOUHHHHH , but in poetry If my heart were a home, room would every be filled with your light😽😻, dahhh Being loved by you is the most beautiful thing that has ever happened to me🥹🫶, BCZ EVERYTHING DEPENDED ON A MWWWHHHHHHHHHHH ALLLE🤭💋" },
    { id: 402, title: "PONNU MISSEYYYYYY", content: "Out of eight billion souls, loving you is the best choice I have ever made, A million words is not enough to describe you, but I just have three words for you: I LOVE YOUHHHH🥹💋" }
  ]
};

// Open When Envelopes Content
const openWhenLetters = {
  1: {
    title: "Open When You Miss Me 💌",
    content: "Close your eyes right now and take a deep breath. Imagine my arms wrapping around you and pulling you in close. Distance is only temporary, but every single beat of my heart belongs strictly to you. I'm counting down every minute until I hold you again💎💋!"
  },
  2: {
    title: "Open When You've Had A Tiring Day 🛋️",
    content: "Put your phone down after this, take off your shoes, and wrap yourself in the softest blanket you own. You did amazingly today, my brave girl. You don't have to carry the whole world on your shoulders—rest now, because I am always proud of you 🥹😽!"
  },
  3: {
    title: "Open When You Can't Sleep At 2:00 AM 🌙",
    content: "Hey insomnia sweetheart... If you're awake right now, look outside at the stars. Somewhere under that exact same sky, I am dreaming about your smile. Imagine me softly playing with your hair until your eyes get heavy. Sleep peacefully, my babyyyyyyyy, mwwhhhhhhh😽💌!"
  },
  4: {
    title: "Open On Your Birthday Morning (Oct 15, 2026) 🎂",
    content: "WAKE UP BIRTHDAY RAJAKUMARIIII! Today is the greatest day of the entire calendar year because it's the day the universe gifted you to the world! Smile today, laugh loud, and know that you are deeply, unconditionally loved beyond measure!😻💋"
  },
  5: {
    title: "Open When You Need To Know How Gorgeous You Are 👑",
    content: "Look in the mirror right now. The way your eyes catch the light, your adorable laugh lines, your effortless grace—you are the most stunning girl I have ever laid eyes upon. Never ever forget how completely breathtaking you are to me, bcz everything depended on a mwhhh!😻💋"
  }
};

// 100 Star Reasons Database
const starReasons = [
  "Nee deshyam pidichirikkummbolll ulla aa look ndallo, ente ponno ath kaanana kooduthal bhangiii🙈❤️",
  "The way you randomly call my name just to say 'I love you' or nothing at all🥹🫶",
  "Niteee nunakuzhiii ndallooo nthhh rasssa ariyoo kanammmm🤭😁",
  "How you remember every single tiny detail I told you months ago, without me even realizing it💎✨",
  "Njan serious aayi irikkumbol ente mukhath nokki kokrachiiii kaanichu chiripikkunna aa kazhivu🤭😂",
  "The cute way your eyes sparkle whenever you see something you really like or get excited about✨👀",
  "Nite kai pidich nadakkumpol kittunna aa confidence um safety feeling um vera ewidem kittiilla🫂❤️",
  "Enikku sankadam verumpol ninte aa oru soft hug mathi ella tensions um 0.1 secondil maari kittaannn🥺🫶",
  "The way you scrunch your nose when you don't agree with something I said👃🙈",
  "Ennod oru cheriya karyathinu pinnaggi nilkkunnath kaanan enthoru cuteness aannn🤭👑",
  "How you look effortlessly gorgeous even when you're just wearing messy hair and oversized tees🌸✨",
  "Nee ente life ll vanna sesham aanu ororo ordinary days polum itrem special aayi thonnan thudangiyath💎❤️",
  "The way you get jealous over silly things and then try hard to pretend you're not jealous at all🙈 jealousy queen!",
  "Namukku mathram manasilavunna kure private jokes um ath kettu irunnu chiriyummmmm😂🫶",
  "Because your presence alone turns my worst, stressful days into peaceful ones🕊️🤍",
  "Nee ororo kadhakal explain cheyyumbolulla aa kaiyyaalum kannukalilum ulla actions ndallo, so cinematic & cute🎬😻",
  "The way you check up on me to ask 'food kazhicho?' with all genuine care and love🍲🥹",
  "Ninne nokki irikkumbol time pokunnathe ariyilla, angane oru magic ninte mukhathe undu🕰️🪄",
  "How you always support my dreams and make me feel like I can conquer the whole world🌍🔥",
  "Nee karayumbol enikku sankadam aavum, pakshe ninte kannuneer thudachu tharanulla bhagyam enikkanallo enna santhosham🥺❤️",
  "The warm forehead kisses we share that make every fear disappear in a heartbeat💋🕊️",
  "Niteeee aaa potti potti ullla chiri ndaloo sooo soooo nthooo annn🤭😁",
  "Because you are my safest diary, ennikku enthum open aayi parayan patunna ore oral nee mathram aannn📖🔒",
  "Nee oru paattu paadumbool ath kelkkan enthoru resamaa, but neee padillalloooo🎶🥰",
  "The cute pout you make right before asking for something you really want🥺🎀",
  "Ninte aa innocent heart... dheshymmm kooodthalll aaanelllummm athummm oru caring allle💎🤍",
  "The sweet smell of your hair whenever you lean in for a close hug🌸💆‍♀️",
  "Njan enthenkilum silly joke paranjalum enikku vendi mathram pottichirikunna ninte aa support laugh😂❤️",
  "Because you make me feel like the luckiest and most loved boy in the whole universe🌌👑",
  "Nee urangumbol ulla aa kidappu ndallo, oru paavam angel urangunnath poleyaa👼😴",
  "The way you look at me across a crowded room and give that secret soft smile, example annn aaa busnnn nyttt edk edkkk nokkiyillle👀🙈",
  "Ninte cheriya cheriya achievements polum celebration aakkan thonnunna tharam oru bonding aannn nammal thammil🎉🥳",
  "Because you're not just my girlfriend, you are truly my bestest friend in life👫🫶",
  "Nee chothikkkathe mmmwhhh tharummmbooo ullla feel ndalloooo, ente ponno 🤭💋",
  "The way you get surprised and blush like a baby whenever I give you unexpected compliments🙈🍅",
  "Enikku vendi nee edukkunna small small efforts and cares, everything is deeply noted and loved📝❤️",
  "Because our silence together never feels awkward; it always feels like home🏡🤍",
  "Nee deshyapettu 'poda pattiiii etc' ennu parayumbol polum athil ulla sneham enikku thirichariyan pattum🤭💋",
  "How you listen to my boring rants with all patience and genuine interest👂🥹",
  "Ninte koodulla late night deep talks are thousand times better than sleeping early🌙✨",
  "The way you walk next to me and quietly hold my little finger with yours🤙❤️",
  "Nee enikku thanna first gift um ninte handwritten notes um njan innathrem bhadramayi vechittundu like aa birthday cup,letters ,pens etc...🤭🙈❤️",
  "Because you make every place we go feel ten times more romantic and memorable🏖️🌅",
  "Ninte silly doubts um athinte peril ulla ninte curious questions um kelkkan enthoru rasam aannn but some doubts are sooo sooo dangorous 🤭❓",
  "pinnneeee nite chimbanzeeennn ullla aaa viliiii🤭🫶",
  "Nee ennod thararkkam koodi jayichu ennu karuthi kanikunna aa victory smile ndallo, athil njan ennum tholkan tayyar aannn👑😂",
  "Because your cute giggles can cure literally any headache or sadness within seconds💆‍♂️✨",
  "Ninte photo gallery ll nammude undennu think cheyyumbolll ulla santhosham📸🤪",
  "The way you fix my hair or collar when we meet, with pure natural care👔🥰",
  "Nee entethaanu enna single thought enikku tharunna dhairyam vera onninum tharan pattilla🔥💪",
  "Because you love me for who I really am, without expecting me to pretend anything🎭❌",
  "Nee tharunna surprise kisses on the cheek that make me completely freeze and blush🙈💋",
  "The excitement in your voice when you share some spicy gossip from your day🗣️🔥",
  "Ninte aa soft touch that sends butterflies through my stomach even after all this time🦋💓",
  "Because you always make sure I never go to sleep feeling upset or angry🌙🫂",
  "Nee ente photo kandu 'handsome aayitund' ennu parayumbol kittaatha oru kick um vera aarum paranjal kittilla🤭😎",
  "The way you protect and care for our little relationship like the most fragile, precious treasure💎🛡️",
  "Ninte aa beautiful eyes... enthoru rasssa athil nokki irikkumpol 👀🌊",
  "Because you make distance feel so small with your endless love and reassurance📱💌",
  "Nee ennod kochu kuttikale pole konjalum varthamanangalum parayumbol ullil oru kuliraannn🍼🥺",
  "The adorable way you get excited about rain, flowers, and tiny beautiful things in nature🌧️🌸",
  "Njan driving cheyyumbol ente vayarilooode kayyy ittt kettipidichhh irikkkunnna athhh ndallooo🤭💋",
  "Because you are the exact answer to every prayer I silently made for true love🤲🕊️",
  "Ninte madiyil thala vechu kidannu ninte viralukal ente mudiye thazhukumpol kittunna aa peace... swargam aanu ath💆‍♂️☁️",
  "The way you tease me until I start laughing uncontrollably alongside you😂🤣",
  "Ninte chiri kandal ariyathe ente chundilum oru chiriyum santhoshavum verum, ath oru contagious magic aannn🪄😊",
  "Because no matter how chaotic the world gets, your voice brings me instant calm🎧🤍",
  "Nee njn ariyathheee ennne chiripppikkunnnathhh🙈😩",
  "The way you dramatically reenact things that happened to you 🎭😆",
  "Ninte kai viralukal ennum ente viralukalude idayil irikkan vendi mathram undakkiyath pole thonnum🤝💍",
  "Because you never give up on us, even when misunderstandings happen between us🌈✨",
  "Nee enikku parayan ulla karyangal ente kannukal kandu thanne kandupidikkunna aa mind-reading skill👁️🔍",
  "The sweet, sleepy good-morning messages that make waking up 100 times better🌅💌",
  "Ninte aa kochu kochu sankadangal ennod open aayi vannu paranj karayunna aa trust 🥺💎",
  "Because every sunset looks infinitely more poetic when you are right beside me🌅🧡",
  "Nee enikku tharunna priority... njan ninte life ll ethra important aanennu enikku thonnikkunna moments👑❤️",
  "The cute face you make when you try to act tough and angry but end up laughing instead😤😂",
  "Ninte sneham enikku tharunna oru emotional security ndalloo, athanu ente real strength🛡️🫶",
  "Because you make me believe that fairytales and true soulmates really do exist in real life🧚‍♂️✨",
  "Nee ennod parayunna cheriya cheriya secrets that nobody else in this whole world knows🤫🔒",
  "The funny ways you pronounce certain words just to annoy me playfully🗣️😜",
  "Njan illatha timil polum ente nallathinu vendi aalojikkunna ninte aa selfless manassu🕊️🤍",
  "Because holding your waist and pulling you close feels like somthinggg......🏠🫂",
  "Ninte childish innocence... ninte ullile aa kochu kuttiye ennum ingane kaanan aanu enikkishtam👧🎈",
  "The way you randomly send me cute reels and memes just to make my boring day fun📱😹",
  "Ninte koode nadakkumpol ente heart beat koodunnath innum enikku feel cheyyan pattum💓💓",
  "Because you are the prettiest girl in  entire universe!👑✨",
  "Ninte aa soft lips enikku tharunna sweet sweet kisses that solve every bad mood💋🙈",
  "How you celebrate my tiny wins as if you won a world cup yourself🏆🎉",
  "Nee ennne kanikkkannn vennndi ayakkunnn video and ptossss okkke💃👀",
  "Because even in a room full of artwork, I would still keep staring at your face🖼️🌸",
  "Ninte koodulla coffee dates and simple chaya kudikkal feels like luxury dates☕🍩",
  "The way you scold me with so much care when I don't sleep on time or take care of my health🩺🥺",
  "Because you are my biggest blessing, my bestest choice, and my greatest answered wish🌟🤲",
  "Nee ennum ente koode thanne undavum enna aa oru vakk enikku tharunna samadhanam🕊️🤍",
  "The way your fingers feel so soft when you interlock them with mine🤝✨",
  "Ninte chiriyum ninte santhoshavum kaanunnathann ente lifile number one priority ennu njan thiricharinjath ninte sneham kondaannn🎯❤️",
  "Because every single love song suddenly started making sense the day you came into my life🎵🎧",
  "Ninte koodulla ororo second um enikku oru aayussinte niranja ormakalaanu⏳💎",
  "And finally, because loving you is the easiest, sweetest, and most natural thing my heart has ever done since day one and forever!💋❤️‍🔥"
];
let starPullCounter = 0;

// Bucket List State
let coupleBucketList = [
  { id: 1, text: "Njanummm neeyummm mathhrammm ullla oru long drive🚙🗺️", checked: true },
  { id: 2, text: "Late night ice cream thinnnall and moviee kanalllll 🍦🌙", checked: true },
  { id: 3, text: "Cook a messy dinner together without burning anything 🍝👩‍🍳", checked: false },
  { id: 4, text: "rannndaklllummmm ottta blanket nte ulllill kettipidichhhh kidakkkanammm ✨🌌", checked: true },
  { id: 5, text: "Build a massive cozy blanket fort and watch animated movies 🍿🏰", checked: false },
  { id: 6, text: "Travel to all world and creat a massive memmoriesee🐚", checked: true }
];

// Vinyl Soundtrack State
const vinylTracks = [
  { title: 'Track 1: "Aadyam Thammil"', desc: 'The gentle melody of the very first day our eyes met.', freqs: [440, 523, 659, 783] },
  { title: 'Track 2: "Midnight Whispers"', desc: 'Soft chords reminding me of our late-night 3 AM calls.', freqs: [392, 493, 587, 740] },
  { title: 'Track 3: "15.10.2026 Forever"', desc: 'The joyful birthday fanfare dedicated to your beautiful smile.', freqs: [523, 659, 783, 1046] }
];
let currentVinylIndex = 0;
let isVinylPlaying = false;
let vinylAudioInterval = null;

// Love letter default data
let defaultLetterData = {
  salutation: "My Sweetest Girl,",
  body: "Happy Birthday, my whole universe. If someone asked me what magic feels like, I would simply say your name. You walked into my life and suddenly the world wasn’t just ordinary days passing by—it became an adventure of laughter, warm smiles, and pure warmth.\n\nYour smile has the power to fix my worst days, and your laughter is my absolute favorite sound in existence. In your eyes, I found my calm, my home, and the person I want to love fiercely for every tomorrow we will ever see.\n\nToday, on October 15, 2026, I make you this promise: I will always be here to hold your hand, celebrate your wins, wipe away your worries, and remind you every single day how deeply and endlessly you are cherished.",
  signoff: "Forever & always yours,",
  sender: "With all my love & infinite kisses ❤️"
};
let letterData = JSON.parse(localStorage.getItem('saved_love_letter') || 'null') || defaultLetterData;

function applyLoveLetterToUI() {
  document.getElementById('letterSalutation').innerText = letterData.salutation;
  const bodyContainer = document.getElementById('letterBodyContent');
  bodyContainer.innerHTML = '';
  const paragraphs = letterData.body.split('\n\n').filter(p => p.trim() !== '');
  paragraphs.forEach(para => {
    const pElem = document.createElement('p');
    pElem.innerText = para;
    bodyContainer.appendChild(pElem);
  });
  document.getElementById('letterSignoff').innerText = letterData.signoff;
  document.getElementById('letterSenderName').innerText = letterData.sender;
}
applyLoveLetterToUI();

document.getElementById('currentPhoneDisplay').innerText = boyfriendPhone;
document.getElementById('phoneInput').value = boyfriendPhone;

// Countdown logic
const targetBirthday = new Date('2026-10-15T00:00:00');
function updateCountdown() {
  const now = new Date();
  const diff = targetBirthday - now;
  if (diff <= 0) {
    document.getElementById('introDays').innerText = "00";
    document.getElementById('introHours').innerText = "00";
    document.getElementById('introMinutes').innerText = "00";
    document.getElementById('introSeconds').innerText = "00";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('introDays').innerText = String(days).padStart(2, '0');
  document.getElementById('introHours').innerText = String(hours).padStart(2, '0');
  document.getElementById('introMinutes').innerText = String(mins).padStart(2, '0');
  document.getElementById('introSeconds').innerText = String(secs).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Web Audio Synthesizer
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playTone(freq, type = 'sine', duration = 0.35, gainLevel = 0.15) {
  try {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(gainLevel, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.warn("Audio Context:", e);
  }
}

function playPop() { playTone(520, 'sine', 0.12, 0.2); }
function playKissChime() {
  playTone(700, 'sine', 0.1, 0.25);
  setTimeout(() => playTone(950, 'triangle', 0.25, 0.2), 80);
}
function playChime() {
  playTone(587.33, 'triangle', 0.4, 0.15);
  setTimeout(() => playTone(880, 'sine', 0.6, 0.12), 120);
}
function playPaperRustle() {
  playTone(320, 'triangle', 0.15, 0.1);
  setTimeout(() => playTone(640, 'sine', 0.2, 0.12), 60);
}
function playCelebrationFanfare() {
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((n, i) => {
    setTimeout(() => playTone(n, 'triangle', 0.5, 0.18), i * 140);
  });
}

// Create a real audio player for your song
const bgMusic = new Audio('June Video Song _ Aadyam Thammil _ Ifthi _ Sooraj Santhosh _ Anne Amie _ Rajisha Vijayan(MP3_160K).mp3');

bgMusic.loop = true; // Loops the song continuously

function toggleRomanticMusic() {
  const soundIcon = document.getElementById('soundIcon');
  const soundLabel = document.getElementById('soundLabel');

  if (!isMusicPlaying) {
    bgMusic.play().then(() => {
      isMusicPlaying = true;
      soundIcon.innerText = "🎶";
      soundLabel.innerText = "Playing";
      showToast("Playing our special song 💖");
    }).catch(err => {
      console.log("Audio play blocked by browser, please tap screen first", err);
    });
  } else {
    bgMusic.pause();
    isMusicPlaying = false;
    soundIcon.innerText = "🎵";
    soundLabel.innerText = "Melody";
    showToast("Song paused.");
  }
}

// 14-Scene Navigation Handler
function goToScene(sceneNumber) {
  playPop();
  document.querySelectorAll('main > section').forEach(sec => sec.classList.add('hidden'));
  const targetSec = document.getElementById(`scene-${sceneNumber}`);
  if (targetSec) {
    targetSec.classList.remove('hidden');
    currentScene = sceneNumber;
  }

  // Update 14-dot indicator
  for (let i = 1; i <= 14; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (dot) {
      if (i === sceneNumber) {
        dot.className = "w-3 h-3 rounded-full bg-pink-600 transition shadow-sm";
      } else {
        dot.className = "w-2.5 h-2.5 rounded-full bg-pink-200 hover:bg-pink-400 transition";
      }
    }
  }

  const navLabels = {
    1: 'October 15, 2026 Celebration',
    2: 'Scene 2: 4 Secret Blue & White Pens 🖋️',
    3: 'Scene 3: Our Memory Scrapbook 📸',
    4: 'Scene 4: Dedicated Photo Wall 👑',
    5: 'Scene 5: Dedicated Love Letter 💌',
    6: 'Scene 6: "everything depended on mwhhhh🙈💋"',
    7: 'Scene 7: "Open When..." Letters 💌',
    8: 'Scene 8: Glowing Star Jar ⭐',
    9: 'Scene 9: Couple Bucket List 🗺️',
    10: 'Scene 10: Retro Vinyl Soundtrack 🎵',
    11: 'Scene 11: Cute Mini-Games & Coupons 🎟️',
    12: 'Scene 12: Birthday Cake & Wish 🎂',
    13: 'Scene 13: Relationship Quiz 💌',
    14: 'Scene 14: Send Answers on WhatsApp 📲'
  };
  document.getElementById('navSceneLabel').innerText = navLabels[sceneNumber] || 'October 15, 2026';
  
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (sceneNumber === 2) renderAllPensScrolls();
  if (sceneNumber === 9) renderBucketList();
  if (sceneNumber === 14) prepareWhatsAppPreview();
}

function unlockSurprise() {
  playChime();
  confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
  showToast("Seal broken! Opening your universe... 🖋️");
  setTimeout(() => goToScene(2), 700);
}

/* Pen handling functions */
function toggleSpecificPen(penId) {
  const penUnit = document.getElementById(`pen-unit-${penId}`);
  penOpenState[penId] = !penOpenState[penId];

  if (penOpenState[penId]) {
    penUnit.classList.add('is-open');
    playChime();
    renderScrollsForPen(penId);
    showToast(`Pen #${penId} unscrewed! Secret chits revealed 📜`);
  } else {
    penUnit.classList.remove('is-open');
    playPop();
  }
}

function renderAllPensScrolls() {
  for (let i = 1; i <= 4; i++) renderScrollsForPen(i);
}

function renderScrollsForPen(penId) {
  const container = document.getElementById(`scrolls-container-${penId}`);
  if (!container) return;
  container.innerHTML = '';

  const scrolls = penCollections[penId] || [];
  scrolls.forEach((scroll) => {
    const item = document.createElement('div');
    item.className = "scroll-item cursor-pointer px-2 py-1 rounded-full flex items-center justify-between text-[9px] font-semibold text-amber-900 border border-amber-300 w-full";
    item.innerHTML = `<span class="truncate">📜 ${scroll.title}</span><span class="text-[8px] bg-amber-200 px-1 rounded">read</span>`;
    item.onclick = (e) => {
      e.stopPropagation();
      openScrollReader(penId, scroll);
    };
    container.appendChild(item);
  });
}

function openScrollReader(penId, scroll) {
  playPaperRustle();
  document.getElementById('readerPenOrigin').innerText = `Note tucked inside Pen #${penId}`;
  document.getElementById('readerScrollTitle').innerText = scroll.title;
  document.getElementById('readerScrollContent').innerText = `"${scroll.content}"`;
  document.getElementById('scrollReaderModal').classList.remove('hidden');
  confetti({ particleCount: 30, spread: 45, origin: { y: 0.5 } });
}

function closeScrollReader() {
  playPop();
  document.getElementById('scrollReaderModal').classList.add('hidden');
}

function openAddNoteModal() { document.getElementById('addNoteModal').classList.remove('hidden'); }
function closeAddNoteModal() { document.getElementById('addNoteModal').classList.add('hidden'); }

function saveNewScroll() {
  const selectedPen = document.getElementById('newScrollPenSelect').value;
  const title = document.getElementById('newScrollTitle').value.trim() || 'Whispered Note';
  const text = document.getElementById('newScrollText').value.trim();

  if (!text) {
    showToast("Please write a short note first!");
    return;
  }

  if (!penCollections[selectedPen]) penCollections[selectedPen] = [];
  penCollections[selectedPen].push({ id: Date.now(), title: title, content: text });

  document.getElementById('newScrollTitle').value = '';
  document.getElementById('newScrollText').value = '';
  closeAddNoteModal();

  if (!penOpenState[selectedPen]) toggleSpecificPen(selectedPen);
  else renderScrollsForPen(selectedPen);

  playChime();
  showToast(`Secret chit slipped into Pen #${selectedPen}! 📜✨`);
}

/* "Open When..." Envelope Handler */
function openWhenEnvelope(id) {
  const data = openWhenLetters[id];
  if (!data) return;
  playPaperRustle();
  document.getElementById('openWhenTitle').innerText = data.title;
  document.getElementById('openWhenContent').innerText = `"${data.content}"`;
  document.getElementById('openWhenModal').classList.remove('hidden');
  confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
}

function closeOpenWhenModal() {
  playPop();
  document.getElementById('openWhenModal').classList.add('hidden');
}

/* Glowing Star Jar Handler */
function pullStarFromJar() {
  starPullCounter++;
  playChime();
  const randomIndex = Math.floor(Math.random() * starReasons.length);
  const reason = starReasons[randomIndex];

  const card = document.getElementById('starReasonCard');
  const numLabel = document.getElementById('starReasonNumber');
  const textLabel = document.getElementById('starReasonText');

  numLabel.innerText = `Star #${starPullCounter}`;
  textLabel.innerText = `"${reason}"`;
  card.classList.remove('hidden');

  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.65 },
    colors: ['#fbbf24', '#f59e0b', '#fb7198', '#ffffff']
  });
  showToast(`Pulled Star #${starPullCounter} from the glowing jar! ⭐`);
}

/* Bucket List Handler */
function renderBucketList() {
  const container = document.getElementById('bucketListContainer');
  container.innerHTML = '';

  coupleBucketList.forEach(item => {
    const row = document.createElement('label');
    row.className = "flex items-center space-x-3 bg-white/80 p-3.5 rounded-2xl border border-pink-200 hover:bg-pink-50/50 cursor-pointer transition";
    row.innerHTML = `
      <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleBucketItem(${item.id})" class="accent-pink-600 w-4 h-4 rounded">
      <span class="text-xs sm:text-sm font-medium ${item.checked ? 'text-pink-900 font-semibold' : 'text-stone-600'}">${item.text}</span>
    `;
    container.appendChild(row);
  });
}

function toggleBucketItem(id) {
  const item = coupleBucketList.find(i => i.id === id);
  if (item) {
    item.checked = !item.checked;
    playPop();
    renderBucketList();
  }
}

function openAddBucketItemModal() { document.getElementById('addBucketModal').classList.remove('hidden'); }
function closeAddBucketModal() { document.getElementById('addBucketModal').classList.add('hidden'); }

function saveNewBucketItem() {
  const text = document.getElementById('newBucketInput').value.trim();
  if (!text) {
    showToast("Please enter a dream first!");
    return;
  }
  coupleBucketList.push({ id: Date.now(), text: text, checked: true });
  document.getElementById('newBucketInput').value = '';
  closeAddBucketModal();
  playChime();
  renderBucketList();
  showToast("Couple dream added to bucket list! 🗺️✨");
}

/* Vinyl Player Handler */
function updateVinylUI() {
  const track = vinylTracks[currentVinylIndex];
  document.getElementById('vinylTrackTitle').innerText = track.title;
  document.getElementById('vinylTrackDesc').innerText = track.desc;
}

function toggleVinylPlay() {
  const disc = document.getElementById('vinylDisc');
  const icon = document.getElementById('vinylPlayIcon');
  const text = document.getElementById('vinylPlayText');

  if (!isVinylPlaying) {
    disc.classList.add('animate-spin-slow');
    icon.innerText = "⏸";
    text.innerText = "Pause";
    bgMusic.play();
    isVinylPlaying = true;
    showToast("Spinning our song 🎶");
  } else {
    disc.classList.remove('animate-spin-slow');
    icon.innerText = "▶";
    text.innerText = "Play";
    bgMusic.pause();
    isVinylPlaying = false;
  }
}
function nextVinylTrack() {
  playPop();
  currentVinylIndex = (currentVinylIndex + 1) % vinylTracks.length;
  updateVinylUI();
  if (isVinylPlaying) {
    toggleVinylPlay();
    toggleVinylPlay();
  }
}

function prevVinylTrack() {
  playPop();
  currentVinylIndex = (currentVinylIndex - 1 + vinylTracks.length) % vinylTracks.length;
  updateVinylUI();
  if (isVinylPlaying) {
    toggleVinylPlay();
    toggleVinylPlay();
  }
}

/* Love Letter Live Editor Modal */
function openEditLetterModal() {
  document.getElementById('inputLetterSalutation').value = letterData.salutation;
  document.getElementById('inputLetterBody').value = letterData.body;
  document.getElementById('inputLetterSignoff').value = letterData.signoff;
  document.getElementById('inputLetterSender').value = letterData.sender;
  document.getElementById('editLetterModal').classList.remove('hidden');
}

function closeEditLetterModal() { document.getElementById('editLetterModal').classList.add('hidden'); }

function saveCustomLetter() {
  const sal = document.getElementById('inputLetterSalutation').value.trim() || 'My Sweetest Girl,';
  const body = document.getElementById('inputLetterBody').value.trim() || 'Happy Birthday, my whole world!';
  const sign = document.getElementById('inputLetterSignoff').value.trim() || 'Forever & always yours,';
  const sender = document.getElementById('inputLetterSender').value.trim() || 'With all my love ❤️';

  letterData = { salutation: sal, body: body, signoff: sign, sender: sender };
  localStorage.setItem('saved_love_letter', JSON.stringify(letterData));
  applyLoveLetterToUI();
  closeEditLetterModal();
  playChime();
  showToast("Handwritten love letter updated & saved! 💌✨");
}

/* Kiss Explosion quote logic */
function triggerMwhhhExplosion() {
  mwhhhTaps++;
  document.getElementById('mwhhhCount').innerText = mwhhhTaps;
  playKissChime();

  confetti({
    particleCount: 65,
    spread: 80,
    origin: { y: 0.55 },
    colors: ['#e11d59', '#fb7198', '#ff3800', '#ffffff', '#fda4ba']
  });
  showToast(`Mwhhhh! 💋 Kiss #${mwhhhTaps} delivered to her!`);
}

function uploadWallPic(event, id) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imgElem = document.getElementById(`wallImg${id}`);
      if (imgElem) {
        imgElem.src = e.target.result;
        showToast(`Photo #${id} updated on her gallery wall! 💖`);
        playChime();
      }
    };
    reader.readAsDataURL(file);
  }
}

function flipPolaroid(id) {
  playPop();
  const note = document.getElementById(`polaroidNote${id}`);
  if (note.classList.contains('opacity-0')) {
    note.classList.remove('opacity-0');
    note.classList.add('opacity-100');
  } else {
    note.classList.remove('opacity-100');
    note.classList.add('opacity-0');
  }
}

function uploadMemoryPic(event, id) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById(`polaroidImg${id}`).src = e.target.result;
      showToast(`Memory photo #${id} updated! 📸`);
      playChime();
    };
    reader.readAsDataURL(file);
  }
}

function redeemCoupon(num, perkName) {
  playChime();
  const status = document.getElementById(`couponStatus${num}`);
  const title = document.getElementById(`couponTitle${num}`);
  status.innerText = "UNLOCKED & CLAIMED! ✨";
  status.className = "text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1";
  title.innerText = perkName;
  title.className = "text-xs font-bold text-plum";

  confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
  showToast(`Coupon #${num} claimed: ${perkName}`);
}

function tapLoveCounter() {
  heartTaps++;
  document.getElementById('heartCountBadge').innerText = heartTaps;
  playTone(400 + Math.min(heartTaps * 20, 800), 'triangle', 0.1, 0.2);
  if (heartTaps % 10 === 0) {
    confetti({ particleCount: 30, spread: 40, origin: { y: 0.7 } });
    showToast(`${heartTaps} Hearts delivered! 💖`);
  }
}

function blowCandle() {
  const flame = document.getElementById('interactiveFlame');
  const banner = document.getElementById('wishBanner');
  const btnText = document.getElementById('cakeBtnText');
  const btnIcon = document.getElementById('cakeBtnIcon');

  if (!candleBlown) {
    candleBlown = true;
    flame.classList.add('blown');
    banner.classList.remove('hidden');
    btnText.innerText = "Relight The Candle 🕯️";
    btnIcon.innerText = "✨";
    playCelebrationFanfare();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f43f76', '#ff8c00', '#ffd700', '#ffffff', '#fb7198']
    });
    showToast("Candle blown! Your wish is locked in the stars 🌟");
  } else {
    candleBlown = false;
    flame.classList.remove('blown');
    banner.classList.add('hidden');
    btnText.innerText = "Blow Out The Candle";
    btnIcon.innerText = "💨";
    playPop();
  }
}

function updateLoveSlider(val) {
  const display = document.getElementById('loveSliderValue');
  if (val >= 2800) display.innerText = `${val}% (To Infinity & Beyond! 🚀❤️)`;
  else display.innerText = `${val}% ❤️`;
}

function buildWhatsAppMessage() {
  const memory = document.getElementById('ans_memory').value.trim() || 'Every second with you';
  const song = document.getElementById('ans_song').value.trim() || 'Our special melody';
  const loveLevel = document.getElementById('ans_love_level').value;
  const promise = document.getElementById('ans_promise').value.trim() || 'Always stay by my side';
  const dateOption = document.querySelector('input[name="ans_date"]:checked')?.value || 'Cozy Date';

  const checkedDreams = coupleBucketList.filter(i => i.checked).map(i => `  • ${i.text}`).join('\n');

  return `🎂 *Happy Birthday 15/10/2026 — Answers For You!* 💖\n\n` +
         `💋 *"everything depended on mwhhhh🙈💋"*\n` +
         `✨ Kisses Blasted: ${mwhhhTaps} times!\n\n` +
         `🌟 *1. Most Cherished Memory:*\n"${memory}"\n\n` +
         `🎶 *2. Our Special Song:*\n${song}\n\n` +
         `💘 *3. How Much I Love You:*\n${loveLevel}% (To infinity and beyond!)\n\n` +
         `🤞 *4. A Promise I Want You To Keep:*\n"${promise}"\n\n` +
         `🏖️ *5. Next Dream Date Chosen:*\n${dateOption}\n\n` +
         `🗺️ *Our Couple Bucket List Checked:*\n${checkedDreams || '  • All of them!'}\n\n` +
         `⭐ *Star Jar Reasons Pulled:* ${starPullCounter} sweet reasons read!\n` +
         `📜 *Handwritten Love Letter Read:* "Yes, I read your letter on parchment and it made my heart melt! 🥺❤️"\n` +
         `🖋️ *4 Secret Blue Pens Checked:* Yes! Unsealed and read your folded chits 📜\n` +
         `🎟️ *Hearts Tapped For You:* ${heartTaps} sweet kisses!\n\n` +
         `💌 *From your happiest girl on her special day!* ❤️`;
}

function prepareWhatsAppPreview() {
  const msg = buildWhatsAppMessage();
  document.getElementById('whatsappMessagePreview').innerText = msg;
}

function sendViaWhatsApp() {
  const msg = buildWhatsAppMessage();
  const cleanPhone = boyfriendPhone.replace(/[^0-9]/g, '');

  if (!cleanPhone || cleanPhone.length < 8) {
    openPhoneModal();
    showToast("Please verify boyfriend's WhatsApp number first!");
    return;
  }

  playCelebrationFanfare();
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function copyToClipboard() {
  const msg = buildWhatsAppMessage();
  const tempArea = document.createElement("textarea");
  tempArea.value = msg;
  document.body.appendChild(tempArea);
  tempArea.select();
  try {
    document.execCommand('copy');
    showToast("Answers copied to clipboard! 📋");
  } catch (e) {
    showToast("Failed to copy automatically.");
  }
  document.body.removeChild(tempArea);
}

function openPhoneModal() { document.getElementById('phoneModal').classList.remove('hidden'); }
function closePhoneModal() { document.getElementById('phoneModal').classList.add('hidden'); }
function savePhoneNumber() {
  const input = document.getElementById('phoneInput').value.trim();
  if (input) {
    boyfriendPhone = input;
    localStorage.setItem('bf_whatsapp_number', boyfriendPhone);
    document.getElementById('currentPhoneDisplay').innerText = boyfriendPhone;
    closePhoneModal();
    showToast("WhatsApp number saved! 📱");
  }
}

/* Ambient Falling Rose Petals Canvas */
const canvas = document.getElementById('ambientCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Petal {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -20;
    this.size = Math.random() * 7 + 4;
    this.speedY = Math.random() * 1.2 + 0.6;
    this.speedX = Math.sin(Math.random() * Math.PI) * 0.8 - 0.4;
    this.opacity = Math.random() * 0.4 + 0.2;
    this.color = Math.random() > 0.5 ? 'rgba(244, 63, 118,' : 'rgba(255, 182, 193,';
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y > canvas.height + 20) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = `${this.color} ${this.opacity})`;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 28; i++) {
  const p = new Petal();
  p.y = Math.random() * canvas.height;
  particles.push(p);
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

function showToast(text) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  toastText.innerText = text;
  toast.classList.remove('translate-y-24', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-24', 'opacity-0');
  }, 2800);
}

renderAllPensScrolls();
renderBucketList();
updateVinylUI();