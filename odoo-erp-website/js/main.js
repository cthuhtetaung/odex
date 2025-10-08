// Basic JavaScript functionality for the OdeX website
console.log('OdeX JS loaded - Version 2025-10-07e');
document.addEventListener('DOMContentLoaded', function() {
    // Clean URL if someone lands on /index.html
    try {
        if (window.location.pathname.endsWith('/index.html')) {
            const search = window.location.search || '';
            const hash = window.location.hash || '';
            window.history.replaceState({}, '', '/' + search + hash);
        }
    } catch (_) {}
    // Basic deterrents (not security): disable context menu and some key combos
    document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 's' || e.key.toLowerCase() === 'u')) e.preventDefault();
        if (e.key === 'F12') e.preventDefault();
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'j' || e.key.toLowerCase() === 'c')) e.preventDefault();
    });
    // Language toggle functionality
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('language') || 'my';
    
    // Language data
    const langData = {
        my: {
            homeTitle: "OdeX",
            heroHeading: "Manual မှ Digital သို့ — အသုံးပြုရလွယ်ကူ၊ စျေးနှုန်းသက်သာသော Odoo ERP ဖြင့်ပြောင်းလဲပါ။",
            heroMotto: "အဆင့်မြင့် နည်းပညာ၊ မဆုံးနိုင်သော အလားအလာများ",
            heroText: "Odoo ERP သည် လုပ်ငန်းဆောင်ရွက်မှုများကို တစ်နေရာတည်းမှ စုစည်းစီမံနိုင်သော စနစ်ဖြစ်ပြီး၊ ရောင်းအား၊ ဘဏ်စာရင်း၊ ဂိုဒေါင်စီမံခန့်ခွဲမှု၊ လူ့စွမ်းအင်စသည်တို့ကို အလွယ်တကူ ပေါင်းစည်းအသုံးပြုနိုင်ပါသည်။ လုပ်ငန်းစဉ်များကို ထိရောက်စွာ စနစ်တကျ ပြောင်းလဲစေပြီး အချိန်နှင့် ကုန်ကျစရိတ်ကို လျော့ချပေးပါသည်။",
            homeBtn1: "အခမဲ့ ဒီမို တောင်းဆိုရန်",
            homeBtn2: "အဓိကမော်ဂျူးများကြည့်ရန်",
            
            // Why Outto section
            whyOuttoTitle: "ဘာကြောင့် OdeX ကို ရွေးချယ်သင့်သနည်း?",
            whyOuttoFeature1: "သတင်းအချက်အလက် စီးပွားရေး ပေါင်းစပ်မှု",
            whyOuttoFeature1Text: "ကိုယ့်မှာရှိသမျှလုပ်ငန်းအားလုံးရဲ့ Process တွေကို တစ်ခုတည်းလိုပေါင်းလုပ်နိုင်တဲ့ စမတ် Platform တစ်ခုဖြစ်ပါတယ်။ အချိန်နှင့်တပြေးညီ အချက်အလက်တွေနဲ့ Insight တွေကိုလည်း တန်းကြည့်ပြီး မဟာဗျူဟာဆိုင်ရာ ဆုံးဖြတ်ချက်တွေ ပိုလွယ်လွယ်နဲ့ ချနိုင်လာမယ်။",
            whyOuttoFeature2: "ကမ္ဘာ့အဆင့် အသုံးပြုနိုင်မှု",
            whyOuttoFeature2Text: "ဖုန်းတစ်လုံးပါတဲ့နေရာတိုင်း လုပ်ငန်းကိစ္စတွေကိုလည်း သင့်နဲ့အတူလိုက်နေမှာ။ ဖုန်းနဲ့ပဲဖြစ်ဖြစ်၊ တက်ဘလက်ဖြစ်ဖြစ်၊ ကွန်ပျူတာဖြစ်ဖြစ် ဘယ် Device မှပဲဖြစ်စေ တစ်လက်စတည်း အသုံးပြုနိုင်လို့ ဘယ်နေရာမှာမဆို စီမံခန့်ခွဲတာအလွယ်တကူ ဖြစ်သွားမယ်။",
            whyOuttoFeature3: "အဆင့်မြင့်တိုးတက်မှု အင်ဂျင်",
            whyOuttoFeature3Text: "ဒေတာအခြေခံထားတဲ့ Insight တွေနဲ့ အလိုအလျောက် အလုပ်လုပ်စေနိုင်တဲ့ System တွေကြောင့် Productive တက်လာပြီး အသီးအသန့်အမြတ်ပိုရတဲ့အထိ လုပ်ငန်းတိုးတက်ဖို့ တကယ်အရှိန်မြှင့်ပေးနိုင်မယ့် Solution ပါ။",
            whyOuttoFeature4: "စိတ်ကြိုက် ပြုပြင်နိုင်သည်",
            whyOuttoFeature4Text: "သင့်လုပ်ငန်းရဲ့ လိုအပ်ချက်တိုင်းကိုစိတ်ကြိုက် Customize လုပ်နိုင်တယ်။ ကိုယ်လိုသလို လိုရင်တိုး ပိုရင်လျော့ ကြိုက်သလိုစီမံနိုင်တဲ့ အတွက် လုံးဝ Flexible ဖြစ်တဲ့ System တစ်ခုဖြစ်တယ်",
            
            // Comparison preview
            comparisonPreviewTitle: "ပုံမှန် POS နှင့် OdeX ERP နှိုင်းယှဉ်ချက်",
            comparisonPreviewText: "OdeX ကို ပုံမှန်သော POS စနစ်များနှင့် ခွဲခြားထားသော ပြောင်းလဲပေးသော အားသာချက်များကို ရှာဖွေပါ။",
            comparisonPreviewBtn: "နှိုင်းယှဉ်ချက်ကိုကြည့်ရန်",
            
            // Features preview
            featuresPreviewTitle: "အဓိကမော်ဂျူးများ",
            featuresPreviewSales: "ရောင်းအား",
            featuresPreviewInventory: "စာရင်း",
            featuresPreviewAccounting: "ဘဏ္ဍာရေး",
            featuresPreviewHR: "လူ့စွမ်းအင်",
            featuresPreviewPOS: "POS",
            featuresPreviewBtn: "အသေးစိတ်ကြည့်ရန်",
            
            // Footer
            footerAbout: "သင့်စီးပွားရေးလုပ်ငန်းကို တိုးတက်စေရန် အကောင်းဆုံး ဖြေရှင်းချက်",
            footerLinks: "Quick Links",
            footerHome: "ပင်မစာမျက်နှာ",
            footerAboutERP: "ERP အကြောင်း",
            footerComparison: "နှိုင်းယှဉ်ချက်",
            footerFeatures: "အဓိကမော်ဂျူးများ",
            footerContact: "ဆက်သွယ်ရန်",
            footerContactInfo: "ဆက်သွယ်ရန်",
            footerEmail: "odexerp@gmail.com",
            footerPhone: "09-754758505",
            footerCopyright: "© 2025 OdeX. All Rights Reserved.",
            
            // Navigation
            navHome: "ပင်မစာမျက်နှာ",
            navAbout: "ERP အကြောင်း",
            navComparison: "နှိုင်းယှဉ်ချက်",
            navFeatures: "အဓိကမော်ဂျူးများ",
            navContact: "ဆက်သွယ်ရန်",
            langToggleText: "English Version",
            
            // About page
            aboutTitle: "OdeX အကြောင်း | OdeX",
            aboutHeroTitle: "OdeX ဆိုသည်မှာ ဘာလဲ?",
            aboutHeroText: "OdeX သည် သင့်စီးပွားရေးလုပ်ငန်း၏ အားလုံးကို စီမံခန့်ခွဲပေးနိုင်သော စွမ်းရည်ပြည့်ဝသော ဆော့ဖ်ဝဲလ်ဖြစ်ပါသည်။",
            whatIsOuttoTitle: "OdeX ဆိုတာဘာလဲ?",
            whatIsOuttoText: "OdeX (Enterprise Resource Planning) ဆိုတာ မိတ်ဆွေတို့လုပ်ငန်းအတွက် အရာရာကို တစ်နေရာတည်းမှာ စုစည်းပြီး စီမံခန့်ခွဲနိုင်တဲ့ Platform ပါ။ ထုတ်လုပ်ရေး၊ အရောင်း၊ Inventory စီမံခန့်ခွဲမှု၊ Accounting စနစ်တွေတည်ဆောက်တာမှစပြီး လူ့စွမ်းအား (HR) အထိ — အားလုံးကို တစ်စုတစ်စည်းတည်းနဲ့ ထိန်းချုပ်နိုင်လို့ အလုပ်ခွဲစရာမရှိတော့ဘူး။",
            outtoBenefitsTitle: "OdeX ၏ အဓိက အားသာချက်များ",
            benefitsSectionTitle: "OdeX ကို အသုံးပြုခြင်းဖြင့် ရရှိသော အကျိုးကျေးဇူးများ",
            benefit1Title: "ထုတ်လုပ်မှု တိုးတက်မှု",
            benefit1Text: "Manual လုပ်နေရတာတွေ Auto အလုပ်လုပ်အောင် ပြောင်းလိုက်ရင် အလုပ်လည်း မြန်လာ Productivity လည်း သက်သက်သာသာ တက်လာမယ်။",
            benefit2Title: "စရိတ် ခြွေတာမှု",
            benefit2Text: "လုပ်ငန်းစဉ်များကို တစ်နေရာတွင် စီမံခန့်ခွဲခြင်းဖြင့် စီမံခန့်ခွဲမှု စရိတ်ကို လျှော့ချပေးပါသည်။",
            benefit3Title: "အချက်အလက်များ ဆက်သွယ်မှု",
            benefit3Text: "အချက်အလက်များသည် မော်ဂျူးအားလုံးတွင် တစ်နေရာတွင် စုစည်းထားသောကြောင့် ဆုံးဖြတ်ချက်များ ပိုမြန်ဆိုနိုင်ပါသည်။",
            benefit4Title: "မိုဘိုင်းလ် အဆင်ပြေမှု",
            benefit4Text: "မည်သည့် ကိရိယာမဆို အသုံးပြုနိုင်ပါသည်။ စမတ်ဖုန်း၊ တက်ဘလက် သို့မဟုတ် ကွန်ပျူတာတွင် အလုပ်လုပ်ပါမည်။",
            aboutCtaText: "OdeX သည် သင့်လုပ်ငန်း၏ လိုအပ်ချက်များကို ဖြေရှင်းပေးနိုင်ပါမည်။",
            
            // Comparison page
            comparisonTitle: "နှိုင်းယှဉ်ချက် | OdeX",
            comparisonHeroTitle: "ပုံမှန် POS နှင့် OdeX ERP နှိုင်းယှဉ်ချက်",
            comparisonHeroText: " OdeX ERP သည် ပုံမှန် POS စနစ်များနှင့် မည်သို့ကွာခြားသည်ကို လေ့လာနိုင်ပါသည်",
            
            // Comparison table headers
            comparisonFeature: "အဓိက အင်္ဂါရပ်များ",
            traditionalPOS: "ပုံမှန် POS",
            outtoPOS: "OdeX ERP",
            
            // Comparison table features
            comparisonFeature1: "အချက်အလက် စီမံခန့်ခွဲမှု",
            traditionalPOSDataManagement: "ခက်ခဲသည်",
            outtoPOSDataManagement: "ပြည့်စုံသည်",
            
            comparisonFeature2: "အစီရင်ခံစာများ",
            traditionalPOSReports: "ကန့်သတ်သည်",
            outtoPOSReports: "အသေးစိတ်",
            
            comparisonFeature3: "စာရင်း စီမံခန့်ခွဲမှု",
            traditionalPOSInventory: "အခက်အခဲရှိသည်",
            outtoPOSInventory: "အလိုအလျောက်",
            
            comparisonFeature4: "စီးပွားရေးဆုံးဖြတ်ချက်များ",
            traditionalPOSBusinessDecisions: "ကန့်သတ်သည်",
            outtoPOSBusinessDecisions: "အသေးစိတ်",
            
            comparisonFeature5: "မိုဘိုင်းလ် အဆင်ပြေမှု",
            traditionalPOSMobile: "ကန့်သတ်သည်",
            outtoPOSMobile: "ပြည့်စုံသည်",
            
            comparisonFeature6: "စိတ်ကြိုက် ပြုပြင်နိုင်မှု",
            traditionalPOSCustomization: "ကန့်သတ်သည်",
            outtoPOSCustomization: "ပြည့်စုံသည်",
            
            comparisonFeature7: "လုပ်ငန်းစဉ် ဆက်သွယ်မှု",
            traditionalPOSIntegration: "နည်းပါးသည်",
            outtoPOSIntegration: "ပြည့်စုံသည်",
            
            comparisonFeature8: "စျေးနှုန်း",
            traditionalPOSCost: "နိမ့်ပါးသည်",
            outtoPOSCost: "နိမ့်ပါးသည်",
            
            comparisonFeature9: "အချက်အလက်လုံခြုံရေး",
            traditionalPOSSecurity: "အခြေခံ (Basic)",
            outtoPOSSecurity: "အဆင့်မြင့် (SSL, Encryption)",
            
            comparisonFeature10: "အမှားအယွင်းများ လျှော့ချမှု",
            traditionalPOSAccuracy: "၈၅% တိကျမှု",
            outtoPOSAccuracy: "၉၈% တိကျမှု",
            
            comparisonFeature11: "အချိန်ချွေတာမှု",
            traditionalPOSTimeSaving: "၃၀% ချွေတာ",
            outtoPOSTimeSaving: "၇၀% ချွေတာ",
            
            comparisonFeature12: "ဖောက်သည်ဆက်ဆံရေး",
            traditionalPOSCustomerService: "ကန့်သတ်",
            outtoPOSCustomerService: "ပြည့်စုံ (CRM ပါဝင်)",
            
            // Comparison CTA
            outtoPOSHeading: "OdeX ERP",
            comparisonCtaText: "OdeX ERP သည် သင့်လုပ်ငန့်၏ လိုအပ်ချက်များကို ပိုကောင်းစွာ ဖြေရှင်းပေးပါမည်။",
            
            // Features page
            featuresTitle: "အဓိကမော်ဂျူးများ | OdeX",
            featuresHeroTitle: "OdeX အဓိကမော်ဂျူးများ",
            featuresHeroText: "OdeX သည် သင့်စီးပွားရေးလုပ်ငန်း၏ လိုအပ်ချက်များကို ဖြေရှင်းပေးနိုင်သော မော်ဂျူးများစွာကို ပိုင်ဆိုင်ထားပါသည်။",
            feature1Title: "ရောင်းအား စီမံခန့်ခွဲမှု (Sales)",
            feature1Text: "ရောင်းအားလုပ်ငန်းစဉ်အားလုံးကို စီမံခန့်ခွဲပေးပါသည်။ ဖောက်သည်များ၊ ကိုက်ညီမှုများ၊ အရောင်းမှာယူမှုများ၊ ပို့ပို့ခများ စသည်တို့ကို စီမံပါသည်။",
            feature2Title: "စာရင်း စီမံခန့်ခွဲမှု (Inventory)",
            feature2Text: "ပစ္စည်းများ၊ ပေးသွင်းမှုများ၊ ထုတ်ယူမှုများကို စီမံခန့်ခွဲပေးပါသည်။ စာရင်းအခြေအနေကို အချိန်နှင့်တပြေးညီ ကြည့်ရှုနိုင်ပါသည်။",
            feature3Title: "ဘဏ္ဍာရေး စီမံခန့်ခွဲမှု (Accounting)",
            feature3Text: "ငွေရေးကြေးရေးလးလုပ်ငန်းစဉ်များကို စီမံပေးပါသည်။ အဝင်၊ အထွက်၊ ငွေကြေးပြောင်းလဲမှုများကို စီမံပါသည်။",
            feature4Title: "လူ့စွမ်းအင် စီမံခန့်ခွဲမှု (HR)",
            feature4Text: "၀န်ထမ်းများ၊ လစာများ၊ အလုပ်အကိုင်များ၊ နာမည်စာရင်းများကို စီမံပေးပါသည်။",
            feature5Title: "POS စနစ်",
            feature5Text: "အရောင်းစနစ်ကို စီမံပေးပါသည်။ ငွေပေးချေမှုများ၊ ပြန်အမ်းမှုများ၊ ကဒ်ပေးမှုများကို စီမံပါသည်။",
            feature6Title: "အစီရင်ခံစာများ",
            feature6Text: "စီးပွားရေးဆုံးဖြတ်ချက်များ ချရန် ကူညီပေးသော အစီရင်ခံစာများကို ထုတ်ပေးပါသည်။",
            
            // Integration section
            integrationTitle: "မော်ဂျူးများ ဆက်သွယ်မှု",
            integrationText: "OdeX ၏ မော်ဂျူးများသည် တစ်ခုနှင့်တစ်ခု ဆက်သွယ်နိုင်ပါသည်။ ထုတ်လုပ်မှုမှ ရောင်းအားအထိ အချက်အလက်များသည် တစ်နေရာတွင် စုစည်းထားသောကြောင့် ဆုံးဖြတ်ချက်များ ပိုမြန်ဆိုနိုင်ပါသည်။",
            manufacturingModule: "ထုတ်လုပ်မှု",
            inventoryModule: "စာရင်း",
            salesModule: "ရောင်းအား",
            hrModule: "လူ့စွမ်းအင်",
            accountingModule: "ဘဏ္ဍာရေး",
            posModule: "POS",
            integrationCenter: "OdeX",
            
            // Features CTA
            featuresCtaText: "OdeX သည် သင့်လုပ်ငန်း၏ လိုအပ်ချက်များကို ဖြေရှင်းပေးနိုင်ပါမည်။",
            
            // Contact page
            contactTitle: "ဆက်သွယ်ရန် | OdeX",
            contactHeroTitle: "ဆက်သွယ်ရန်",
            contactHeroText: "OdeX ကို သင့်စီးပွားရေးအတွက် မည်သို့ အသုံးပြုနိုင်သည်ကို အခမဲ့ ဒီမိုပြသခြင်း တောင်းဆိုပါ။",
            contactFormTitle: "ဒီမို တောင်းဆိုခြင်း သို့မဟုတ် ဆက်သွယ်ရန်",
            nameLabel: "အမည်",
            companyLabel: "ကုမ္ပဏီအမည်",
            emailLabel: "အီးမေးလ်",
            phoneLabel: "ဖုန်းနံပါတ်",
            messageLabel: "မက်ဆေ့ခ်ျ",
            sendButton: "ပေးပို့ရန်",
            contactInfoTitle: "ကျွန်ုပ်တို့နှင့် ဆက်သွယ်ရန်",
            addressTitle: "လိပ်စာ",
            addressText: "ရန်ကုန်၊ မြန်မာ",
            phoneTitle: "ဖုန်းနံပါတ်",
            phone1: "09-754758505",
            phone2: "09-952177102",
            emailTitle: "အီးမေးလ်",
            contactEmail1: "odexerp@gmail.com",
            contactEmail2: "odexerp@gmail.com",
            
            // Language toggle
            langToggleText: "English Version",
            
            // Industry Solutions Section
            industrySolutionsTitle: "လုပ်ငန်းအမျိုးအစားအလိုက် ဖြေရှင်းချက်များ",
            industrySolutionsText: "OdeX သည် မတူညီသော လုပ်ငန်းများအတွက် စိတ်ကြိုက်ပြုပြင်ထားသော ဖြေရှင်းချက်များကို ပေးဆောင်ပါသည်။",
            industryManufacturing: "ထုတ်လုပ်မှု",
            industryManufacturingText: "ထုတ်လုပ်မှုလုပ်ငန်းများအတွက် အထူးပြုလုပ်ထားသော စီမံခန့်ခွဲမှုစနစ်",
            industryRetail: "အရောင်းအဝယ်",
            industryRetailText: "အရောင်းအဝယ်လုပ်ငန်းများအတွက် စာရင်းနှင့် POS စနစ်",
            industryLogistics: "ပို့ဆောင်ရေး",
            industryLogisticsText: "ပို့ဆောင်ရေးလုပ်ငန်းများအတွက် လမ်းကြောင်းစီမံခန့်ခွဲမှု",
            industryHealthcare: "ကျန်းမာရေး",
            industryHealthcareText: "ဆေးရုံများနှင့် ကျန်းမာရေးစင်တာများအတွက် စီမံခန့်ခွဲမှု",
            industryEducation: "ပညာရေး",
            industryEducationText: "ကျောင်းများနှင့် တက္ကသိုလ်များအတွက် ပညာရေးစီမံခန့်ခွဲမှု",
            industryGovernment: "အစိုးရ",
            industryGovernmentText: "အစိုးရဌာနများအတွက် စီမံခန့်ခွဲမှုနှင့် အစီရင်ခံစာစနစ်",
            
            // Security & Compliance Section
            securityComplianceTitle: "လုံခြုံရေးနှင့် စံချိန်များ",
            securityComplianceText: "OdeX သည် သင့်အချက်အလက်များကို အမြင့်ဆုံး လုံခြုံရေးစံချိန်များဖြင့် ကာကွယ်ပေးပါသည်။",
            securityDataSecurity: "အချက်အလက် လုံခြုံရေး",
            securityDataSecurityText: "SSL encryption နှင့် advanced security protocols များဖြင့် သင့်အချက်အလက်များကို ကာကွယ်ပေးပါသည်။",
            securityDataStorage: "အချက်အလက် သိမ်းဆည်းမှု",
            securityDataStorageText: "အချက်အလက်များကို လုံခြုံသော cloud servers များတွင် သိမ်းဆည်းပြီး နေ့စဉ် backup ပြုလုပ်ပေးပါသည်။",
            securityUserManagement: "အသုံးပြုသူ စီမံခန့်ခွဲမှု",
            securityUserManagementText: "Role-based access control နှင့် user permissions များဖြင့် သင့်အချက်အလက်များကို လုံခြုံစွာ စီမံခန့်ခွဲပါသည်။",
            securityStandardsCompliance: "စံချိန်များ လိုက်နာမှု",
            securityStandardsComplianceText: "ISO 27001, GDPR နှင့် အခြားသော နိုင်ငံတကာ လုံခြုံရေးစံချိန်များကို လိုက်နာပါသည်။",
            securityISO27001: "ISO 27001 Certified",
            securityGDPR: "GDPR Compliant",
            securityUptime: "99.9% Uptime SLA"
        },
        en: {
            homeTitle: "OdeX",
            heroHeading: "From Manual to Digital — switch with easy‑to‑use, affordable Odoo ERP",
            heroMotto: "Advanced Technology, Infinite Possibilities",
            heroText: "Odoo ERP centralizes your operations in one place — seamlessly integrating sales, accounting, inventory, and HR. It streamlines processes, improves efficiency, and reduces both time and operating costs.",
            homeBtn1: "Request Free Demo",
            homeBtn2: "View Key Modules",
            
            // Why Outto section
            whyOuttoTitle: "Why Choose OdeX?",
            whyOuttoFeature1: "Unified Business Intelligence",
            whyOuttoFeature1Text: "Integrate all business processes into a single, intelligent platform. Access real-time data and insights that drive strategic decision-making.",
            whyOuttoFeature2: "Universal Accessibility",
            whyOuttoFeature2Text: "Seamless experience across all devices - smartphones, tablets, and desktops. Your business management goes wherever you go.",
            whyOuttoFeature3: "Exponential Growth Engine",
            whyOuttoFeature3Text: "Accelerate business growth with data-driven insights and automated processes that enhance productivity and profitability.",
            whyOuttoFeature4: "Customizable",
            whyOuttoFeature4Text: "Customize according to your business needs. Expand as you need.",
            
            // Comparison preview
            comparisonPreviewTitle: "Traditional POS vs OdeX ERP Comparison",
            comparisonPreviewText: "Discover the transformative advantages that set OdeX apart from conventional POS systems.",
            comparisonPreviewBtn: "View Comparison",
            
            // Features preview
            featuresPreviewTitle: "Key Modules",
            featuresPreviewSales: "Sales",
            featuresPreviewInventory: "Inventory",
            featuresPreviewAccounting: "Accounting",
            featuresPreviewHR: "Human Resources",
            featuresPreviewPOS: "POS",
            featuresPreviewBtn: "View Details",
            
            // Footer
            footerAbout: "The best solution to boost your business",
            footerLinks: "Quick Links",
            footerHome: "Home",
            footerAboutERP: "About ERP",
            footerComparison: "Comparison",
            footerFeatures: "Key Modules",
            footerContact: "Contact",
            footerContactInfo: "Contact Info",
            footerEmail: "odexerp@gmail.com",
            footerPhone: "09-754758505",
            footerCopyright: "© 2025 OdeX. All Rights Reserved.",
            
            // Navigation
            navHome: "Home",
            navAbout: "About ERP",
            navComparison: "Comparison",
            navFeatures: "Key Modules",
            navContact: "Contact",
            langToggleText: "Myanmar Version",
            
            // About page
            aboutTitle: "About OdeX",
            aboutHeroTitle: "What is OdeX?",
            aboutHeroText: "OdeX is a comprehensive software that can manage all aspects of your business.",
            whatIsOuttoTitle: "Understanding OdeX",
            whatIsOuttoText: "OdeX (Enterprise Resource Planning) is a platform that can manage all aspects of your business. It can manage processes such as manufacturing, sales, inventory, accounting, and human resources all in one place.",
            outtoBenefitsTitle: "Key Benefits of OdeX",
            benefitsSectionTitle: "Benefits of Using OdeX",
            benefit1Title: "Increased Productivity",
            benefit1Text: "Automating processes helps increase productivity.",
            benefit2Title: "Cost Reduction",
            benefit2Text: "Managing processes in one place reduces management costs.",
            benefit3Title: "Connected Data",
            benefit3Text: "Since data is centralized across all modules, decisions can be made faster.",
            benefit4Title: "Mobile Friendly",
            benefit4Text: "Works on any device. Smartphone, tablet, or computer.",
            aboutCtaText: "OdeX can solve your business needs.",
            
            // Comparison page
            comparisonTitle: "Comparison | OdeX",
            comparisonHeroTitle: "Traditional POS vs OdeX ERP Comparison",
            comparisonHeroText: "See how OdeX ERP surpasses traditional POS systems.",
            
            // Comparison table headers
            comparisonFeature: "Key Features",
            traditionalPOS: "Traditional POS",
            outtoPOS: "OdeX ERP",
            
            // Comparison table features
            comparisonFeature1: "Data Management",
            traditionalPOSDataManagement: "Difficult",
            outtoPOSDataManagement: "Complete",
            
            comparisonFeature2: "Reports",
            traditionalPOSReports: "Limited",
            outtoPOSReports: "Detailed",
            
            comparisonFeature3: "Inventory Management",
            traditionalPOSInventory: "Difficult",
            outtoPOSInventory: "Automated",
            
            comparisonFeature4: "Business Decisions",
            traditionalPOSBusinessDecisions: "Limited",
            outtoPOSBusinessDecisions: "Detailed",
            
            comparisonFeature5: "Mobile Friendly",
            traditionalPOSMobile: "Limited",
            outtoPOSMobile: "Complete",
            
            comparisonFeature6: "Customization",
            traditionalPOSCustomization: "Limited",
            outtoPOSCustomization: "Complete",
            
            comparisonFeature7: "Process Integration",
            traditionalPOSIntegration: "Limited",
            outtoPOSIntegration: "Complete",
            
            comparisonFeature8: "Cost",
            traditionalPOSCost: "Low",
            outtoPOSCost: "Low",
            
            comparisonFeature9: "Data Security",
            traditionalPOSSecurity: "Basic",
            outtoPOSSecurity: "Advanced (SSL, Encryption)",
            
            comparisonFeature10: "Error Reduction",
            traditionalPOSAccuracy: "85% Accuracy",
            outtoPOSAccuracy: "98% Accuracy",
            
            comparisonFeature11: "Time Saving",
            traditionalPOSTimeSaving: "30% Time Saved",
            outtoPOSTimeSaving: "70% Time Saved",
            
            comparisonFeature12: "Customer Management",
            traditionalPOSCustomerService: "Limited",
            outtoPOSCustomerService: "Complete (CRM Included)",
            
            // Comparison CTA
            outtoPOSHeading: "OdeX ERP",
            comparisonCtaText: "OdeX ERP will better solve your business needs.",
            
            // Features page
            featuresTitle: "Key Modules | OdeX",
            featuresHeroTitle: "OdeX Key Modules",
            featuresHeroText: "OdeX has many modules that can solve your business needs.",
            feature1Title: "Sales Management",
            feature1Text: "Manages all sales processes. Customers, agreements, sales orders, shipping costs, etc.",
            feature2Title: "Inventory Management",
            feature2Text: "Manages items, purchases, withdrawals. You can view inventory status in real-time.",
            feature3Title: "Accounting Management",
            feature3Text: "Manages financial processes. Income, expenses, currency exchanges.",
            feature4Title: "Human Resources Management",
            feature4Text: "Manages employees, salaries, jobs, name lists.",
            feature5Title: "POS System",
            feature5Text: "Manages sales system. Payments, returns, card payments.",
            feature6Title: "Reports",
            feature6Text: "Provides reports that help with business decisions.",
            
            // Integration section
            integrationTitle: "Module Integration",
            integrationText: "OdeX modules can connect with each other. From manufacturing to sales, all data is centralized, so decisions can be made faster.",
            manufacturingModule: "Manufacturing",
            inventoryModule: "Inventory",
            salesModule: "Sales",
            hrModule: "Human Resources",
            accountingModule: "Accounting",
            posModule: "POS",
            integrationCenter: "OdeX",
            
            // Features CTA
            featuresCtaText: "OdeX can solve your business needs.",
            
            // Contact page
            contactTitle: "Contact | OdeX",
            contactHeroTitle: "Contact",
            contactHeroText: "Request a free demo to see how OdeX can be used for your business.",
            contactFormTitle: "Request Demo or Contact",
            nameLabel: "Name",
            companyLabel: "Company Name",
            emailLabel: "Email",
            phoneLabel: "Phone Number",
            messageLabel: "Message",
            sendButton: "Send",
            contactInfoTitle: "Contact Us",
            addressTitle: "Address",
            addressText: "Yangon, Myanmar",
            phoneTitle: "Phone Number",
            phone1: "09-754758505",
            phone2: "09-952177102",
            emailTitle: "Email",
            contactEmail1: "odexerp@gmail.com",
            contactEmail2: "odexerp@gmail.com",
            
            // Language toggle
            langToggleText: "Myanmar Version",
            
            // Industry Solutions Section
            industrySolutionsTitle: "Solutions by Industry",
            industrySolutionsText: "OdeX provides customized solutions for different industries.",
            industryManufacturing: "Manufacturing",
            industryManufacturingText: "Specialized management system for manufacturing businesses",
            industryRetail: "Retail",
            industryRetailText: "Inventory and POS system for retail businesses",
            industryLogistics: "Logistics",
            industryLogisticsText: "Route management for logistics businesses",
            industryHealthcare: "Healthcare",
            industryHealthcareText: "Management for hospitals and health centers",
            industryEducation: "Education",
            industryEducationText: "Educational management for schools and universities",
            industryGovernment: "Government",
            industryGovernmentText: "Management and reporting system for government departments",
            
            // Security & Compliance Section
            securityComplianceTitle: "Security & Compliance",
            securityComplianceText: "OdeX protects your data with the highest security standards.",
            securityDataSecurity: "Data Security",
            securityDataSecurityText: "Protect your data with SSL encryption and advanced security protocols.",
            securityDataStorage: "Data Storage",
            securityDataStorageText: "Data is stored on secure cloud servers with daily backups.",
            securityUserManagement: "User Management",
            securityUserManagementText: "Securely manage your data with role-based access control and user permissions.",
            securityStandardsCompliance: "Standards Compliance",
            securityStandardsComplianceText: "Compliant with ISO 27001, GDPR and other international security standards.",
            securityISO27001: "ISO 27001 Certified",
            securityGDPR: "GDPR Compliant",
            securityUptime: "99.9% Uptime SLA"
        }
    };
    
    // Function to update page content based on language
    function updatePageContent() {
        const lang = langData[currentLang];
        console.log('updatePageContent called with currentLang:', currentLang);
        
        // Update common elements
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) langToggle.textContent = lang.langToggleText;
        
        // Update navigation
        const navHome = document.querySelector('a[data-lang="navHome"]');
        if (navHome) navHome.textContent = lang.navHome;
        
        const navAbout = document.querySelector('a[data-lang="navAbout"]');
        if (navAbout) navAbout.textContent = lang.navAbout;
        
        const navComparison = document.querySelector('a[data-lang="navComparison"]');
        if (navComparison) navComparison.textContent = lang.navComparison;
        
        const navFeatures = document.querySelector('a[data-lang="navFeatures"]');
        if (navFeatures) navFeatures.textContent = lang.navFeatures;
        
        const navContact = document.querySelector('a[data-lang="navContact"]');
        if (navContact) navContact.textContent = lang.navContact;
        
        // Update footer
        const footerERP = document.querySelector('footer .footer-section h3');
        if (footerERP) footerERP.textContent = 'OdeX';
        
        const footerAbout = document.querySelector('footer .footer-section p');
        if (footerAbout) footerAbout.textContent = lang.footerAbout;
        
        const footerLinks = document.querySelector('footer .footer-section:nth-child(2) h4');
        if (footerLinks) footerLinks.textContent = lang.footerLinks;
        
        const footerHome = document.querySelector('footer .footer-section:nth-child(2) ul li:nth-child(1) a');
        if (footerHome) footerHome.textContent = currentLang === 'my' ? 'ပင်မစာမျက်နှာ' : 'Home';
        
        const footerAboutERP = document.querySelector('footer .footer-section:nth-child(2) ul li:nth-child(2) a');
        if (footerAboutERP) footerAboutERP.textContent = currentLang === 'my' ? 'ERP အကြောင်း' : 'About ERP';
        
        const footerComparison = document.querySelector('footer .footer-section:nth-child(2) ul li:nth-child(3) a');
        if (footerComparison) footerComparison.textContent = currentLang === 'my' ? 'နှိုင်းယှဉ်ချက်' : 'Comparison';
        
        const footerFeatures = document.querySelector('footer .footer-section:nth-child(2) ul li:nth-child(4) a');
        if (footerFeatures) footerFeatures.textContent = currentLang === 'my' ? 'အဓိကမော်ဂျူးများ' : 'Key Modules';
        
        const footerContact = document.querySelector('footer .footer-section:nth-child(2) ul li:nth-child(5) a');
        if (footerContact) footerContact.textContent = currentLang === 'my' ? 'ဆက်သွယ်ရန်' : 'Contact';
        
        const footerContactInfo = document.querySelector('footer .footer-section:nth-child(3) h4');
        if (footerContactInfo) footerContactInfo.textContent = lang.footerContactInfo;
        // Ensure footer email/phone are correct in both languages
        const footerEmailEl = document.querySelector('footer .footer-section:nth-child(3) p:nth-of-type(1)');
        if (footerEmailEl) footerEmailEl.innerHTML = '<i class="fas fa-envelope"></i> ' + (lang.footerEmail || 'odexerp@gmail.com');
        const footerPhoneEl = document.querySelector('footer .footer-section:nth-child(3) p:nth-of-type(2)');
        if (footerPhoneEl) footerPhoneEl.innerHTML = '<i class="fas fa-phone"></i> ' + (lang.footerPhone || '09-754758505');
        
        const footerCopyright = document.querySelector('.footer-bottom p');
        if (footerCopyright) footerCopyright.textContent = lang.footerCopyright;
        
        // Update contact info
        const contactItems = document.querySelectorAll('.contact-item');
        if (contactItems.length >= 3) {
            contactItems[0].querySelector('p').textContent = lang.addressText || 'Yangon, Myanmar';
            contactItems[1].querySelectorAll('p')[0].innerHTML = '<i class="fas fa-phone"></i> ' + (lang.phone1 || '09-754758505');
            contactItems[1].querySelectorAll('p')[1].innerHTML = '<i class="fas fa-phone"></i> ' + (lang.phone2 || '09-952177102');
            // If more phone number slots exist, fill them with the remaining numbers
            if (contactItems[1].querySelectorAll('p')[2]) contactItems[1].querySelectorAll('p')[2].innerHTML = '<i class="fas fa-phone"></i> 09-788315991';
            if (contactItems[1].querySelectorAll('p')[3]) contactItems[1].querySelectorAll('p')[3].innerHTML = '<i class="fas fa-phone"></i> 09-450049600';
            const emailParagraphs = contactItems[2].querySelectorAll('p');
            if (emailParagraphs[0]) emailParagraphs[0].textContent = lang.contactEmail1 || 'odexerp@gmail.com';
            // Remove any extra email lines beyond the first
            if (emailParagraphs[1]) emailParagraphs[1].remove();
        }
        
        // Update page-specific content
        const pagePath = window.location.pathname;
        
        if (pagePath === '/' || pagePath.endsWith('/')) {
            // Home page
            document.title = lang.homeTitle;
            const logo = document.querySelector('.logo h1');
            if (logo) logo.innerHTML = 'Ode<span class="accent-x">X</span>';
            
            const heroHeading = document.querySelector('.hero-content h1');
            if (heroHeading) heroHeading.textContent = lang.heroHeading;
            
            const heroMotto = document.querySelector('.hero-content .motto');
            if (heroMotto) heroMotto.textContent = lang.heroMotto;
            
            const heroText = document.querySelector('.hero-content p:not(.motto)');
            if (heroText) heroText.textContent = lang.heroText;
            
            const homeBtn1 = document.querySelector('.cta-buttons .btn.primary');
            if (homeBtn1) homeBtn1.textContent = lang.homeBtn1;
            
            const homeBtn2 = document.querySelector('.cta-buttons .btn.secondary');
            if (homeBtn2) homeBtn2.textContent = lang.homeBtn2;
            
            const whyOuttoTitle = document.querySelector('.why-odoo h2');
            if (whyOuttoTitle) whyOuttoTitle.textContent = lang.whyOuttoTitle;
            
            const featureCards = document.querySelectorAll('.feature-card');
            if (featureCards.length >= 4) {
                featureCards[0].querySelector('h3').textContent = lang.whyOuttoFeature1;
                featureCards[0].querySelector('p').textContent = lang.whyOuttoFeature1Text;
                featureCards[1].querySelector('h3').textContent = lang.whyOuttoFeature2;
                featureCards[1].querySelector('p').textContent = lang.whyOuttoFeature2Text;
                featureCards[2].querySelector('h3').textContent = lang.whyOuttoFeature3;
                featureCards[2].querySelector('p').textContent = lang.whyOuttoFeature3Text;
                featureCards[3].querySelector('h3').textContent = lang.whyOuttoFeature4;
                featureCards[3].querySelector('p').textContent = lang.whyOuttoFeature4Text;
            }
            
            const comparisonPreviewTitle = document.querySelector('.comparison-preview h2');
            if (comparisonPreviewTitle) comparisonPreviewTitle.textContent = lang.comparisonPreviewTitle;
            
            const comparisonPreviewText = document.querySelector('.comparison-preview p');
            if (comparisonPreviewText) comparisonPreviewText.textContent = lang.comparisonPreviewText;
            
            const comparisonPreviewBtn = document.querySelector('.comparison-preview .btn');
            if (comparisonPreviewBtn) comparisonPreviewBtn.textContent = lang.comparisonPreviewBtn;
            
            const featuresPreviewTitle = document.querySelector('.features-preview h2');
            if (featuresPreviewTitle) featuresPreviewTitle.textContent = lang.featuresPreviewTitle;
            
            const featureIcons = document.querySelectorAll('.feature-icon span');
            if (featureIcons.length >= 5) {
                featureIcons[0].textContent = lang.featuresPreviewSales;
                featureIcons[1].textContent = lang.featuresPreviewInventory;
                featureIcons[2].textContent = lang.featuresPreviewAccounting;
                featureIcons[3].textContent = lang.featuresPreviewHR;
                featureIcons[4].textContent = lang.featuresPreviewPOS;
            }
            
            const featuresPreviewBtn = document.querySelector('.features-preview .btn');
            if (featuresPreviewBtn) featuresPreviewBtn.textContent = lang.featuresPreviewBtn;

            // Ensure hero stat shows latest number
            const heroFirstStat = document.querySelector('.hero-stats .stat .stat-number');
            if (heroFirstStat) heroFirstStat.textContent = '28+';

            // Industry solutions - Always handle for both languages
            const industryTitle = document.querySelector('.industry-solutions h2');
            if (industryTitle) {
                industryTitle.textContent = lang.industrySolutionsTitle || 'Solutions by Industry';
                console.log('Industry Solutions Title updated:', industryTitle.textContent);
            }
            const industrySubtitle = document.querySelector('.industry-solutions p');
            if (industrySubtitle) industrySubtitle.textContent = lang.industrySolutionsText || 'OdeX provides customized solutions for different industries.';
            const industryCards = document.querySelectorAll('.industry-solutions .industry-card');
            if (industryCards.length >= 6) {
                const heads = [
                    lang.industryManufacturing || 'Manufacturing',
                    lang.industryRetail || 'Retail', 
                    lang.industryLogistics || 'Logistics',
                    lang.industryHealthcare || 'Healthcare',
                    lang.industryEducation || 'Education',
                    lang.industryGovernment || 'Government'
                ];
                const descs = [
                    lang.industryManufacturingText || 'Specialized management system for manufacturing businesses',
                    lang.industryRetailText || 'Inventory and POS system for retail businesses',
                    lang.industryLogisticsText || 'Route and operations management for logistics',
                    lang.industryHealthcareText || 'Management for hospitals and health centers',
                    lang.industryEducationText || 'Educational management for schools and universities',
                    lang.industryGovernmentText || 'Management and reporting system for government departments'
                ];
                industryCards.forEach((card, i) => {
                    const h3 = card.querySelector('h3');
                    const p = card.querySelector('p');
                    if (h3) h3.textContent = heads[i] || h3.textContent;
                    if (p) p.textContent = descs[i] || p.textContent;
                });
            }
            
            // Security & compliance - Always handle for both languages
            const secTitle = document.querySelector('.security-compliance h2');
            if (secTitle) secTitle.textContent = lang.securityComplianceTitle || 'Security & Compliance';
            const secSubtitle = document.querySelector('.security-compliance p');
            if (secSubtitle) secSubtitle.textContent = lang.securityComplianceText || 'OdeX protects your data with the highest security standards.';
            const secItems = document.querySelectorAll('.security-compliance .security-item');
            if (secItems.length >= 4) {
                const sHeads = [
                    lang.securityDataSecurity || 'Data Security',
                    lang.securityDataStorage || 'Data Storage',
                    lang.securityUserManagement || 'User Management',
                    lang.securityStandardsCompliance || 'Standards Compliance'
                ];
                const sDescs = [
                    lang.securityDataSecurityText || 'Protect your data with SSL encryption and advanced security protocols.',
                    lang.securityDataStorageText || 'Data stored securely on cloud servers with daily backups.',
                    lang.securityUserManagementText || 'Safely manage your data with role-based access control and user permissions.',
                    lang.securityStandardsComplianceText || 'Compliant with global standards such as ISO 27001 and GDPR.'
                ];
                secItems.forEach((item, i) => {
                    const h3 = item.querySelector('h3');
                    const p = item.querySelector('p');
                    if (h3) h3.textContent = sHeads[i] || h3.textContent;
                    if (p) p.textContent = sDescs[i] || p.textContent;
                });
            }
            
            // Update compliance badges - Always handle for both languages
            const badges = document.querySelectorAll('.compliance-badges .badge span');
            if (badges.length >= 3) {
                if (badges[0]) badges[0].textContent = lang.securityISO27001 || 'ISO 27001 Certified';
                if (badges[1]) badges[1].textContent = lang.securityGDPR || 'GDPR Compliant';
                if (badges[2]) badges[2].textContent = lang.securityUptime || '99.9% Uptime SLA';
            }

            // Additional homepage text internationalization
            if (currentLang === 'en') {
                // Statistics section
                const statsTitle = document.querySelector('.statistics h2');
                if (statsTitle) statsTitle.textContent = 'Our Achievements';
                const statLabels = document.querySelectorAll('.statistics .stat-label');
                if (statLabels[0]) statLabels[0].textContent = 'Successful Businesses';
                if (statLabels[1]) statLabels[1].textContent = 'Customer Satisfaction';
                if (statLabels[2]) statLabels[2].textContent = 'Support';
                const stat4 = document.querySelector('.statistics .stats-grid .stat-item:nth-child(4) .stat-label');
                if (stat4) stat4.textContent = '% Business Improvement';
                
                // Testimonials
                const tTitle = document.querySelector('.testimonials h2');
                if (tTitle) tTitle.textContent = 'What Our Clients Say';
                const t1 = document.querySelector('.testimonials .testimonials-grid .testimonial:nth-child(1) p');
                const n1 = document.querySelector('.testimonials .testimonials-grid .testimonial:nth-child(1) h4');
                const t2 = document.querySelector('.testimonials .testimonials-grid .testimonial:nth-child(2) p');
                const n2 = document.querySelector('.testimonials .testimonials-grid .testimonial:nth-child(2) h4');
                const t3 = document.querySelector('.testimonials .testimonials-grid .testimonial:nth-child(3) p');
                const n3 = document.querySelector('.testimonials .testimonials-grid .testimonial:nth-child(3) h4');
                if (t1) t1.textContent = 'OdeX truly transformed our business. Processes became faster and errors decreased.';
                if (n1) n1.textContent = 'Mr. Myat Thu';
                if (t2) t2.textContent = 'Real-time data has made our decisions more precise. Choosing OdeX was the best decision.';
                if (n2) n2.textContent = 'Daw Nini Khine';
                if (t3) t3.textContent = 'Mobile accessibility is crucial. We can manage our business from anywhere. OdeX really changed the way we work.';
                if (n3) n3.textContent = 'U Soe Min';
            } else {
                // Restore Myanmar labels when switching back - using language data
                const myLang = langData.my;
                
                // Statistics section
                const statsTitle = document.querySelector('.statistics h2');
                if (statsTitle) statsTitle.textContent = 'ကျွန်ုပ်တို့၏ အောင်မြင်မှုများ';
                const statLabels = document.querySelectorAll('.statistics .stat-label');
                if (statLabels[0]) statLabels[0].textContent = 'အောင်မြင်သော လုပ်ငန်းများ';
                if (statLabels[1]) statLabels[1].textContent = 'ဖောက်သည်စိတ်ကျေနပ်မှု';
                if (statLabels[2]) statLabels[2].textContent = 'ထောက်ပံ့ပေးမှု';
                const stat4 = document.querySelector('.statistics .stats-grid .stat-item:nth-child(4) .stat-label');
                if (stat4) stat4.textContent = '% လုပ်ငန်းပိုမိုတိုးတက်မှု';
                
                // Testimonials section
                const tTitle = document.querySelector('.testimonials h2');
                if (tTitle) tTitle.textContent = 'ဖောက်သည်များ၏ ထင်မြင်ချက်များ';
            }
        } else if (pagePath.includes('about.html') || pagePath === '/about') {
            // About page
            document.title = lang.aboutTitle;
            const logo = document.querySelector('.logo h1');
            if (logo) logo.innerHTML = 'Ode<span class="accent-x">X</span>';
            
            const heroTitle = document.querySelector('.hero-content h1');
            if (heroTitle) heroTitle.textContent = lang.aboutHeroTitle;
            
            const heroText = document.querySelector('.hero-content p');
            if (heroText) heroText.textContent = lang.aboutHeroText;
            
            const whatIsOuttoTitle = document.querySelector('.what-is-odoo .text-content h2');
            if (whatIsOuttoTitle) whatIsOuttoTitle.textContent = lang.whatIsOuttoTitle;
            
            const whatIsOuttoText = document.querySelector('.what-is-odoo .text-content > p');
            if (whatIsOuttoText) whatIsOuttoText.textContent = lang.whatIsOuttoText;
            
            const outtoBenefitsTitle = document.querySelector('.what-is-odoo .text-content h3');
            if (outtoBenefitsTitle) outtoBenefitsTitle.textContent = lang.outtoBenefitsTitle;
            
            const benefitsSectionTitle = document.querySelector('.benefits h2');
            if (benefitsSectionTitle) benefitsSectionTitle.textContent = lang.benefitsSectionTitle;
            
            const benefitCards = document.querySelectorAll('.benefit-card');
            if (benefitCards.length >= 4) {
                benefitCards[0].querySelector('h3').textContent = lang.benefit1Title;
                benefitCards[0].querySelector('p').textContent = lang.benefit1Text;
                benefitCards[1].querySelector('h3').textContent = lang.benefit2Title;
                benefitCards[1].querySelector('p').textContent = lang.benefit2Text;
                benefitCards[2].querySelector('h3').textContent = lang.benefit3Title;
                benefitCards[2].querySelector('p').textContent = lang.benefit3Text;
                benefitCards[3].querySelector('h3').textContent = lang.benefit4Title;
                benefitCards[3].querySelector('p').textContent = lang.benefit4Text;
            }
            
            const aboutCtaText = document.querySelector('.cta-section p');
            if (aboutCtaText) aboutCtaText.textContent = lang.aboutCtaText;
            
            const aboutCtaBtn = document.querySelector('.cta-section .btn');
            if (aboutCtaBtn) aboutCtaBtn.textContent = lang.homeBtn1;
        } else if (pagePath.includes('comparison.html') || pagePath === '/comparison') {
            // Comparison page
            document.title = lang.comparisonTitle;
            const logo = document.querySelector('.logo h1');
            if (logo) logo.innerHTML = 'Ode<span class="accent-x">X</span>';
            
            const heroTitle = document.querySelector('.hero-content h1');
            if (heroTitle) heroTitle.textContent = lang.comparisonHeroTitle;
            
            const heroText = document.querySelector('.hero-content p');
            if (heroText) heroText.textContent = lang.comparisonHeroText;
            
            // Update comparison table headers
            const tableHeaders = document.querySelectorAll('.comparison-table thead th');
            if (tableHeaders.length >= 3) {
                tableHeaders[0].textContent = lang.comparisonFeature;
                tableHeaders[1].textContent = lang.traditionalPOS;
                tableHeaders[2].textContent = lang.outtoPOS;
            }
            
            // Update comparison table body
            const tableRows = document.querySelectorAll('.comparison-table tbody tr');
            if (tableRows.length >= 8) {
                // Row 1 - Data Management
                tableRows[0].cells[0].textContent = lang.comparisonFeature1 || 'Data Management';
                tableRows[0].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSDataManagement || 'Difficult');
                tableRows[0].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSDataManagement || 'Complete');
                
                // Row 2 - Reports
                tableRows[1].cells[0].textContent = lang.comparisonFeature2 || 'Reports';
                tableRows[1].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSReports || 'Limited');
                tableRows[1].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSReports || 'Detailed');
                
                // Row 3 - Inventory Management
                tableRows[2].cells[0].textContent = lang.comparisonFeature3 || 'Inventory Management';
                tableRows[2].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSInventory || 'Difficult');
                tableRows[2].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSInventory || 'Automated');
                
                // Row 4 - Business Decisions
                tableRows[3].cells[0].textContent = lang.comparisonFeature4 || 'Business Decisions';
                tableRows[3].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSBusinessDecisions || 'Limited');
                tableRows[3].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSBusinessDecisions || 'Detailed');
                
                // Row 5 - Mobile Friendly
                tableRows[4].cells[0].textContent = lang.comparisonFeature5 || 'Mobile Friendly';
                tableRows[4].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSMobile || 'Limited');
                tableRows[4].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSMobile || 'Complete');
                
                // Row 6 - Customization
                tableRows[5].cells[0].textContent = lang.comparisonFeature6 || 'Customization';
                tableRows[5].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSCustomization || 'Limited');
                tableRows[5].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSCustomization || 'Complete');
                
                // Row 7 - Process Integration
                tableRows[6].cells[0].textContent = lang.comparisonFeature7 || 'Process Integration';
                tableRows[6].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSIntegration || 'Limited');
                tableRows[6].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSIntegration || 'Complete');
                
                // Row 8 - Cost
                tableRows[7].cells[0].textContent = lang.comparisonFeature8 || 'Cost';
                tableRows[7].cells[1].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.traditionalPOSCost || 'Low');
                tableRows[7].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSCost || 'Low');
                
                // Row 9 - Data Security
                if (tableRows[8]) {
                    tableRows[8].cells[0].textContent = lang.comparisonFeature9 || 'Data Security';
                    tableRows[8].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSSecurity || 'Basic');
                    tableRows[8].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSSecurity || 'Advanced (SSL, Encryption)');
                }
                
                // Row 10 - Error Reduction
                if (tableRows[9]) {
                    tableRows[9].cells[0].textContent = lang.comparisonFeature10 || 'Error Reduction';
                    tableRows[9].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSAccuracy || '85% Accuracy');
                    tableRows[9].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSAccuracy || '98% Accuracy');
                }
                
                // Row 11 - Time Saving
                if (tableRows[10]) {
                    tableRows[10].cells[0].textContent = lang.comparisonFeature11 || 'Time Saving';
                    tableRows[10].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSTimeSaving || '30% Time Saved');
                    tableRows[10].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSTimeSaving || '70% Time Saved');
                }
                
                // Row 12 - Customer Management
                if (tableRows[11]) {
                    tableRows[11].cells[0].textContent = lang.comparisonFeature12 || 'Customer Management';
                    tableRows[11].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSCustomerService || 'Limited');
                    tableRows[11].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSCustomerService || 'Complete (CRM Included)');
                }
            }
            
            const outtoPOSHeading = document.querySelector('.cta-section h2');
            if (outtoPOSHeading) outtoPOSHeading.textContent = lang.outtoPOSHeading;
            
            const comparisonCtaText = document.querySelector('.cta-section p');
            if (comparisonCtaText) comparisonCtaText.textContent = lang.comparisonCtaText;
            
            const comparisonCtaBtn = document.querySelector('.cta-section .btn');
            if (comparisonCtaBtn) comparisonCtaBtn.textContent = lang.homeBtn1;
        } else if (pagePath.includes('features.html') || pagePath === '/features') {
            // Features page
            document.title = lang.featuresTitle;
            const logo = document.querySelector('.logo h1');
            if (logo) logo.innerHTML = 'Ode<span class="accent-x">X</span>';
            
            const heroTitle = document.querySelector('.hero-content h1');
            if (heroTitle) heroTitle.textContent = lang.featuresHeroTitle;
            
            const heroText = document.querySelector('.hero-content p');
            if (heroText) heroText.textContent = lang.featuresHeroText;
            
            const featureCards = document.querySelectorAll('.feature-card');
            if (featureCards.length >= 6) {
                featureCards[0].querySelector('h3').textContent = lang.feature1Title;
                featureCards[0].querySelector('p').textContent = lang.feature1Text;
                featureCards[1].querySelector('h3').textContent = lang.feature2Title;
                featureCards[1].querySelector('p').textContent = lang.feature2Text;
                featureCards[2].querySelector('h3').textContent = lang.feature3Title;
                featureCards[2].querySelector('p').textContent = lang.feature3Text;
                featureCards[3].querySelector('h3').textContent = lang.feature4Title;
                featureCards[3].querySelector('p').textContent = lang.feature4Text;
                featureCards[4].querySelector('h3').textContent = lang.feature5Title;
                featureCards[4].querySelector('p').textContent = lang.feature5Text;
                featureCards[5].querySelector('h3').textContent = lang.feature6Title;
                featureCards[5].querySelector('p').textContent = lang.feature6Text;
            }
            
            const integrationTitle = document.querySelector('.integration h2');
            if (integrationTitle) integrationTitle.textContent = lang.integrationTitle;
            
            const integrationText = document.querySelector('.integration p');
            if (integrationText) integrationText.textContent = lang.integrationText;
            
            const modules = document.querySelectorAll('.module');
            if (modules.length >= 6) {
                modules[0].textContent = lang.manufacturingModule;
                modules[1].textContent = lang.inventoryModule;
                modules[2].textContent = lang.salesModule;
                modules[3].textContent = lang.hrModule;
                modules[4].textContent = lang.accountingModule;
                modules[5].textContent = lang.posModule;
            }
            
            const integrationCenter = document.querySelector('.center');
            if (integrationCenter) integrationCenter.textContent = lang.integrationCenter;
            
            const featuresCtaText = document.querySelector('.cta-section p');
            if (featuresCtaText) featuresCtaText.textContent = lang.featuresCtaText;
            
            const featuresCtaBtn = document.querySelector('.cta-section .btn');
            if (featuresCtaBtn) featuresCtaBtn.textContent = lang.homeBtn1;
        } else if (pagePath.includes('contact.html') || pagePath === '/contact') {
            // Contact page
            document.title = lang.contactTitle;
            const logo = document.querySelector('.logo h1');
            if (logo) logo.innerHTML = 'Ode<span class="accent-x">X</span>';
            
            const heroTitle = document.querySelector('.hero-content h1');
            if (heroTitle) heroTitle.textContent = lang.contactHeroTitle;
            
            const heroText = document.querySelector('.hero-content p');
            if (heroText) heroText.textContent = lang.contactHeroText;
            
            const contactFormTitle = document.querySelector('.form-container h2');
            if (contactFormTitle) contactFormTitle.textContent = lang.contactFormTitle;
            
            const nameLabel = document.querySelector('label[for="name"]');
            if (nameLabel) nameLabel.textContent = lang.nameLabel;
            
            const companyLabel = document.querySelector('label[for="company"]');
            if (companyLabel) companyLabel.textContent = lang.companyLabel;
            
            const emailLabel = document.querySelector('label[for="email"]');
            if (emailLabel) emailLabel.textContent = lang.emailLabel;
            
            const phoneLabel = document.querySelector('label[for="phone"]');
            if (phoneLabel) phoneLabel.textContent = lang.phoneLabel;
            
            const messageLabel = document.querySelector('label[for="message"]');
            if (messageLabel) messageLabel.textContent = lang.messageLabel;
            
            const sendButton = document.querySelector('button[type="submit"]');
            if (sendButton) sendButton.textContent = lang.sendButton;
            
            const contactInfoTitle = document.querySelector('.contact-info h2');
            if (contactInfoTitle) contactInfoTitle.textContent = lang.contactInfoTitle;
            
            const addressTitles = document.querySelectorAll('.contact-item h3');
            if (addressTitles.length >= 3) {
                addressTitles[0].textContent = lang.addressTitle;
                addressTitles[1].textContent = lang.phoneTitle;
                addressTitles[2].textContent = lang.emailTitle;
            }
        }
    }
    
    // Set initial language
    updatePageContent();
    
    // Temporary visual indicator for deployment verification
    const body = document.body;
    if (body) {
        // Red border removed for production
    }
    
    // Preloader: show for 3.5s then hide
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => preloader.remove(), 400);
        }, 3500);
    }
    
    // Language toggle event listener
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            currentLang = currentLang === 'my' ? 'en' : 'my';
            localStorage.setItem('language', currentLang);
            updatePageContent();
        });
    }
    
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            // Show the <nav> container and the <ul> list on mobile
            const navContainer = navMenu.parentElement;
            if (navContainer) navContainer.classList.toggle('show');
            navMenu.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                const navContainer = navMenu.parentElement;
                if (navContainer) navContainer.classList.remove('show');
                navMenu.classList.remove('show');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            const navContainer = navMenu.parentElement;
            if (!mobileMenuToggle.contains(e.target) && !(navContainer && navContainer.contains(e.target))) {
                mobileMenuToggle.classList.remove('active');
                if (navContainer) navContainer.classList.remove('show');
                navMenu.classList.remove('show');
            }
        });
    }

    // Animated Statistics Counter
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const suffix = element.getAttribute('data-suffix') || '';
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        }
        updateCounter();
    }

    // Intersection Observer for statistics animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

