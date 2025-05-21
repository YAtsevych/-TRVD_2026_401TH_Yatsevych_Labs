const PagesData = [
  {
    id: 1,
    slug: 'home',
    title: 'Home',
    FirstViewBackGroundImg: '/resoures/img/backgrounds/Home.jpg',
    FirstViewText:
      'Learn English online and boost your skills with our engaging tools and materials.',
    link: '/',
    description: '',
    styleSpecial: { backgroundPosition: '100%' },
    Parts: [],
  },
  {
    id: 2,
    slug: 'vocabular',
    title: 'Vocabular',
    FirstViewBackGroundImg: '/resoures/img/backgrounds/VocabularMain.jpg',
    FirstViewText:
      'Build your vocabulary to communicate more effectively in English.',
    link: '/vocabular',
    description: `Want to expand your vocabulary to better understand English and express your thoughts clearly? These materials are split into two parts, sorted by your level of English. <br /><br />Each section includes exercises to help you grasp the meaning, pronunciation, and spelling of new terms. Building your vocabulary will support your language growth and help you speak English more confidently and fluently. Topics are grouped for easier learning and come with interactive tasks to make memorizing new words simpler. <br /><br />You’ll also find two entertaining games designed to boost your word knowledge.`,
    styleSpecial: null,
    Parts: [
      {
        idPart: 1,
        Parttitle: 'A1 - A2 Vocabular',
        slug2: 'A1A2vocabular',
        PartPath: '/vocabular/A1A2vocabular',
        Partdescription:
          'Are you a learner at A1 (elementary) or A2 (pre-intermediate) English level? Learn new words and practise your vocabulary.',
        PartImgSrs: '/resoures/img/backgrounds/3.jpg',
        Courses: [
          {
            idCourse: 0,
            CourseTitle: 'Accessories',
            CoursePath: '/vocabular/A1A2vocabular/Accessories',
            CourseDescription:
              'Learn vocabulary for accessories and practice using them in sentences.',
            CourseImgSrs: '/resoures/img/backgrounds/3.jpg',
          },
          {
            idCourse: 1,
            CourseTitle: 'Accessories',
            CoursePath: '/vocabular/A1A2vocabular/Accessories',
            CourseDescription:
              'Learn vocabulary for accessories and practice using them in sentences.',
            CourseImgSrs: '/resoures/img/backgrounds/3.jpg',
          },
          {
            idCourse: 2,
            CourseTitle: 'Accessories',
            CoursePath: '/vocabular/A1A2vocabular/Accessories',
            CourseDescription:
              'Learn vocabulary for accessories and practice using them in sentences.',
            CourseImgSrs: '/resoures/img/backgrounds/3.jpg',
          },
        ],
      },
      {
        idPart: 2,
        Parttitle: 'B1 - B2 Vocabular',
        slug2: 'B1B2vocabular',
        PartPath: '/vocabular/B1B2vocabular',
        Partdescription:
          'Are you learning English at B1 (intermediate) or B2 (upper-intermediate) level? Expand your vocabulary and practise using new words in context.',
        PartImgSrs: '/resoures/img/backgrounds/5.jpg',
        Courses: [],
      },
      {
        idPart: 3,
        Parttitle: 'Your Vocabular',
        slug2: 'personalVocabular',
        PartPath: '/vocabular/personalVocabular',
        Partdescription:
          'This is your personal vocabulary list, where you collect the words you`ve learned with us',
        PartImgSrs: '/resoures/img/backgrounds/levelsMain.jpg',
        Courses: [],
      },
    ],
  },
  {
    id: 3,
    slug: 'grammar',
    title: 'Grammar',
    FirstViewBackGroundImg: '/resoures/img/backgrounds/GrammarMain.jpg',
    FirstViewText:
      'Practice grammar often to boost confidence and improve your English.',
    link: '/grammar',
    description:
      'Improve your English grammar through clear explanations and practice tasks that check your understanding.<br /><br />The materials are divided into two parts based on your level.<br /><br />Everyone learning English, no matter their level, sometimes has questions about grammar. There`s also a helpful reference section that clearly explains verb tenses and grammar rules.<br /><br />Pick the grammar topic you want to focus on today and start practising. The interactive exercises show your progress.<br /><br />The more you revise and practise, the more confident and accurate your English will become.<br /><br />The best way to learn grammar is to practise regularly, so come back tomorrow and work on a new topic.',
    styleSpecial: { backgroundPosition: '100%' },
    Parts: [
      {
        idPart: 1,
        Parttitle: 'A1 - A2 Grammar',
        slug2: 'A1A2grammar',
        PartPath: '/grammar/A1A2grammar',
        Partdescription:
          'Are you at an A1 (beginner) or A2 (pre-intermediate) English level? In this section, you can enhance your grammar skills with easy-to-follow lessons.',
        PartImgSrs: '/resoures/img/backgrounds/3.jpg',
        Courses: [],
      },
      {
        idPart: 2,
        Parttitle: 'B1 - B2 Grammar',
        slug2: 'B1B2grammar',
        PartPath: '/grammar/B1B2grammar',
        Partdescription:
          'Are you at a B1 (intermediate) or B2 (upper-intermediate) English level? This section will help you refine your grammar with straightforward lessons.',
        PartImgSrs: '/resoures/img/backgrounds/5.jpg',
        Courses: [],
      },
      {
        idPart: 3,
        Parttitle: 'C1 Grammar',
        slug2: 'C1grammar',
        PartPath: '/grammar/C1grammar',
        Partdescription:
          'Are you at a C1 (advanced) English level? Here, you can elevate your grammar with our clear and simple lessons.',
        PartImgSrs: '/resoures/img/backgrounds/5.jpg',
        Courses: [],
      },
      {
        idPart: 4,
        Parttitle: 'English grammar reference',
        slug2: 'referenceGrammar',
        PartPath: '/grammar/referenceGrammar',
        Partdescription:
          'This section presents English grammar in an easy-to-understand way. You will find example sentences to illustrate how the language is used, and interactive exercises to help reinforce your learning.',
        PartImgSrs: '/resoures/img/backgrounds/5.jpg',
        Courses: [],
      },
    ],
  },
  {
    id: 4,
    slug: 'skills',
    title: 'Skills',
    FirstViewBackGroundImg: '/resoures/img/backgrounds/SkillsMain.jpg',
    FirstViewText:
      'Work on your reading, writing, listening, and speaking abilities according to your current level.',
    link: '/skills',
    description:
      'Here you’ll find exercises and materials to strengthen your English speaking, listening, reading, and writing abilities.<br /><br />Developing these skills helps you use English more confidently in your studies, at work, and in everyday situations.<br /><br /><h3>How to improve your English proficiency</h3>To grow your vocabulary and become more fluent in English, consistent practice and learning are key.<br /><br />Completing exercises and revisiting new material often will speed up your progress and improve your understanding.<br /><br /><h3>Choose the skill you want to practise</h3>These self-study lessons are arranged by English level according to the CEFR.<br /><br />You’ll find various texts, audio, and video materials with tasks to train the skills you need.<br /><br />Pick a skill to focus on today and improve your English at your own pace, whenever it suits you.',
    styleSpecial: null,
    Parts: [
      {
        idPart: 1,
        Parttitle: 'Listening',
        slug2: 'listening',
        PartPath: '/skills/listening',
        Partdescription:
          "In this section, you'll find activities designed to enhance your listening skills. Improving your listening will help you understand the language better and improve your pronunciation.",
        PartImgSrs: '/resoures/img/backgrounds/5.jpg',
        Courses: [],
      },
      {
        idPart: 2,
        Parttitle: 'Reading',
        slug2: 'reading',
        PartPath: '/skills/reading',
        Partdescription:
          "In this section, you'll find activities aimed at improving your reading skills. Practising reading will help you understand the language better and expand your vocabulary.",
        PartImgSrs: '/resoures/img/backgrounds/5.jpg',
        Courses: [],
      },
      {
        idPart: 3,
        Parttitle: 'Writing',
        slug2: 'writing',
        PartPath: '/skills/writing',
        Partdescription:
          "Here, you can practice your writing skills. By studying model texts and their structure, you'll learn how to improve your own writing.",
        PartImgSrs: '/resoures/img/backgrounds/5.jpg',
        Courses: [],
      },
      {
        idPart: 4,
        Parttitle: 'Speaking',
        slug2: 'speaking',
        PartPath: '/skills/speaking',
        Partdescription:
          "In this section, you can work on your speaking skills. By paying attention to the language used in various situations and practising key phrases, you'll improve your ability to speak confidently.",
        PartImgSrs: '/resoures/img/backgrounds/5.jpg',
        Courses: [],
      },
    ],
  },
  {
    id: 5,
    slug: 'special',
    title: 'Special language',
    FirstViewBackGroundImg: '/resoures/img/backgrounds/SpecialMain.jpg',
    FirstViewText:
      'Improve your workplace English to work better and grow your career.',
    link: '/special',
    description:
      'Strong business English communication is key to progressing in your career.<br /><br />Expanding your professional vocabulary and understanding business language can make your work more effective and open doors to new job opportunities.<br /><br /><h3>Using English in a business environment</h3>English is the most widely used language globally, especially in the business world.<br /><br />Even with a solid general English foundation, learning business English helps you express yourself with more professionalism and confidence, which can lead to new career paths.<br /><br />It also helps you develop language skills suited for office and business settings, giving you the tools to communicate clearly and build strong professional relationships.<br /><br /><h3>Business English learning support resources</h3>Explore a range of materials to boost your interview techniques, improve your email writing, and dive into business-related topics.<br /><br />You can watch videos, listen to podcasts, or read articles—then practise what you`ve learned through targeted tasks that reinforce new skills.<br /><br /><h3>Helping organisations train for success</h3>We collaborate with top global companies to provide business English training, professional communication courses, and assessments.<br /><br />Our flexible training programs are delivered by experts, both online and in person.',
    styleSpecial: { backgroundPosition: '100%' },
    Parts: [
      {
        idPart: 1,
        Parttitle: 'English for emails',
        slug2: 'englishForEmails',
        PartPath: '/specialLanguage/englishForEmails',
        Partdescription:
          'Do you need to write emails in English at work? Explore our lessons tailored for pre-intermediate and intermediate learners to help you improve your email writing skills.',
        PartImgSrs: '/resoures/img/backgrounds/5.jpg',
        Courses: [],
      },
      {
        idPart: 2,
        Parttitle: "You're Hired",
        slug2: 'youreHired',
        PartPath: '/specialLanguage/youreHired',
        Partdescription:
          'Are you job hunting or hiring new staff? Watch our video series designed for intermediate and upper-intermediate learners to enhance your job-related language skills.',
        PartImgSrs: '/resoures/img/backgrounds/5.jpg',
        Courses: [],
      },
      {
        idPart: 3,
        Parttitle: 'Change management',
        slug2: 'changeManagement',
        PartPath: '/specialLanguage/changeManagement',
        Partdescription:
          'Listen to a consultant discuss the basic stages of the change process and the roles of people in a change management team, designed to help learners understand this business concept.',
        PartImgSrs: '/resoures/img/backgrounds/5.jpg',
        Courses: [],
      },
    ],
  },
  {
    id: 6,
    slug: 'general',
    title: 'General',
    FirstViewBackGroundImg: '/resoures/img/backgrounds/GeneralMain.jpg',
    FirstViewText:
      'Look for additional listening and reading exercises to help boost your English skills and practice language useful for daily life.',
    link: '/general',
    description:
      ' General English helps you strengthen your everyday communication and expand the vocabulary you need for social situations.<br /><br />You’ll also improve your understanding of spoken and written English as you practise.<br /><br /><h3>Zones: 5- to 10-minute activities</h3>Only have a few minutes to spare? Try one of our quick Video, Audio, Magazine, or Reading zone tasks.<br /><br />These short exercises cover a variety of topics and are designed to boost your English level in just 5 to 10 minutes a day.<br /><br />Daily practice—even in small amounts—can make a big difference. Just pick a topic you like and begin!<br /><br /><h3>Series: 15- to 30-minute activities</h3>Have more time? Dive into our series of learning materials, which offer longer lessons you can complete episode by episode.<br /><br />Work at your own speed and keep building your English step by step.',
    styleSpecial: null,
    Parts: [],
  },
  {
    id: 7,
    slug: 'levels',
    title: 'Levels',
    FirstViewBackGroundImg: '/resoures/img/backgrounds/levelsMain.jpg',
    FirstViewText:
      'Learn about the various CEFR English levels and try a free test to discover your current level.',
    link: '/levels',
    description:
      ' All learning materials on LearnEnglish are grouped by English level according to the Common European Framework of Reference for Languages (CEFR).<br /><br />You can take our online level test to get a general idea of your current English level and use the result to choose courses or learning content that fits your needs.<br /><br />Learn more about what each CEFR level represents and what learners at each stage are able to do.<br /><br />You’ll also find useful tips on how to raise your English level and can browse resources by level, section, or topic.',
    styleSpecial: { backgroundPosition: '100%' },
    Parts: [
      {
        idPart: 1,
        Parttitle: 'Online English level test',
        slug2: 'onlineEnglishLevelTest',
        PartPath: '/levels/onlineEnglishLevelTest',
        Partdescription:
          'This free online level test will give you an approximate indication of the English level you are working towards or completing.',
        PartImgSrs: '/resoures/img/backgrounds/5.jpg',
        Courses: [],
      },
      {
        idPart: 2,
        Parttitle: 'Find resources for your level',
        slug2: 'resourcesForYourLevel',
        PartPath: '/levels/resourcesForYourLevel',
        Partdescription: 'Find learning materials at your English level.',
        PartImgSrs: '/resoures/img/backgrounds/5.jpg',
        Courses: [],
      },
    ],
  },
]
export default PagesData
