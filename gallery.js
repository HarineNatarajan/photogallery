$(document).ready(function(){
    $('.buttons').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        var filter = $(this).attr('data-filter')
        if(filter == 'all'){
            $('.image').show(400);
        }else{
            $('.image').not('.'+filter).hide(200);
            $('.image').filter('.'+filter).show(400);
        }
    });

    $('.gallery').magnificPopup({
        delegate:'a',
        type:'image',
        gallery:{
            enabled:true
        }
    });

    // Load saved images on page load
    loadSavedImages();
});

function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const uploadedImagesContainer = document.getElementById('uploadedImages');

    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const img = document.createElement('img');
                img.src = event.target.result;
                const imageItem = document.createElement('div');
                imageItem.classList.add('image-item');
                imageItem.appendChild(img);

                // Create delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.innerText = 'Delete';
                deleteBtn.onclick = function() {
                    deleteImage(imageItem);
                };
                imageItem.appendChild(deleteBtn);

                uploadedImagesContainer.appendChild(imageItem);

                saveImageLocally();
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select an image file (jpg, png, etc.).');
        }
    }
}

function saveImageLocally() {
    const savedImages = Array.from(document.querySelectorAll('.image-item img')).map(img => img.src);
    localStorage.setItem('savedImages', JSON.stringify(savedImages));
}

function loadSavedImages() {
    let savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    const uploadedImagesContainer = document.getElementById('uploadedImages');
    savedImages.forEach(function(imageData) {
        const img = document.createElement('img');
        img.src = imageData;
        const imageItem = document.createElement('div');
        imageItem.classList.add('image-item');
        imageItem.appendChild(img);

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.onclick = function() {
            deleteImage(imageItem);
        };
        imageItem.appendChild(deleteBtn);

        uploadedImagesContainer.appendChild(imageItem);
    });
}

function deleteImage(imageItem) {
    imageItem.remove();
    saveImageLocally();
}

function deleteAllImages() {
    localStorage.removeItem('savedImages');
    document.getElementById('uploadedImages').innerHTML = '';
}
