// ==========================================
// PORTFOLIO CONFIGURATION DATA (data.js)
// ==========================================
// আপনি যদি কোডিং না-ও বুঝেন, তবুও এখান থেকে খুব সহজে আপনার তথ্য পরিবর্তন করতে পারবেন।
// প্রতিটি বিষয়ের পাশে বাংলা কমেন্ট দেওয়া আছে। শুধুমাত্র ডাবল কোটেশন (" ") এর মাঝের টেক্সটগুলো পরিবর্তন করুন।

const PORTFOLIO_DATA = {
    
    // ১. আপনার সাধারণ তথ্য (Personal Info)
    profile: {
        name: "Ashfakur Rahman", // আপনার সম্পূর্ণ নাম (সিভি অনুযায়ী)
        shortName: "Ashfak", // আপনার ডাক নাম
        title: "Data Analyst & BI Specialist", // আপনার পেশা
        subtitles: [
            "Data Analyst", 
            "BI (Business Intelligence) Analyst", 
            "Business Analyst", 
            "Data Storyteller", 
            "Quantitative Analyst"
        ], // ডাটা অ্যানালিস্ট রিলেটেড বিভিন্ন রোল যা টাইপরাইটারে ঘুরবে
        email: "ashfak.cse.221@gmail.com", // আসল ইমেইল (সিভি অনুযায়ী)
        phone: "01783093320", // ফোন নম্বর
        location: "Mirpur, Dhaka, Bangladesh", // অবস্থান
        degree: "B.Sc. in Computer Science & Engineering", // শিক্ষাগত যোগ্যতা
        degree_bn: "বি.এস.সি ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং", // শিক্ষাগত যোগ্যতা (বাংলায়)
        
        // আপনার সিভি থেকে নিয়ে তৈরি করা বায়ো যা আপনার ব্যাকগ্রাউন্ডকে সুন্দরভাবে তুলে ধরে (Hero Section)
        bio: "I am a Computer Science and Engineering graduate passionate about Data Analytics and Business Intelligence. Using Python, SQL, Excel, and Power BI, I enjoy exploring data, building dashboards, and uncovering insights that help solve real-world problems and support smarter business decisions.", 
        bio_bn: "আমি একজন কম্পিউটার সায়েন্স ও ইঞ্জিনিয়ারিং গ্র্যাজুয়েট, ডাটা অ্যানালিটিক্স এবং বিজনেস ইন্টেলিজেন্স নিয়ে কাজ করতে আগ্রহী। পাইথন, এসকিউএল, এক্সেল এবং পাওয়ার বিআই ব্যবহার করে ডাটা বিশ্লেষণ, ড্যাশবোর্ড তৈরি এবং জটিল ব্যবসায়িক সমস্যার ডেটা-চালিত সমাধান বের করতে আমি ভালোবাসি।",
        
        // Who is Ashfak Section এর জন্য কাস্টম বায়ো
        aboutBio: "As a data professional with a foundation in Computer Science and teaching mathematics, I bring a unique blend of analytical rigor and storytelling. Whether working as a Data Analyst, BI Analyst, or ML Engineer, my core passion remains the same: transforming raw, unstructured datasets into interactive visual narratives that empower businesses to make data-driven decisions.",
        aboutBio_bn: "আমি গ্রিন ইউনিভার্সিটি অব বাংলাদেশ থেকে কম্পিউটার সায়েন্স নিয়ে পড়াশোনা করেছি এবং গণিত শিক্ষক হিসেবে কাজের অভিজ্ঞতা আছে। ডাটা অ্যানালিস্ট, বিআই অ্যানালিস্ট বা মেশিন লার্নিং ইঞ্জিনিয়ার—যে নামেই ডাকা হোক না কেন, আমার মূল লক্ষ্য একটাই: কাঁচা, অগোছালো ডাটা থেকে ইনসাইট বের করে তাকে স্টোরিটেলিং এবং ড্যাশবোর্ডের মাধ্যমে এমনভাবে উপস্থাপন করা, যাতে প্রতিষ্ঠানগুলো সঠিক সিদ্ধান্ত নিতে পারে।",
        
        profileImg: "ashfak-profile-image.jpg", 
        resumeLink: "resume.pdf", // রিজিউমি ফাইলের নাম (এই ফোল্ডারেই থাকতে হবে)
        github: "https://github.com/ashfak-g", // সিভি অনুযায়ী গিটহাব লিংক
        linkedin: "https://linkedin.com/in/ashfak-ai", // সিভি অনুযায়ী লিংকডইন লিংক
        kaggle: "https://kaggle.com" // ক্যাগল লিংক
    },

    // ২. পরিসংখ্যান (Stats)
    stats: {
        completedProjects: "20+", // সম্পন্ন করা প্রজেক্ট সংখ্যা
        modelAccuracy: "95%", // মেশিন লার্নিং মডেলের গড় একুরেসি
        dashboardsCreated: "6+", // ড্যাশবোর্ড
        experienceYears: "2+" // কাজের অভিজ্ঞতা (বছর)
    },

    // ৩. স্কিলস বা দক্ষতা (Skills Progress Bars - Updated from Resume)
    skills: [
        { name: "Power BI (KPI Analysis, Modeling)", rating: 85 },
        { name: "Tableau (Calculations, Dashboards)", rating: 80 },
        { name: "Advanced Excel (Pivot, VLOOKUP, VBA)", rating: 90 },
        { name: "SQL (Structured Query Language)", rating: 85 },
        { name: "Python (Pandas, Numpy, Matplotlib)", rating: 80 },
        { name: "Web Scraping (BeautifulSoup, Scrapy)", rating: 75 },
        { name: "Machine Learning (Regression & Classification)", rating: 80 },
        { name: "Frontend Developer (Shopify)", rating: 95 }
    ],

    // ৪. কাজের অভিজ্ঞতা (Work Experience)
    experience: [
        {
            date: "11/2025 - Present",
            role: "Shopify Frontend Developer",
            role_bn: "শপিফাই ফ্রন্টএন্ড ডেভেলপার",
            org: "Softvence Agency (Betopia Group) | Mohakhali, Dhaka",
            org_bn: "সফটভেন্স এজেন্সি (বেটোপিয়া গ্রুপ) | মহাখালী, ঢাকা",
            bulletPoints: [
                "Analyzed client requirements and translated them into actionable workflow improvements.",
                "Communicated with international eCommerce clients from Europe and the USA.",
                "Optimized store workflows and user experience based on business needs and client feedback.",
                "Managed multiple client projects while maintaining delivery timelines.",
                "Collaborated with cross-functional teams to ensure smooth project execution.",
                "Supported data-informed decisions to improve website performance and customer experience."
            ],
            bulletPoints_bn: [
                "ক্লায়েন্টের প্রয়োজনীয়তা বিশ্লেষণ এবং সেগুলোকে উন্নত কাজের ফ্লো-তে রূপান্তর।",
                "ইউরোপ এবং মার্কিন যুক্তরাষ্ট্রের আন্তর্জাতিক ই-কমার্স ক্লায়েন্টদের সাথে যোগাযোগ।",
                "ব্যবসায়িক প্রয়োজন এবং ক্লায়েন্ট প্রতিক্রিয়ার ভিত্তিতে স্টোরের কাজের ফ্লো এবং ইউজার এক্সপেরিয়েন্স অপ্টিমাইজ করা।",
                "নির্দিষ্ট সময়সীমা বজায় রেখে একাধিক ক্লায়েন্ট প্রজেক্ট পরিচালনা করা।",
                "প্রজেক্ট নির্বিঘ্নে সম্পন্ন করার জন্য অন্যান্য টিমের সাথে সহযোগিতা করা।",
                "ওয়েবসাইটের কার্যকারিতা এবং কাস্টমার এক্সপেরিয়েন্স উন্নত করতে ডেটা-ভিত্তিক সিদ্ধান্ত নেওয়া।"
            ]
        },
        {
            date: "04/2022 - 09/2023",
            role: "School Teacher (Mathematics)",
            role_bn: "স্কুল শিক্ষক (গণিত)",
            org: "Cordova High School | Dhaka, Bangladesh",
            org_bn: "করদোভা হাই স্কুল | ঢাকা, বাংলাদেশ",
            bulletPoints: [
                "Taught algebra, calculus, and mathematical statistics to high school students, building strong quantitative roots.",
                "Managed, processed, and analyzed student performance data to generate quarterly progress insights for school administrators.",
                "Designed curriculum focusing on analytical logic, logical reasoning, and data-driven problem-solving methodologies.",
                "Utilized statistical and spreadsheet tools to automate grading systems and student database maintenance."
            ],
            bulletPoints_bn: [
                "হাই স্কুলের শিক্ষার্থীদের বীজগণিত, ক্যালকুলাস এবং গাণিতিক পরিসংখ্যান শেখানো, যা তাদের গাণিতিক ভিত্তি মজবুত করেছে।",
                "শিক্ষার্থীদের ফলাফলের ডেটা প্রসেস এবং বিশ্লেষণ করে স্কুল প্রশাসনের জন্য ত্রৈমাসিক প্রগতি প্রতিবেদন তৈরি করা।",
                "অ্যানালিটিক্যাল লজিক এবং ডেটা-ভিত্তিক সমস্যা সমাধানের পদ্ধতির ওপর জোর দিয়ে কারিকুলাম ডিজাইন করা।",
                "গ্রেডিং সিস্টেম ও শিক্ষার্থীদের ডাটাবেজ মেইনটেইন্যান্সের কাজ সহজ করতে পরিসংখ্যান এবং স্প্রেডশিট টুলের ব্যবহার।"
            ]
        }
    ],

    // ৫. শিক্ষাগত যোগ্যতা (Education)
    education: [
        {
            date: "01/2022 - 01/2026",
            degree: "B.Sc. in Computer Science & Engineering",
            degree_bn: "বি.এস.সি ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং",
            org: "Green University of Bangladesh",
            org_bn: "গ্রিন ইউনিভার্সিটি অব বাংলাদেশ",
            desc: "Location: Dhaka, Bangladesh. Relevant Coursework: Artificial Intelligence, Machine Learning, Data Mining, Database Systems, and Data Structures & Algorithms.",
            desc_bn: "অবস্থান: ঢাকা, বাংলাদেশ। প্রাসঙ্গিক কোর্সওয়ার্ক: আর্টিফিশিয়াল ইন্টেলিজেন্স, মেশিন লার্নিং, ডাটা মাইনিং, ডাটাবেজ সিস্টেম এবং ডাটা স্ট্রাকচার ও অ্যালগরিদম।"
        },
        {
            date: "2018 - 2020",
            degree: "Higher Secondary Certificate (HSC)",
            degree_bn: "উচ্চ মাধ্যমিক সার্টিফিকেট (এইচএসসি)",
            org: "Kaliganj Govt. College",
            org_bn: "কালীগঞ্জ সরকারি কলেজ",
            desc: "Group: Science. Focused on Mathematics, Physics, Chemistry. Location: Kaliganj, Satkhira, Khulna.",
            desc_bn: "গ্রুপ: বিজ্ঞান। গণিত, পদার্থবিজ্ঞান, রসায়নের ওপর মনোযোগ। অবস্থান: কালীগঞ্জ, সাতক্ষীরা, খুলনা।"
        },
        {
            date: "2013 - 2018",
            degree: "Secondary School Certificate (SSC)",
            degree_bn: "মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি)",
            org: "Dr. Mujib Rubi Model High School",
            org_bn: "ডা. মুজিব রুবি মডেল হাই স্কুল",
            desc: "Group: Science. Location: Kaliganj, Satkhira, Khulna.",
            desc_bn: "গ্রুপ: বিজ্ঞান। অবস্থান: কালীগঞ্জ, সাতক্ষীরা, খুলনা।"
        }
    ],

    // ৬. প্রজেক্টস তালিকা (Projects List)
    projects: [
        {
            title: "Anomaly Detection in ECG Signals using Deep Learning Techniques",
            title_bn: "ডিপ লার্নিং ব্যবহার করে ইসিজি সিগন্যালে অ্যানোমালি সনাক্তকরণ",
            category: "ml",
            desc: "Built a Deep Learning system (CNN + BiLSTM + Attention) for early ECG anomaly detection, integrated with a Flask web application for real-time automated diagnosis and medical reporting.",
            desc_bn: "হৃদরোগের পূর্বাভাস দেওয়ার জন্য CNN, BiLSTM এবং Multi-Head Self Attention মেকানিজম ব্যবহার করে একটি ডিপ লার্নিং-ভিত্তিক ইসিজি অ্যানোমালি সনাক্তকরণ মডেল তৈরি। রোগ নির্ণয় ও রিপোর্ট জেনারেট করার জন্য Flask দিয়ে ওয়েব অ্যাপ তৈরি করা হয়েছে।",
            tags: ["Deep Learning", "CNN/BiLSTM", "Flask", "Python"],
            codeLink: "https://github.com/ashfak-g/ECG-Anomaly-Detection-Heart-Disease-Prediction",
            demoLink: "#",
            projectImg: "anomaly-detecton.png" 
        },
        {
            title: "Rainfall Prediction Using Machine Learning.",
            title_bn: "মেশিন লার্নিং ব্যবহার করে বৃষ্টিপাতের পূর্বাভাস",
            category: "ml",
            desc: "Built a high-precision rainfall prediction system utilizing advanced boosting frameworks like CatBoost, XGBoost, and LightGBM. Feature engineered complex meteorological datasets to optimize real-world forecasting accuracy.",
            desc_bn: "CatBoost, XGBoost এবং LightGBM-এর মতো উন্নত বুস্টিং ফ্রেমওয়ার্ক ব্যবহার করে বৃষ্টিপাতের পূর্বাভাস দেওয়ার জন্য একটি উচ্চ-নির্ভুল সিস্টেম তৈরি। আবহাওয়া সংক্রান্ত ডেটা ব্যবহার করে মডেলের একুরেসি অপ্টিমাইজ করা হয়েছে।",
            tags: ["Machine Learning", "Catboost", "XGBoost", "Gradient Boosting", "LightGBM","Python"],
            codeLink: "#",
            demoLink: "#",
            projectImg: "rainfall-prediction.png" 
        },
        {
            title: "Power BI Dashboard Portfolio",
            title_bn: "পাওয়ার বিআই ড্যাশবোর্ড পোর্টফোলিও",
            category: "dashboard",
            desc: "Built an interactive Power BI sales overview dashboard analyzing Dhaka supershop data. Features dynamic visualizations for tracking revenue trends, order fulfillment, shipping logistics, and salesperson performance to uncover actionable retail insights.",
            desc_bn: "ঢাকার একটি সুপারশপের ডেটা নিয়ে পাওয়ার বিআই ড্যাশবোর্ড তৈরি। সেলস ট্রেন্ড, অর্ডার ফালফিলমেন্ট, শিপিং লজিস্টিকস এবং বিক্রেতাদের পারফরম্যান্স ট্র্যাক করার জন্য ভিজ্যুয়ালাইজেশন করা হয়েছে।",
            tags: ["Power BI", "KPI Analysis", "Data Visualization", "Excel"],
            codeLink: "#",
            demoLink: "#",
            projectImg: "sales-dashboard-pbi.jpg" 
        },
        /*
        {
            title: "Time-Series Environmental Forecasting",
            category: "analytics",
            desc: "ভবিষ্যতের জলবায়ু ট্রেন্ড চিহ্নিত করার জন্য Python এবং উন্নত ফোরকাস্টিং টেকনিক ব্যবহার করে বাতাসে কার্বন মনোক্সাইড এবং নাইট্রোজেন ডাই অক্সাইডের মাত্রা নিয়ে টাইম-সিরিজ বিশ্লেষণ ও পূর্বাভাস প্রদান।",
            tags: ["Python", "Time-Series", "Forecasting", "Data Analysis"],
            codeLink: "#",
            demoLink: "#",
            projectImg: "" 
        },
        {
            title: "Premium Shopify Store Theme Development",
            category: "shopify",
            desc: "আন্তর্জাতিক ক্লায়েন্টদের জন্য HTML, CSS, JavaScript এবং Liquid কোড ব্যবহার করে সম্পূর্ণ কাস্টমাইজড প্রিমিয়াম শপিফাই স্টোর ডিজাইন ও ডেভেলপমেন্ট। ইউজার ইন্টারঅ্যাকশন বৃদ্ধি ও পারফরম্যান্স অপ্টিমাইজেশন করা হয়েছে।",
            tags: ["Liquid", "Shopify Theme", "JavaScript", "HTML/CSS"],
            codeLink: "https://github.com/ashfak-g",
            demoLink: "#",
            projectImg: "" 
        },
        {
            title: "Shopify Custom Sections & UX Optimization",
            category: "shopify",
            desc: "শপিফাই থিমের জন্য ডায়নামিক প্রোডাক্ট গ্রিড, এজাক্স কার্ট ড্রয়ার এবং অবিচ্ছিন্ন স্লাইডার ডেভেলপমেন্ট। এটি ই-কমার্স স্টোরের চেকআউট কনভার্সন রেট বাড়াতে সাহায্য করে।",
            tags: ["Liquid", "Shopify API", "Vanilla JS", "UX/UI"],
            codeLink: "https://github.com/ashfak-g",
            demoLink: "#",
            projectImg: "" 
        }
        */
    ],

    // ৭. এআই চ্যাটবটের উত্তরসমূহ (AI Chatbot Custom Answers)
    chatbotAnswers: {
        greeting: "হ্যালো! আমি আশফাকুর রহমান (Ashfakur Rahman)-এর এআই সহকারী। আমি তার হয়ে আপনাকে সাহায্য করতে পারি। আপনি তার ব্যাকগ্রাউন্ড, প্রজেক্ট, স্কিল বা কন্টাক্ট ইনফো সম্পর্কে জানতে পারেন।",
        projects: "আশফাকুর বেশ কিছু প্রজেক্ট করেছেন। যেমন: ইসিজি অ্যানোমালি সনাক্তকরণ (ECG Anomaly Detection), পাওয়ার বিআই ড্যাশবোর্ড, টাইম-সিরিজ অ্যানালিটিক্স এবং লিকুইড কোড ভিত্তিক কাস্টম শপিফাই স্টোর ডিজাইন। বিস্তারিত জানতে প্রজেক্ট সেকশনটি স্ক্রল করুন!",
        skills: "আশফাকুরের মূল দক্ষতাগুলো হলো: Python, SQL, Advanced Excel, Power BI, Tableau, Web Scraping, Machine Learning এবং Liquid, HTML, CSS, JS সহযোগে Shopify Store Design।",
        resume: "আপনি খুব সহজেই 'Resume' সেকশনে গিয়ে অথবা চ্যাটবট উইন্ডোর উপর থেকে 'My Resume' বাটনে ক্লিক করে আশফাকুরের রিজিউমি (PDF) ডাউনলোড করে নিতে পারেন।",
        contact: "আশফাকুরের সাথে সরাসরি যোগাযোগ করতে চাইলে আপনি ashfak.cse.221@gmail.com ইমেইলে যোগাযোগ করতে পারেন অথবা নিচের কন্টাক্ট ফর্মটি পূরণ করতে পারেন। ফোন: 01783093320।",
        default: "দুঃখিত, আমি আপনার প্রশ্নটি পুরোপুরি বুঝতে পারিনি। আপনি কি আশফাকুরের 'প্রজেক্ট', 'স্কিল', 'রিজিউমি' বা 'যোগাযোগ' সম্পর্কে জানতে চান?"
    }
};
