/**
 * Messi Career Data
 */

const MESSI_DATA = {
  lastUpdated: "2026-03-25",

  stats: {
    all: {
      appearances: 1065,
      goals: 850,
      assists: 380,
      hatTricks: 57,
      freeKickGoals: 65,
      goldenBoots: 6,
      minutesPlayed: 86400,
      trophies: 45,
    },
    barcelona: {
      appearances: 778,
      goals: 672,
      assists: 303,
      hatTricks: 48,
      freeKickGoals: 50,
      goldenBoots: 6,
      minutesPlayed: 63000,
      trophies: 35,
    },
    psg: {
      appearances: 75,
      goals: 32,
      assists: 35,
      hatTricks: 1,
      freeKickGoals: 3,
      goldenBoots: 0,
      minutesPlayed: 5400,
      trophies: 2,
    },
    miami: {
      appearances: 72,
      goals: 48,
      assists: 28,
      hatTricks: 4,
      freeKickGoals: 7,
      goldenBoots: 0,
      minutesPlayed: 5200,
      trophies: 2,
    },
    argentina: {
      appearances: 187,
      goals: 112,
      assists: 58,
      hatTricks: 10,
      freeKickGoals: 8,
      goldenBoots: 0,
      minutesPlayed: 15000,
      trophies: 4,
    },
  },

  goalsBySeason: [
    { season: "04/05", goals: 1 },
    { season: "05/06", goals: 8 },
    { season: "06/07", goals: 17 },
    { season: "07/08", goals: 16 },
    { season: "08/09", goals: 38 },
    { season: "09/10", goals: 47 },
    { season: "10/11", goals: 53 },
    { season: "11/12", goals: 73 },
    { season: "12/13", goals: 60 },
    { season: "13/14", goals: 41 },
    { season: "14/15", goals: 58 },
    { season: "15/16", goals: 41 },
    { season: "16/17", goals: 54 },
    { season: "17/18", goals: 45 },
    { season: "18/19", goals: 51 },
    { season: "19/20", goals: 31 },
    { season: "20/21", goals: 38 },
    { season: "21/22", goals: 11 },
    { season: "22/23", goals: 21 },
    { season: "23/24", goals: 23 },
    { season: "24/25", goals: 15 },
    { season: "25/26", goals: 10 },
  ],

  moments: [
    {
      title: "World Cup Glory \u2014 Qatar 2022",
      description:
        "The crowning achievement. Messi led Argentina to World Cup glory in what many call the greatest final in history. Two goals in the final against France, a penalty shootout triumph, and the one trophy that had eluded him was finally his. The image of Messi lifting the golden trophy in a bisht is etched into eternity.",
      year: "2022",
      emoji: "\uD83C\uDFC6",
      gradient: "linear-gradient(135deg, #1a0a2e 0%, #3d1a78 50%, #7b2ff7 100%)",
    },
    {
      title: "91 Goals in a Calendar Year",
      description:
        "In 2012, Messi shattered Gerd M\u00fcller's 40-year-old record by scoring 91 goals in a single calendar year. A feat of scoring mastery that may never be matched.",
      year: "2012",
      emoji: "\uD83D\uDD25",
      gradient: "linear-gradient(135deg, #1a0000 0%, #8b0000 100%)",
    },
    {
      title: "Copa Am\u00e9rica 2021 \u2014 Maracanazo",
      description:
        "After decades of heartbreak with Argentina, Messi finally won a senior international trophy, leading La Albiceleste to Copa Am\u00e9rica glory at the Maracan\u00e3 against Brazil.",
      year: "2021",
      emoji: "\uD83C\uDDE6\uD83C\uDDF7",
      gradient: "linear-gradient(135deg, #1a2a4a 0%, #75aadb 100%)",
    },
    {
      title: "6-2 El Cl\u00e1sico Destruction",
      description:
        "A 21-year-old Messi announced himself on the biggest stage with a hat-trick against Real Madrid at the Bernab\u00e9u in a legendary 6-2 demolition.",
      year: "2009",
      emoji: "\u26BD",
      gradient: "linear-gradient(135deg, #004d98 0%, #a50044 100%)",
    },
    {
      title: "Solo Goal vs Getafe",
      description:
        "Picking up the ball in his own half, Messi dribbled past 6 players and the goalkeeper in a goal that mirrored Maradona's famous World Cup strike. Pure poetry in motion.",
      year: "2007",
      emoji: "\uD83C\uDF1F",
      gradient: "linear-gradient(135deg, #0a2a1a 0%, #2d8659 100%)",
    },
    {
      title: "Boateng Falls \u2014 UCL Semi vs Bayern",
      description:
        "Two goals including one where he nutmegged Boateng so badly the defender collapsed to the ground. Messi at his devastating, untouchable best in the Champions League semifinal.",
      year: "2015",
      emoji: "\uD83D\uDCA5",
      gradient: "linear-gradient(135deg, #1a1a0a 0%, #b8860b 100%)",
    },
    {
      title: "UCL Final Header vs Man United",
      description:
        "A towering header over Rio Ferdinand sealed Barcelona's dominance in the 2009 Champions League Final in Rome. The goal that crowned the greatest team season.",
      year: "2009",
      emoji: "\u2B50",
      gradient: "linear-gradient(135deg, #0a0a2e 0%, #4169e1 100%)",
    },
    {
      title: "8th Ballon d'Or",
      description:
        "Following the World Cup triumph, Messi claimed an unprecedented 8th Ballon d'Or, further cementing his status as the greatest player in the history of football.",
      year: "2023",
      emoji: "\uD83C\uDFC5",
      gradient: "linear-gradient(135deg, #2a1a00 0%, #daa520 100%)",
    },
    {
      title: "Finalissima \u2014 Italy Destruction",
      description:
        "Argentina crushed European champions Italy 3-0 at Wembley with Messi orchestrating a mesmerizing display of passing, vision, and two assists.",
      year: "2022",
      emoji: "\uD83C\uDDEC\uD83C\uDDE7",
      gradient: "linear-gradient(135deg, #1a0a1a 0%, #6b3fa0 100%)",
    },
  ],

  timeline: [
    {
      year: "1987",
      title: "Born in Rosario",
      text: "Lionel Andr\u00e9s Messi born on June 24 in Rosario, Argentina. The world doesn't know it yet, but the GOAT has arrived.",
      icon: "\uD83C\uDDFA\uD83C\uDDE6",
    },
    {
      year: "2000",
      title: "Joins FC Barcelona",
      text: "At 13, Messi moves to Barcelona after they agree to pay for his growth hormone treatment. A contract famously signed on a napkin.",
      icon: "\u2708\uFE0F",
    },
    {
      year: "2004",
      title: "First Team Debut",
      text: "Makes his official debut for Barcelona at 17 against Espanyol. The youngest player to represent the club in a league match.",
      icon: "\u26BD",
    },
    {
      year: "2005",
      title: "First Goal & Youngest Scorer",
      text: "Scores his first La Liga goal at 17 years and 10 months, becoming the youngest scorer in club history.",
      icon: "\uD83C\uDFAF",
    },
    {
      year: "2009",
      title: "First Ballon d'Or & UCL",
      text: "Wins his first Ballon d'Or and scores in the Champions League Final. The start of an era of total dominance.",
      icon: "\uD83C\uDFC5",
    },
    {
      year: "2012",
      title: "91 Goals in a Year",
      text: "Breaks Gerd M\u00fcller's record with 91 goals in a calendar year. Also wins his 4th consecutive Ballon d'Or.",
      icon: "\uD83D\uDD25",
    },
    {
      year: "2015",
      title: "The Treble & MSN",
      text: "Alongside Su\u00e1rez and Neymar, leads Barcelona to the treble. Widely regarded as the best front three ever assembled.",
      icon: "\uD83C\uDFC6",
    },
    {
      year: "2021",
      title: "Copa Am\u00e9rica Champion",
      text: "Finally lifts a senior trophy with Argentina, winning Copa Am\u00e9rica at the Maracan\u00e3. Moves to Paris Saint-Germain.",
      icon: "\uD83C\uDDE6\uD83C\uDDF7",
    },
    {
      year: "2022",
      title: "World Cup Champion",
      text: "The crowning glory. Leads Argentina to World Cup victory in Qatar, winning the Golden Ball. The missing piece is complete.",
      icon: "\uD83C\uDFC6",
    },
    {
      year: "2023",
      title: "Inter Miami & 8th Ballon d'Or",
      text: "Joins Inter Miami, wins Leagues Cup immediately. Claims an unprecedented 8th Ballon d'Or.",
      icon: "\uD83C\uDF34",
    },
    {
      year: "2024",
      title: "Copa Am\u00e9rica Defense",
      text: "Helps Argentina defend their Copa Am\u00e9rica title, cementing this generation as one of the greatest international teams ever.",
      icon: "\uD83E\uDD47",
    },
    {
      year: "2025\u201326",
      title: "The Legacy Continues",
      text: "Continues to perform at Inter Miami, inspiring a new generation of fans and players across MLS and the world.",
      icon: "\u2B50",
    },
  ],

  trophies: [
    { name: "Ballon d'Or", count: 8, icon: "\uD83C\uDFC5", years: "2009, 2010, 2011, 2012, 2015, 2019, 2021, 2023" },
    { name: "World Cup", count: 1, icon: "\uD83C\uDFC6", years: "2022" },
    { name: "Copa Am\u00e9rica", count: 2, icon: "\uD83C\uDDE6\uD83C\uDDF7", years: "2021, 2024" },
    { name: "Champions League", count: 4, icon: "\u2B50", years: "2006, 2009, 2011, 2015" },
    { name: "La Liga", count: 10, icon: "\uD83C\uDDEA\uD83C\uDDF8", years: "2005\u20132019" },
    { name: "Copa del Rey", count: 7, icon: "\uD83E\uDD47", years: "2009\u20132021" },
    { name: "Ligue 1", count: 2, icon: "\uD83C\uDDEB\uD83C\uDDF7", years: "2022, 2023" },
    { name: "Club World Cup", count: 3, icon: "\uD83C\uDF0D", years: "2009, 2011, 2015" },
    { name: "Golden Shoe", count: 6, icon: "\uD83D\uDC5F", years: "2010, 2012, 2013, 2017, 2018, 2019" },
    { name: "Leagues Cup", count: 1, icon: "\uD83C\uDF1F", years: "2023" },
    { name: "Finalissima", count: 1, icon: "\uD83C\uDDEC\uD83C\uDDE7", years: "2022" },
    { name: "Super Copa", count: 8, icon: "\uD83C\uDFC6", years: "2005\u20132023" },
  ],

  quotes: [
    {
      text: "I start early, and I stay late, day after day, year after year. It took me 17 years and 114 days to become an overnight success.",
      author: "Lionel Messi",
    },
    {
      text: "You have to fight to reach your dream. You have to sacrifice and work hard for it.",
      author: "Lionel Messi",
    },
    {
      text: "I don't need the best hairstyle or the best body. Just give me a ball at my feet and I'll show you what I can do.",
      author: "Lionel Messi",
    },
    {
      text: "The day you think there is no improvements to be made is a sad one for any player.",
      author: "Lionel Messi",
    },
    {
      text: "I have seen the player who will inherit my place in Argentine football and his name is Messi.",
      author: "Diego Maradona",
    },
    {
      text: "Messi is the best player in history. He's from another planet.",
      author: "Pep Guardiola",
    },
    {
      text: "Don't write about him, don't try to describe him. Just watch him.",
      author: "Pep Guardiola",
    },
    {
      text: "There will be people who say Maradona was better, or Pel\u00e9, or whoever, but for me, he is the best of all.",
      author: "Luis Su\u00e1rez",
    },
    {
      text: "I am not going to change the way I play or the way I am, whether people love or hate me.",
      author: "Lionel Messi",
    },
    {
      text: "In football as in watchmaking, talent and elegance mean nothing without rigour and precision.",
      author: "Lionel Messi",
    },
  ],

  records: [
    { icon: "\uD83D\uDD25", title: "Most Goals in a Calendar Year", value: "91", desc: "Set in 2012, breaking Gerd M\u00fcller's 1972 record of 85" },
    { icon: "\uD83C\uDFC5", title: "Most Ballon d'Or Awards", value: "8", desc: "More than any other player in history" },
    { icon: "\u26BD", title: "Most Goals for a Single Club", value: "672", desc: "All-time top scorer for FC Barcelona" },
    { icon: "\uD83C\uDDEA\uD83C\uDDF8", title: "Most La Liga Goals", value: "474", desc: "All-time leading scorer in La Liga history" },
    { icon: "\uD83C\uDFA8", title: "Most Assists in La Liga", value: "192", desc: "All-time leading assist provider in La Liga" },
    { icon: "\uD83D\uDC5F", title: "Most European Golden Shoes", value: "6", desc: "More than any other player in history" },
    { icon: "\u2B50", title: "Most UCL Goals for One Club", value: "120", desc: "All scored for FC Barcelona" },
    { icon: "\uD83C\uDDE6\uD83C\uDDF7", title: "Argentina All-Time Top Scorer", value: "112", desc: "Surpassed Gabriel Batistuta's record of 54 goals" },
    { icon: "\uD83D\uDCA5", title: "Most Hat-Tricks in Career", value: "57+", desc: "More hat-tricks than any player in football history" },
    { icon: "\uD83D\uDC51", title: "Most FIFA Best Awards", value: "8", desc: "Combining Ballon d'Or and FIFA Best Player awards" },
  ],
};
