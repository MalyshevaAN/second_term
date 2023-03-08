$(function () {
    $('body').fadeIn('1000');
    $('.another').click(function () {
        $('body').fadeOut('1000');
    })
    const canvasElement =$('#mainCanvas');
    let canvas = $(canvasElement).get(0).getContext('2d')
    canvas.beginPath();
    canvas.moveTo(310, 35)
    canvas.lineTo(210, 70)
    canvas.lineTo(75, 135)
    canvas.lineTo(140, 255)
    canvas.lineTo(210, 245)
    canvas.lineTo(210, 590)
    canvas.lineTo(538, 590)
    canvas.lineTo(538, 245)
    canvas.lineTo(605, 255)
    canvas.lineTo(665, 135)
    canvas.lineTo(535, 70)
    canvas.lineTo(435, 35)
    canvas.quadraticCurveTo(375,70,310,35)
    canvas.clip()
    canvas.fillStyle = $('#fill-color').val()
    canvas.strokeStyle = $('#stroke-color').val()
    $('button').click(function () {
        let prev = $('.active')
        $('button').removeClass('active')
        if (this !== prev[0]) {
            $(this).addClass('active')
        }
        $('.figures_square,.figures_triangle,.figures_circle,.text,.eraser').css('display','none')
        if ($('#square').hasClass('active')) {
            $('.figures_square').fadeIn('1000')
        }
        if ($('#circle').hasClass('active')) {
            $('.figures_circle').fadeIn('1000')
        }
        if ($('#triangle').hasClass('active')) {
            $('.figures_triangle').fadeIn('1000')
        }
        if ($('#text').hasClass('active')) {
            $('.text').fadeIn('1000')
        }
        if ($('#line, #erase').hasClass('active')) {
            $('.eraser').fadeIn('1000')
        }
      

    })
    $('#fill-color').change(function () {
        canvas.fillStyle = $('#fill-color').val()
    })
    $('#stroke-color').change(function () {
        canvas.strokeStyle = $('#stroke-color').val()
    })
    let bg_color = $('#bg').val()
    $('#bg').change(function () {
        bg_color = $('#bg').val()
        canvas.fillStyle = bg_color
        if (bg_color == '#ffffff') {
            canvas.clearRect(0, 0, 1000, 800)
        } else {
            canvas.fillRect(0, 0, 1000, 800)
        }
        canvas.drawImage($('#shape')[0], 40, 0, 684, 610)
        canvas.fillStyle=$('#fill-color').val()
    })
    let isPaintingMode = false;
    canvas.lineWidth = 10;
    let posStartX=0
    $(canvasElement).mousedown(function (e) {
        if ($('#line').hasClass('active') || $('#erase').hasClass('active')) {
            isPaintingMode = true;
            canvas.beginPath();
            posStartX = e.pageX - (this.offsetLeft) + 3
            posStartY = e.pageY - this.offsetTop - 100
        }

    })


    $(canvasElement).mouseup(function (e) {
        isPaintingMode = false
        canvas.strokeStyle = $('#stroke-color').val()


    })
    $(canvasElement).mousemove(function (e) {
        if ($('#erase').hasClass('active')) {
            canvas.strokeStyle = bg_color
        }
        let posX = e.pageX - (this.offsetLeft) + 3;
        let posY = e.pageY - this.offsetTop - 100;
        if (isPaintingMode) {
            function drawline(event) {
                canvas.lineWidth = $('#erase-size').val()
                if (event.ctrlKey) {
                    canvas.lineTo(posStartX, posY)
                }else if (event.altKey) {
                    canvas.lineTo(posX,posStartY)
                }else{
                    canvas.lineTo(posX,posY)
                }
                
            }
            drawline(event)
            canvas.stroke()
        }

    })
    $(canvasElement).click(function (e) {
        let posX = e.pageX - (this.offsetLeft) + 3;
        let posY = e.pageY - this.offsetTop - 100;
        let usefill = $('#use-fill').prop('checked')
        let usestroke = $('#use-stroke').prop('checked')
        if ($('#square').hasClass('active')) {
            canvas.save()
            let width = 10
            let height = 10
            width = $('#width-size').val()
            height = $('#height-size').val()
            canvas.translate(posX - width * 0.5, posY - height * 0.5)
            canvas.rotate((Math.PI / 180) * $('#angle').val())
            canvas.beginPath()
            if (usefill) {
                canvas.fillRect(0, 0, width, height)
            }
            if (usestroke) {
                canvas.lineWidth=Math.min(width,height)*0.1
                canvas.strokeRect(0, 0, width, height)
            }
            canvas.closePath()
            canvas.restore()
        }
        if ($('#circle').hasClass('active')) {
            canvas.beginPath()
            canvas.arc(posX, posY,$('#radius').val(), 0, Math.PI * 2)
            if (usefill) {
                canvas.fill()
            }
            if (usestroke) {
                canvas.lineWidth=($('#radius').val())*0.1
                canvas.stroke()
            }
            canvas.closePath()
        
        }
        if ($('#triangle').hasClass('active')) {
            canvas.save()
            let side = $('#size-tri').val()
            canvas.beginPath()
            canvas.lineJoin ='round'
            canvas.translate(posX, posY)
            canvas.rotate((Math.PI / 180)*$('#angle-tri').val())
            canvas.moveTo(side, 0)
            canvas.lineTo(0, side);
            canvas.lineTo(0, 0)
            canvas.lineTo(side, 0)
            canvas.lineTo(0,side)
            if (usefill) {
                canvas.fill()
            }
            if (usestroke) {
                canvas.lineWidth = side * 0.1
                canvas.stroke()
            }
            canvas.restore()
        }       
        if ($('#text').hasClass('active')) {
            let text = $('#main-text').val()
            let fontSize = $('#font-size').val()
            canvas.font = fontSize + 'px' + ' sans-serif'
            canvas.fillText(text,posX-(canvas.measureText(text).width)*0.5,posY)
        }
        if ($('.active').length == 0) {
            let img = new Image()
            img.src = $('#pict').val()
            canvas.drawImage(img, posX - ($('#pict-width').val())*0.5, posY - ($('#pict-height').val())*0.5, $('#pict-width').val(), $('#pict-height').val()); // место + размер
            

        }
        
    })
    $(canvasElement).dblclick(function (e) {
        let color1 = $('#gr_color_1').val()
        let color2 = $('#gr_color_2').val()
        let linearGradient = canvas.createLinearGradient(400, 0, 750, 300)
        linearGradient.addColorStop(0, color1);
        linearGradient.addColorStop(1, color2);
        canvas.fillStyle = linearGradient
        canvas.fillRect(80, 0, 800, 600)
        canvas.drawImage($('#shape')[0],40,0,684,610)
        canvas.fillStyle = $('#fill-color').val()
    })
    $('.back').click(function () {
        if ($('.back').hasClass('push')) {
            $('.back').removeClass('push')
            $('#main-image').attr('src', 'img/tshirt-face.png')
            $('#shape').attr('src', 'img/tshirt-face01.png')
            canvas.clearRect(0,0,1000,800)
        } else {
            $('.back').addClass('push')
            $('#main-image').attr('src', 'img/tshirt-back.png')
            $('#shape').attr('src', 'img/tshirt-back01.png')
            canvas.clearRect(0, 0, 1000, 800)
        }
    })
    $('.clear').click(function () {
        canvas.clearRect(0,0,1000,800)
    })
    window.onload = function () {
        window.addEventListener('wheel', mouse_wheel, false);
    }

    const mouse_wheel = function (event) {
        if (false == !!event) event = window.event;
        let direction = ((event.wheelDelta) ? event.wheelDelta / 120 : event.detail / -3) || false;
        if (direction == -1) {
            footer.classList.add('active')
        } else {
            footer.classList.remove('active')
        }
    }
})
window.onload = function () {
    window.addEventListener('wheel', mouse_wheel, false);
}

const mouse_wheel = function (event) {
    if (false == !!event) event = window.event;
    let direction = ((event.wheelDelta) ? event.wheelDelta / 120 : event.detail / -3) || false;
    if (direction == -1) {
        $('footer').addClass('active')
    } else {
        $('footer').removeClass('active')
    }
}
