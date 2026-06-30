import { useState, useEffect, useRef, useMemo } from 'react';

// ── 100 מילים לכיתה ח' – משולב מילים מעולם הכדורגל, גיימינג ויומיום ──────────────────
const wordsData = [
  // 1-20: מילים מעולם הכדורגל (Football)
  { en: "Striker", he: "חלוץ", pron: "סְטְרַיְקֶר" },
  { en: "Goalkeeper", he: "שוער", pron: "גוֹלְקִיפֶר" },
  { en: "Midfielder", he: "קשר", pron: "מִידְפִילְדֶר" },
  { en: "Defender", he: "שחקן הגנה", pron: "דִּיפֶנְדֶר" },
  { en: "Tournament", he: "טורניר / אליפות", pron: "טוּרְנָמֶנְט" },
  { en: "Champion", he: "אלוף", pron: "צ'ֶמְפִּיּוֹן" },
  { en: "Stadium", he: "אצטדיון", pron: "סְטֵיידְיוּם" },
  { en: "Referee", he: "שופט משחק", pron: "רֶפְרִי" },
  { en: "Whistle", he: "משרוקית / לשרוק", pron: "וּוִיסֶל" },
  { en: "Spectator", he: "צופה במשחק", pron: "סְפֶקְטֵייטֶר" },
  { en: "Coach", he: "מאמן", pron: "קוֹאוּץ'" },
  { en: "Trophy", he: "גביע", pron: "טְרוֹפִי" },
  { en: "League", he: "ליגה", pron: "לִיג" },
  { en: "Substitute", he: "שחקן מחליף", pron: "סַבְסְטִיטְיוּט" },
  { en: "Injured", he: "פצוע", pron: "אִינְג'וּרְד" },
  { en: "Captain", he: "קפטן", pron: "קַפְטֶן" },
  { en: "Offside", he: "נבדל", pron: "אוֹפְסַיְד" },
  { en: "Pitch", he: "מגרש כדורגל", pron: "פִיץ'" },
  { en: "Practice", he: "להתאמן / תרגול", pron: "פְּרַקְטִיס" },
  { en: "Victory", he: "ניצחון", pron: "וִקְטוֹרִי" },

  // 21-40: גיימינג ופעולה (Gaming & Action)
  { en: "Win", he: "לנצח", pron: "וּוִין" },
  { en: "Lose", he: "להפסיד", pron: "לוּז" },
  { en: "Challenge", he: "אתגר", pron: "צ'אלנג'" },
  { en: "Survive", he: "לשרוד", pron: "סֶרְוַוייב" },
  { en: "Build", he: "לבנות", pron: "בִּילְד" },
  { en: "Destroy", he: "להרוס", pron: "דִּיסְטְרוֹי" },
  { en: "Attack", he: "לתקוף", pron: "אֶטֶק" },
  { en: "Defend", he: "להגן", pron: "דִּיפֶנְד" },
  { en: "Escape", he: "לברוח", pron: "אִסְקֵייפּ" },
  { en: "Discover", he: "לגלות", pron: "דִּיסְקַבֶר" },
  { en: "Improve", he: "לשפר", pron: "אימפרוב" },
  { en: "Achieve", he: "להשיג", pron: "אצ'יב" },
  { en: "Teammate", he: "שותף לקבוצה", pron: "טִים-מֵייט" },
  { en: "Strategy", he: "אסטרטגיה", pron: "סְטְרָטֶגִ'י" },
  { en: "Defeat", he: "תבוסה / להביס", pron: "דיפיט" },
  { en: "Weapon", he: "נשק", pron: "וּוֶפּוֹן" },
  { en: "Shield", he: "מגן", pron: "שִׁילְד" },
  { en: "Mission", he: "משימה", pron: "מִשֶׁן" },
  { en: "Level", he: "רמה / שלב", pron: "לֶבֶל" },
  { en: "Powerful", he: "עוצמתי / חזק", pron: "פַאוּוֶרְפוּל" },

  // 41-60: מילות קישור ומעבר (Connectors)
  { en: "Although", he: "למרות ש...", pron: "אוֹלְדּוֹאוּ" },
  { en: "However", he: "אולם / למרות זאת", pron: "הַאֶוֶור" },
  { en: "Therefore", he: "לכן / לפיכך", pron: "דֶּרְפוֹר" },
  { en: "Unless", he: "אלא אם כן", pron: "אנלס" },
  { en: "Besides", he: "מלבד זאת / חוץ מזה", pron: "ביסיידס" },
  { en: "Instead", he: "במקום", pron: "אינסטד" },
  { en: "Otherwise", he: "אחרת / אם לא", pron: "אדרווייז" },
  { en: "Since", he: "מאחר ש... / מאז", pron: "סינס" },
  { en: "Because", he: "בגלל ש...", pron: "ביקוז" },
  { en: "Consequently", he: "כתוצאה מכך", pron: "קונסקוונטלי" },
  { en: "Furthermore", he: "יתרה מכך / בנוסף", pron: "פרדרמור" },
  { en: "Indeed", he: "אכן / אומנם", pron: "אינדיד" },
  { en: "Whereas", he: "בעוד ש... / לעומת זאת", pron: "ווראז" },
  { en: "Meanwhile", he: "בינתיים", pron: "מינווייל" },
  { en: "Eventually", he: "בסופו של דבר", pron: "איבנצ'ואלי" },
  { en: "Suddenly", he: "פתאום", pron: "סאדנלי" },
  { en: "Probably", he: "כנראה / קרוב לוודאי", pron: "פרובאבלי" },
  { en: "Actually", he: "למעשה / בעצם", pron: "אקצ'ואלי" },
  { en: "Usually", he: "בדרך כלל", pron: "יוז'ואלי" },
  { en: "Moreover", he: "בנוסף / יתרה מכך", pron: "מוראובר" },

  // 61-80: תארים ופעלים מאתגרים לכיתה ח' (Challenging vocabulary)
  { en: "Dangerous", he: "מסוכן", pron: "דיינג'רוס" },
  { en: "Impossible", he: "בלתי אפשרי", pron: "אימפוסיבל" },
  { en: "Serious", he: "רציני", pron: "סיריוס" },
  { en: "Competitive", he: "תחרותי", pron: "קומפטיטיב" },
  { en: "Focus", he: "להתרכז / מיקוד", pron: "פוקוס" },
  { en: "Prepare", he: "להתכונן", pron: "פריפר" },
  { en: "Realize", he: "להבין / לקלוט", pron: "ריאלייז" },
  { en: "Respect", he: "לכבד / כבוד", pron: "ריספקט" },
  { en: "Decision", he: "החלטה", pron: "דיסיז'ן" },
  { en: "Mistake", he: "טעות", pron: "מיסטייק" },
  { en: "Advantage", he: "יתרון", pron: "אדוונטג'" },
  { en: "Enemy", he: "אויב", pron: "אנמי" },
  { en: "Reward", he: "פרס / גמול", pron: "ריוורד" },
  { en: "Effort", he: "מאמץ", pron: "אפורט" },
  { en: "Patience", he: "סבלנות", pron: "פיישנס" },
  { en: "Unexpected", he: "בלתי צפוי", pron: "אניקספקטד" },
  { en: "Experience", he: "ניסיון / חוויה", pron: "איקספיריאנס" },
  { en: "Confident", he: "בטוח בעצמו", pron: "קונפידנט" },
  { en: "Opponent", he: "יריב", pron: "אופוננט" },
  { en: "Competitor", he: "מתחרה", pron: "קומפטיטור" },

  // 81-100: פעלים יוצאי דופן ופעלים מתקדמים (Irregular & Advanced verbs)
  { en: "Choose", he: "לבחור", pron: "צ'וז" },
  { en: "Forget", he: "לשכוח", pron: "פורגט" },
  { en: "Forgive", he: "לסלוח", pron: "פורגיב" },
  { en: "Understand", he: "להבין", pron: "אנדרסטנד" },
  { en: "Become", he: "להפוך להיות", pron: "ביקאם" },
  { en: "Begin", he: "להתחיל", pron: "ביגין" },
  { en: "Spend", he: "לבזבז / לבלות", pron: "ספנד" },
  { en: "Teach", he: "ללמד", pron: "טיץ'" },
  { en: "Think", he: "לחשוב", pron: "ת'ינק" },
  { en: "Succeed", he: "להצליח", pron: "סאקסיד" },
  { en: "Support", he: "לתמוך", pron: "סאפורט" },
  { en: "Prevent", he: "למנוע", pron: "פריבנט" },
  { en: "Protect", he: "להגן / לשמור", pron: "פרוטקט" },
  { en: "Require", he: "לדרוש / להצריך", pron: "ריקוואייר" },
  { en: "Describe", he: "לתאר", pron: "דיסקרייב" },
  { en: "Develop", he: "לפתח", pron: "דיבלופ" },
  { en: "Encourage", he: "לעודד", pron: "אינקארג'" },
  { en: "Investigate", he: "לחקור", pron: "אינווסטיגייט" },
  { en: "Imagine", he: "לדמיין", pron: "אימאג'ין" },
  { en: "Volunteer", he: "להתנדב / מתנדב", pron: "וולונטיר" }
];

