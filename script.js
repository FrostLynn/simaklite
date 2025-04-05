document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);

    // Theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleTheme);
});

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update icon
    const themeIcon = document.getElementById('themeIcon');
    if (theme === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}


document.getElementById('fileType').addEventListener('change', function() {
    const fileUpload = document.getElementById('fileUpload');
    const fileHelpText = document.getElementById('fileHelpText');
    
    if (this.value === 'foto_simak') {
        fileUpload.accept = 'image/*';
        fileHelpText.textContent = 'Please upload an image file (JPEG, PNG)';
    } else if (this.value === 'transkrip_nilai') {
        fileUpload.accept = '.pdf,.doc,.docx';
        fileHelpText.textContent = 'Please upload a document (PDF, Word)';
    }
});

document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const tahunAngkatan = document.getElementById('tahunAngkatan').value;
    const npm = document.getElementById('npm').value;
    const fileType = document.getElementById('fileType').value;
    const fileUpload = document.getElementById('fileUpload');
    
    if (!tahunAngkatan || !npm || !fileType || !fileUpload.files[0]) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!/^\d+$/.test(npm) || !/^\d+$/.test(tahunAngkatan)) {
        alert('NPM and Tahun Angkatan should only contain numbers');
        return;
    }
    
    if (npm.length < 8 || npm.length > 12) {
        alert('NPM should be between 8-12 digits');
        return;
    }
    
    if (tahunAngkatan.length !== 4) {
        alert('Tahun Angkatan should be 4 digits (YYYY)');
        return;
    }
});

// Add animation to input fields when focused
const inputs = document.querySelectorAll('.input-field');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('label').classList.add('text-indigo-600');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.querySelector('label').classList.remove('text-indigo-600');
        }
    });
});

function displayFile() {
    const tahunAngkatan = document.getElementById('tahunAngkatan').value;
    const npm = document.getElementById('npm').value;
    const downloadType = document.getElementById('downloadType').value;

    // Validasi input
    if (!tahunAngkatan || !npm || !downloadType) {
        alert('Please fill in all required fields');
        return;
    }

    if (!/^\d+$/.test(npm) || !/^\d+$/.test(tahunAngkatan)) {
        alert('NPM and Tahun Angkatan should only contain numbers');
        return;
    }

    if (npm.length < 8 || npm.length > 12) {
        alert('NPM should be between 8-12 digits');
        return;
    }

    if (tahunAngkatan.length !== 4) {
        alert('Tahun Angkatan should be 4 digits (YYYY)');
        return;
    }

    let fileUrl;
    const fileContainer = document.getElementById('fileContainer');

    try {
        if (downloadType === 'image') {
            fileUrl = `https://simak.unsil.ac.id/us-unsil/foto/${tahunAngkatan}/${npm}.jpg`;
            fileContainer.innerHTML = `
                <div class="text-center">
                    <img src="${fileUrl}" alt="Student Image" class="max-w-full max-h-[400px] mx-auto" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x400?text=Image+not+found';">
                </div>`;
            btnContainer.innerHTML = `
            <div class="mt-2 text-center">
                        <a href="${fileUrl}" download class="mt-2 inline-block btn-submit py-2 px-4 rounded-lg text-white font-semibold">
                            <i class="fas fa-download mr-2"></i> Download Image
                        </a>
                    </div>`;
        } else if (downloadType === 'pdf') {
            fileUrl = `https://simak.unsil.ac.id/us-unsil/baa/transkripmhsw.php?gos=_CetakTranskrip&MhswID=${npm}&_rnd=0eiHPyOK&jen=2`;
            fileContainer.innerHTML = `
                <div class="w-full">
                    <embed src="${fileUrl}" type="application/pdf" width="100%" height="500px" class="border">
                </div>`;
            btnContainer.innerHTML = `
            <div class="mt-2 text-center">
                        <a href="${fileUrl}" download class="btn-submit py-2 px-4 rounded-lg text-white font-semibold inline-block">
                            <i class="fas fa-download mr-2"></i> Download PDF
                        </a>
                    </div>`;
        } else {
            throw new Error('Invalid download type selected');
        }
    } catch (error) {
        console.error('Error:', error);
        fileContainer.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
    }
}

