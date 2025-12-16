/**
 * Translations for Egypt Railways Ticketing System
 * Supports English (en) and Arabic (ar)
 */

export type Language = 'en' | 'ar';

export const translations = {
  en: {
    // App
    appName: 'Egypt Railways',
    appTagline: 'Egyptian National Railways - Connecting Egypt Since 1854',

    // Navigation
    nav: {
      home: 'Home',
      myTickets: 'My Tickets',
      login: 'Login',
      logout: 'Logout',
      signUp: 'Sign Up',
    },

    // Home Page
    home: {
      heroTitle: 'Book Your Train Journey',
      heroSubtitle: 'Travel comfortably across Egypt. Search trains, select your seats, and book tickets in minutes.',
      whyChoose: 'Why Choose Egypt Railways?',
      features: {
        network: 'Wide Network',
        networkDesc: 'Connect to all major cities across Egypt through our extensive railway network.',
        updates: 'Real-time Updates',
        updatesDesc: 'Get instant updates on train schedules, delays, and platform changes.',
        secure: 'Secure Booking',
        secureDesc: 'Your payment and personal information are always protected.',
        payment: 'Easy Payments',
        paymentDesc: 'Multiple payment options with instant confirmation.',
      },
      popularRoutes: 'Popular Routes',
      popularRoutesDesc: 'Discover our most traveled routes with frequent departures and competitive prices.',
      startingFrom: 'Starting from',
      readyTitle: 'Ready to Start Your Journey?',
      readyDesc: 'Join thousands of travelers who trust Egypt Railways for their train bookings.',
      bookNow: 'Book Now',
    },

    // Search
    search: {
      title: 'Search Trains',
      from: 'From',
      to: 'To',
      date: 'Travel Date',
      passengers: 'Passengers',
      passenger: 'Passenger',
      searchBtn: 'Search Trains',
      selectOrigin: 'Select origin station',
      selectDestination: 'Select destination station',
      results: 'Train(s) Found',
      noResults: 'No trains found for this route. Try a different route or date.',
      searchForTrains: 'Search for Trains',
      enterOriginDest: 'Enter your origin and destination to find available trains.',
      modifySearch: 'Modify Search',
      quickSearch: 'Quick Search',
      pricesPerPerson: 'Prices shown are per person',
      backToSearch: 'Back to search',
    },

    // Train
    train: {
      trainNumber: 'Train',
      duration: 'Duration',
      select: 'Select',
      from: 'from',
      highSpeed: 'High Speed',
      express: 'Express',
      regional: 'Regional',
    },

    // Seat Selection
    seats: {
      title: 'Select Your Seats',
      chooseSeat: 'Choose',
      seat: 'seat',
      seats: 'seats',
      forJourney: 'for your journey',
      available: 'Available',
      selected: 'Selected',
      unavailable: 'Unavailable',
      window: 'Window',
      coach: 'Coach',
      seatLabel: 'Seat',
      perSeat: 'per seat',
      seatsAvailable: 'seats available',
      selectedSeats: 'Selected Seats',
      selectMore: 'Please select',
      moreSeat: 'more seat',
      moreSeats: 'more seats',
      continueBooking: 'Continue to Booking',
      backToResults: 'Back to search results',
      frontOfTrain: 'Front of Train',
      backOfTrain: 'Back of Train',
    },

    // Classes
    class: {
      first: 'First Class',
      business: 'Business',
      economy: 'Economy',
    },

    // Booking
    booking: {
      title: 'Passenger Details',
      enterDetails: 'Enter details for all',
      passengers: 'passengers',
      alreadyAccount: 'Already have an account?',
      loginToAutofill: 'Login to auto-fill your details and access your bookings later.',
      continuePayment: 'Continue to Payment',
      backToSeats: 'Back to seat selection',
      addPassenger: 'Add Passenger',
    },

    // Passenger Form
    passenger: {
      title: 'Passenger',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone Number',
      age: 'Age',
    },

    // Payment
    payment: {
      title: 'Payment',
      subtitle: 'Complete your booking by entering payment details',
      cardNumber: 'Card Number',
      cardHolder: 'Card Holder Name',
      expiryDate: 'Expiry Date',
      cvv: 'CVV',
      secureNotice: 'Your payment information is secure (mock payment - no real charges)',
      pay: 'Pay',
      testCard: 'Test card: 4111 1111 1111 1111 | Exp: 12/25 | CVV: 123',
      backToPassengers: 'Back to passenger details',
    },

    // Confirmation
    confirmation: {
      title: 'Booking Confirmed!',
      subtitle: 'Your ticket has been booked successfully.',
      pnr: 'PNR Number',
      travelDate: 'Travel Date',
      totalPaid: 'Total Paid',
      bookingId: 'Booking ID',
      bookedOn: 'Booked on',
      downloadTicket: 'Download Ticket',
      backToHome: 'Back to Home',
      qrCode: 'QR Code',
    },

    // My Tickets
    myTickets: {
      title: 'My Tickets',
      subtitle: 'Manage your train bookings',
      bookNew: 'Book New Ticket',
      noBookings: 'No Bookings Yet',
      noBookingsDesc: "You haven't made any bookings yet. Start by searching for trains!",
      searchTrains: 'Search Trains',
      activeBookings: 'Active Bookings',
      cancelledBookings: 'Cancelled Bookings',
      cancel: 'Cancel',
      cancelBooking: 'Cancel Booking',
      cancelConfirm: 'Are you sure you want to cancel this booking? This action cannot be undone.',
      keepBooking: 'Keep Booking',
    },

    // Booking Summary
    summary: {
      title: 'Booking Summary',
      selectedSeats: 'Selected Seats',
      passengers: 'Passengers',
      total: 'Total Amount',
      seatsVarying: 'seat(s) × varying prices',
    },

    // Status
    status: {
      pending: 'Pending',
      confirmed: 'Confirmed',
      cancelled: 'Cancelled',
    },

    // Auth
    auth: {
      welcomeBack: 'Welcome Back',
      signInAccount: 'Sign in to your account',
      signIn: 'Sign In',
      noAccount: "Don't have an account?",
      createAccount: 'Create Account',
      joinToday: 'Join Egypt Railways today',
      haveAccount: 'Already have an account?',
      demoCredentials: 'Demo credentials:',
      password: 'Password',
      confirmPassword: 'Confirm Password',
    },

    // Footer
    footer: {
      description: 'Your trusted partner for train travel. Book tickets, choose seats, and travel comfortably across Egypt with our easy-to-use ticketing system.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      faq: 'FAQ',
      copyright: 'Egyptian National Railways Authority. All rights reserved.',
    },

    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      pleaseLogin: 'Please Login',
      needLogin: 'You need to be logged in to view your tickets.',
      notFound: 'Not Found',
      goHome: 'Go to Home',
      startNewSearch: 'Start New Search',
      noTrainSelected: 'No Train Selected',
      selectTrainFirst: 'Please select a train from the search results.',
      missingInfo: 'Missing Booking Information',
      completeSteps: 'Please complete all previous steps first.',
      bookingNotFound: 'Booking Not Found',
      couldNotFind: "We couldn't find your booking information.",
    },

    // Validation
    validation: {
      required: 'is required',
      invalidEmail: 'Invalid email format',
      invalidPhone: 'Invalid Egyptian phone number (11 digits starting with 01)',
      invalidAge: 'Age must be between 1 and 120',
      invalidCard: 'Invalid card number',
      invalidExpiry: 'Invalid or expired date (MM/YY)',
      invalidCVV: 'Invalid CVV',
      passwordMin: 'Password must be at least 6 characters',
      passwordMatch: 'Passwords do not match',
    },
  },

  ar: {
    // App
    appName: 'سكك حديد مصر',
    appTagline: 'الهيئة القومية لسكك حديد مصر - تربط مصر منذ 1854',

    // Navigation
    nav: {
      home: 'الرئيسية',
      myTickets: 'تذاكري',
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      signUp: 'إنشاء حساب',
    },

    // Home Page
    home: {
      heroTitle: 'احجز رحلتك بالقطار',
      heroSubtitle: 'سافر براحة عبر مصر. ابحث عن القطارات، اختر مقعدك، واحجز تذكرتك في دقائق.',
      whyChoose: 'لماذا تختار سكك حديد مصر؟',
      features: {
        network: 'شبكة واسعة',
        networkDesc: 'اتصل بجميع المدن الرئيسية عبر شبكة السكك الحديدية الممتدة في مصر.',
        updates: 'تحديثات فورية',
        updatesDesc: 'احصل على تحديثات فورية عن مواعيد القطارات والتأخيرات وتغييرات الرصيف.',
        secure: 'حجز آمن',
        secureDesc: 'معلومات الدفع والبيانات الشخصية محمية دائماً.',
        payment: 'دفع سهل',
        paymentDesc: 'خيارات دفع متعددة مع تأكيد فوري.',
      },
      popularRoutes: 'الخطوط الأكثر شعبية',
      popularRoutesDesc: 'اكتشف أكثر الخطوط استخداماً مع رحلات متكررة وأسعار تنافسية.',
      startingFrom: 'ابتداءً من',
      readyTitle: 'جاهز لبدء رحلتك؟',
      readyDesc: 'انضم إلى آلاف المسافرين الذين يثقون بسكك حديد مصر لحجز تذاكرهم.',
      bookNow: 'احجز الآن',
    },

    // Search
    search: {
      title: 'البحث عن القطارات',
      from: 'من',
      to: 'إلى',
      date: 'تاريخ السفر',
      passengers: 'المسافرين',
      passenger: 'مسافر',
      searchBtn: 'البحث عن القطارات',
      selectOrigin: 'اختر محطة المغادرة',
      selectDestination: 'اختر محطة الوصول',
      results: 'قطار(ات) متاحة',
      noResults: 'لا توجد قطارات لهذا المسار. جرب مساراً أو تاريخاً مختلفاً.',
      searchForTrains: 'ابحث عن القطارات',
      enterOriginDest: 'أدخل محطة المغادرة والوصول للبحث عن القطارات المتاحة.',
      modifySearch: 'تعديل البحث',
      quickSearch: 'بحث سريع',
      pricesPerPerson: 'الأسعار المعروضة للشخص الواحد',
      backToSearch: 'العودة للبحث',
    },

    // Train
    train: {
      trainNumber: 'قطار',
      duration: 'المدة',
      select: 'اختيار',
      from: 'من',
      highSpeed: 'فائق السرعة',
      express: 'سريع',
      regional: 'محلي',
    },

    // Seat Selection
    seats: {
      title: 'اختر مقاعدك',
      chooseSeat: 'اختر',
      seat: 'مقعد',
      seats: 'مقاعد',
      forJourney: 'لرحلتك',
      available: 'متاح',
      selected: 'محدد',
      unavailable: 'غير متاح',
      window: 'نافذة',
      coach: 'عربة',
      seatLabel: 'مقعد',
      perSeat: 'للمقعد',
      seatsAvailable: 'مقعد متاح',
      selectedSeats: 'المقاعد المحددة',
      selectMore: 'يرجى اختيار',
      moreSeat: 'مقعد آخر',
      moreSeats: 'مقاعد أخرى',
      continueBooking: 'متابعة الحجز',
      backToResults: 'العودة لنتائج البحث',
      frontOfTrain: 'مقدمة القطار',
      backOfTrain: 'مؤخرة القطار',
    },

    // Classes
    class: {
      first: 'الدرجة الأولى',
      business: 'رجال الأعمال',
      economy: 'الدرجة العادية',
    },

    // Booking
    booking: {
      title: 'بيانات المسافرين',
      enterDetails: 'أدخل بيانات جميع',
      passengers: 'المسافرين',
      alreadyAccount: 'لديك حساب بالفعل؟',
      loginToAutofill: 'سجل الدخول لملء بياناتك تلقائياً والوصول لحجوزاتك لاحقاً.',
      continuePayment: 'متابعة للدفع',
      backToSeats: 'العودة لاختيار المقاعد',
      addPassenger: 'إضافة مسافر',
    },

    // Passenger Form
    passenger: {
      title: 'المسافر',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      age: 'العمر',
    },

    // Payment
    payment: {
      title: 'الدفع',
      subtitle: 'أكمل حجزك بإدخال بيانات الدفع',
      cardNumber: 'رقم البطاقة',
      cardHolder: 'اسم حامل البطاقة',
      expiryDate: 'تاريخ الانتهاء',
      cvv: 'رمز CVV',
      secureNotice: 'معلومات الدفع آمنة (دفع تجريبي - لا توجد رسوم حقيقية)',
      pay: 'ادفع',
      testCard: 'بطاقة تجريبية: 4111 1111 1111 1111 | Exp: 12/25 | CVV: 123',
      backToPassengers: 'العودة لبيانات المسافرين',
    },

    // Confirmation
    confirmation: {
      title: 'تم تأكيد الحجز!',
      subtitle: 'تم حجز تذكرتك بنجاح.',
      pnr: 'رقم الحجز',
      travelDate: 'تاريخ السفر',
      totalPaid: 'المبلغ المدفوع',
      bookingId: 'رقم الحجز',
      bookedOn: 'تم الحجز في',
      downloadTicket: 'تحميل التذكرة',
      backToHome: 'العودة للرئيسية',
      qrCode: 'رمز QR',
    },

    // My Tickets
    myTickets: {
      title: 'تذاكري',
      subtitle: 'إدارة حجوزات القطارات',
      bookNew: 'حجز تذكرة جديدة',
      noBookings: 'لا توجد حجوزات',
      noBookingsDesc: 'لم تقم بأي حجوزات بعد. ابدأ بالبحث عن القطارات!',
      searchTrains: 'البحث عن القطارات',
      activeBookings: 'الحجوزات النشطة',
      cancelledBookings: 'الحجوزات الملغاة',
      cancel: 'إلغاء',
      cancelBooking: 'إلغاء الحجز',
      cancelConfirm: 'هل أنت متأكد من إلغاء هذا الحجز؟ لا يمكن التراجع عن هذا الإجراء.',
      keepBooking: 'الاحتفاظ بالحجز',
    },

    // Booking Summary
    summary: {
      title: 'ملخص الحجز',
      selectedSeats: 'المقاعد المحددة',
      passengers: 'المسافرون',
      total: 'المبلغ الإجمالي',
      seatsVarying: 'مقعد(مقاعد) × أسعار متفاوتة',
    },

    // Status
    status: {
      pending: 'قيد الانتظار',
      confirmed: 'مؤكد',
      cancelled: 'ملغى',
    },

    // Auth
    auth: {
      welcomeBack: 'مرحباً بعودتك',
      signInAccount: 'سجل الدخول إلى حسابك',
      signIn: 'تسجيل الدخول',
      noAccount: 'ليس لديك حساب؟',
      createAccount: 'إنشاء حساب',
      joinToday: 'انضم إلى سكك حديد مصر اليوم',
      haveAccount: 'لديك حساب بالفعل؟',
      demoCredentials: 'بيانات تجريبية:',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
    },

    // Footer
    footer: {
      description: 'شريكك الموثوق للسفر بالقطار. احجز التذاكر واختر المقاعد وسافر براحة عبر مصر من خلال نظام الحجز السهل.',
      quickLinks: 'روابط سريعة',
      contact: 'تواصل معنا',
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
      faq: 'الأسئلة الشائعة',
      copyright: 'الهيئة القومية لسكك حديد مصر. جميع الحقوق محفوظة.',
    },

    // Common
    common: {
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجاح',
      pleaseLogin: 'يرجى تسجيل الدخول',
      needLogin: 'يجب تسجيل الدخول لعرض تذاكرك.',
      notFound: 'غير موجود',
      goHome: 'العودة للرئيسية',
      startNewSearch: 'بدء بحث جديد',
      noTrainSelected: 'لم يتم اختيار قطار',
      selectTrainFirst: 'يرجى اختيار قطار من نتائج البحث.',
      missingInfo: 'معلومات الحجز ناقصة',
      completeSteps: 'يرجى إكمال جميع الخطوات السابقة أولاً.',
      bookingNotFound: 'الحجز غير موجود',
      couldNotFind: 'لم نتمكن من العثور على معلومات حجزك.',
    },

    // Validation
    validation: {
      required: 'مطلوب',
      invalidEmail: 'صيغة البريد الإلكتروني غير صحيحة',
      invalidPhone: 'رقم هاتف مصري غير صحيح (11 رقم يبدأ بـ 01)',
      invalidAge: 'العمر يجب أن يكون بين 1 و 120',
      invalidCard: 'رقم البطاقة غير صحيح',
      invalidExpiry: 'تاريخ غير صحيح أو منتهي (MM/YY)',
      invalidCVV: 'رمز CVV غير صحيح',
      passwordMin: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
      passwordMatch: 'كلمات المرور غير متطابقة',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
