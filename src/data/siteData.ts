export interface MinistryItem {
  id: string;
  title: string;
  category: 'Kids' | 'Youth' | 'Adults' | 'Family';
  ageRange: string;
  schedule: string;
  description: string;
  scriptureQuote?: { text: string; reference: string };
  image: string;
  highlights: string[];
}

export interface SalvationStep {
  stepNumber: number;
  title: string;
  shortDesc: string;
  scriptureRef: string;
  scriptureText: string;
  explanation: string;
  prayerPrompt: string;
}

export interface DoctrinePoint {
  id: string;
  title: string;
  summary: string;
  scripture: string;
  fullText: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  badge: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'First Visit' | 'Kids & Nursery' | 'Doctrine' | 'Schedule';
}

export const CHURCH_DATA = {
  name: "Faith Baptist Church",
  legalName: "Faith Baptist Church of Fostoria",
  formerName: "Dillon Road Baptist Church",
  tagline: "Bible-Believing • Gospel-Driven • Christ-Centered",
  subTagline: "Rooted in the Word of God, growing together as a church family in Fostoria, Ohio.",
  location: {
    street: "11275 W. Twp. Rd. 116",
    city: "Fostoria",
    state: "OH",
    zip: "44830",
    county: "Seneca County",
    fullAddress: "11275 W. Twp. Rd. 116, Fostoria, OH 44830",
    phone: "(419) 348-2171",
    tel: "+14193482171",
    email: "contact@faithbaptistfostoria.org",
    facebookUrl: "https://www.facebook.com/dillonroadbaptistchurch",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=11275+W.+Township+Rd.+116%2C+Fostoria%2C+OH+44830",
    directionsNote: "Located just off US-23 / Ohio 12 corridor on Township Road 116, serving families throughout Fostoria, Tiffin, Findlay, and surrounding Seneca & Hancock counties.",
  },
  pastor: {
    name: "Pastor Brad Smith",
    title: "Senior Pastor",
    welcomeTitle: "A Personal Welcome from Pastor Brad",
    welcomeLetter: "Whether you are a lifelong follower of Christ or searching for biblical truth and hope, Faith Baptist Church is a place where you will be warmly welcomed. We are committed to preaching and teaching the King James Bible with clarity and conviction, loving our church family, and pointing every soul to salvation through our Lord and Savior Jesus Christ. We invite you to join us this Sunday!",
    image: "/assets/pastor_pulpit.jpg"
  },
  schedule: {
    sundaySchool: "9:00 AM",
    sundayMorningWorship: "10:00 AM",
    sundayEvening: "6:00 PM",
    wednesdayService: "7:00 PM",
    nurseryAvailable: "Provided during all Sunday morning and evening services",
  },
  images: {
    logo: "/assets/fbc_logo.png",
    churchMain: "/assets/church_main.png",
    steeplePortrait: "/assets/church_building_portrait.png",
    heroLandscape: "/assets/hero_landscape.png",
    worshipBanner: "/assets/hero_worship_banner.jpg",
    pastorPulpit: "/assets/pastor_pulpit.jpg",
    fellowship: "/assets/fellowship_family.jpg",
    sundaySchool: "/assets/sunday_school_class.jpg",
    nursery: "/assets/tots_nursery.jpg",
    choir: "/assets/worship_choir.jpg",
    sanctuaryCross: "/assets/church_sanctuary_cross.jpg",
    exteriorFront: "/assets/church_exterior_front.jpg",
    exteriorSign: "/assets/church_exterior_sign.jpg",
    intake: {
      planOfSalvation: "/assets/intake/plan_of_salvation.jpg",
      services: "/assets/intake/services.jpg",
      welcomeIdentity: "/assets/intake/welcome_identity.jpg",
      sundaySchool: "/assets/intake/sunday_school.jpg",
      whatWeBelieve: "/assets/intake/what_we_believe.jpg",
      childrensMinistry: "/assets/intake/childrens_ministry.jpg",
      teens: "/assets/intake/teens.jpg"
    }
  },
  salvationSteps: [
    {
      stepNumber: 1,
      title: "Admit You're a Sinner",
      shortDesc: "Recognize our need for God's forgiveness.",
      scriptureRef: "Romans 3:10 & Romans 3:23",
      scriptureText: "“As it is written, There is none righteous, no, not one... For all have sinned, and come short of the glory of God.”",
      explanation: "No one is perfect by their own good works. Sin separates us from a holy God, and we cannot earn our way to heaven through rituals, church attendance, or moral deeds.",
      prayerPrompt: "Lord, I acknowledge that I am a sinner and that I cannot save myself."
    },
    {
      stepNumber: 2,
      title: "Be Willing to Turn from Sin (Repent)",
      shortDesc: "A change of heart and direction toward God.",
      scriptureRef: "Acts 17:30 & Luke 13:3",
      scriptureText: "“And the times of this ignorance God winked at; but now commandeth all men every where to repent.”",
      explanation: "Repentance is an honest turning of the heart away from self-reliance and sin, choosing to trust wholly in the living God for mercy and cleansing.",
      prayerPrompt: "Lord, I turn from my sin and turn to You with a repentant heart."
    },
    {
      stepNumber: 3,
      title: "Believe That Jesus Died, Was Buried & Rose Again",
      shortDesc: "Trust in the finished cross-work of Christ.",
      scriptureRef: "Romans 10:9–10 & John 3:16",
      scriptureText: "“That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.”",
      explanation: "Jesus Christ, the sinless Son of God, shed His blood on Calvary’s cross as the complete substitute for our sins, died, was buried, and rose bodily from the grave the third day, conquering death forever.",
      prayerPrompt: "Lord Jesus, I believe You died for my sins on the cross and rose victoriously from the grave."
    },
    {
      stepNumber: 4,
      title: "Through Prayer, Invite Jesus as Lord & Savior",
      shortDesc: "Call upon the name of the Lord in faith.",
      scriptureRef: "Romans 10:13 & John 1:12",
      scriptureText: "“For whosoever shall call upon the name of the Lord shall be saved.”",
      explanation: "Salvation is a free gift received by faith, not a wage earned. When you genuinely cry out to Jesus Christ to forgive you and reign as your personal Savior, He gives you eternal life that can never be lost.",
      prayerPrompt: "“Dear Jesus, I know that I am a sinner. I believe You died on the cross for my sins and rose again. Right now, I turn from my sin and invite You into my heart as my personal Lord and Savior. Thank You for saving my soul. Amen.”"
    }
  ] as SalvationStep[],
  keySalvationVerse: {
    verse: "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
    reference: "John 14:6 (King James Bible)"
  },
  doctrinalPoints: [
    {
      id: "scripture",
      title: "The Verbal Inspiration of Scripture",
      summary: "The Holy Bible is the fully inspired, infallible, and preserved Word of God.",
      scripture: "2 Timothy 3:16–17",
      fullText: "We believe in the verbal, plenary inspiration of the Holy Scriptures, both Old and New Testaments. God has supernaturally preserved His Word for English-speaking people in the King James Bible, which stands as our sole and supreme authority in all matters of faith, doctrine, and practice."
    },
    {
      id: "godhead",
      title: "The Eternal Trinity",
      summary: "One God eternally existing in three co-equal persons: Father, Son, and Holy Spirit.",
      scripture: "Genesis 1:1, Matthew 28:19, 1 John 5:7",
      fullText: "We believe in one God, eternal, omnipotent, omniscient, and omnipresent, manifest in three distinct persons—the Father, the Son, and the Holy Spirit—each possessing equally all the attributes of deity and the characteristics of personality."
    },
    {
      id: "christ",
      title: "The Person & Work of Jesus Christ",
      summary: "His virgin birth, sinless life, vicarious atonement, bodily resurrection, and personal return.",
      scripture: "1 Thessalonians 4:13–17, Isaiah 7:14, 1 Peter 2:24",
      fullText: "We believe that Jesus Christ was begotten of the Holy Ghost and born of the virgin Mary; that He is true God and true man; that He died as a substitutionary sacrifice for the sins of the whole world; that He bodily arose from the dead; that He ascended into heaven; and that He is coming again personally and bodily."
    },
    {
      id: "holy-spirit",
      title: "The Ministry of the Holy Spirit",
      summary: "Conviction, regeneration, indwelling, and empowering the believer for holiness and service.",
      scripture: "1 Corinthians 6:19–20, John 16:7–11",
      fullText: "We believe that the Holy Spirit is a divine person who convicts the world of sin, of righteousness, and of judgment; that He regenerates all who believe in Christ; and that He indwells, seals, and fills believers for godly living and fruitful service."
    },
    {
      id: "salvation",
      title: "Salvation by Grace Through Faith",
      summary: "Salvation is entirely by grace alone through faith in Christ alone, without human works.",
      scripture: "Ephesians 2:8–9, Romans 6:23, Titus 3:5",
      fullText: "We believe that all people are by nature and choice sinners and stand under divine condemnation. Salvation is the free gift of God, procured by the shed blood of Jesus Christ, received solely through repentance toward God and faith in the Lord Jesus Christ."
    },
    {
      id: "church-ordinances",
      title: "The Local Church & Ordinances",
      summary: "A self-governing assembly of baptized believers practicing Believer’s Baptism & the Lord’s Supper.",
      scripture: "1 Corinthians 11:23–29, Matthew 28:19–20",
      fullText: "We believe the local New Testament church is an autonomous congregation of immersed believers associated by covenant of faith and fellowship in the gospel. We observe two ordinances: water baptism by immersion following salvation, and the Lord’s Supper in memorial of Christ’s broken body and shed blood."
    }
  ] as DoctrinePoint[],
  ministries: [
    {
      id: "sunday-school",
      title: "Sunday School for All Generations",
      category: "Family",
      ageRange: "All Ages (Nursery through Senior Adults)",
      schedule: "Sundays at 9:00 AM",
      description: "Faith Baptist Church places great importance on building strong families. Our Sunday School ministry is designed to help every person come to faith in Christ, develop godly character, and be equipped for effective ministry.",
      scriptureQuote: {
        text: "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth.",
        reference: "2 Timothy 2:15"
      },
      image: "/assets/sunday_school_class.jpg",
      highlights: [
        "Nursery (Infants & Under 2 years) with attentive caregivers",
        "Toddler Class (Ages 2–4) with hands-on Bible lessons & songs",
        "Primary & Junior Classes (Elementary grades) memorizing Scripture",
        "Youth & Teen Classes addressing real-life culture from God's Word",
        "Adult Bible Fellowship with chapter-by-chapter exposition"
      ]
    },
    {
      id: "nursery",
      title: "Loving Nursery Care",
      category: "Kids",
      ageRange: "Infants through Age 4",
      schedule: "Available during all Sunday services & Wednesday evening",
      description: "A clean, secure, and warm environment where our youngest treasures are tenderly cared for by experienced church volunteers, allowing parents to engage fully in worship and study.",
      image: "/assets/tots_nursery.jpg",
      highlights: [
        "Age-appropriate cribs, toys, and clean play areas",
        "Dedicated diapering and quiet feeding zones",
        "Volunteer background checks and safety guidelines",
        "Immediate parent notification if your little one needs you"
      ]
    },
    {
      id: "childrens-ministry",
      title: "Children's Ministry & Summer VBS",
      category: "Kids",
      ageRange: "Kindergarten – 6th Grade",
      schedule: "Sunday Mornings (Children’s Church) & Summer Programs",
      description: "Partnering with parents to provide a solid biblical foundation through interactive Bible lessons, scripture memory, gospel music, and summer Vacation Bible School.",
      scriptureQuote: {
        text: "Train up a child in the way he should go: and when he is old, he will not depart from it.",
        reference: "Proverbs 22:6"
      },
      image: "/assets/church_main.png",
      highlights: [
        "Weekly Children’s Church during the 10:00 AM worship hour",
        "Annual high-energy Vacation Bible School (VBS)",
        "Scripture memory rewards and Bible trivia competitions",
        "Youth camp opportunities for junior campers"
      ]
    },
    {
      id: "teen-ministry",
      title: "Teens for Christ (Youth Discipleship)",
      category: "Youth",
      ageRange: "7th – 12th Grade",
      schedule: "Sunday School at 9:00 AM & Sunday Evenings at 6:00 PM",
      description: "Equipping young people to stand courageously for Jesus Christ in a secular world through deep Bible study, genuine friendships, ministry service, and fun activities.",
      scriptureQuote: {
        text: "Remember now thy Creator in the days of thy youth, while the evil days come not...",
        reference: "Ecclesiastes 12:1"
      },
      image: "/assets/fellowship_family.jpg",
      highlights: [
        "Weekly Teen Bible Study addressing real teen dilemmas",
        "Youth rallies, lock-ins, campfires & fellowship dinners",
        "Annual summer Youth Camp with life-changing preaching",
        "Service projects aiding seniors and church outreach"
      ]
    },
    {
      id: "prayer-study",
      title: "Midweek Prayer & Bible Study",
      category: "Adults",
      ageRange: "Adults & Teens",
      schedule: "Wednesdays at 7:00 PM",
      description: "Our spiritual oasis in the middle of the week. We gather to lift up the needs of our families, community, and nation in prayer, followed by practical verse-by-verse Bible teaching.",
      image: "/assets/church_sanctuary_cross.jpg",
      highlights: [
        "Congregational prayer requests and praise reports",
        "Deep theological insight with practical life application",
        "Encouraging midweek recharge in God's presence"
      ]
    }
  ] as MinistryItem[],
  testimonials: [
    {
      name: "The Miller Family",
      role: "Fostoria Residents • Members for 6 Years",
      content: "Finding Faith Baptist Church was an answer to prayer for our family. The preaching is straight from the King James Bible with zero compromise, yet the spirit of love and warmth is immediately felt the moment you walk through the doors.",
      badge: "Family with 3 Children"
    },
    {
      name: "David & Karen R.",
      role: "Seneca County Keepers of the Faith",
      content: "Pastor Brad preaches the truth without watering it down. Our teenagers actually look forward to Sunday evening service and youth camp. If you want a church that truly believes the Bible, this is your home.",
      badge: "Teen Discipleship"
    },
    {
      name: "Sarah T.",
      role: "First-Time Visitor turned Regular",
      content: "I had not attended church in years and was nervous about what to expect. Everyone welcomed me with open arms, helped me check my toddler into the nursery, and made me feel right at home. The Plan of Salvation changed my life!",
      badge: "Young Mother"
    }
  ] as TestimonialItem[],
  faqs: [
    {
      question: "What should I expect when I visit Faith Baptist Church?",
      answer: "You will find a warm, friendly church family, uplifting traditional hymns and choir music, and sound, verse-by-verse preaching directly from the King James Bible. We do not pressure visitors; our goal is for you to encounter the grace and truth of Jesus Christ.",
      category: "First Visit"
    },
    {
      question: "What is available for my children and infants?",
      answer: "We offer secure, loving nursery care for infants and toddlers under age 4 during all Sunday services. For children in kindergarten through 6th grade, we have age-graded Sunday School at 9:00 AM and Children’s Church during the 10:00 AM worship service.",
      category: "Kids & Nursery"
    },
    {
      question: "What Bible translation do you preach from?",
      answer: "Faith Baptist Church stands firmly on the King James Version (KJV) of the Holy Bible for all public preaching, Sunday School classes, and doctrinal instruction. We believe God has preserved His pure Word for us.",
      category: "Doctrine"
    },
    {
      question: "What should I wear?",
      answer: "You will see a variety of dress—many men wear collared shirts, suits, or khakis, and many women wear dresses or modest casual attire. Come as you are to worship God; you will be welcomed warmly regardless.",
      category: "First Visit"
    },
    {
      question: "Where do I park and which entrance do I use?",
      answer: "We have convenient on-site parking surrounding our church building at 11275 W. Twp. Rd. 116. Greeters at the main front entrance under the white steeple will gladly direct you to the auditorium, nursery, or classrooms.",
      category: "First Visit"
    }
  ] as FaqItem[]
};