// Observe statistics section
const statsSection = document.querySelector('.statistics');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Reveal-on-scroll for feature cards with stagger
const featureCards = document.querySelectorAll('.feature-card');
if (featureCards.length) {
    const featuresObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const index = Array.from(featureCards).indexOf(el);
                setTimeout(() => el.classList.add('in-view'), index * 120);
                featuresObserver.unobserve(el);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

    featureCards.forEach(card => featuresObserver.observe(card));

    // Subtle 3D tilt on hover (desktop)
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            const rotateY = ((x / rect.width) - 0.5) * 4; // -2deg to 2deg
            const rotateX = ((y / rect.height) - 0.5) * -4;
            card.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', function() {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            // Honeypot check
            if ((formData.get('companyWebsite') || '').toString().trim() !== '') {
                return; // silently drop bots
            }
            // Basic client-side length validation
            const name = (formData.get('name') || '').toString().trim();
            const company = (formData.get('company') || '').toString().trim();
            const email = (formData.get('email') || '').toString().trim();
            const phone = (formData.get('phone') || '').toString().trim();
            const message = (formData.get('message') || '').toString().trim();
            if (!name || !email || !message) {
                return showToast(currentLang === 'my' ? 'အမည်၊ အီးမေးလ်၊ မက်ဆေ့ခ်ျ လိုအပ်ပါသည်' : 'Name, email and message are required', 'error');
            }
            if (name.length > 120 || company.length > 120 || email.length > 150 || phone.length > 40 || message.length > 2000) {
                return showToast(currentLang === 'my' ? 'ဖာမ် အချက်အလက်များသည် အလွန်ရှည်လျားနေ합니다' : 'Form fields are too long', 'error');
            }
            const payload = {
                name,
                company,
                email,
                phone,
                message
            };
            function showToast(message, type = 'success') {
                let toast = document.querySelector('.toast');
                if (!toast) {
                    toast = document.createElement('div');
                    toast.className = 'toast';
                    document.body.appendChild(toast);
                }
                toast.classList.remove('success','error');
                toast.classList.add(type);
                toast.textContent = message;
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 2600);
            }
            try {
                const resp = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const text = await resp.text();
                let data = {};
                try { data = JSON.parse(text); } catch {}
                if (resp.ok && data.ok) {
                    showToast(currentLang === 'my' ? 'သင့်မက်ဆေ့ခ်ျအား လက်ခံပြီးပါပြီ။ ကျွန်ုပ်တို့ ဆက်သွယ်ပေးမည်။' : 'Thanks! Your message was sent. We will contact you shortly.', 'success');
                    contactForm.reset();
                } else {
                    const errMsg = data.error || text || 'Unknown error';
                    showToast((currentLang === 'my' ? 'ပေးပို့ရာတွင် ပြသာနာရှိပါသည်။ ' : 'Submission failed. ') + errMsg, 'error');
                }
            } catch (err) {
                showToast((currentLang === 'my' ? 'ပေးပို့ရာတွင် ပြသာနာရှိပါသည်။ ' : 'There was a problem sending your message. ') + (err?.message || ''), 'error');
            }
        });
    }

    // Company Showcase Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 2000); // Change slide every 2 seconds
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Initialize slider
    if (slides.length > 0) {
        showSlide(0);
        startSlideShow();
        
        // Add click event listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopSlideShow();
                showSlide(index);
                startSlideShow();
            });
        });
        
        // Pause on hover
        const slider = document.querySelector('.showcase-slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopSlideShow);
            slider.addEventListener('mouseleave', startSlideShow);
        }
    }

    // Stacked cards subtle auto-transition (rotate top to back)
    const stacked = document.querySelector('.stacked-cards');
    if (stacked) {
        let stackedTimer;
        function cycleStack() {
            const cards = stacked.querySelectorAll('.card');
            if (cards.length < 2) return;
            // highlight current top
            cards[0].classList.add('active-top');
            setTimeout(() => {
                cards[0].classList.remove('active-top');
                stacked.appendChild(cards[0]);
            }, 900); // sync with CSS transition
        }
        function startStack() {
            stopStack();
            stackedTimer = setInterval(cycleStack, 2600);
        }
        function stopStack() {
            if (stackedTimer) clearInterval(stackedTimer);
        }
        // If prefers-reduced-motion, don't auto-cycle
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReduced) startStack();
        stacked.addEventListener('mouseenter', stopStack);
        stacked.addEventListener('mouseleave', startStack);

        // Mobile fallback: if cards are not visible after load, show fallback image
        setTimeout(() => {
            const cards = stacked.querySelectorAll('.card');
            const rect = cards[0] ? cards[0].getBoundingClientRect() : null;
            const hidden = !rect || rect.width < 40 || rect.height < 40; // likely not laid out
            const fallback = stacked.querySelector('.fallback-image');
            if (hidden && fallback) {
                cards.forEach(c => c.style.display = 'none');
                fallback.style.display = 'block';
            }
        }, 600);
    }
});