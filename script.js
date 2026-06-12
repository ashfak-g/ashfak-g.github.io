// ----------------------------------------------------
// Ashfak.dev Portfolio Core JS - Dynamic Renderer
// Handles dynamic rendering, translation, and UI tabs
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {

    if (typeof PORTFOLIO_DATA === 'undefined') {
        console.error('PORTFOLIO_DATA is not defined. Please check data.js.');
        return;
    }

    const data = PORTFOLIO_DATA;

    // Safe LocalStorage Wrapper to prevent SecurityError in restricted environments
    function getSafeStorage(key, fallback) {
        try {
            return localStorage.getItem(key) || fallback;
        } catch (e) {
            return fallback;
        }
    }

    function setSafeStorage(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            // ignore
        }
    }

    // ==========================================
    // ০. TYPEWRITER ANIMATION ENGINE (Defined at top to avoid TDZ ReferenceErrors)
    // ==========================================
    const nameTextEn = "Ashfakur Rahman";
    const nameTextBn = "আশফাকুর রহমান";

    const rolesEn = [
        "Data Analyst", 
        // "BI Analyst", 
        // "Data Scientist", 
        // "ML Engineer", 
        // "Product Analyst", 
        // "Data Engineer"
    ];
    const rolesBn = [
        "ডেটা অ্যানালিস্ট", 
        // "বিআই অ্যানালিস্ট", 
        // "ডেটা সায়েন্টিস্ট", 
        // "মেশিন লার্নিং ইঞ্জিনিয়ার", 
        // "প্রোডাক্ট অ্যানালিস্ট", 
        // "ডেটা ইঞ্জিনিয়ার"
    ];

    const nameElement = document.getElementById('typewriterName');
    const roleElement = document.getElementById('typewriterRole');

    let currentRoleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let nameTimeout = null;
    let roleTimeout = null;

    function resetAndStartTypewriter() {
        if (nameTimeout) clearTimeout(nameTimeout);
        if (roleTimeout) clearTimeout(roleTimeout);

        currentRoleIdx = 0;
        charIdx = 0;
        isDeleting = false;

        if (nameElement) nameElement.textContent = "";
        if (roleElement) roleElement.textContent = "";

        typeName();
    }

    function typeName() {
        const lang = getSafeStorage('portfolio_lang', 'en');
        const targetName = lang === 'bn' ? nameTextBn : nameTextEn;
        let nameCharIdx = 0;

        if (nameElement) nameElement.textContent = "";

        function typeChar() {
            if (nameCharIdx < targetName.length) {
                if (nameElement) nameElement.textContent += targetName.charAt(nameCharIdx);
                nameCharIdx++;
                nameTimeout = setTimeout(typeChar, 80);
            } else {
                roleTimeout = setTimeout(typeRole, 600);
            }
        }
        typeChar();
    }

    function typeRole() {
        const lang = getSafeStorage('portfolio_lang', 'en');
        const roles = lang === 'bn' ? rolesBn : rolesEn;
        const currentRole = roles[currentRoleIdx];

        if (!currentRole) return;

        if (isDeleting) {
            if (roleElement) roleElement.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50;
        } else {
            if (roleElement) roleElement.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIdx === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            currentRoleIdx = (currentRoleIdx + 1) % roles.length;
            typingSpeed = 500;
        }

        roleTimeout = setTimeout(typeRole, typingSpeed);
    }

    window.resetAndStartTypewriter = resetAndStartTypewriter;

    // ==========================================
    // ১. DYNAMIC CONTENT RENDERING & BINDING
    // ==========================================

    // Personal Info / Profile details
    const logoNameEl = document.getElementById('logoName');
    if (logoNameEl) logoNameEl.textContent = data.profile.shortName || data.profile.name.split(' ')[0];
    
    const heroNameEl = document.getElementById('heroName');
    if (heroNameEl) heroNameEl.textContent = data.profile.name;
    
    const footerNameEl = document.getElementById('footerName');
    if (footerNameEl) footerNameEl.textContent = data.profile.name;

    // Set profile photo
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.setAttribute('src', data.profile.profileImg);
    }

    // Contact Details
    const infoEmailEl = document.getElementById('infoEmail');
    if (infoEmailEl) infoEmailEl.textContent = data.profile.email;
    
    const infoLocationEl = document.getElementById('infoLocation');
    if (infoLocationEl) infoLocationEl.textContent = data.profile.location;
    
    const contactEmailEl = document.getElementById('contactEmail');
    if (contactEmailEl) contactEmailEl.textContent = data.profile.email;
    
    const contactLocationEl = document.getElementById('contactLocation');
    if (contactLocationEl) contactLocationEl.textContent = data.profile.location;

    // Resume Download links
    const resumeBtnHero = document.getElementById('heroResumeBtn');
    const resumeBtnDown = document.getElementById('resumeDownloadBtn');
    if (resumeBtnHero) resumeBtnHero.setAttribute('href', data.profile.resumeLink);
    if (resumeBtnDown) resumeBtnDown.setAttribute('href', data.profile.resumeLink);

    // Social Links
    const githubLink = document.getElementById('githubProfileLink');
    if (githubLink) githubLink.setAttribute('href', data.profile.github);
    
    const footerGithub = document.getElementById('footerGithub');
    const footerLinkedin = document.getElementById('footerLinkedin');
    const footerKaggle = document.getElementById('footerKaggle');
    if (footerGithub) footerGithub.setAttribute('href', data.profile.github);
    if (footerLinkedin) footerLinkedin.setAttribute('href', data.profile.linkedin);
    if (footerKaggle) footerKaggle.setAttribute('href', data.profile.kaggle);

    // Render Stats values
    const statCompletedEl = document.getElementById('statCompleted');
    if (statCompletedEl) statCompletedEl.textContent = data.stats.completedProjects;
    
    const statProjectsEl = document.getElementById('statProjects');
    if (statProjectsEl) statProjectsEl.textContent = data.stats.dashboardsCreated;
    
    const statExperienceEl = document.getElementById('statExperience');
    if (statExperienceEl) statExperienceEl.textContent = data.stats.experienceYears;

    // Render Technical Skills - Split 4 on Left, 4 on Right in Flex columns
    const skillsLeft = document.getElementById('skillsLeft');
    const skillsRight = document.getElementById('skillsRight');
    if (skillsLeft && skillsRight && data.skills) {
        const half = Math.ceil(data.skills.length / 2);
        const firstHalf = data.skills.slice(0, half);
        const secondHalf = data.skills.slice(half);

        const renderSkillHtml = (skill) => `
            <div class="skill-bar-container">
                <div class="skill-bar-info">
                    <span class="skill-bar-name">${skill.name}</span>
                    <span class="skill-bar-percent">${skill.rating}%</span>
                </div>
                <div class="skill-bar-bg">
                    <div class="skill-bar-fill" style="width: 0%;" data-target="${skill.rating}%"></div>
                </div>
            </div>
        `;

        skillsLeft.innerHTML = firstHalf.map(renderSkillHtml).join('');
        skillsRight.innerHTML = secondHalf.map(renderSkillHtml).join('');
    }


    // ==========================================
    // ২. LANGUAGE TRANSLATION SYSTEM (Bilingual)
    // ==========================================

    function switchLanguage(lang) {
        setSafeStorage('portfolio_lang', lang);

        // 1. Update static elements with data-en/data-bn attributes
        const translatables = document.querySelectorAll('[data-en][data-bn]');
        translatables.forEach(el => {
            el.innerHTML = lang === 'bn' ? el.getAttribute('data-bn') : el.getAttribute('data-en');
        });

        // Update button text
        const langBtn = document.getElementById('langToggleBtn');
        if (langBtn) {
            langBtn.textContent = lang === 'bn' ? '🌐 বাংলা' : '🌐 EN';
        }

        // 2. Update dynamic profile texts
        const heroBioEl = document.getElementById('heroBio');
        if (heroBioEl) heroBioEl.textContent = lang === 'bn' ? (data.profile.bio_bn || data.profile.bio) : data.profile.bio;
        
        const aboutBioEl = document.getElementById('aboutBio');
        if (aboutBioEl) aboutBioEl.textContent = lang === 'bn' ? (data.profile.aboutBio_bn || data.profile.aboutBio || data.profile.bio) : (data.profile.aboutBio || data.profile.bio);
        
        const infoDegreeEl = document.getElementById('infoDegree');
        if (infoDegreeEl) infoDegreeEl.textContent = lang === 'bn' ? (data.profile.degree_bn || data.profile.degree) : data.profile.degree;

        // 3. Render dynamic Work Experience timeline
        const experienceTimeline = document.getElementById('experienceTimeline');
        if (experienceTimeline) {
            experienceTimeline.innerHTML = data.experience.map(exp => {
                const roleText = lang === 'bn' ? (exp.role_bn || exp.role) : exp.role;
                const orgText = lang === 'bn' ? (exp.org_bn || exp.org) : exp.org;
                const bullets = lang === 'bn' ? (exp.bulletPoints_bn || exp.bulletPoints || []) : (exp.bulletPoints || []);
                const bulletHTML = Array.isArray(bullets) ? bullets.map(bp => `<li>${bp}</li>`).join('') : '';
                return `
                    <div class="timeline-card">
                        <div class="timeline-card-date">${exp.date}</div>
                        <h4>${roleText}</h4>
                        <div class="timeline-card-org">${orgText}</div>
                        <ul class="timeline-card-points">
                            ${bulletHTML}
                        </ul>
                    </div>
                `;
            }).join('');
        }

        // 4. Render dynamic Education timeline
        const educationTimeline = document.getElementById('educationTimeline');
        if (educationTimeline) {
            educationTimeline.innerHTML = data.education.map(edu => {
                const degreeText = lang === 'bn' ? (edu.degree_bn || edu.degree) : edu.degree;
                const orgText = lang === 'bn' ? (edu.org_bn || edu.org) : edu.org;
                const descText = lang === 'bn' ? (edu.desc_bn || edu.desc) : edu.desc;
                return `
                    <div class="timeline-card">
                        <div class="timeline-card-date">${edu.date}</div>
                        <h4>${degreeText}</h4>
                        <div class="timeline-card-org">${orgText}</div>
                        <p>${descText}</p>
                    </div>
                `;
            }).join('');
        }

        // 5. Render Quick Timeline Career Snapshot
        const snapshotTimeline = document.getElementById('snapshotTimeline');
        if (snapshotTimeline && data.experience && data.education) {
            const snapshotItems = [];
            data.experience.slice(0, 2).forEach(exp => {
                const orgStr = lang === 'bn' ? (exp.org_bn || exp.org || '') : (exp.org || '');
                snapshotItems.push({
                    date: exp.date,
                    title: lang === 'bn' ? (exp.role_bn || exp.role) : exp.role,
                    subtitle: orgStr.includes('|') ? orgStr.split('|')[0].trim() : orgStr.trim()
                });
            });
            if (data.education.length > 0) {
                const edu = data.education[0];
                snapshotItems.push({
                    date: edu.date,
                    title: lang === 'bn' ? (edu.degree_bn || edu.degree) : edu.degree,
                    subtitle: lang === 'bn' ? (edu.org_bn || edu.org) : edu.org
                });
            }
            snapshotTimeline.innerHTML = snapshotItems.map(item => `
                <div class="snapshot-item">
                    <div class="snapshot-dot"></div>
                    <div class="snapshot-content">
                        <span class="snapshot-date">${item.date}</span>
                        <h5>${item.title}</h5>
                        <p>${item.subtitle}</p>
                    </div>
                </div>
            `).join('');
        }

        // 6. Render Projects Grid
        const projectsGrid = document.getElementById('projectsGrid');
        if (projectsGrid) {
            projectsGrid.innerHTML = data.projects.map(proj => {
                if (!proj) return ''; // Skip commented out projects
                let tagIcon = 'fa-brain';
                let tagLabel = lang === 'bn' ? 'মেশিন লার্নিং' : 'Machine Learning';
                if (proj.category === 'analytics') {
                    tagIcon = 'fa-chart-line';
                    tagLabel = lang === 'bn' ? 'ডাটা অ্যানালিটিক্স' : 'Data Analytics';
                } else if (proj.category === 'dashboard') {
                    tagIcon = 'fa-gauge';
                    tagLabel = lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard';
                } else if (proj.category === 'shopify') {
                    tagIcon = 'fa-cart-shopping';
                    tagLabel = lang === 'bn' ? 'শপিফাই স্টোর' : 'Shopify Store';
                }

                const titleText = lang === 'bn' ? (proj.title_bn || proj.title || '') : (proj.title || '');
                const descText = lang === 'bn' ? (proj.desc_bn || proj.desc || '') : (proj.desc || '');
                const tagsHTML = Array.isArray(proj.tags) ? proj.tags.map(t => `<span>${t}</span>`).join('') : '';
                const headerBgStyle = proj.projectImg 
                    ? `style="background: url('${proj.projectImg}') no-repeat center center; background-size: cover;"` 
                    : '';
                
                return `
                    <div class="project-card" data-category="${proj.category}">
                        <div class="project-header-img" ${headerBgStyle}>
                            <div class="project-tag"><i class="fa-solid ${tagIcon}"></i> ${tagLabel}</div>
                        </div>
                        <div class="project-body">
                            <h3 class="project-card-title">${titleText}</h3>
                            <p class="project-desc">${descText}</p>
                            <div class="project-tags">
                                ${tagsHTML}
                            </div>
                            <div class="project-links">
                                <a href="${proj.codeLink}" target="_blank" class="proj-link"><i class="fa-brands fa-github"></i> ${lang === 'bn' ? 'সোর্স কোড' : 'Source Code'}</a>
                                ${proj.demoLink && proj.demoLink !== '#' ? `<a href="${proj.demoLink}" target="_blank" class="proj-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${lang === 'bn' ? 'লাইভ ডেমো' : 'Live Demo'}</a>` : ''}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Restart typewriter animation on language switch
        if (typeof resetAndStartTypewriter === 'function') {
            resetAndStartTypewriter();
        }
    }

    // Set up Language toggle click
    const langToggleBtn = document.getElementById('langToggleBtn');
    if (langToggleBtn) {
        let currentLang = getSafeStorage('portfolio_lang', 'en');
        switchLanguage(currentLang);

        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'bn' : 'en';
            switchLanguage(currentLang);
        });
    } else {
        switchLanguage('en');
    }


    // ==========================================
    // ৩. UI ACTION HANDLERS (Navbar, Mobile Menu)
    // ==========================================

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // Navbar scroll background change
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Scroll Spy: Active Link update
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // ==========================================
    // ৪. TABS & DROPDOWN ENGINE (Playground Toggle)
    // ==========================================

    // Handles tab switching in Interactive Tools Zone
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPane = document.getElementById(btn.getAttribute('data-tab'));
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // Handles clicking navigation links in the Tools Dropdown
    const dropdownLinks = document.querySelectorAll('.dropdown-menu-list a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetTab = link.getAttribute('data-tab');
            const tabBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
            if (tabBtn) {
                // Trigger tab click to switch panels
                tabBtn.click();
            }

            // Scroll to the main interactive section
            const interactiveZone = document.getElementById('interactive-zone');
            if (interactiveZone) {
                e.preventDefault();
                interactiveZone.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // Handles tab switching in Hiring section
    const hiringTabButtons = document.querySelectorAll('.hiring-tab-btn');
    const hiringCards = document.querySelectorAll('.hiring-detail-card');

    hiringTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            hiringTabButtons.forEach(b => b.classList.remove('active'));
            hiringCards.forEach(c => {
                c.classList.remove('active');
                c.style.display = 'none';
            });

            btn.classList.add('active');
            const targetCard = document.getElementById('detail-' + btn.getAttribute('data-role'));
            if (targetCard) {
                targetCard.style.display = 'flex';
                setTimeout(() => {
                    targetCard.classList.add('active');
                }, 10);
            }
        });
    });


    // ==========================================
    // ৫. PROJECT GRID FILTERS
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            const projectCards = document.querySelectorAll('.project-card');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 200);
            });
        });
    });


    // ==========================================
    // ৬. CONTACT FORM SUBMISSION
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const action = contactForm.getAttribute('action');
            const isBn = getSafeStorage('portfolio_lang', 'en') === 'bn';

            if (!action || action.includes('your_formspree_id_here')) {
                // Mock behavior if Formspree is not set
                formStatus.textContent = isBn 
                    ? 'ডেমো মোড: অনুগ্রহ করে index.html-এ আপনার Formspree ID সেট করুন!' 
                    : 'Demo Mode: Please update your Formspree ID in index.html to receive real emails!';
                formStatus.className = 'form-status warning';
                setTimeout(() => {
                    formStatus.textContent = isBn 
                        ? 'বার্তা সফলভাবে পাঠানো হয়েছে (ডেমো মোড)।' 
                        : 'Message sent successfully (Demo Mode).';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                }, 1200);
                return;
            }

            formStatus.textContent = isBn ? 'বার্তা পাঠানো হচ্ছে...' : 'Sending message...';
            formStatus.className = 'form-status';

            const formData = new FormData(contactForm);
            fetch(action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    formStatus.textContent = isBn 
                        ? 'ধন্যবাদ! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে।' 
                        : 'Thank you! Your message has been sent successfully.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
                            formStatus.textContent = data.errors.map(error => error.message).join(', ');
                        } else {
                            formStatus.textContent = isBn 
                                ? 'দুঃখিত! বার্তা পাঠাতে সমস্যা হয়েছে।' 
                                : 'Oops! There was a problem submitting your form.';
                        }
                        formStatus.className = 'form-status error';
                    });
                }
            })
            .catch(error => {
                formStatus.textContent = isBn 
                    ? 'দুঃখিত! নেটওয়ার্ক ভুলের কারণে বার্তা পাঠানো যায়নি।' 
                    : 'Oops! There was a problem submitting your form due to network errors.';
                formStatus.className = 'form-status error';
            });
        });
    }


    // ==========================================
    // ৭. SCROLL REVEAL & PROGRESS BAR ANIMATIONS
    // ==========================================
    
    function animateSkillBars() {
        const fills = document.querySelectorAll('.skill-bar-fill');
        fills.forEach(fill => {
            const target = fill.getAttribute('data-target');
            fill.style.width = target;
        });
    }

    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.id === 'about') {
                    animateSkillBars();
                }
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
});
