
const navToggle =  document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})


document.addEventListener('DOMContentLoaded', function() {
    const folders = document.querySelectorAll('.file-explorer__folder');

    folders.forEach(folder => {
        folder.addEventListener('click', function() {
            const sublist = this.nextElementSibling;
            const caret = this.querySelector('.file-explorer__chevron');

            // Toggle sublist display\
            if (sublist.style.display === 'block') {
                sublist.style.display = 'none';
            } else {
                sublist.style.display = 'block';
            }

            // Toggle the 'open' class on the folder
            this.classList.toggle('open');

            // Ensure caret rotation is applied correctly
            if (this.classList.contains('open')) {
                caret.style.transform = 'rotate(90deg)';
            } else {
                caret.style.transform = 'rotate(0deg)';
            }
        });
    });
});

