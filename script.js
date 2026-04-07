          // Preloader
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('preloader').classList.add('hidden');
            }, 1500);
        });

        // AOS Init
        AOS.init({
            duration: 1000,
            once: false,
            offset: 100,
            easing: 'ease-out-cubic'
        });

        // Particles.js
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: '#00d4ff' },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: true },
                size: { value: 2, random: true },
                line_linked: { enable: true, distance: 150, color: '#7c3aed', opacity: 0.2, width: 1 },
                move: { enable: true, speed: 1.5, direction: 'none', random: true, out_mode: 'out' }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' } },
                modes: { repulse: { distance: 100 } }
            },
            retina_detect: true
        });

        // Hero Carrossel
        new Swiper('.swiper-hero', {
            slidesPerView: 1,
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            effect: 'fade',
            fadeEffect: { crossFade: true }
        });

        // Navbar Scroll
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Contador Animado
        const stats = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-target'));
                    let count = 0;
                    const duration = 2000;
                    const increment = countTo / (duration / 16);
                    
                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= countTo) {
                            target.textContent = countTo;
                            clearInterval(timer);
                        } else {
                            target.textContent = Math.floor(count);
                        }
                    }, 16);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));

        // Back to Top
        const backToTop = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Form Submit para WhatsApp
        document.getElementById('serviceForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value;
            const servico = document.getElementById('servico').value;
            const descricao = document.getElementById('descricao').value;
            
            const mensagem = `*🚀 NOVA SOLICITAÇÃO - JP BUSINESS*%0A%0A` +
                            `👤 *Nome:* ${nome}%0A` +
                            `📞 *Telefone:* ${telefone}%0A` +
                            `🔧 *Serviço:* ${servico}%0A` +
                            `📝 *Descrição:* ${descricao}%0A%0A` +
                            `_Enviado pelo site JP Business_`;
            
            window.open(`https://wa.me/258864005964?text=${mensagem}`, '_blank');
            
            bootstrap.Modal.getInstance(document.getElementById('solicitarModal')).hide();
            document.getElementById('serviceForm').reset();
        });

        // Fechar modal anterior
        document.querySelectorAll('[data-bs-target="#solicitarModal"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const currentModal = bootstrap.Modal.getInstance(document.querySelector('.modal.show'));
                if (currentModal) currentModal.hide();
            });
        });

        console.log('%c🔥 JP BUSINESS • PREMIUM EXPERIENCE • 2024', 'font-size: 14px; background: linear-gradient(135deg, #00d4ff, #7c3aed); color: white; padding: 8px 16px; border-radius: 30px; font-weight: bold;');
        console.log('%c👨‍💻 Fundador: Jacinto de Manave Jacinto Patrício', 'font-size: 12px; color: #00d4ff;');

            document.addEventListener('DOMContentLoaded', function() {
        // Animação de entrada dos cards
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.mission-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });

        // Contador animado para 2030
        const statValues = document.querySelectorAll('.stat-value');
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    if (target.textContent === '2030') {
                        let count = 2024;
                        const timer = setInterval(() => {
                            count++;
                            target.textContent = count;
                            if (count >= 2030) clearInterval(timer);
                        }, 40);
                    }
                    statObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statValues.forEach(stat => statObserver.observe(stat));

        console.log('%c💎 JP BUSINESS • MISSÃO, VISÃO E VALORES', 'font-size: 14px; background: linear-gradient(135deg, #00d4ff, #7c3aed); color: white; padding: 8px 16px; border-radius: 30px;');
    });