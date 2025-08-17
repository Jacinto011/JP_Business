 // Back to top button
        const backToTopButton = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Animation on scroll
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.animate__animated');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    const animation = element.getAttribute('class').split(' ').find(cls => cls.startsWith('animate__'));
                    element.classList.add(animation);
                }
            });
        };
        // FAQ Accordion Functionality
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isActive = question.classList.contains('active');
                
                // Close all answers
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.classList.remove('show');
                });
                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                });
                
                // Open current answer if it was closed
                if (!isActive) {
                    question.classList.add('active');
                    answer.classList.add('show');
                }
            });
        });

        
        
        // Open first FAQ by default
        document.querySelector('.faq-question').click();
        
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);

        // Províncias e Distritos de Moçambique
        const districtsByProvince = {
            "Maputo Cidade": ["KaMpfumo", "Nlhamankulu", "KaMaxakeni", "KaMavota", "KaMubukwana", "KaTembe", "KaNyaka"],
            "Maputo Província": ["Boane", "Magude", "Manhiça", "Marracuene", "Matutuíne", "Moamba", "Namaacha"],
            "Gaza": ["Bilene", "Chibuto", "Chicualacuala", "Chigubo", "Chókwè", "Guijá", "Mabalane", "Manjacaze", "Massangena", "Massingir", "Xai-Xai"],
            "Inhambane": ["Funhalouro", "Govuro", "Homoíne", "Inharrime", "Inhassoro", "Jangamo", "Mabote", "Massinga", "Morrumbene", "Panda", "Vilanculos", "Zavala"],
            "Sofala": ["Beira", "Búzi", "Caia", "Chemba", "Cheringoma", "Chibabava", "Dondo", "Gorongosa", "Machanga", "Maringué", "Muanza", "Nhamatanda"],
            "Manica": ["Báruè", "Gondola", "Guro", "Machaze", "Macossa", "Manica", "Mossurize", "Sussundenga", "Tambara", "Vanduzi"],
            "Tete": ["Angónia", "Cahora-Bassa", "Changara", "Chifunde", "Chiuta", "Macanga", "Magoé", "Marávia", "Moatize", "Mutarara", "Tsangano", "Zumbo"],
            "Zambézia": ["Alto Molócuè", "Chinde", "Derre", "Gilé", "Gurué", "Ile", "Inhassunge", "Lugela", "Maganja da Costa", "Milange", "Mocuba", "Mopeia", "Morrumbala", "Namacurra", "Namarroi", "Nicoadala", "Pebane", "Quelimane"],
            "Nampula": ["Angoche", "Eráti", "Ilha de Moçambique", "Lalaua", "Larde", "Liúpo", "Malema", "Meconta", "Mecubúri", "Memba", "Mogincual", "Mogovolas", "Moma", "Monapo", "Mossuril", "Muecate", "Murrupula", "Nacala-a-Velha", "Nacala-Porto", "Nampula", "Rapale", "Ribáuè"],
            "Cabo Delgado": ["Ancuabe", "Balama", "Chiúre", "Ibo", "Macomia", "Mecúfi", "Meluco", "Mocímboa da Praia", "Montepuez", "Mueda", "Muidumbe", "Namuno", "Nangade", "Palma", "Pemba", "Quissanga"],
            "Niassa": ["Cuamba", "Lago", "Lichinga", "Majune", "Mandimba", "Marrupa", "Maúa", "Mavago", "Mecanhelas", "Mecula", "Metarica", "Muembe", "N'gauma", "Nipepe", "Sanga"]
        };

        // DOM Elements
        const provinciaSelect = document.getElementById('provincia');
        const outraProvinciaContainer = document.getElementById('outraProvinciaContainer');
        const distritoContainer = document.getElementById('distritoContainer');
        const distritoSelect = document.getElementById('distrito');
        const servicoSelect = document.getElementById('servico');
        const serviceOptions = document.querySelectorAll('.service-options');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        const formSteps = document.querySelectorAll('.form-step');
        const stepIndicators = document.querySelectorAll('.step-indicator .step');
        const outroSuporteCheck = document.getElementById('outroSuporte');
        const outroSuporteText = document.getElementById('outroSuporteText');
        const outroDevCheck = document.getElementById('outroDev');
        const outroDevText = document.getElementById('outroDevText');
        const outroAcademicoCheck = document.getElementById('outroAcademico');
        const outroAcademicoText = document.getElementById('outroAcademicoText');
        const outroDivulgacaoCheck = document.getElementById('outroDivulgacao');
        const outroDivulgacaoText = document.getElementById('outroDivulgacaoText');
        const serviceForm = document.getElementById('serviceForm');
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        const closeSuccessModal = document.getElementById('closeSuccessModal');

        // Current step
        let currentStep = 0;

        // Initialize form
        updateForm();

        // Event Listeners
        provinciaSelect.addEventListener('change', function() {
            if (this.value === 'outra') {
                outraProvinciaContainer.style.display = 'block';
                distritoContainer.style.display = 'none';
            } else if (this.value) {
                outraProvinciaContainer.style.display = 'none';
                distritoContainer.style.display = 'block';
                
                // Clear and populate districts
                distritoSelect.innerHTML = '<option value="" selected disabled>Selecione seu distrito</option>';
                districtsByProvince[this.value].forEach(district => {
                    const option = document.createElement('option');
                    option.value = district;
                    option.textContent = district;
                    distritoSelect.appendChild(option);
                });
            } else {
                outraProvinciaContainer.style.display = 'none';
                distritoContainer.style.display = 'none';
            }
        });

        servicoSelect.addEventListener('change', function() {
            // Hide all options first
            serviceOptions.forEach(option => {
                option.style.display = 'none';
            });
            
            // Show selected service options
            if (this.value) {
                document.getElementById(`${this.value}Options`).style.display = 'block';
            }
        });

        // Other service options text fields
        outroSuporteCheck.addEventListener('change', function() {
            outroSuporteText.style.display = this.checked ? 'block' : 'none';
            if (!this.checked) outroSuporteText.value = '';
        });

        outroDevCheck.addEventListener('change', function() {
            outroDevText.style.display = this.checked ? 'block' : 'none';
            if (!this.checked) outroDevText.value = '';
        });

        outroAcademicoCheck.addEventListener('change', function() {
            outroAcademicoText.style.display = this.checked ? 'block' : 'none';
            if (!this.checked) outroAcademicoText.value = '';
        });

        outroDivulgacaoCheck.addEventListener('change', function() {
            outroDivulgacaoText.style.display = this.checked ? 'block' : 'none';
            if (!this.checked) outroDivulgacaoText.value = '';
        });

        // Navigation buttons
        prevBtn.addEventListener('click', prevStep);
        nextBtn.addEventListener('click', nextStep);
        closeSuccessModal.addEventListener('click', () => location.reload());

        // Form submission
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm();
        });

        function updateForm() {
            // Hide all steps
            formSteps.forEach(step => {
                step.classList.remove('active');
            });
            
            // Show current step
            formSteps[currentStep].classList.add('active');
            
            // Update step indicators
            stepIndicators.forEach((indicator, index) => {
                indicator.classList.remove('active', 'completed');
                if (index < currentStep) {
                    indicator.classList.add('completed');
                } else if (index === currentStep) {
                    indicator.classList.add('active');
                }
            });
            
            // Update buttons
            if (currentStep === 0) {
                prevBtn.style.display = 'none';
            } else {
                prevBtn.style.display = 'block';
            }
            
            if (currentStep === formSteps.length - 1) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'block';
            } else {
                nextBtn.style.display = 'block';
                submitBtn.style.display = 'none';
            }
        }

        function nextStep() {
            if (validateStep(currentStep)) {
                currentStep++;
                updateForm();
            }
        }

        function prevStep() {
            currentStep--;
            updateForm();
        }

        function validateStep(step) {
            let isValid = true;
            
            if (step === 0) {
                // Validate personal data
                if (!document.getElementById('nomeCompleto').value) {
                    alert('Por favor, preencha seu nome completo');
                    isValid = false;
                } else if (!document.getElementById('email').value || 
                          !document.getElementById('email').value.includes('@')) {
                    alert('Por favor, insira um e-mail válido');
                    isValid = false;
                } else if (!document.getElementById('telefone').value) {
                    alert('Por favor, insira seu telefone');
                    isValid = false;
                } else if (!provinciaSelect.value) {
                    alert('Por favor, selecione sua província');
                    isValid = false;
                } else if (provinciaSelect.value !== 'outra' && !distritoSelect.value) {
                    alert('Por favor, selecione seu distrito');
                    isValid = false;
                } else if (provinciaSelect.value === 'outra' && !document.getElementById('outraProvincia').value) {
                    alert('Por favor, especifique sua província');
                    isValid = false;
                }
            } else if (step === 1) {
                // Validate services
                if (!servicoSelect.value) {
                    alert('Por favor, selecione um serviço');
                    isValid = false;
                } else {
                    // Validate service-specific options
                    const service = servicoSelect.value;
                    if (service === 'desenvolvimento' && !document.querySelector('input[name="tipoSolucao"]:checked')) {
                        alert('Por favor, selecione o tipo de solução');
                        isValid = false;
                    } else if (service === 'assistencia' && !document.querySelector('input[name="tipoAssistencia"]:checked')) {
                        alert('Por favor, selecione o tipo de assistência');
                        isValid = false;
                    }
                }
            }
            
            return isValid;
        }

        function submitForm() {
            if (validateStep(currentStep)) {
                // Collect form data
                const formData = {
                    nomeCompleto: document.getElementById('nomeCompleto').value,
                    email: document.getElementById('email').value,
                    telefone: document.getElementById('telefone').value,
                    provincia: provinciaSelect.value === 'outra' ? document.getElementById('outraProvincia').value : provinciaSelect.value,
                    distrito: provinciaSelect.value === 'outra' ? '' : distritoSelect.value,
                    servico: servicoSelect.value,
                    urgencia: document.getElementById('urgencia').value,
                    observacoes: document.getElementById('observacoes').value,
                    detalhes: {}
                };

                // Add service-specific details
                const service = servicoSelect.value;
                if (service === 'suporte') {
                    formData.detalhes.opcoes = Array.from(document.querySelectorAll('input[name="suporte_opcoes"]:checked')).map(el => el.value);
                    if (outroSuporteCheck.checked) {
                        formData.detalhes.outro = outroSuporteText.value;
                    }
                } else if (service === 'desenvolvimento') {
                    formData.detalhes.tipo = document.querySelector('input[name="tipoSolucao"]:checked').value;
                    if (outroDevCheck.checked) {
                        formData.detalhes.outro = outroDevText.value;
                    }
                } else if (service === 'aulas') {
                    formData.detalhes.opcoes = Array.from(document.querySelectorAll('input[name="aulas_opcoes"]:checked')).map(el => el.value);
                } else if (service === 'assistencia') {
                    formData.detalhes.tipo = document.querySelector('input[name="tipoAssistencia"]:checked').value;
                    if (outroAcademicoCheck.checked) {
                        formData.detalhes.outro = outroAcademicoText.value;
                    }
                } else if (service === 'divulgacao') {
                    formData.detalhes.opcoes = Array.from(document.querySelectorAll('input[name="divulgacao_opcoes"]:checked')).map(el => el.value);
                    if (outroDivulgacaoCheck.checked) {
                        formData.detalhes.outro = outroDivulgacaoText.value;
                    }
                }

                // Log the data to console (for testing)
                console.log('Dados do formulário:', formData);

                // Here you would normally send the data to your API
                // Example using fetch:
                /*
                fetch('https://sua-api.com/solicitacao', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    showSuccess();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Ocorreu um erro ao enviar a solicitação. Por favor, tente novamente.');
                });
                */

                // For testing purposes, we'll just show success
                showSuccess();
            }
        }

        function showSuccess() {
            // Hide the form modal
            const solicitarModal = bootstrap.Modal.getInstance(document.getElementById('solicitarModal'));
            solicitarModal.hide();
            
            // Show success modal
            successModal.show();
        }