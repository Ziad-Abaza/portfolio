// عند تحميل الصفحة
window.onload = () => {
    ///////////////////     Slide Show (عرض الشرائح)     ////////////////

    // تعريف متغير للتحكم في حركة السلايد
let backgroundStory = true;
let getBackgroundOption = localStorage.getItem("background-option");
let backgroundInterval;

// Check if the elements exist on the page before interacting with them
const backgroundOptionElements = document.querySelectorAll('.background-option span');
if (backgroundOptionElements.length > 0) {
    backgroundOptionElements.forEach(Element => {
        Element.classList.remove('active');
    });

    if (getBackgroundOption !== null) {
        if (getBackgroundOption === 'yes') {
            backgroundStory = true;
            const yesElement = document.querySelector('.background-option .yes');
            if (yesElement) {
                yesElement.classList.add('active');
            }
        } else {
            backgroundStory = false;
            const noElement = document.querySelector('.background-option .no');
            if (noElement) {
                noElement.classList.add('active');
            }
        }
    } else {
        backgroundStory = true;
    }
}


    // دالة لبدء حركة السلايد
    function slideShow() {
        if (backgroundStory) {
            var landingPage = document.querySelector('.landing-page');

            // مصفوفة تحتوي على صور العرض
            let gallery = ['0.svg', '1.svg', '2.svg', '3.svg'];

            // تحديث الصورة بشكل عشوائي كل ثانية
            backgroundInterval = setInterval(() => {
                let randomGallery = Math.floor(Math.random() * gallery.length);
                landingPage.style.backgroundImage = `url(./images/slide-show/${gallery[randomGallery]})`;
            }, 5000);
        }
    }

    // العناصر المتعلقة بخيارات الخلفية
    const backgroundOption = document.querySelectorAll('.background-option span');
    backgroundOption.forEach(span => {
        span.addEventListener("click", (e) => {
            // إزالة الكلاس 'active' من جميع العناصر الأخرى داخل نفس العنصر الأب
            e.target.parentElement.querySelectorAll('.active').forEach(Element => {
                Element.classList.remove('active');
            });

            // إضافة الكلاس 'active' إلى العنصر الحالي
            e.target.classList.add('active');

            // تعيين قيمة متغير backgroundStory بناءً على الخيار المُختار
            if (e.target.dataset.background === 'yes') {
                backgroundStory = true;
                slideShow();
            } else {
                backgroundStory = false;
                clearInterval(backgroundInterval); 
                slideShow();
            }
            //  وتعيين الخلفية المحفوظ في التخزين المحلي (localStorage)
            localStorage.setItem("background-option", e.target.dataset.background);
            
        });
    });
        

    ///////////////////     Slide Bar Settings (إعدادات شريط الإعدادات)     ////////////////

    // العناصر المتعلقة بشريط الإعدادات
    let stopSpin = document.querySelector('.container-gear .fa-gear');
    let openSetting = document.querySelector('.setting-box');

    // تفعيل/إلغاء تفعيل دوران العنصر وعرض شريط الإعدادات عند النقر
    if(stopSpin !== null){
    stopSpin.onclick = function () {
        this.classList.toggle('fa-spin');
        openSetting.classList.toggle('active');
    }}

    ///////////////////     Option Colors (خيارات الألوان)     ////////////////

    // العناصر المتعلقة بخيارات الألوان
    const setColor = document.querySelectorAll('.colors-list li');
    setColor.forEach(li => {
        li.addEventListener("click", (e) => {
            // تعيين اللون المحدد كمتغير في الجذر (الجذر الأساسي للصفحة)
            document.documentElement.style.setProperty('--color-4', e.target.dataset.color);
            localStorage.setItem("color-option", e.target.dataset.color);

            // إزالة الكلاس 'mainOPtion' من جميع العناصر الأخرى
            e.target.parentElement.querySelectorAll('.mainOPtion').forEach(Element => {
                Element.classList.remove('mainOPtion');
            });

            // إضافة الكلاس 'mainOPtion' إلى العنصر الحالي
            e.target.classList.add('mainOPtion');
        });
    });

    // استرجاع وتعيين اللون المحفوظ في التخزين المحلي (localStorage)
    let mainColor = localStorage.getItem("color-option");
    if (mainColor !== null) {
        document.documentElement.style.setProperty("--color-4", localStorage.getItem("color-option"));
    } else {
        document.documentElement.style.setProperty("--color-4", "#ff986f");
    }

    ///////////////////     Background color (لون الخلفية)     ////////////////

// العناصر المتعلقة بلون الخلفية
const setBackground = document.querySelectorAll('.backcolors-list li');
setBackground.forEach(li => {
    li.addEventListener("click", (e) => {
        // تعيين اللون المحدد كمتغير في الجذر (الجذر الأساسي للصفحة)
        document.documentElement.style.setProperty('--background-color-main', e.target.dataset.backcolor);
        localStorage.setItem("background-color", e.target.dataset.backcolor);

        // إزالة الكلاس 'setColor' من جميع العناصر الأخرى
        e.target.parentElement.querySelectorAll('.setColor').forEach(Element => {
            Element.classList.remove('setColor');
        });

        // إضافة الكلاس 'setColor' إلى العنصر الحالي
        e.target.classList.add('setColor');
    });
});

// استرجاع وتعيين لون الخلفية المحفوظ في التخزين المحلي (localStorage)
let backgroundColor = localStorage.getItem("background-color");
if (backgroundColor !== null) {
    document.documentElement.style.setProperty("--background-color-main", backgroundColor);
} else {
    document.documentElement.style.setProperty("--background-color-main", "#02617b");
}

/////////////////// Skills Selector ///////////////////

// الحصول على عناصر شريط العمل ومهارات المهارات
const skillProgressBars = document.querySelectorAll(".skill-progress span");

// دالة لتحريك شريط العمل
function animateProgressBar() {
    skillProgressBars.forEach(progressBar => {
        // الحصول على قيمة النسبة من السمة "data-progress"
        const progress = progressBar.getAttribute("data-progress");
        progressBar.style.width = progress; // تحديث عرض شريط العمل بناءً على القيمة المحددة
    });
}

// القيام بتنفيذ الدالة عندما يتم التمرير إلى قسم المهارات
window.addEventListener("scroll", function () {
    // الحصول على عنصر قسم المهارات
    const skillsSection = document.querySelector(".skills");
    
    // حساب موقع قسم المهارات بالنسبة لأعلى الصفحة
    const skillsSectionTop = skillsSection.offsetTop;
    
    // ارتفاع نافذة المستعرض
    const windowHeight = window.innerHeight;
    
    // موقع النص الحالي على الصفحة
    const scrollY = window.scrollY;

    // التحقق إذا كان تمرير الصفحة إلى منتصف قسم المهارات
    if (scrollY > skillsSectionTop - windowHeight / 2) {
        // تنفيذ دالة تحريك شريط العمل
        animateProgressBar();
    }
});

/////////////////// Gallery popup ///////////////////

// الحصول على جميع الصور في قسم المعرض
const galleryImages = document.querySelectorAll('.gallery-box img');

// تفعيل واجهة المستخدم للصور في قسم المعرض
galleryImages.forEach((img) => {
    img.onclick = function () {
        // إنشاء الطبقة الظليلة للعرض المنبثق
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';

        // إنشاء مربع العرض المنبثق
        const popupBox = document.createElement('div');
        popupBox.classList.add('popup-box');

        // إنشاء عنصر الصورة في مربع العرض المنبثق وتعيين مصدر الصورة إلى مصدر الصورة الأصلي
        const popupImg = document.createElement('img');
        popupImg.src = img.src;
        popupBox.appendChild(popupImg);

        // إضافة مربع العرض المنبثق إلى الصفحة
        document.body.appendChild(overlay);
        document.body.appendChild(popupBox);

        // إذا كانت هناك نصوص توضيحية للصورة، قم بإنشاء عنصر العنوان وإضافته إلى مربع العرض المنبثق
        if (img.alt !== null) {
            const imgHeading = document.createElement('h3'); // إنشاء عنصر العنوان (h3)
            const imgText = document.createTextNode(img.alt); // إنشاء نص العنوان بناءً على النص الموجود في خاصية alt للصورة
            imgHeading.appendChild(imgText); // إضافة نص العنوان إلى عنصر العنوان
            popupBox.appendChild(imgHeading); // إضافة عنصر العنوان إلى مربع العرض المنبثق
        }
                // إضافة زر "إغلاق" إلى مربع العرض المنبثق
        const closeButton = document.createElement('span');
        closeButton.className = 'popup-close';
        closeButton.innerHTML = '&times;'; // إضافة رمز "X" للزر
        popupBox.appendChild(closeButton);

        // تفعيل إغلاق العرض عند النقر على زر "إغلاق"
        closeButton.onclick = function () {
            document.body.removeChild(overlay);
            document.body.removeChild(popupBox);
        };


    };
});

///////////////////     Move Top Link     ///////////////////
// احصل على جميع الروابط في القائمة
const menuLinks = document.querySelectorAll('.menu a');

// أضف مستمع الحدث إلى كل رابط
menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); // تجنب الانتقال الافتراضي للصفحة

        // احصل على الهدف (القسم المستهدف) من خلال href
        const targetId = link.getAttribute("href").substring(1);

        // احصل على القسم المستهدف باستخدام الهدف
        const targetSection = document.getElementById(targetId);

        // قم بالتمرير إلى القسم المستهدف بسلاسة
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});