// ── אנלוגיות משפטים מאתגרות ─────────────────────────────────────────
const analogiesData = [
  { word1: "Striker", word2: "Goal", relation: "יוצר תוצאה", word3: "Goalkeeper", options: ["Save", "Trophy", "Whistle", "Injured"], correct: "Save" },
  { word1: "Attack", word2: "Destroy", relation: "עוצמת פעולה", word3: "Defend", options: ["Protect", "Succeed", "Forget", "Escape"], correct: "Protect" },
  { word1: "Referee", word2: "Whistle", relation: "כלי עבודה", word3: "Coach", options: ["Strategy", "Trophy", "Stadium", "Goalkeeper"], correct: "Strategy" },
  { word1: "Win", word2: "Trophy", relation: "פרס על הישג", word3: "Practice", options: ["Improve", "Lose", "Offside", "Captain"], correct: "Improve" },
  { word1: "Although", word2: "Contrast (ניגוד)", word3: "Therefore", options: ["Result (תוצאה)", "Reason (סיבה)", "Addition (הוספה)", "Time (זמן)"], correct: "Result (תוצאה)" },
  { word1: "Enemy", word2: "Dangerous", relation: "קשר תיאורי", word3: "Teammate", options: ["Supportive", "Impossible", "Injured", "Polite"], correct: "Supportive" },
  { word1: "Mistake", word2: "Defeat", relation: "סיבה ותוצאה", word3: "Effort", options: ["Succeed", "Forget", "Offside", "Substitute"], correct: "Succeed" },
  { word1: "League", word2: "Tournament", relation: "חלק מתוך שלם", word3: "Pitch", options: ["Stadium", "Referee", "Captain", "Midfielder"], correct: "Stadium" }
];

// ── השלמת משפטים ──────────────────────────────────────────────────
const completionData = [
  { sentence: "The coach decided to put Yuval in the starting lineup because of his great _______ in practice.", options: ["Effort", "Mistake", "Offside", "Weapons"], correct: "Effort" },
  { sentence: "The striker ran past the defender, but the linesman raised his flag for _______.", options: ["Offside", "Trophy", "Patience", "League"], correct: "Offside" },
  { sentence: "After a tough match in the tournament, our team finally won the championship _______.", options: ["Trophy", "Referee", "Pitch", "Substitute"], correct: "Trophy" },
  { sentence: "We will easily lose the game _______ we start defending much better.", options: ["Unless", "Although", "Therefore", "Moreover"], correct: "Unless" },
  { sentence: "He was very nervous before the league game; _______, he scored a hat-trick.", options: ["However", "Therefore", "Since", "Because"], correct: "However" },
  { sentence: "To become a professional player, you must _______ on your football practice every single day.", options: ["Focus", "Escape", "Forgive", "Understand"], correct: "Focus" },
  { sentence: "The referee blew his _______ and pointed to the penalty spot.", options: ["Whistle", "Shield", "Trophy", "Midfielder"], correct: "Whistle" },
  { sentence: "He made a serious _______ and passed the ball directly to the opponent striker.", options: ["Mistake", "Victory", "Patience", "Decision"], correct: "Mistake" }
];

// ── משחק חצאי משפטים (Half Sentences) ────────────────────────────────
const halfSentencesData = [
  { id: 1, start: "Although he was very tired after the match,", end: "Yuval continued to practice his striker shoots." },
  { id: 2, start: "If you don't listen to the coach's instructions,", end: "you will find yourself sitting on the substitute bench." },
  { id: 3, start: "The referee blew his whistle to stop the play,", end: "because a defender was seriously injured." },
  { id: 4, start: "Unless the team improves their defensive strategy,", end: "victory in the league tournament will be impossible." },
  { id: 5, start: "Our striker scored a beautiful goal in the final minute,", end: "therefore we won the championship trophy." },
  { id: 6, start: "The opponent goalkeeper was extremely powerful,", end: "however we managed to score twice against him." },
  { id: 7, start: "She volunteered to clean the pitch after the game,", end: "besides being the captain of the football team." },
  { id: 8, start: "Since the spectator crowd was shouting very loudly,", end: "it was hard for the teammates to hear each other." },
  { id: 9, start: "Instead of playing video games all afternoon,", end: "Noah decided to go practice football in the stadium." },
  { id: 10, start: "He realized he made a serious offside mistake,", end: "consequently the opponent team got a free kick." },
  { id: 11, start: "Although the weather was freezing and raining,", end: "the fans stayed to support their team until the victory." },
  { id: 12, start: "If we want to defend our championship title this year,", end: "we require serious effort and daily practice." },
  { id: 13, start: "He refused to share his new professional football,", end: "which made his teammates feel very disappointed." },
  { id: 14, start: "They investigated the ancient history of the stadium,", end: "in order to understand how the club was created." },
  { id: 15, start: "You must run as fast as possible to catch the ball,", end: "otherwise the striker will score an easy goal." }
];

// ── חוקי קריאה וצלילים (Phonics) ─────────────────────────────────────
const readingPatternsData = [
  {
    pattern: "Magic E (A-E / I-E / O-E)",
    hebrew: "האות E בסוף המילה היא שקטה (לא קוראים אותה), והיא הופכת את אות הניקוד שלפניה לצליל ארוך (כמו שם האות באנגלית).",
    words: [
      { intro: "We play a competitive", word: "game", breakdown: "G - A - M - E", pron: "גֵּיים", hebrew: "משחק" },
      { intro: "Our team's best", word: "striker", breakdown: "S - T - R - I - K - E - R", pron: "סְטְרַיְקֶר", hebrew: "חלוץ" },
      { intro: "The goalkeeper made a great", word: "save", breakdown: "S - A - V - E", pron: "סֵייב", hebrew: "הצלה" },
      { intro: "A good player doesn't", word: "hate", breakdown: "H - A - T - E", pron: "הֵייט", hebrew: "לשנוא" }
    ]
  },
  {
    pattern: "Long E (EE / EA)",
    hebrew: "הצירופים EE ו-EA יוצרים צליל של חיריק ארוך (כמו שם האות E).",
    words: [
      { intro: "He is my favorite", word: "teammate", breakdown: "T - E - A - M - M - A - T - E", pron: "טִים-מֵייט", hebrew: "שותף לקבוצה" },
      { intro: "We play in a professional", word: "league", breakdown: "L - E - A - G - U - E", pron: "לִיג", hebrew: "ליגה" },
      { intro: "A goalkeeper wants to", word: "keep", breakdown: "K - E - E - P", pron: "קִיפּ", hebrew: "לשמור (על שער נקי)" },
      { intro: "It feels terrible to suffer a", word: "defeat", breakdown: "D - E - F - E - A - T", pron: "דִּיפִיט", hebrew: "תבוסה / להביס" }
    ]
  },
  {
    pattern: "Silent Letters (W / K / G)",
    hebrew: "יש אותיות שמופיעות בכתב אך הן שקטות לחלוטין בקריאה (למשל W לפני R, או K לפני N).",
    words: [
      { intro: "The coach will", word: "write", breakdown: "W - R - I - T - E", pron: "רַיְט", hebrew: "לכתוב (את הטקטיקה)" },
      { intro: "He fell down and hurt his", word: "knee", breakdown: "K - N - E - E", pron: "נִי", hebrew: "ברך" },
      { intro: "I", word: "know", breakdown: "K - N - O - W", pron: "נוֹאוּ", hebrew: "יודע" },
      { intro: "The referee made a", word: "wrong", breakdown: "W - R - O - N - G", pron: "רוֹנְג", hebrew: "שגויה (החלטה)" }
    ]
  },
  {
    pattern: "Consonant Teams (CH / SH / TH)",
    hebrew: "שילובים מיוחדים של עיצורים שיוצרים צליל אחד חדש. CH (צ'), SH (ש), TH (ד/ת).",
    words: [
      { intro: "We won the league", word: "championship", breakdown: "C - H - A - M - P - I - O - N - S - H - I - P", pron: "צ'ֶמְפִּיּוֹנְשִׁיפּ", hebrew: "אליפות" },
      { intro: "Every player needs a physical", word: "shield", breakdown: "S - H - I - E - L - D", pron: "שִׁילְד", hebrew: "מגן" },
      { intro: "The opponent team is on the", word: "pitch", breakdown: "P - I - T - C - H", pron: "פִיץ'", hebrew: "מגרש" },
      { intro: "The ball went", word: "through", breakdown: "T - H - R - O - U - G - H", pron: "תְ'רוּ", hebrew: "דרך (השער)" }
    ]
  },
  {
    pattern: "Vowel Teams (OA / OU / OW)",
    hebrew: "צירופי אותיות ניקוד שונות שיוצרות צלילים מיוחדים כגון OU/OW (אאוּ) או OA (אוֹ).",
    words: [
      { intro: "Listen to your football", word: "coach", breakdown: "C - O - A - C - H", pron: "קוֹאוּץ'", hebrew: "מאמן" },
      { intro: "Our team played a great", word: "tournament", breakdown: "T - O - U - R - N - A - M - E - N - T", pron: "טוּרְנָמֶנְט", hebrew: "טורניר" },
      { intro: "The goalkeeper is very", word: "powerful", breakdown: "P - O - W - E - R - F - U - L", pron: "פַאוּוֶרְפוּל", hebrew: "עוצמתי" },
      { intro: "The stadium has a huge", word: "crowd", breakdown: "C - R - O - W - D", pron: "קְרָאוּד", hebrew: "קהל צופים" }
    ]
  }
];

