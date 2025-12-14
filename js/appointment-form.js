// Appointment Form - Dynamic Dress Selection
document.addEventListener('DOMContentLoaded', function() {
    const interestedInSelect = document.getElementById('interested-in');
    const dressOptionGroup = document.getElementById('dress-option-group');
    const specificDressRadio = document.getElementById('specific-dress-radio');
    const customDressRadio = document.getElementById('custom-dress-radio');
    const dressNameGroup = document.getElementById('dress-name-group');
    const dressNameSelect = document.getElementById('dress-name');

    // Dress names by category (all collections combined)
    const dressNames = {
        'Bridal': [
            'Gul Afshan',
            'Zareen',
            'Malika-e-Jahan',
            'Shahanara',
            'DUO: Zareen & Gul Afshan',
            'Ayla',
            'Faiza',
            'Kaia',
            'Inara'
        ],
        'Formal': [
            'Mahr-un-Nisa',
            'Shahana',
            'Ameera',
            'Sofia',
            'Laila'
        ]
    };

    // Update dress option visibility
    function updateDressOptionVisibility() {
        if (interestedInSelect.value) {
            dressOptionGroup.style.display = 'block';
            // Reset radio buttons
            specificDressRadio.checked = false;
            customDressRadio.checked = false;
            dressNameGroup.style.display = 'none';
            dressNameSelect.value = '';
        } else {
            dressOptionGroup.style.display = 'none';
            dressNameGroup.style.display = 'none';
            dressNameSelect.value = '';
            specificDressRadio.checked = false;
            customDressRadio.checked = false;
        }
    }

    // Update dress names dropdown based on selection
    function updateDressNames() {
        const interestedIn = interestedInSelect.value;

        // Clear existing options
        dressNameSelect.innerHTML = '<option value="">Select Dress</option>';

        if (interestedIn && dressNames[interestedIn]) {
            const dresses = dressNames[interestedIn];
            
            dresses.forEach(dress => {
                const option = document.createElement('option');
                option.value = dress;
                option.textContent = dress;
                dressNameSelect.appendChild(option);
            });
        }
    }

    // Show/hide dress name based on radio selection
    function handleDressPreference() {
        if (specificDressRadio.checked) {
            dressNameGroup.style.display = 'block';
            updateDressNames();
        } else if (customDressRadio.checked) {
            dressNameGroup.style.display = 'none';
            dressNameSelect.value = '';
        } else {
            dressNameGroup.style.display = 'none';
            dressNameSelect.value = '';
        }
    }

    // Event listeners
    if (interestedInSelect) {
        interestedInSelect.addEventListener('change', function() {
            updateDressOptionVisibility();
        });
    }

    if (specificDressRadio) {
        specificDressRadio.addEventListener('change', handleDressPreference);
    }

    if (customDressRadio) {
        customDressRadio.addEventListener('change', handleDressPreference);
    }

    // Update phone number format with country code
    const phoneInput = document.getElementById('phone');
    const countryCodeSelect = document.getElementById('country-code');
    
    if (phoneInput && countryCodeSelect) {
        // Format phone number on input
        phoneInput.addEventListener('input', function(e) {
            // Remove non-numeric characters
            let value = e.target.value.replace(/\D/g, '');
            e.target.value = value;
        });
    }
});