var showSidebarButton = document.querySelector('.Burger');
var sidebar = document.getElementById('sidebar');
if (showSidebarButton !==null){
showSidebarButton.addEventListener('click', function() {
    sidebar.classList.toggle('open');
});}

///////////////////  filter product  ///////////////////
// تحديد الأزرار والصور
const allBtn = document.getElementById("all");
const iotBtn = document.getElementById("iot");
const webBtn = document.getElementById("web");
const appBtn = document.getElementById("app");

const products = document.querySelectorAll(".products-box img");

// إضافة معالجات النقر للأزرار
if(allBtn !==null){
allBtn.addEventListener("click", () => filterProducts("all"));
iotBtn.addEventListener("click", () => filterProducts("iot"));
webBtn.addEventListener("click", () => filterProducts("web"));
appBtn.addEventListener("click", () => filterProducts("app"));}

// دالة لتصفية المنتجات
function filterProducts(category) {
    products.forEach(product => {
        const dataCategory = product.getAttribute("data-category");
        if (category === "all" || dataCategory === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}



/////////////////// اظهار العناص في صفحة project///////////////////

// إنشاء كائن لمعالجة معلمات الاستعلام في عنوان الصفحة
const urlParams = new URLSearchParams(window.location.search);

// استخراج قيمة المعلمة 'project' من عنوان الصفحة
const activateArmCar = urlParams.get('project');

// التحقق مما إذا كانت قيمة المعلمة موجودة ومختلفة عن null
if (activateArmCar !== null) {
    // التحقق مما إذا كانت قيمة المعلمة تساوي "true"
    if (activateArmCar === "arm_car") {
        // الحصول على العنصر الذي يحمل id "armCar"
        const setArmCar = document.getElementById("armCar");
        // التحقق مما إذا كان العنصر موجودًا
        if (setArmCar) {
            // إضافة الفئة 'active' إلى العنصر لتنشيطه
            setArmCar.classList.add('active');
        }
    }else if(activateArmCar === "line_car"){
        // الحصول على العنصر الذي يحمل id "lineCar"
        const setLineCar = document.getElementById("lineCar");
        // التحقق مما إذا كان العنصر موجودًا
        if (setLineCar) {
            // إضافة الفئة 'active' إلى العنصر لتنشيطه
            setLineCar.classList.add('active');
        }
    }else if(activateArmCar === "get_parking"){
        // الحصول على العنصر الذي يحمل id "set_Parking"
        const setParking = document.getElementById("set_parking");
        // التحقق مما إذا كان العنصر موجودًا
        if (setParking) {
            // إضافة الفئة 'active' إلى العنصر لتنشيطه
            setParking.classList.add('active');
        }
    }
}


/////////////////// تشغيل حركة السلايد عند تحميل الصفحة ///////////////////
if (backgroundOptionElements.length > 0) {
    slideShow();}
}