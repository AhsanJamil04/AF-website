// Appointment Form - Dynamic Collection and Dress Selection
document.addEventListener('DOMContentLoaded', function() {
    const interestedInSelect = document.getElementById('interested-in');
    const collectionGroup = document.getElementById('collection-group');
    const collectionSelect = document.getElementById('collection');
    const dressNameGroup = document.getElementById('dress-name-group');
    const dressNameSelect = document.getElementById('dress-name');

    // Dress names by category and collection
    const dressNames = {
        'Bridal': {
            'Volume 1: The Jahanara Edit': ['Gul Afshan', 'Zareen', 'Malika-e-Jahan', 'Shahanara', 'DUO: Zareen & Gul Afshan'],
            'Volume 2: The Elara Edit': ['Ayla', 'Faiza', 'Kaia', 'Inara']
        },
        'Formal': {
            'Volume 1: The Jahanara Edit': ['Mahr-un-Nisa', 'Shahana', 'Ameera'],
            'Volume 2: The Elara Edit': ['Sofia', 'Laila']
        }
    };

    // Update collection dropdown visibility
    function updateCollectionVisibility() {
        if (interestedInSelect.value) {
            collectionGroup.style.display = 'block';
            collectionSelect.required = false;
        } else {
            collectionGroup.style.display = 'none';
            collectionSelect.value = '';
            dressNameGroup.style.display = 'none';
            dressNameSelect.value = '';
        }
        updateDressNames();
    }

    // Update dress names dropdown based on selection
    function updateDressNames() {
        const interestedIn = interestedInSelect.value;
        const collection = collectionSelect.value;

        // Clear existing options
        dressNameSelect.innerHTML = '<option value="">Select Dress</option>';

        if (interestedIn && collection && dressNames[interestedIn] && dressNames[interestedIn][collection]) {
            dressNameGroup.style.display = 'block';
            const dresses = dressNames[interestedIn][collection];
            
            dresses.forEach(dress => {
                const option = document.createElement('option');
                option.value = dress;
                option.textContent = dress;
                dressNameSelect.appendChild(option);
            });
        } else {
            dressNameGroup.style.display = 'none';
            dressNameSelect.value = '';
        }
    }

    // Event listeners
    if (interestedInSelect) {
        interestedInSelect.addEventListener('change', updateCollectionVisibility);
    }

    if (collectionSelect) {
        collectionSelect.addEventListener('change', updateDressNames);
    }
});