// ── טקסטים לקריאה + שאלות (Football & Gaming Crossovers) ─────────────────
const readingData = [
  {
    title: "The Championship League Match",
    text: `Yuval was the key [[midfielder|קשר|מִידְפִילְדֶר]] for his school team. Today was the final game of the [[tournament|טורניר / אליפות|טוּרְנָמֶנְט]]. The match was held in a massive [[stadium|אצטדיון|סְטֵיידְיוּם]] with a loud [[crowd|קהל צופים|קְרָאוּד]] of spectators.
    
    The coach told them that they needed a solid [[strategy|אסטרטגיה|סְטְרָטֶגִ'י]] to defeat their opponents. "We must [[focus|להתרכז|פוקוס]] on teamwork," the coach said. Yuval ran down the [[pitch|מגרש כדורגל|פִיץ']] and passed the ball to the [[striker|חלוץ|סְטְרַיְקֶר]], who scored a brilliant goal!
    
    Suddenly, the [[referee|שופט משחק|רֶפְרִי]] blew his [[whistle|משרוקית / לשרוק|וּוִיסֶל]] for a penalty. The opponent tried to score, but our [[goalkeeper|שוער|גוֹלְקִיפֶר]] made a heroic save. We won the game and lifted the golden [[trophy|גביע|טְרוֹפִי]]! It was a legendary [[victory|ניצחון|וִקְטוֹרִי]].`,
    questions: [
      {
        q: "What was Yuval's role on the team?",
        options: ["Striker", "Midfielder", "Goalkeeper", "Coach"],
        correct: 1
      },
      {
        q: "What did the goalkeeper do?",
        options: ["He got a yellow card", "He scored a goal", "He made a heroic save", "He blew his whistle"],
        correct: 2
      }
    ]
  },
  {
    title: "A Serious Mistake on the Pitch",
    text: `Daniel was a very [[competitive|תחרותי|קומפטיטיב]] player. In the middle of the game, he made an [[unexpected|בלתי צפוי|אניקספקטד]] decision. He stopped running and refused to [[support|לתמוך|סאפורט]] his [[teammate|שותף לקבוצה|טִים-מֵייט]].
    
    Because of his selfish behavior, the opponent team easily passed our [[defender|שחקן הגנה|דִּיפֶנְדֶר]] and scored a goal. The coach called for a [[substitute|שחקן מחליף|סַבְסְטִיטְיוּט]] to replace Daniel immediately.
    
    Daniel felt terrible and realized he made a [[serious|רציני|סיריוס]] [[mistake|טעות|מיסטייק]]. Later, the [[captain|קפטן|קַפְטֶן]] told him: "Respecting your team is the key to success. We cannot achieve [[victory|ניצחון|וִקְטוֹרִי]] without [[effort|מאמץ|אפורט]] from everyone." Daniel promised to improve his attitude and practice harder.`,
    questions: [
      {
        q: "Why was Daniel replaced by a substitute?",
        options: ["He was injured", "He refused to support his teammate", "He scored an own goal", "He forgot his shoes"],
        correct: 1
      },
      {
        q: "What did Daniel learn from the captain?",
        options: ["Football is an individual sport", "Winning is impossible without luck", "Teamwork and respect are essential", "To practice goalkeeping"],
        correct: 2
      }
    ]
  },
  {
    title: "Maya's Phonics Practice",
    text: `Maya loved to watch her brother Yuval [[practice|להתאמן / תרגול|פְּרַקְטִיס]] on the football field. She wanted to join the local girls' [[league|ליגה|לִיג]], but she was not [[confident|בטוח בעצמו|קונפידנט]] enough.
    
    "Every match is a [[challenge|אתגר|צ'אלנג']]," Yuval explained to her with [[patience|סבלנות|פיישנס]]. "You need to [[prepare|להתכונן|פריפר]] yourself, learn the rules, and understand that you will sometimes make a [[mistake|טעות|מיסטייק]]. The more you play, the more [[experience|ניסיון / חוויה|איקספיריאנס]] you gain."
    
    Maya decided to try. In her first game, a defender was [[injured|פצוע|אִינְג'וּרְד]], and the coach sent Maya onto the field. She felt nervous, but she focused, intercepted a pass, and helped her team secure the win. She [[realized|להבין / לקלוט|ריאלייז]] that challenges are [[impossible|בלתי אפשרי|אימפוסיבל]] to overcome only if you don't try.`,
    questions: [
      {
        q: "Why was Maya hesitant to join the league?",
        options: ["She did not like football", "She was not confident enough", "She had no time", "Her brother did not let her"],
        correct: 1
      },
      {
        q: "How did Maya get to play in her first match?",
        options: ["She bought a ticket", "Her brother was the coach", "A defender was injured", "She won a lottery"],
        correct: 2
      }
    ]
  },
  {
    title: "The Cyber Cup Challenge",
    text: `Noah was a famous gamer, but today he faced a new [[challenge|אתגר|צ'אלנג']] — a virtual FIFA football tournament. His [[opponent|יריב|אופוננט]] was a [[powerful|עוצמתי / חזק|פַאוּוֶרְפוּל]] player who rarely made a [[mistake|טעות|מיסטייק]].
    
    [[Although|למרות ש...|אוֹלְדּוֹאוּ]] Noah was skilled, his opponent got an [[advantage|יתרון|אדוונטג']] and scored early. Noah's virtual team was caught in an [[offside|נבדל|אוֹפְסַיְד]] trap, and the crowd in the digital [[stadium|אצטדיון|סְטֵיידְיוּם]] was cheering for his defeat.
    
    Noah stopped rushing and changed his [[strategy|אסטרטגיה|סְטְרָטֶגִ'י]]. He focused on defense and waited for a mistake. [[Eventually|בסופו של דבר|איבנצ'ואלי]], his opponent lost focus. Noah executed a perfect counter-attack, scored two goals, and achieved a dramatic [[victory|ניצחון|וִקְטוֹרִי]]. He smiled, realizing that both real-life football and gaming require mental [[effort|מאמץ|אפורט]] and focus.`,
    questions: [
      {
        q: "What game was Noah playing in the tournament?",
        options: ["Fortnite", "Virtual FIFA football", "Minecraft", "Chess"],
        correct: 1
      },
      {
        q: "How did Noah win the match?",
        options: ["He hacked the game", "He changed his strategy and focused", "His opponent was injured", "His coach helped him"],
        correct: 1
      }
    ]
  }
];

// ── Helpers ───────────────────────────────────────────────────────
const playSound = type => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    if (type === 'success') {
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    } else {
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    }
    osc.start(); osc.stop(ctx.currentTime + 0.3);
  } catch (_) {}
};

const speakWord = (text, rate = 0.85) => {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US'; u.rate = rate; u.pitch = 1.0;
  const voices = window.speechSynthesis.getVoices();
  const pick = voices.find(v =>
    v.lang.startsWith('en') &&
    (v.name.includes("Premium") || v.name.includes("Enhanced") || v.name.includes("Online") || v.name.includes("Natural"))
  ) || voices.find(v => ["Google US English", "Microsoft David", "Alex", "Daniel"].some(p => v.name.includes(p)));
  if (pick) u.voice = pick;
  window.speechSynthesis.speak(u);
};

const getNextRandom = (curr, length) => {
  if (length <= 1) return 0;
  let next = curr;
  while (next === curr) next = Math.floor(Math.random() * length);
  return next;
};

// ── מאמן הסייבר / כדורגל: פידבקים מותאמים ───────────────────────────────────
const getCoachFeedback = (type, details = "") => {
  const successList = [
    "גוווווול! ביצוע מושלם! לחיבורים! ⚽",
    "בישול מדהים! ישר לחיבורים של הרשת! 🎯",
    "וואו! דריבל ענק של מילים! סלאלום מושלם! 🏃‍♂️",
    "אליפות! ישר לסגל הפותח של הנבחרת! 🏆",
    "כרטיס ירוק! איזה מהלך קבוצתי מבריק! 🟢"
  ];
  const errorList = [
    "כרטיס צהוב! 🟨 כמעט נכון, כנס לפוקוס ונסה שוב!",
    "אופסייד! 🚩 המילה לא הגיעה ליעד, תבעט שוב!",
    "פנדל! 🥅 שמעתי משהו קצת אחר, כוון טוב ותבעט שוב!",
    "עבירה! 🚫 אל תוותר, כנס חזרה למשחק ותשלים את המהלך!",
    "החמצה! 🫨 כדור קרוב מאוד לקורה, תן עוד ניסיון!"
  ];
  if (type === 'success') {
    const rand = successList[Math.floor(Math.random() * successList.length)];
    return details ? `${rand} (${details})` : rand;
  } else {
    const rand = errorList[Math.floor(Math.random() * errorList.length)];
    return details ? `${rand} ${details}` : rand;
  }
};

// ── בדיקת דיבור מתקדמת מותאמת למבטא עברי (Fuzzy & Accent Matching) ───────────
const isFuzzyMatch = (transcript, target) => {
  const clean = s => s.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
  const tClean = clean(transcript);
  const targetClean = clean(target);
  
  if (tClean === targetClean) return true;
  if (tClean.includes(targetClean) || targetClean.includes(tClean)) return true;
  
  // מיפויים פונטיים למבטא ישראלי נפוץ
  const normalizeAccent = s => {
    return s
      .replace(/w/g, 'v')
      .replace(/th/g, 'd')
      .replace(/z/g, 's')
      .replace(/c/g, 'k')
      .replace(/q/g, 'k')
      .replace(/ph/g, 'f');
  };
  
  if (normalizeAccent(tClean) === normalizeAccent(targetClean)) return true;
  
  // מרחק עריכה לבדיקת מילים קרובות (Levenshtein Distance)
  const getEditDistance = (a, b) => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }
    return matrix[b.length][a.length];
  };
  
  const dist = getEditDistance(tClean, targetClean);
  if (targetClean.length <= 4 && dist <= 1) return true;
  if (targetClean.length <= 8 && dist <= 2) return true;
  if (targetClean.length > 8 && dist <= 3) return true;
  
  return false;
};

