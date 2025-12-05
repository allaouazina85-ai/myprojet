// =============================================================
//               النظام الكامل - تصميم Google
// =============================================================



// =============================================================
//               النظام الرئيسي - الإصدار النهائي
// =============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 النظام الكامل يعمل - تصميم Google');

    // -------------------------------------------------------------
    // 1. إنشاء واجهة البحث الجديدة
    // -------------------------------------------------------------
    const searchInterface = document.createElement('div');
    searchInterface.id = 'searchInterface';
    searchInterface.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 10000;
        display: none;
        overflow: hidden;
    `;

    searchInterface.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px; height: 100%; display: flex; flex-direction: column;">
            <!-- شريط البحث -->
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <button id="closeSearchInterface" style="
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                    padding: 5px;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background 0.2s;
                " onmouseover="this.style.background='#f1f3f4'" onmouseout="this.style.background='transparent'">←</button>
                
                <div style="flex: 1; position: relative;">
                    <input 
                        type="text" 
                        id="googleStyleSearch"
                        placeholder="ابحث ..."
                        style="
                            width: 100%;
                            padding: 15px 50px 15px 20px;
                            border: 2px solid #dfe1e5;
                            border-radius: 24px;
                            font-size: 16px;
                            font-family: 'Amiri', serif;
                            outline: none;
                            transition: all 0.3s ease;
                            direction: rtl;
                        "
                    >
                    <div style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); color: #9aa0a6; font-size: 18px;">
                        🔍
                    </div>
                </div>
            </div>

            <!-- منطقة النتائج -->
            <div id="searchResultsArea" style="
                flex: 1;
                overflow-y: auto;
                background: white;
            "></div>
        </div>
    `;

    document.body.appendChild(searchInterface);

    // -------------------------------------------------------------
    // 2. عناصر النظام
    // -------------------------------------------------------------
    const googleStyleSearch = document.getElementById('googleStyleSearch');
    const searchResultsArea = document.getElementById('searchResultsArea');
    const closeSearchInterface = document.getElementById('closeSearchInterface');
    const originalSearchBtn = document.getElementById('searchLauncher');

    // -------------------------------------------------------------
    // 3. نظام واجهة البحث
    // -------------------------------------------------------------
    function showSearchInterface() {
        searchInterface.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            if (googleStyleSearch) {
                googleStyleSearch.focus();
                googleStyleSearch.value = '';
            }
        }, 100);
    }

    function hideSearchInterface() {
        searchInterface.style.display = 'none';
        document.body.style.overflow = 'auto';
        if (googleStyleSearch) googleStyleSearch.value = '';
        searchResultsArea.innerHTML = '';
    }

    // -------------------------------------------------------------
    // 4. إصلاح زر البحث الأصلي
    // -------------------------------------------------------------
    if (originalSearchBtn) {
        originalSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('✅ تم النقر على زر البحث');
            showSearchInterface();
        });
    }

    // زر الإغلاق
    if (closeSearchInterface) {
        closeSearchInterface.addEventListener('click', function(e) {
            e.stopPropagation();
            hideSearchInterface();
        });
    }

    // إغلاق بالزر ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') hideSearchInterface();
    });

    // -------------------------------------------------------------
    // 5. نظام البحث
    // -------------------------------------------------------------
    let searchTimeout;

    if (googleStyleSearch) {
        googleStyleSearch.addEventListener('input', function(e) {
            this.style.borderColor = this.value ? '#1a73e8' : '#dfe1e5';
            
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = this.value.trim();
                if (searchTerm.length >= 2) {
                    performGoogleStyleSearch(searchTerm);
                } else {
                    searchResultsArea.innerHTML = '';
                }
            }, 300);
        });

        googleStyleSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm.length >= 1) {
                    performGoogleStyleSearch(searchTerm);
                }
            }
        });
    }

  function performGoogleStyleSearch(searchTerm) {
    console.log('🔍 البحث عن:', searchTerm);

    const results = searchPages(searchTerm);
        
        console.log('📊 النتائج:', results.length, 'صفحة');
        showGoogleStyleResults(searchTerm, results);
    }

    function showGoogleStyleResults(searchTerm, results) {
        if (results.length === 0) {
            searchResultsArea.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: #70757a;">
                    <div style="font-size: 64px; margin-bottom: 20px;">🔍</div>
                    <div style="font-size: 18px; margin-bottom: 10px;">لم نعثر على أي نتائج لـ</div>
                    <div style="font-size: 20px; font-weight: bold; color: #3c4043; margin-bottom: 30px;">"${searchTerm}"</div>
                    <div style="font-size: 14px; color: #9aa0a6;">
                        حاول استخدام كلمات أخرى مثل: مسابقة، توظيف، محضر، قرار
                    </div>
                </div>
            `;
        } else {
            let htmlContent = `
                <div style="color: #70757a; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #dfe1e5; margin-bottom: 10px;">
                    تم العثور على ${results.length} نتيجة
                </div>
            `;
            
            results.forEach((page, index) => {
                const mainKeyword = page.keywords[0];
                const urlParts = page.url.split('/');
                const displayUrl = urlParts.slice(-2).join(' › ');
                
                htmlContent += `
                    <div class="search-result-item" 
                         onclick="window.location.href='${page.url}'; hideSearchInterface();"
                         style="
                            padding: 20px 0;
                            border-bottom: 1px solid #f8f9fa;
                            cursor: pointer;
                            transition: background 0.2s ease;
                         "
                         onmouseover="this.style.background='#f8f9fa'"
                         onmouseout="this.style.background='white'">
                        
                        <div style="
                            color: #1a0dab;
                            font-size: 18px;
                            font-weight: normal;
                            margin-bottom: 6px;
                            line-height: 1.3;
                            font-family: 'Amiri', serif;
                        ">${mainKeyword}</div>
                        
                        <div style="
                            color: #006621;
                            font-size: 14px;
                            margin-bottom: 8px;
                            direction: ltr;
                            text-align: right;
                        ">${page.url}</div>
                        
                        <div style="
                            color: #3c4043;
                            font-size: 14px;
                            line-height: 1.5;
                        ">
                            ${page.keywords.slice(0, 4).map(keyword => 
                                `<span style="color: #5f6368; background: #f1f3f4; padding: 2px 6px; border-radius: 4px; margin-left: 5px; display: inline-block; margin-bottom: 5px;">${keyword}</span>`
                            ).join('')}
                        </div>
                    </div>
                `;
            });
            
            searchResultsArea.innerHTML = htmlContent;
        }
    }

    // -------------------------------------------------------------
    // 6. النوافذ المنبثقة الأخرى
    // -------------------------------------------------------------
    
    // زر حول التطبيق
    const aboutBtn = document.getElementById('openAboutModal');
    const aboutModal = document.getElementById('aboutModal');
    if (aboutBtn && aboutModal) {
        aboutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            aboutModal.style.display = 'block';
        });

        const aboutClose = document.querySelector('.about-close-btn');
        if (aboutClose) {
            aboutClose.addEventListener('click', function() {
                aboutModal.style.display = 'none';
            });
        }

        aboutModal.addEventListener('click', function(e) {
            if (e.target === aboutModal) {
                aboutModal.style.display = 'none';
            }
        });
    }

    // زر التواصل
    const contactBtn = document.getElementById('contactLauncher');
    const contactActions = document.getElementById('contactActions');
    if (contactBtn && contactActions) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            contactActions.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (contactActions.classList.contains('active') && 
                !contactBtn.contains(e.target) && 
                !contactActions.contains(e.target)) {
                contactActions.classList.remove('active');
            }
        });
    }

    // أزرار التواصل الفرعية
    const emailBtn = document.getElementById('openEmailModal');
    const facebookBtn = document.getElementById('openFacebookModal');
    const phoneBtn = document.getElementById('openPhoneModal');
    
    const emailModal = document.getElementById('emailModal');
    const facebookModal = document.getElementById('facebookModal');
    const phoneModal = document.getElementById('phoneModal');

    // البريد
    if (emailBtn && emailModal) {
        emailBtn.addEventListener('click', function() {
            emailModal.style.display = 'block';
            if (contactActions) contactActions.classList.remove('active');
        });
        const emailClose = document.querySelector('.email-close-btn');
        if (emailClose) emailClose.onclick = () => emailModal.style.display = 'none';
    }

    // فيسبوك
    if (facebookBtn && facebookModal) {
        facebookBtn.addEventListener('click', function() {
            facebookModal.style.display = 'block';
            if (contactActions) contactActions.classList.remove('active');
        });
        const facebookClose = document.querySelector('.facebook-close-btn');
        if (facebookClose) facebookClose.onclick = () => facebookModal.style.display = 'none';
    }

    // هاتف
    if (phoneBtn && phoneModal) {
        phoneBtn.addEventListener('click', function() {
            phoneModal.style.display = 'block';
            if (contactActions) contactActions.classList.remove('active');
        });
        const phoneClose = document.querySelector('.phone-close-btn');
        if (phoneClose) phoneClose.onclick = () => phoneModal.style.display = 'none';
    }

    // إغلاق النوافذ بالنقر خارجها
    window.addEventListener('click', function(event) {
        if (aboutModal && event.target === aboutModal) aboutModal.style.display = 'none';
        if (emailModal && event.target === emailModal) emailModal.style.display = 'none';
        if (facebookModal && event.target === facebookModal) facebookModal.style.display = 'none';
        if (phoneModal && event.target === phoneModal) phoneModal.style.display = 'none';
    });

    // -------------------------------------------------------------
    // 7. إضافة CSS
    // -------------------------------------------------------------
    const style = document.createElement('style');
    style.textContent = `
        #googleStyleSearch:focus {
            box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
            border-color: #1a73e8 !important;
        }
        
        .search-result-item:hover {
            background: #f8f9fa !important;
        }
        
        #searchResultsArea::-webkit-scrollbar {
            width: 8px;
        }
        
        #searchResultsArea::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        
        #searchResultsArea::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 4px;
        }
        
        #searchResultsArea::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
        }
    `;
    document.head.appendChild(style);

    console.log('🎉 النظام الكامل جاهز! جميع الأزرار تعمل');
});
