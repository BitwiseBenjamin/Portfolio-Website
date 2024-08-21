
const navToggle =  document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

/*
navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})
*/

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

       
            if(caret){
            // Ensure caret rotation is applied correctly
            if (this.classList.contains('open')) {
                caret.style.transform = 'rotate(90deg)';
            } else {
                caret.style.transform = 'rotate(0deg)';
            }
        }

            
        });
    });
});



window.addEventListener('DOMContentLoaded', addTabingToPortfolioItems)



function addTabingToPortfolioItems() {
    const portfolioItems = document.querySelectorAll('.portfolio__item');
    
    console.log('Portfolio items:', portfolioItems);  // Log portfolio items for debugging
    
    if (portfolioItems.length > 0) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', function(event) {
                event.preventDefault();  // Prevent default link behavior
                
                // Use the item text as the tab name
                const fileName = this.textContent.trim();
                console.log('Clicked item:', fileName);  // Log clicked item for debugging
                
                // Get the href attribute of the anchor
                const fileUrl = this.getAttribute('href');
                console.log('File URL:', fileUrl);  // Log file URL for debugging
                
                // Create the icon for the tab
                const iconCss = document.createElement('div');
                iconCss.className = 'icon';
                iconCss.innerHTML = '<i class="fa-brands fa-css3-alt" style="color: rgb(44, 130, 251);"></i>';
                
                // Create the new tab
                createTab(iconCss, fileName, fileUrl);
            });
        });
    } else {
        console.error('No portfolio items found.');
    }
}


const tabContainer = document.querySelector('.tab-container');

function createTab(iconDiv, fileName, fileUrl) {
    // Create the tab div
    const tabDiv = document.createElement('div');
    tabDiv.className = 'tab';
    tabDiv.style.position = 'relative';  // Make sure the tab div is positioned relatively

    // Create the anchor element
    const tabLink = document.createElement('a');
    tabLink.href = fileUrl;
    tabLink.className = 'tab-link';

    // Append the icon div from the existing icon div
    tabLink.appendChild(iconDiv.cloneNode(true));

    // Append the file name to the tab link
    tabLink.innerHTML += ` ${fileName}`;

    // Append the tab link to the tab div
    tabDiv.appendChild(tabLink);

    // Create the close button
    const closeButton = document.createElement('span');
    closeButton.className = 'close-tab';
    closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'; // Font Awesome close icon
    

    // Append the close button to the tab div

    tabDiv.appendChild(closeButton);

    tabDiv.style.display = 'flex';
    tabDiv.style.justifyContent = 'space-between';
    tabDiv.style.alignItems = 'center'

    // Append the tab div to the container
    const tabContainer = document.querySelector('.tab-container'); // Ensure you have a reference to the tab container
    tabContainer.appendChild(tabDiv);

    // Add event listeners
    closeButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the tab click event from firing
        tabDiv.remove(); // Remove the tab from the DOM
    });

    tabLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        loadContent(event, fileUrl); // Load content via AJAX
    });

    highlightActiveTab();  // Highlight the new tab

    closeButton.addEventListener('mouseover', () => {
        closeButton.style.color = '#808080'; // Change color on hover
    });
    closeButton.addEventListener('mouseout', () => {
        closeButton.style.color = ''; // Reset color on mouse out
    });
}


function highlightActiveTab() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');  // Remove active class from all tabs
        let anchor = tab.querySelector('a')
        
        if (anchor.href === window.location.href || anchor.href.split("#")[1] === window.location.hash.substring(1)) {
            tab.classList.add('active');  // Add active class to the current tab
            
        }
    });
}

const iconHtml5 = document.createElement('div');
iconHtml5.className = 'icon';
iconHtml5.innerHTML = '<i class="fa-brands fa-html5" style="color: rgb(255, 77, 0);"></i>';

const iconCss = document.createElement('div');
iconCss.className = 'icon';
iconCss.innerHTML = '<i class="fa-brands fa-css3-alt" ></i>';

const iconJs = document.createElement('div');
iconJs.className = 'icon';
iconJs.innerHTML = '<i class="fa-solid fa-j fa-2xs" style="color: rgb(255, 247, 0);"></i> <i class="fa-solid fa-s fa-2xs" style="color: rgb(255, 247, 0);"></i>';


// Example of dynamically adding a new tab when clicking a file in the file explorer
const fileExplorerFolders = document.querySelectorAll('.file-explorer__file');
fileExplorerFolders.forEach(folder => {
    folder.addEventListener('click', function() {
        // Use the folder name as the tab name, create a URL-friendly hash
        const fileName = this.textContent.trim();
        const anchor = this.querySelector('a');
        
        // Get the href attribute of the anchor
        const fileUrl = anchor.getAttribute('href');

        
        // Clone the icon div from the clicked folder
        const fileIcon = this.querySelector('.icon').cloneNode(true);
        
        // Create the new tab
        createTab(fileIcon, fileName, fileUrl);
    });
});

const fileExplorerFoldersIndex = document.querySelectorAll('.index');
fileExplorerFoldersIndex.forEach(folder => {
    folder.addEventListener('click', function() {
        // Use the folder name as the tab name, create a URL-friendly hash
        const fileName = this.textContent.trim();
        const anchor = this.querySelector('a');
        
        // Get the href attribute of the anchor
        const fileUrl = anchor.getAttribute('href');

        
        // Clone the icon div from the clicked folder
        const fileIcon = this.querySelector('.icon').cloneNode(true);
        
        // Create the new tab
        createTab(fileIcon, fileName, fileUrl);
    });
});



// Handle browser back/forward navigation
window.addEventListener('popstate', highlightActiveTab);

window.addEventListener('DOMContentLoaded', highlightActiveTab)

function loadContent(event, url) {
    event.preventDefault(); // Prevent the default link behavior (which causes the refresh)

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

  

    // Configure it: GET-request for the "url"
    xhr.open('GET', url, true);

    // Set up the callback function to handle the response
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Create a temporary DOM element to hold the response text
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = xhr.responseText;

            // Extract the content you want to load (e.g., from a div with id="content")
            var newContent = tempDiv.querySelector('.content-window').innerHTML;

            // Replace the content of the existing #content div with the new content
            document.querySelector('.content-window').innerHTML = newContent;

            // Optionally update the browser history so the back button works
            history.pushState(null, '', url);

             // Call the function to add tabbing behavior
             addTabingToPortfolioItems();

            highlightActiveTab();

            const hash = new URL(url, window.location.origin).hash;
            if (hash) {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }


        } else {
            console.error('Error loading the page:', xhr.statusText);
        }
    };

    // Handle network errors
    xhr.onerror = function() {
        console.error('Network Error');
    };


    // Send the request
    xhr.send();

    
}

// Handle browser back/forward button navigation
window.onpopstate = function() {
    // Load the content based on the current URL
    loadContent({ preventDefault: () => {} }, location.pathname);
};


