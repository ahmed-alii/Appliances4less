$('.image-slider__slick').slick({
    infinite: false
});



$(document).on('click', '.search-item .image-slider__slide', function (event) {
    let slider_EL = $("#lightbox-slider")
    let slider_wrapper = $("#lightbox-slider__wrapper")

    let currentItem, imagesInCurrent, modal;

    modal = $("#lightbox-modal");
    const lightBoxModal = new bootstrap.Modal(modal, {})
    imagesInCurrent = $(this).parent().find("img").toArray();

    // currentItem = $(this);
    // console.log(currentItem[0])
    // console.log(imagesInCurrent)

    createSliderNode(imagesInCurrent, slider_EL)

    addScratches($("#scratches"), slider_EL)

    addEventListnersToScratches($(".scratch-slide-control"), slider_EL)

    initiateSlider(slider_EL)

    showModal(lightBoxModal, modal, slider_EL, $("#scratches"))

});

function addEventListnersToScratches(scratches, slider){
    scratches.on("click", function (event){
        console.log($(this).data("slide"))
        slider.slick('slickGoTo', parseInt($(this).data("slide")));
    })

}

function addScratches(wrapper, slider){
    wrapper.empty()

    $(slider).find(".lightbox-slide").toArray().forEach(el => {
        if ($(el).data("scratch") === true){
            console.log("Append button")
            $(wrapper).append(`<button data-slide="${$(el).data("index")}" 
                                class="scratch-slide-control">Scratch ${$(el).data("index")}
                                </button>`)
        }

    })

}
function createSliderNode(items, appendTo) {
    let parent = appendTo;
    parent.empty()

    items.forEach((item, index) => {
        let node = `<div class="lightbox-slide" data-scratch="${$(item).data('scratch')}" data-index="${index}">
                        <img src="${item.src}" alt="" class="img-fluid">
                    </div>`
        parent.append(node)
    })

}
function initiateSlider(slider_EL){
    slider_EL.slick({
        infinite: false,
    }).slick("refresh")

}
function showModal(lightBoxModal, modal, slider_EL, scratches) {
    lightBoxModal.show()

    modal[0].addEventListener('hidden.bs.modal', event => {
        console.log("unslicked the current modal")
        slider_EL.slick('unslick');
    })
}