// ── App ───────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    if (!customElements.get('dotlottie-wc')) {
      const script = document.createElement('script');
      script.src = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.3/dist/dotlottie-wc.js";
      script.type = "module";
      document.head.appendChild(script);
    }
  }, []);

  const [view, setView] = useState('learn');
  const [masteredIndexes, setMasteredIndexes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('yuval_mastered_words_100') || '[]'); }
    catch { return []; }
  });
  const [activeWordIndex, setActiveWordIndex] = useState(() => {
    const s = localStorage.getItem('yuval_last_active_index_100');
    return s !== null ? parseInt(s) : 0;
  });
  
  const [step, setStep] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [activeAnim, setActiveAnim] = useState(null);
  const [coachMsg, setCoachMsg] = useState("מוכן לעלות למגרש? בחר כרטיסיה כדי להתחיל לתרגל! ⚽");

  // חיפוש מילים בספריה
  const [searchQuery, setSearchQuery] = useState("");

  // PWA אופציית התקנה
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isPwaInstalled, setIsPwaInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsPwaInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        setIsPwaInstalled(true);
      }
      setDeferredPrompt(null);
    });
  };

  // טיימר יומי 10 דקות (600 שניות)
  const [secondsPracticed, setSecondsPracticed] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const saved = localStorage.getItem('yuval_daily_timer');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.date === today) return parsed.seconds;
      }
    } catch (_) {}
    return 0;
  });
  
  const [celebratedDaily, setCelebratedDaily] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const saved = localStorage.getItem('yuval_daily_celebrated');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.date === today) return parsed.celebrated;
      }
    } catch (_) {}
    return false;
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const timer = setInterval(() => {
      setSecondsPracticed(prev => {
        const next = prev + 1;
        localStorage.setItem('yuval_daily_timer', JSON.stringify({ date: today, seconds: next }));
        if (next >= 600 && !celebratedDaily) {
          setCelebratedDaily(true);
          localStorage.setItem('yuval_daily_celebrated', JSON.stringify({ date: today, celebrated: true }));
          playSound('success');
          triggerAnimation('confetti');
          setCoachMsg("גביע האלופות! 🏆 סיימת את תרגול 10 הדקות היומי שלך בהצלחה יתרה!");
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [celebratedDaily]);

  // משפטי עידוד משתנים של הטיימר היומי
  const timerEncouragement = useMemo(() => {
    const pct = Math.min((secondsPracticed / 600) * 100, 100);
    if (pct < 20) {
      return { en: "Great start! Let's hit the field today!", he: "התחלה מעולה! בוא נעלה למגרש היום!" };
    } else if (pct < 50) {
      return { en: "Keep passing the words! You're doing great!", he: "תמשיך להניע את המילים! אתה עושה עבודה נהדרת!" };
    } else if (pct < 80) {
      return { en: "Halfway to the trophy! Keep pressing!", he: "חצי דרך לגביע! תמשיך ללחוץ על הדוושה!" };
    } else if (pct < 100) {
      return { en: "So close to a goal! Almost there!", he: "כל כך קרוב לשער! עוד קצת!" };
    } else {
      return { en: "Champions League level! Daily training complete! 🏆", he: "רמת ליגת האלופות! סיימת את האימון היומי בהצלחה! 🏆" };
    }
  }, [secondsPracticed]);

  // מצבי משחק
  const [analogyIndex, setAnalogyIndex] = useState(0);
  const [compIndex, setCompIndex] = useState(0);
  const [readingIndex, setReadingIndex] = useState(0);
  const [readingAnswered, setReadingAnswered] = useState([null, null]);
  const [quizSet, setQuizSet] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  
  // זוגות (Memory Match)
  const [matchCards, setMatchCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  // חצאי משפטים (Half Sentences)
  const [halfSentences, setHalfSentences] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matchedHalfIds, setMatchedHalfIds] = useState([]);
  const [wrongHalfIds, setWrongHalfIds] = useState([]); // לשמירת כרטיסים אדומים בטעות

  // חוקי קריאה (Phonics)
  const [phonicsRuleIdx, setPhonicsRuleIdx] = useState(0);
  const [phonicsWordIdx, setPhonicsWordIdx] = useState(0);
  const [phonicsFeedback, setPhonicsFeedback] = useState(null);
  const [phonicsListening, setPhonicsListening] = useState(false);
  const [phonicsMastered, setPhonicsMastered] = useState({}); // מעקב אחר מילים שנלמדו בחוקי קריאה

  const isProcessingRef = useRef(false);
  const currentWord = wordsData[activeWordIndex] || wordsData[0];

  const options = useMemo(() => {
    const others = wordsData.filter(w => w.en !== currentWord.en).sort(() => Math.random() - 0.5).slice(0, 3);
    return [...others, currentWord].sort(() => Math.random() - 0.5);
  }, [activeWordIndex]);

  useEffect(() => {
    localStorage.setItem('yuval_mastered_words_100', JSON.stringify(masteredIndexes));
    localStorage.setItem('yuval_last_active_index_100', activeWordIndex.toString());
  }, [masteredIndexes, activeWordIndex]);

  const triggerAnimation = type => {
    setActiveAnim(type);
    setTimeout(() => setActiveAnim(null), 1800);
  };

  const handleSpeech = () => {
    if (isListening || isProcessingRef.current) return;
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setFeedback({ type: 'error', message: 'הדפדפן לא תומך בזיהוי קולי.' });
      setTimeout(() => setFeedback(null), 2500);
      return;
    }
    const rec = new Recognition();
    rec.lang = 'en-US'; rec.continuous = false; rec.interimResults = false; rec.maxAlternatives = 5;
    isProcessingRef.current = false;
    
    rec.onstart = () => setIsListening(true);
    rec.onend = () => { setIsListening(false); };
    
    rec.onerror = e => {
      setIsListening(false);
      const msgs = { 'no-speech': 'לא שמעתי, כנס למגרש ונסה שוב! 🎤', 'not-allowed': 'יש לאשר גישה למיקרופון בדפדפן.' };
      setFeedback({ type: 'error', message: msgs[e.error] || 'שגיאת מיקרופון, נסה שוב.' });
      setCoachMsg(getCoachFeedback('error', "(לא נקלט קול)"));
      setTimeout(() => setFeedback(null), 2500);
    };

    rec.onresult = e => {
      if (isProcessingRef.current) return;
      let matched = false;
      let heardWord = "";
      
      for (let i = 0; i < e.results[0].length; i++) {
        const transcript = e.results[0][i].transcript.toLowerCase().trim();
        if (i === 0) heardWord = transcript;
        if (isFuzzyMatch(transcript, currentWord.en)) {
          matched = true;
          heardWord = transcript;
          break;
        }
      }

      if (matched) {
        isProcessingRef.current = true;
        setFeedback({ type: 'success', message: `שמעתי "${heardWord}"` });
        setCoachMsg(getCoachFeedback('success', `זיהיתי "${heardWord}"`));
        playSound('success');
        triggerAnimation('success-check');
        setMasteredIndexes(prev => {
          const next = prev.includes(activeWordIndex) ? prev : [...prev, activeWordIndex];
          setTimeout(() => {
            setActiveWordIndex(i => (i + 1) % wordsData.length);
            setStep(1); setFeedback(null); isProcessingRef.current = false;
          }, 1500);
          return next;
        });
      } else {
        playSound('error');
        setFeedback({ type: 'error', message: `שמעתי "${heardWord}", נסה שוב.` });
        setCoachMsg(getCoachFeedback('error', `שמעתי "${heardWord}"`));
      }
    };

    try { rec.start(); } catch (_) { setIsListening(false); }
  };

  // תרגול קולי למסך חוקי קריאה
  const handlePhonicsSpeech = (targetWord) => {
    if (phonicsListening || isProcessingRef.current) return;
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setPhonicsFeedback({ type: 'error', message: 'הדפדפן לא תומך בזיהוי קולי.' });
      return;
    }
    const rec = new Recognition();
    rec.lang = 'en-US'; rec.continuous = false; rec.interimResults = false; rec.maxAlternatives = 5;
    
    rec.onstart = () => setPhonicsListening(true);
    rec.onend = () => setPhonicsListening(false);
    
    rec.onerror = () => {
      setPhonicsListening(false);
      setPhonicsFeedback({ type: 'error', message: 'לא שמעתי, נסה שוב! 🎤' });
    };

    rec.onresult = e => {
      if (isProcessingRef.current) return;
      let matched = false;
      let heardWord = "";
      
      for (let i = 0; i < e.results[0].length; i++) {
        const transcript = e.results[0][i].transcript.toLowerCase().trim();
        if (i === 0) heardWord = transcript;
        if (isFuzzyMatch(transcript, targetWord)) {
          matched = true;
          heardWord = transcript;
          break;
        }
      }

      if (matched) {
        isProcessingRef.current = true;
        setPhonicsFeedback({ type: 'success', message: `מצוין! שמעתי "${heardWord}"` });
        playSound('success');
        triggerAnimation('success-check');
        setPhonicsMastered(prev => ({ ...prev, [targetWord]: true }));
        setTimeout(() => {
          setPhonicsFeedback(null);
          isProcessingRef.current = false;
        }, 1500);
      } else {
        playSound('error');
        setPhonicsFeedback({ type: 'error', message: `שמעתי "${heardWord}", תגיד "${targetWord}".` });
      }
    };

    try { rec.start(); } catch (_) { setPhonicsListening(false); }
  };

  const skipSpeech = () => {
    setMasteredIndexes(prev => prev.includes(activeWordIndex) ? prev : [...prev, activeWordIndex]);
    setActiveWordIndex(i => (i + 1) % wordsData.length);
    setStep(1);
    setFeedback(null);
    setCoachMsg("עברת מילה בדילוג. בוא נתמקד במילה הבאה! ⚽");
  };

  const checkTranslation = he => {
    if (he === currentWord.he) {
      playSound('success');
      setCoachMsg(getCoachFeedback('success', "התרגום מדויק!"));
      setStep(3);
    } else {
      playSound('error');
      setFeedback({ type: 'error', message: 'לא נכון, נסה שוב.' });
      setCoachMsg(getCoachFeedback('error', "בחירת תרגום לא נכונה. תרים את הראש ונסה שוב!"));
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  const resetProgress = () => {
    if (confirm("לאפס את כל ההתקדמות? המילים שנלמדו יימחקו.")) {
      setMasteredIndexes([]); setActiveWordIndex(0);
      localStorage.removeItem('yuval_mastered_words_100');
      localStorage.removeItem('yuval_last_active_index_100');
      setView('learn'); setStep(1);
      setCoachMsg("ההתקדמות אופסה. התחלנו חימום מחדש! 🏃‍♂️");
    }
  };

  // זוגות (Memory Match)
  const startMatchGame = () => {
    const selected = [...wordsData].sort(() => 0.5 - Math.random()).slice(0, 6);
    let cards = [];
    selected.forEach((w, i) => {
      cards.push({ id: `en-${i}`, text: w.en, type: 'en', pairId: i });
      cards.push({ id: `he-${i}`, text: `${w.he} (${w.pron})`, type: 'he', pairId: i });
    });
    setMatchCards(cards.sort(() => 0.5 - Math.random()));
    setFlippedCards([]); setMatchedPairs([]);
    setView('match');
    setCoachMsg("זוגות! מצא את ההתאמה בין האנגלית להגייה והפירוש בעברית. ⚽");
  };

  const handleCardClick = card => {
    if (flippedCards.length === 2 || flippedCards.some(c => c.id === card.id) || matchedPairs.includes(card.pairId)) return;
    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);
    if (newFlipped.length === 2) {
      if (newFlipped[0].pairId === newFlipped[1].pairId) {
        playSound('success');
        setTimeout(() => {
          const newMatched = [...matchedPairs, newFlipped[0].pairId];
          setMatchedPairs(newMatched);
          setFlippedCards([]);
          if (newMatched.length === 6) {
            triggerAnimation('confetti');
            setCoachMsg("שלוש נקודות בקופה! ניצחון מדהים במשחק הזוגות! 🏆");
          }
        }, 500);
      } else {
        playSound('error');
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  // חצאי משפטים (Half Sentences)
  const startHalfSentences = () => {
    const selected = [...halfSentencesData].sort(() => 0.5 - Math.random()).slice(0, 5);
    setHalfSentences(selected);
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedHalfIds([]);
    setWrongHalfIds([]);
    setView('half-sentences');
    setCoachMsg("חצאי משפטים! לחץ על התחלת משפט מצד ימין, וההמשך ההגיוני והדקדוקי מצד שמאל! 🧩");
  };

  const handleHalfSentenceClick = (side, item) => {
    if (isProcessingRef.current || matchedHalfIds.includes(item.id)) return;

    if (side === 'left') {
      setSelectedLeft(item);
      if (selectedRight) {
        checkHalfSentenceMatch(item, selectedRight);
      }
    } else {
      setSelectedRight(item);
      if (selectedLeft) {
        checkHalfSentenceMatch(selectedLeft, item);
      }
    }
  };

  const checkHalfSentenceMatch = (leftItem, rightItem) => {
    isProcessingRef.current = true;
    if (leftItem.id === rightItem.id) {
      playSound('success');
      setCoachMsg(getCoachFeedback('success', "משפט מחובר מושלם!"));
      setMatchedHalfIds(prev => {
        const next = [...prev, leftItem.id];
        if (next.length === 5) {
          triggerAnimation('confetti');
          setCoachMsg("גולללל! חיברת את כל חצאי המשפטים כמו מנצח! 🏆");
        }
        return next;
      });
      setSelectedLeft(null);
      setSelectedRight(null);
      isProcessingRef.current = false;
    } else {
      playSound('error');
      setCoachMsg(getCoachFeedback('error', "החיבור לא הגיוני, המשחק ממשיך!"));
      setWrongHalfIds([leftItem.id, rightItem.id]);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrongHalfIds([]);
        isProcessingRef.current = false;
      }, 1000);
    }
  };

  // בוחן מסכם (Quiz)
  const startQuiz = () => {
    const vocabQ = [...wordsData].sort(() => 0.5 - Math.random()).slice(0, 4).map(w => {
      const others = wordsData.filter(x => x.he !== w.he).sort(() => 0.5 - Math.random()).slice(0, 3);
      const opts = [...others.map(x => x.he), w.he].sort(() => 0.5 - Math.random());
      return { type: 'vocab', question: w.en, correct: w.he, options: opts, pron: w.pron };
    });
    const analogyQ = [...analogiesData].sort(() => 0.5 - Math.random()).slice(0, 3).map(a => ({
      type: 'analogy', data: a, correct: a.correct, options: a.options
    }));
    const compQ = [...completionData].sort(() => 0.5 - Math.random()).slice(0, 3).map(c => ({
      type: 'completion', data: c, correct: c.correct, options: c.options
    }));
    setQuizSet([...vocabQ, ...analogyQ, ...compQ].sort(() => 0.5 - Math.random()));
    setQuizIndex(0); setQuizScore(0);
    setView('quiz'); setFeedback(null);
    setCoachMsg("בוחן מסכם! תתרכז, כל נקודה מעלה אותך בטבלת הליגה! 🏆");
  };

  const handleQuizAnswer = selected => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    if (selected === quizSet[quizIndex].correct) {
      setQuizScore(prev => prev + 1);
      playSound('success');
      setCoachMsg(getCoachFeedback('success', "עוד תשובה נכונה לרשת!"));
      triggerAnimation('success-check');
    } else {
      playSound('error');
      setCoachMsg(getCoachFeedback('error', `התשובה הנכונה הייתה: ${quizSet[quizIndex].correct}`));
    }
    setTimeout(() => {
      if (quizIndex < quizSet.length - 1) setQuizIndex(prev => prev + 1);
      else setView('quiz-result');
      isProcessingRef.current = false;
    }, 1200);
  };

  const openReading = idx => {
    setReadingIndex(idx);
    setReadingAnswered([null, null]);
    setView('reading');
    setCoachMsg("קטע קריאה מאתגר! העבר עכבר מעל המילים הצבועות כדי לראות תרגום והגייה. 📖");
  };

  const handleReadingAnswer = (qIdx, chosenIdx) => {
    if (readingAnswered[qIdx] !== null) return;
    const correct = readingData[readingIndex].questions[qIdx].correct;
    const isCorrect = chosenIdx === correct;
    if (isCorrect) {
      playSound('success');
      triggerAnimation('success-check');
      setCoachMsg(getCoachFeedback('success', "ענית נכון על שאלת ההבנה!"));
    } else {
      playSound('error');
      setCoachMsg(getCoachFeedback('error', "לא מדויק, תחשוב שוב על מה שקראת."));
    }
    setReadingAnswered(prev => {
      const next = [...prev];
      next[qIdx] = chosenIdx;
      return next;
    });
  };

  // רינדור טקסט עם תמיכה ב-Tooltips פונטיים (מערכת שוהם)
  const renderStoryText = text => {
    if (!text) return null;
    return text.split(/(\[\[.*?\]\])/g).map((part, i) => {
      if (part.startsWith('[[') && part.endsWith(']]')) {
        const parts = part.slice(2, -2).split('|');
        const word = parts[0];
        const translation = parts[1];
        const pron = parts[2];
        return (
          <span key={i} className="relative inline-block group font-bold text-cyan-400 border-b border-dashed border-cyan-400 hover:text-cyan-300 cursor-pointer px-1">
            {word}
            {/* Tooltip */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-955 text-slate-200 border border-slate-700 text-xs rounded-xl p-2.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 shadow-2xl z-50 flex flex-col items-center gap-0.5">
              <span className="text-cyan-400 font-extrabold text-sm text-center">{translation}</span>
              <span className="text-slate-400 text-[10px] text-center" dir="rtl">הגייה: {pron}</span>
            </span>
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  // סינון מילים בספריה
  const filteredWords = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return wordsData;
    return wordsData.filter(w => w.en.toLowerCase().includes(q) || w.he.includes(q));
  }, [searchQuery]);

  const NavBtn = ({ icon, label, id, action }) => (
    <button onClick={() => { if (action) action(); else setView(id); }}
      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all border border-transparent shadow-md hover:scale-105 active:scale-95
        ${view === id || (view.startsWith('quiz') && id === 'quiz')
          ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] border-cyan-500'
          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400 border-slate-700'}`}>
      <span className="text-sm sm:text-base">{icon}</span>
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-955 text-slate-105 p-4 md:p-6 font-sans select-none" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Lottie Overlays */}
        {activeAnim === 'success-check' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/40 backdrop-blur-sm">
            <dotlottie-wc src="https://lottie.host/21a44f7a-fb9f-4e6e-8ed5-647aa8455b43/jGVlPat0sl.lottie" style={{width:'280px',height:'280px'}} autoplay></dotlottie-wc>
          </div>
        )}
        {activeAnim === 'confetti' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/40 backdrop-blur-sm">
            <dotlottie-wc src="https://lottie.host/4c47d84e-6829-4be0-a686-d7a0817a318d/HgXH5VSCYu.lottie" style={{width:'100vw',height:'100vh'}} autoplay></dotlottie-wc>
          </div>
        )}

        {/* Header & Title */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl gap-4">
          <div className="text-right">
            <h1 className="text-3xl md:text-4xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.2)] flex items-center gap-2">
              <span>English Zone</span>
              <span className="text-lg bg-cyan-900/40 text-cyan-400 border border-cyan-800/60 px-3 py-1 rounded-full font-bold">יובל – כיתה ח' ⚽</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1">מערכת תרגול אינטראקטיבית משולבת כדורגל וגיימינג</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* כפתור התקנת אפליקציה */}
            {deferredPrompt && (
              <button onClick={handleInstallClick} className="text-xs bg-cyan-600 hover:bg-cyan-500 border border-cyan-500 text-white px-4 py-2.5 rounded-xl font-black shadow-md transition-all active:scale-95 animate-bounce">
                📱 התקן אפליקציה במסך הבית
              </button>
            )}
            {/* כפתור איפוס התקדמות */}
            <button onClick={resetProgress} className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 px-4 py-2 rounded-xl font-bold shadow-md transition-all active:scale-95">
              איפוס התקדמות 🔄
            </button>
          </div>
        </header>

        {/* ⏱️ פס התקדמות וטיימר יומי של 10 דקות */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">⏱️</span>
              <div>
                <span className="font-extrabold text-slate-200">זמן אימון יומי:</span>
                <span className="text-cyan-400 font-black ml-1.5 text-lg">
                  {Math.floor(secondsPracticed / 60)}:{(secondsPracticed % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-slate-500 text-sm"> / 10:00 דקות</span>
              </div>
            </div>
            {/* משפטי עידוד משתנים */}
            <div className="text-right sm:text-left">
              <p className="text-xs md:text-sm text-cyan-400 font-extrabold" dir="ltr">"{timerEncouragement.en}"</p>
              <p className="text-xs text-slate-400 font-bold">"{timerEncouragement.he}"</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-950 border border-slate-800 h-4 rounded-full overflow-hidden relative shadow-inner">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-1000 shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
              style={{ width: `${Math.min((secondsPracticed / 600) * 100, 100)}%` }} 
            />
          </div>
        </div>

        {/* ⚽ לוח פידבק מאמן הסייבר */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 border-2 border-cyan-800/40 rounded-3xl p-4 shadow-lg flex items-center gap-4">
          <div className="bg-cyan-955/60 border border-cyan-800/50 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-inner animate-pulse">
            🧔
          </div>
          <div className="flex-1 text-right">
            <h3 className="text-xs font-black text-cyan-400 uppercase tracking-wider">מאמן הסייבר של יובל</h3>
            <p className="text-slate-200 font-bold text-sm sm:text-base mt-0.5">{coachMsg}</p>
          </div>
        </div>

        {/* ניווט ראשי */}
        <nav className="flex flex-wrap justify-center gap-2">
          <NavBtn icon="🎓" label="למידה" id="learn" />
          <NavBtn icon="📖" label="ספריה" id="library" />
          <NavBtn icon="🗣️" label="חוקי קריאה" id="reading-rules" action={() => { setView('reading-rules'); setPhonicsRuleIdx(0); setPhonicsWordIdx(0); setPhonicsFeedback(null); }} />
          <NavBtn icon="🔗" label="אנלוגיות" id="analogies" action={() => { setView('analogies'); setAnalogyIndex(Math.floor(Math.random() * analogiesData.length)); }} />
          <NavBtn icon="✍️" label="משפטים" id="completion" action={() => { setView('completion'); setCompIndex(Math.floor(Math.random() * completionData.length)); }} />
          <NavBtn icon="🧩" label="חצאי משפטים" id="half-sentences" action={startHalfSentences} />
          <NavBtn icon="📚" label="קריאה" id="reading-list" action={() => setView('reading-list')} />
          <NavBtn icon="🃏" label="זוגות" id="match" action={startMatchGame} />
          <NavBtn icon="🏆" label="בוחן" id="quiz" action={startQuiz} />
        </nav>

        {/* ── LEARN (🎓 למידה) ────────────────────────────────────── */}
        {view === 'learn' && (
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 md:p-10 shadow-2xl text-center relative min-h-[460px] flex flex-col justify-center transition-all">
            {feedback && (
              <div className={`absolute top-0 left-0 w-full p-3 rounded-t-[2.5rem] font-black text-sm text-center shadow-md transition-all
                ${feedback.type === 'success' ? 'bg-cyan-600 text-white' : 'bg-red-600 text-white'}`}>
                {feedback.message}
              </div>
            )}
            
            <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full w-max mx-auto font-bold mb-4">כרטיסיית לימוד</span>
            
            <h2 className="text-6xl font-black text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] mb-2" dir="ltr">
              {currentWord.en}
            </h2>
            <p className="text-2xl font-bold text-slate-300 mb-6">
              {currentWord.he} <span className="text-slate-500 font-medium text-lg">({currentWord.pron})</span>
            </p>

            {step === 1 && (
              <div className="space-y-6">
                <div className="flex justify-center gap-4">
                  <button onClick={() => speakWord(currentWord.en)}
                    title="הקראה רגילה"
                    className="w-20 h-20 bg-cyan-600 border border-cyan-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg hover:scale-110 active:scale-95 transition-all text-3xl">
                    🔊
                  </button>
                  <button onClick={() => speakWord(currentWord.en, 0.55)}
                    title="הקראה איטית"
                    className="w-20 h-20 bg-slate-800 border border-slate-700 text-cyan-400 rounded-full flex items-center justify-center mx-auto shadow-lg hover:scale-110 active:scale-95 transition-all text-3xl">
                    🐢
                  </button>
                </div>
                <p className="text-slate-400 text-xs font-bold">לחץ כדי לשמוע את ההגייה (רגיל או איטי)</p>
                <button onClick={() => setStep(2)}
                  className="mt-6 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-lg rounded-2xl shadow-xl hover:scale-105 transition-all w-full max-w-xs mx-auto block border border-cyan-500">
                  אני מכיר, נעבור לתרגום ✨
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <p className="text-slate-400 text-sm font-bold">בחר את התרגום הנכון למילה:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                  {options.map((opt, i) => (
                    <button key={i} onClick={() => checkTranslation(opt.he)}
                      className="p-5 bg-slate-800 hover:bg-cyan-950/60 border-2 border-slate-700 hover:border-cyan-500 rounded-2xl font-bold text-lg text-slate-100 transition-all shadow-md">
                      {opt.he}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <p className="text-slate-300 font-extrabold text-base">עכשיו תורך! לחץ על המיקרופון ואמור את המילה באנגלית:</p>
                
                <button onClick={handleSpeech}
                  disabled={isListening}
                  className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto shadow-2xl transition-all relative text-4xl border-4
                    ${isListening 
                      ? 'bg-red-600 border-red-500 scale-115 shadow-[0_0_20px_rgba(220,38,38,0.5)]' 
                      : 'bg-cyan-600 border-cyan-500 hover:bg-cyan-500 hover:scale-105'}`}>
                  {isListening && <span className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping" />}
                  🎤
                </button>
                
                <p className="font-black text-sm text-slate-400">
                  {isListening ? "💬 המאמן מקשיב..." : "לחץ לשידור"}
                </p>
                
                <button onClick={skipSpeech}
                  className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-350 rounded-xl font-bold text-xs border border-slate-700 transition-all mx-auto block">
                  דלג על המילה ⏭
                </button>
              </div>
            )}

            {/* progress bar */}
            <div className="w-full bg-slate-950 border border-slate-800 h-3 rounded-full mt-10 overflow-hidden shadow-inner">
              <div className="bg-cyan-500 h-full transition-all duration-700" style={{ width: `${(masteredIndexes.length / wordsData.length) * 100}%` }} />
            </div>
            <p className="text-slate-500 text-xs mt-2 font-bold">{masteredIndexes.length} מתוך {wordsData.length} מילים נלמדו</p>
          </div>
        )}

        {/* ── LIBRARY (📖 ספריה) ──────────────────────────────────── */}
        {view === 'library' && (
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-xl space-y-6">
            <h2 className="text-2xl font-black text-cyan-400 text-center">ספריית המילים המלאה ({wordsData.length} מילים)</h2>
            
            {/* חיפוש מילים */}
            <div className="max-w-md mx-auto relative">
              <input 
                type="text" 
                placeholder="חפש מילה באנגלית או בעברית..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-slate-200 placeholder-slate-505 focus:outline-none focus:border-cyan-500 transition-all text-sm text-right"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-bold">
                  נקה
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[50vh] overflow-y-auto pr-2">
              {filteredWords.map((w) => {
                const idxInMain = wordsData.findIndex(x => x.en === w.en);
                const isMastered = masteredIndexes.includes(idxInMain);
                return (
                  <div key={idxInMain} onClick={() => { setActiveWordIndex(idxInMain); setStep(1); setView('learn'); }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all hover:scale-105 flex flex-col justify-between min-h-[90px]
                      ${isMastered 
                        ? 'bg-cyan-950/40 border-cyan-600 shadow-[0_0_10px_rgba(6,182,212,0.15)]' 
                        : 'bg-slate-850 border-slate-800 hover:border-cyan-800'}`}>
                    <div>
                      <p className="font-black text-base text-center text-slate-100" dir="ltr">{w.en}</p>
                      <p className="text-xs text-center text-slate-400 mt-1">{w.he}</p>
                      <p className="text-[10px] text-center text-slate-500 mt-0.5" dir="rtl">{w.pron}</p>
                    </div>
                    {isMastered && <span className="text-cyan-400 text-center block mt-1.5 font-bold text-xs">✓ נלמד</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── READING RULES (🗣️ חוקי קריאה וצלילים) ────────────────────────── */}
        {view === 'reading-rules' && (
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 md:p-8 shadow-xl space-y-6">
            <h2 className="text-2xl font-black text-cyan-400 text-center flex items-center justify-center gap-2">
              <span>🗣️ חוקי קריאה וצלילים (Phonics)</span>
            </h2>

            {/* תפריט חוקים */}
            <div className="flex flex-wrap justify-center gap-2 border-b border-slate-800 pb-4">
              {readingPatternsData.map((rule, idx) => (
                <button 
                  key={idx} 
                  onClick={() => { setPhonicsRuleIdx(idx); setPhonicsWordIdx(0); setPhonicsFeedback(null); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                    ${phonicsRuleIdx === idx ? 'bg-cyan-600 text-white' : 'bg-slate-880 text-slate-400 hover:bg-slate-700'}`}>
                  {rule.pattern}
                </button>
              ))}
            </div>

            {/* תוכן החוק הנבחר */}
            <div className="space-y-6 text-center">
              <div className="bg-slate-950 border border-slate-855 p-5 rounded-2xl text-right">
                <h3 className="text-cyan-400 font-extrabold text-base mb-1.5">{readingPatternsData[phonicsRuleIdx].pattern}</h3>
                <p className="text-slate-300 text-sm font-medium leading-relaxed">{readingPatternsData[phonicsRuleIdx].hebrew}</p>
              </div>

              {/* כרטיס המילה הפעילה בחוק */}
              {readingPatternsData[phonicsRuleIdx].words[phonicsWordIdx] && (
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 max-w-xl mx-auto shadow-inner space-y-4">
                  {phonicsFeedback && (
                    <div className={`p-2 rounded-xl text-xs font-bold text-center ${phonicsFeedback.type === 'success' ? 'bg-cyan-600 text-white' : 'bg-red-600 text-white'}`}>
                      {phonicsFeedback.message}
                    </div>
                  )}

                  <p className="text-slate-400 text-sm italic" dir="ltr">
                    "{readingPatternsData[phonicsRuleIdx].words[phonicsWordIdx].intro}"
                  </p>
                  
                  <h4 className="text-5xl font-black text-cyan-400 tracking-wide drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]" dir="ltr">
                    {readingPatternsData[phonicsRuleIdx].words[phonicsWordIdx].word}
                  </h4>
                  
                  <p className="text-slate-500 font-bold tracking-widest text-lg" dir="ltr">
                    {readingPatternsData[phonicsRuleIdx].words[phonicsWordIdx].breakdown}
                  </p>

                  <p className="text-slate-200 font-extrabold text-lg">
                    {readingPatternsData[phonicsRuleIdx].words[phonicsWordIdx].hebrew} 
                    <span className="text-slate-505 text-sm font-medium"> ({readingPatternsData[phonicsRuleIdx].words[phonicsWordIdx].pron})</span>
                  </p>

                  {/* כפתורי שמע והקלטה */}
                  <div className="flex justify-center items-center gap-3 pt-3 flex-wrap">
                    <button 
                      onClick={() => speakWord(readingPatternsData[phonicsRuleIdx].words[phonicsWordIdx].word)}
                      title="השמע מילה"
                      className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold text-slate-350 hover:bg-slate-700 active:scale-95 transition-all flex items-center gap-1">
                      <span>🔊</span> רגיל
                    </button>
                    <button 
                      onClick={() => speakWord(readingPatternsData[phonicsRuleIdx].words[phonicsWordIdx].word, 0.55)}
                      title="השמע מילה לאט"
                      className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold text-slate-350 hover:bg-slate-700 active:scale-95 transition-all flex items-center gap-1">
                      <span>🐢</span> איטי
                    </button>

                    <button 
                      onClick={() => handlePhonicsSpeech(readingPatternsData[phonicsRuleIdx].words[phonicsWordIdx].word)}
                      disabled={phonicsListening}
                      className={`px-5 py-2.5 rounded-xl text-sm font-extrabold flex items-center gap-1.5 border active:scale-95 transition-all
                        ${phonicsListening 
                          ? 'bg-red-600 border-red-500 text-white animate-pulse' 
                          : 'bg-cyan-600 border-cyan-500 text-white hover:bg-cyan-500'}`}>
                      <span>🎤</span> {phonicsListening ? "מקשיב..." : "דבר"}
                    </button>
                  </div>

                  {phonicsMastered[readingPatternsData[phonicsRuleIdx].words[phonicsWordIdx].word] && (
                    <div className="text-cyan-400 font-extrabold text-xs">
                      ✓ קראת נכון! המילה סומנה כהצלחה במאגר!
                    </div>
                  )}
                </div>
              )}

              {/* ניווט בין המילים של החוק */}
              <div className="flex justify-center gap-2">
                {readingPatternsData[phonicsRuleIdx].words.map((_, wIdx) => (
                  <button 
                    key={wIdx} 
                    onClick={() => { setPhonicsWordIdx(wIdx); setPhonicsFeedback(null); }}
                    className={`w-9 h-9 rounded-full font-bold text-xs transition-all
                      ${phonicsWordIdx === wIdx ? 'bg-cyan-600 text-white scale-110' : 'bg-slate-800 text-slate-550 hover:bg-slate-700'}`}>
                    {wIdx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ANALOGIES (🔗 אנלוגיות) ────────────────────────────────── */}
        {view === 'analogies' && (
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 md:p-10 shadow-xl border-t-8 border-purple-600 text-center transition-all">
            <h2 className="text-2xl font-black text-purple-400 mb-6">אנלוגיות משפטים 🔗</h2>
            
            <div className="bg-purple-950/40 border border-purple-800/40 px-5 py-2 rounded-full inline-block mb-6 font-bold text-purple-300 text-sm">
              סוג קשר: {analogiesData[analogyIndex].relation}
            </div>

            <div className="flex justify-center items-center gap-3 text-xl sm:text-2xl font-black bg-slate-950 border border-slate-850 p-5 rounded-2xl mb-4 max-w-xl mx-auto flex-wrap" dir="ltr">
              <span className="text-slate-100">{analogiesData[analogyIndex].word1}</span>
              <span className="text-purple-400">↔</span>
              <span className="text-slate-100">{analogiesData[analogyIndex].word2}</span>
            </div>

            <div className="text-sm text-slate-400 font-bold mb-4">בדיוק באותו אופן:</div>

            <div className="flex justify-center items-center gap-3 text-xl sm:text-2xl font-black bg-purple-950 border-2 border-purple-700 p-5 rounded-2xl mb-8 max-w-xl mx-auto flex-wrap" dir="ltr">
              <span className="text-purple-200">{analogiesData[analogyIndex].word3}</span>
              <span className="text-purple-400">↔</span>
              <span className="border-b-4 border-purple-400 text-purple-400 w-16 text-center">?</span>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
              {analogiesData[analogyIndex].options.map((opt, i) => (
                <button key={i} onClick={() => {
                  if (opt === analogiesData[analogyIndex].correct) {
                    playSound('success'); triggerAnimation('success-check');
                    setCoachMsg(getCoachFeedback('success', "אנלוגיה נכונה!"));
                    setTimeout(() => setAnalogyIndex(prev => getNextRandom(prev, analogiesData.length)), 1500);
                  } else {
                    playSound('error');
                    setCoachMsg(getCoachFeedback('error', "הקשר שבחרת לא תואם. נסה שוב!"));
                  }
                }} className="p-4 bg-slate-800 border-2 border-slate-700 hover:border-purple-500 rounded-2xl font-black text-lg text-slate-100 hover:bg-purple-955/60 transition-all shadow-sm" dir="ltr">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── COMPLETION (✍️ השלמת משפטים) ─────────────────────────────── */}
        {view === 'completion' && (
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 md:p-10 shadow-xl border-t-8 border-emerald-600 text-center transition-all">
            <h2 className="text-2xl font-black text-emerald-405 mb-6">השלמת משפטים ✍️</h2>
            
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-855 mb-8 text-xl font-bold text-slate-100 leading-relaxed max-w-2xl mx-auto" dir="ltr">
              {completionData[compIndex].sentence.split('_______')[0]}
              <span className="inline-block border-b-4 border-emerald-400 text-emerald-400 px-4">?</span>
              {completionData[compIndex].sentence.split('_______')[1]}
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
              {completionData[compIndex].options.map((opt, i) => (
                <button key={i} onClick={() => {
                  if (opt === completionData[compIndex].correct) {
                    playSound('success'); triggerAnimation('success-check');
                    setCoachMsg(getCoachFeedback('success', "השלמת משפט נכונה!"));
                    setTimeout(() => setCompIndex(prev => getNextRandom(prev, completionData.length)), 1500);
                  } else {
                    playSound('error');
                    setCoachMsg(getCoachFeedback('error', "בחירה לא נכונה. תעבור מגן ותנסה שוב!"));
                  }
                }} className="p-4 bg-slate-800 border-2 border-slate-700 hover:border-emerald-500 rounded-2xl font-black text-base sm:text-lg text-slate-100 hover:bg-emerald-950/40 transition-all shadow-sm" dir="ltr">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── HALF SENTENCES (🧩 חצאי משפטים - NEW) ────────────────────── */}
        {view === 'half-sentences' && halfSentences.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 md:p-8 shadow-xl space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-black text-cyan-400">🧩 משחק חצאי משפטים</h2>
              <p className="text-xs text-slate-400 mt-1">חבר את ההתחלות בצד ימין עם הסיומות הלוגיות בצד שמאל</p>
            </div>

            {matchedHalfIds.length === 5 ? (
              <div className="py-12 text-center space-y-6">
                <h3 className="text-4xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">ניצחון מלא! 🎉</h3>
                <p className="text-slate-355 text-base font-bold">כל חצאי המשפטים חוברו בהצלחה מוחלטת!</p>
                <button onClick={startHalfSentences} className="px-8 py-3.5 bg-cyan-600 border border-cyan-500 hover:bg-cyan-500 text-white font-extrabold rounded-2xl shadow-lg transition-all transform hover:scale-105">
                  שחק סיבוב נוסף
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                
                {/* התחלות (Right Column in layout, Left logically in code) */}
                <div className="space-y-3">
                  <p className="text-xs font-black text-cyan-400 uppercase tracking-wider text-right">התחלות משפט:</p>
                  {halfSentences.map((item) => {
                    const isMatched = matchedHalfIds.includes(item.id);
                    const isSelected = selectedLeft?.id === item.id;
                    const isWrong = wrongHalfIds.includes(item.id);
                    
                    let cardStyle = "w-full text-right p-4 rounded-2xl border-2 transition-all duration-305 text-sm font-semibold select-none ";
                    if (isMatched) {
                      cardStyle += "bg-emerald-950/20 border-emerald-600/30 text-slate-500 cursor-default opacity-0 scale-95 pointer-events-none";
                    } else if (isWrong) {
                      cardStyle += "bg-red-955/60 border-red-500 text-red-200 shadow-[0_0_10px_rgba(239,68,68,0.4)]";
                    } else if (isSelected) {
                      cardStyle += "bg-cyan-955/60 border-cyan-500 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.02]";
                    } else {
                      cardStyle += "bg-slate-950 border-slate-800 hover:border-cyan-800 text-slate-200 hover:scale-[1.01]";
                    }

                    return (
                      <button 
                        key={item.id} 
                        onClick={() => handleHalfSentenceClick('left', item)}
                        disabled={isMatched}
                        className={cardStyle}
                        dir="ltr">
                        {item.start}
                      </button>
                    );
                  })}
                </div>

                {/* סיומות (Left Column in layout, Right logically in code) */}
                <div className="space-y-3">
                  <p className="text-xs font-black text-cyan-400 uppercase tracking-wider text-right">סיומות משפט:</p>
                  {[...halfSentences].sort((a,b) => a.id - b.id).map((item) => {
                    const isMatched = matchedHalfIds.includes(item.id);
                    const isSelected = selectedRight?.id === item.id;
                    const isWrong = wrongHalfIds.includes(item.id);

                    let cardStyle = "w-full text-left p-4 rounded-2xl border-2 transition-all duration-305 text-sm font-semibold select-none ";
                    if (isMatched) {
                      cardStyle += "bg-emerald-950/20 border-emerald-600/30 text-slate-500 cursor-default opacity-0 scale-95 pointer-events-none";
                    } else if (isWrong) {
                      cardStyle += "bg-red-955/60 border-red-500 text-red-200 shadow-[0_0_10px_rgba(239,68,68,0.4)]";
                    } else if (isSelected) {
                      cardStyle += "bg-cyan-955/60 border-cyan-500 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.02]";
                    } else {
                      cardStyle += "bg-slate-950 border-slate-800 hover:border-cyan-800 text-slate-200 hover:scale-[1.01]";
                    }

                    return (
                      <button 
                        key={item.id} 
                        onClick={() => handleHalfSentenceClick('right', item)}
                        disabled={isMatched}
                        className={cardStyle}
                        dir="ltr">
                        {item.end}
                      </button>
                    );
                  })}
                </div>

              </div>
            )}
          </div>
        )}

        {/* ── READING LIST (📚 רשימת קריאה) ───────────────────────────────── */}
        {view === 'reading-list' && (
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-xl space-y-6">
            <h2 className="text-2xl font-black text-cyan-400 text-center">טקסטים לקריאה ושאלות הבנה 📚</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {readingData.map((story, idx) => (
                <button key={idx} onClick={() => openReading(idx)}
                  className="p-5 bg-slate-950 border-2 border-slate-800 rounded-2xl text-right hover:bg-cyan-950/40 hover:border-cyan-600 transition-all shadow-md group">
                  <h3 className="font-black text-lg text-cyan-400 group-hover:text-cyan-300" dir="ltr">{story.title}</h3>
                  <p className="text-slate-400 text-xs font-bold mt-1">{story.questions.length} שאלות הבנה מאתגרות</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── READING (📖 קריאה פעילה) ────────────────────────────────────── */}
        {view === 'reading' && (
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 md:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <button onClick={() => setView('reading-list')} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-355 rounded-xl font-bold text-xs border border-slate-750">
                ← חזרה לרשימה
              </button>
              <h2 className="text-2xl font-black text-cyan-400" dir="ltr">{readingData[readingIndex].title}</h2>
              <div className="w-12" />
            </div>

            {/* גוף הטקסט */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-850 text-base md:text-lg text-slate-200 leading-8 whitespace-pre-line text-justify" dir="ltr">
              {renderStoryText(readingData[readingIndex].text)}
            </div>

            <div className="text-center">
              <button onClick={() => speakWord(readingData[readingIndex].text.replace(/\[\[(.*?)\|.*?\|.*?\]\]/g, "$1"), 0.8)}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-750 text-cyan-400 rounded-xl font-extrabold text-sm flex items-center gap-1.5 mx-auto">
                <span>🔊</span> הקרא לי את הסיפור
              </button>
            </div>

            <hr className="border-slate-800" />
            <h3 className="text-xl font-black text-cyan-400 text-center">שאלות הבנה</h3>

            {readingData[readingIndex].questions.map((q, qIdx) => (
              <div key={qIdx} className="bg-slate-955 border border-slate-800 rounded-2xl p-5 space-y-3">
                <p className="font-extrabold text-sm text-slate-405">שאלה {qIdx + 1}:</p>
                <p className="font-black text-base text-slate-100" dir="ltr">{q.q}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, oIdx) => {
                    const answered = readingAnswered[qIdx];
                    let btnStyle = "w-full text-left p-3.5 rounded-xl font-bold text-sm border-2 transition-all ";
                    
                    if (answered === null) {
                      btnStyle += "bg-slate-900 border-slate-805 text-slate-200 hover:bg-cyan-950/60 hover:border-cyan-500 cursor-pointer";
                    } else if (oIdx === q.correct) {
                      btnStyle += "bg-emerald-950/40 border-emerald-600 text-emerald-300 cursor-default";
                    } else if (oIdx === answered) {
                      btnStyle += "bg-red-955/40 border-red-600 text-red-300 cursor-default";
                    } else {
                      btnStyle += "bg-slate-900 border-slate-805 text-slate-505 opacity-40 cursor-default";
                    }

                    return (
                      <button key={oIdx} onClick={() => handleReadingAnswer(qIdx, oIdx)}
                        disabled={answered !== null} className={btnStyle} dir="ltr">
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {readingAnswered[qIdx] !== null && (
                  <p className={`font-bold text-xs ${readingAnswered[qIdx] === q.correct ? 'text-emerald-400' : 'text-red-400'}`}>
                    {readingAnswered[qIdx] === q.correct ? '✓ תשובה נכונה, גול יפה!' : `✗ החמצה! התשובה הנכונה: ${q.options[q.correct]}`}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── MATCH (🃏 משחק זוגות) ────────────────────────────────────── */}
        {view === 'match' && (
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-xl border-t-8 border-cyan-500 text-center transition-all min-h-[460px]">
            <h2 className="text-2xl font-black text-cyan-400 mb-2">זוגות – מצא את ההתאמה 🃏</h2>
            <p className="text-xs text-slate-400 mb-6">לחץ על מילה באנגלית ואז על התרגום וההגייה שלה בעברית</p>
            
            {matchedPairs.length === 6 ? (
              <div className="py-12 space-y-6">
                <h3 className="text-4xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">ניצחון מלא! 🎉</h3>
                <p className="text-slate-350 text-base font-bold">התאמת את כל הזוגות כמו שחקן ליגה מקצוען!</p>
                <button onClick={startMatchGame} className="px-8 py-3.5 bg-cyan-600 border border-cyan-500 hover:bg-cyan-500 text-white font-extrabold rounded-2xl shadow-lg transition-all transform hover:scale-105">
                  שחק סיבוב נוסף
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {matchCards.map((card, i) => {
                  const isFlipped = flippedCards.some(c => c.id === card.id);
                  const isMatched = matchedPairs.includes(card.pairId);
                  return (
                    <button key={i} onClick={() => handleCardClick(card)} disabled={isFlipped || isMatched}
                      className={`h-24 rounded-2xl font-black text-sm transition-all shadow-md flex items-center justify-center border-2 p-3 text-center
                        ${isMatched 
                          ? 'opacity-0 scale-95 cursor-default bg-cyan-955 border-cyan-600 pointer-events-none' 
                          : isFlipped 
                            ? 'bg-cyan-900 border-cyan-400 text-white scale-105 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                            : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-800'}`}
                      dir={card.type === 'en' ? 'ltr' : 'rtl'}>
                      {card.text}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── QUIZ (🏆 בוחן מסכם) ───────────────────────────────────────── */}
        {view === 'quiz' && quizSet.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 md:p-8 shadow-xl border-t-8 border-orange-500 text-center transition-all">
            <h2 className="text-base font-bold text-orange-400 mb-6">שאלה {quizIndex + 1} מתוך {quizSet.length}</h2>
            
            {quizSet[quizIndex].type === 'vocab' && (
              <div className="space-y-2 mb-8">
                <h3 className="text-5xl font-black text-slate-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]" dir="ltr">{quizSet[quizIndex].question}</h3>
                <p className="text-slate-505 font-bold text-sm">כיצד מבטאים ומפרשים מילה זו?</p>
              </div>
            )}
            
            {quizSet[quizIndex].type === 'analogy' && (
              <div className="mb-8 flex flex-col items-center gap-4">
                <div className="text-xl font-black bg-slate-950 p-4 rounded-xl border border-slate-800 w-full max-w-sm flex justify-center gap-4" dir="ltr">
                  <span>{quizSet[quizIndex].data.word1}</span> ↔ <span>{quizSet[quizIndex].data.word2}</span>
                </div>
                <div className="text-xl font-black text-orange-400 bg-orange-950/30 p-4 rounded-xl border border-orange-855 w-full max-w-sm flex justify-center gap-4" dir="ltr">
                  <span>{quizSet[quizIndex].data.word3}</span> ↔ <span className="border-b-4 border-orange-400 min-w-[50px]">?</span>
                </div>
              </div>
            )}

            {quizSet[quizIndex].type === 'completion' && (
              <div className="mb-8 text-lg font-bold bg-slate-950 p-5 rounded-2xl border border-slate-855 max-w-xl mx-auto" dir="ltr">
                {quizSet[quizIndex].data.sentence.split('_______')[0]}
                <span className="border-b-4 border-orange-400 px-4 text-orange-400">?</span>
                {quizSet[quizIndex].data.sentence.split('_______')[1]}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              {quizSet[quizIndex].options.map((opt, i) => (
                <button key={i} onClick={() => handleQuizAnswer(opt)}
                  className="p-4 bg-slate-800 border-2 border-slate-700 hover:border-orange-500 rounded-2xl font-bold text-base sm:text-lg text-slate-100 hover:bg-orange-950/30 transition-all shadow-md">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── QUIZ RESULT (🏆 תוצאת בוחן) ─────────────────────────────────── */}
        {view === 'quiz-result' && (
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 shadow-xl border-t-8 border-orange-500 text-center transition-all min-h-[380px] flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-black text-orange-400">הבוחן הסתיים! 🏆</h2>
            <p className="text-xl text-slate-355">הציון שלך בליגה הנוכחית:</p>
            <div className="text-7xl font-black text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              {Math.round((quizScore / quizSet.length) * 100)}%
            </div>
            <p className="text-slate-400 text-sm font-bold">
              ענית נכון על {quizScore} שאלות מתוך {quizSet.length}
            </p>
            <button onClick={() => setView('learn')} className="px-8 py-3.5 bg-orange-600 hover:bg-orange-500 border border-orange-500 text-white rounded-2xl font-extrabold text-lg shadow-lg hover:scale-105 transition-all mx-auto max-w-xs block">
              המשך למידה
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
