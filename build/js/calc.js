$(document).ready(function() {
    let trucks = {
        1: {
            width: 2400,
            height: 13300,
        },
        2: {
            width: 2200,
            height: 5000,
        },
        3: {
            width: 2000,
            height: 3000,
        },
        4: {
            width: 0,
            height: 0,
        }
    }

    let reels = {
        'opt8': {
            width: 705,
            height: 855,
        },
        'opt10': {
            width: 680,
            height: 1055,
        },
        'opt10a': {
            width: 890,
            height: 1055,
        },
        'opt10b': {
            width: 690,
            height: 1055,
        },
        'opt12a': {
            width: 900,
            height: 1275,
        },
        'opt14': {
            width: 900,
            height: 1455,
        },
        'opt14g': {
            width: 1090,
            height: 1455,
        },
        'opt17': {
            width: 950,
            height: 1765,
        },
        'opt18a': {
            width: 1390,
            height: 1870,
        },
        'opt18b': {
            width: 1390,
            height: 1870,
        },
        'opt20': {
            width: 1300,
            height: 2080,
        },
        'opt20a': {
            width: 1360,
            height: 2080,
        },
        'opt25': {
            width: 1680,
            height: 2600,
        },
        'opt22': {
            width: 1360,
            height: 2200,
        },
        'opt22b': {
            width: 1360,
            height: 2200,
        },

        'okko1': {
            width: 435,
            height: 490,
        },
        'okko2k': {
            width: 435,
            height: 600,
        },
        'okko3': {
            width: 435,
            height: 650,
        },
        'okko4': {
            width: 520,
            height: 650,
        },
    }

    calcInit();

    function calcInit(){
        initSizeReels();
        setTuckSize(1);

        let startTruckValue = 1;

        $(document).on('change', 'input[name=tuck_type]', function (){
            let value = $(this).val();
            let height = parseInt(trucks[value]['height'])/20;
            let currentHeight = $('.content-grid').innerHeight();
            if (currentHeight > height && value != 4){
                let answer = window.confirm("Часть добавленого груза будет удалена. Продожить изменение размера?");
                if (answer) {
                    setTuckSize(value);
                    gridTruck.layout();
                    startTruckValue = value;
                }
                else {
                    $("input[name=tuck_type]").prop("checked", false);
                    $("input[name=tuck_type][value="+startTruckValue+"]").prop("checked", true);
                    return false;
                }
            } else {
                setTuckSize(value);
                gridTruck.layout();
                startTruckValue = value;
            }
        });

        $(document).on('change keyup paste','.calc__custom input', function (){
            if ($(this).attr('name') === 'truck_width'){
                if (parseInt($(this).val()) > 300) $(this).val(300);
            }
            setTuckSize(4,true);
        });

        var gridTruck = new Muuri('.content-grid', {
            items: '.reels__item-icon',
            showDuration: 50,
            showEasing: 'ease',
            hideDuration: 50,
            hideEasing: 'ease',
            layoutDuration: 50,
            layoutEasing: 'cubic-bezier(0.625, 0.225, 0.100, 0.890)',
            // Drag & Drop
            dragEnabled: true,
            dragAxis: 'xy',
            dragSort: true,
            dragPlaceholder: {
                enabled: true,
                createElement(item) {
                    return item.getElement().cloneNode(true);
                },
            },
            layout: {
                fillGaps: true,
                rounding: true,
            },
            sortData: {
                size: function (item, element) {
                    return parseInt($(element).data('size'));
                }
            }
        });

        let updateInfoTimer;

        gridTruck.on('layoutEnd', function (items) {
            $(items).each(function (){
                isInside(this);
            });
            if (updateInfoTimer){
                clearTimeout(updateInfoTimer);
            }
            updateInfoTimer = setTimeout(function (){
                itemsList(items);
                loadHeight();
            },100);
        });

        let checkTimer;

        gridTruck.on('dragEnd', function (item, event) {
            let { left, bottom, right, top } = $('.car__content')[0].getBoundingClientRect();
            let windowT = window.scrollX;
            let windowL = window.scrollY;
            let itemX = event.pageX;
            let itemY = event.pageY;
            let itemW = event.target.width;
            let itemH = event.target.height;
            let isReelDraggedOut = itemX+itemW < left+windowL || itemX-10 > right+windowL || itemY-10 > bottom+windowT || itemY+itemH < top+windowT;
            if (isReelDraggedOut) {
                gridTruck.remove([item], { removeElements: true })
                if (checkTimer){
                    clearTimeout(checkTimer);
                }
                checkAllFeet();
            } else {
                if (checkTimer){
                    clearTimeout(checkTimer);
                }
                checkTimer = setTimeout(function (){
                    checkAllFeet();
                },500)
            }
        });

        $(document).on('click','.js-truck-sort',function (){
            $(this).prop('disabled', true);
            updateLayout();

            setTimeout(function (){
                $('.js-truck-sort').prop('disabled', false);
                checkAllFeet();
            },300);
        });
        $(document).on('click','.js-truck-clear',function (){
            $(this).prop('disabled', true);
            gridTruck.remove(gridTruck.getItems(), { removeElements: true })

            setTimeout(function (){
                $('.js-truck-clear').prop('disabled', false);
                checkAllFeet();
            },300);
        });

        $(document).on('click','.js-plus-reel',function (){
            event.preventDefault();
            let item = $(this).closest('.reels__item').data('item');
            addItem(item);
        });


        $(document).on('click','.js-add-max',function (){
            event.preventDefault();
            let item = $(this).closest('.reels__item').data('item');
            count = 150;
            if (count > 0){
                if (count > 500) count = 500;
                addItem(item,count,true);
            }
        });

        $(document).on('click','.js-minus-reel',function (){
            event.preventDefault();
            let item = $(this).closest('.reels__item').data('item');
            $(gridTruck.getItems()).each(function (index,elem){
                if ($(elem['_element']).attr('data-item') === item){
                    gridTruck.remove([elem], { removeElements: true });
                    return false;
                }
            });
        });

        $(document).on('click','.js-show-reels',function (){
            event.preventDefault();
            $(this).toggleClass('active');
        });


        if (typeof (Number.prototype.isBetween) === "undefined") {
            Number.prototype.isBetween = function (min, max, notBoundaries) {
                var between = false;
                if (notBoundaries) {
                    if ((this < max) && (this > min)) between = true;
                } else {
                    if ((this <= max) && (this >= min)) between = true;
                }
                return between;
            }
        }

        if (typeof (Array.prototype.isRangeCrossed) === "undefined") {
            Array.prototype.isRangeCrossed = function (target,notBoundaries) {
                var result = false;
                if ((target[0].isBetween(this[0],this[1],notBoundaries) ) || (target[1].isBetween(this[0],this[1],notBoundaries))){
                    result = true;
                }
                return result;
            }
        }


        function initSizeReels(){
            $.each(reels, function(index,value) {
                let width = parseInt(value['width'])/20;
                let height = parseInt(value['height'])/20;
                let reel = $('.reels__item-icon[data-item="'+index+'"]');
                reel.css({'width':width+'px','height':height+'px'}).attr('data-size',parseInt(value['width']));
                reel.parent('.reels__item').append('<div class="reels__item-form"><div class="reels__item-alert"></div><input type="hidden" name="index" value="'+index+'"><input type="number" onkeypress="return isNumeric(event)" oninput="maxLengthCheck(this)" min="1" maxlength="3"  max="500" value="1" name="count"><button type="button" class="js-add-item" name="plus" title="Добавить">+</button><button type="button" class="js-max-item" name="max" title="Автозаполнение">MAX</button></div>');
                let title = reel.attr('title');
                if (title){
                    reel.parent('.reels__item').prepend('<div class="reels__item-title">'+title+'</div>');
                }
            });
        }

        function setTuckSize(value,inputChange = false){
            if (value != 4){
                let width = parseInt(trucks[value]['width'])/20;
                let height = parseInt(trucks[value]['height'])/20;
                $('.car__content').css({'width':width+'px','height':height+'px'});
                $('.calc__custom').removeClass('active');
                $('.calc__custom input[name="truck_width"]').val((trucks[value]['width']/10).toFixed(0).replace(".",",")).prop('readonly',true);
                $('.calc__custom input[name="truck_height"]').val((trucks[value]['height']/10).toFixed(0).replace(".",",")).prop('readonly',true);
                $('.car-info__value--width').html((trucks[value]['width']/10).toFixed(0).replace(".",","));
                $('.car-info__value--height').html((trucks[value]['height']/10).toFixed(0).replace(".",","));
            } else {
                if (inputChange){
                    let width = parseFloat($('.calc__custom input[name="truck_width"]').val().replace(',', '.'));
                    let height = parseFloat($('.calc__custom input[name="truck_height"]').val().replace(',', '.'));
                    $('.car__content').css({'width':width/2+'px','height':height/2+'px'});
                    $('.car-info__value--width').html(width.toFixed(0).replace(".",",")+ '');
                    $('.car-info__value--height').html(height.toFixed(0).replace(".",",")+ '');
                } else {
                    $('.calc__custom').addClass('active');
                    $('.calc__custom input[name="truck_width"]').prop('readonly',false);
                    $('.calc__custom input[name="truck_height"]').prop('readonly',false);
                }
            }

            checkAllFeet();
        }

        function itemsList(items){
            let list = [];
            let listData = [];
            $(items).each(function (){
                list.push($(this['_element']).attr('title'))
                listData.push($(this['_element']).attr('data-item'))
            });
            let result = list.reduce(function(acc, el) {
                acc[el] = (acc[el] || 0) + 1;
                return acc;
            }, {});
            let html = '';
            $.each(result,function (index,value){
                html += '<div class="truck-info__item"><span class="truck-info__item-title reels__item-title">'+index+'</span><span class="truck-info__item-count reels__item-count">Кол-во:<span>'+value+'</span></span></div>';
            });
            $('.truck-info__content').html(html);

            let result2 = listData.reduce(function(acc, el) {
                acc[el] = (acc[el] || 0) + 1;
                return acc;
            }, {});

            let STotal = 0;

            $('.reels__item').removeClass('insert').find('.reels__item-count span').html(0);

            $.each(result2,function (index,value){
                $('.reels__item[data-item="'+index+'"]').addClass('insert').find('.reels__item-count span').html(value);
                let S = parseInt(reels[index]['width'])* parseInt(reels[index]['height'])*value;
                STotal += S;
            });
            let container = $('.car__content');
            let containerW = container.innerWidth();
            let containerH = container.innerHeight();
            let SContainer = parseFloat(containerW)*parseFloat(containerH)*400;
            let procentTotal = (STotal/SContainer)*100;
            $('.truck-info__load-percent').html(procentTotal.toFixed(1)+'%');
        }

        function isInside(item) {
            let container = $('.car__content');
            let containerW = container.innerWidth();
            let containerH = container.innerHeight();
            let itemX = item['_tX'];
            let itemY = item['_tY'];
            let itemW = item['_width'];
            let itemH = item['_height'];
            let isInside = /*itemX+itemW <= containerW &&*/ itemY+itemH <= containerH;
            if (!isInside){
                gridTruck.remove([item], { removeElements: true })
            }
        }

        function loadHeight(){
            let height = parseFloat($(gridTruck._element).innerHeight());
            if (parseFloat(height) > 0){
                $('.car-info__value--load').html((height*10/5).toFixed(0).replace(".",",")+ '').css('top',height/2+'px');
                $('.car-info__line--load-right').css('height',height+'px');
                $('.car-info__line--load-bottom').css('top',height-4+'px');
                $('.car-info__value--load, .car-info__line--load-right, .car-info__line--load-bottom, .car-info__line--load-top').removeClass('hide');
            } else {
                $('.car-info__value--load, .car-info__line--load-right, .car-info__line--load-bottom, .car-info__line--load-top').addClass('hide');
            }
        }

        function updateLayout() {
            gridTruck.sort('size:desc');
            gridTruck.layout();
        }

        function haveSpace(index){
            let container = $('.car__content');
            let containerW = container.innerWidth()*2;
            let containerH = container.innerHeight()*2;
            let reelW = reels[index]['width']/10;
            let reelH = reels[index]['height']/10;
            let items = gridTruck.getItems();
            //прходим каждый мм длины грузовика
            for (let y = 0; y < containerH; y++) {
                if (y + reelH <= containerH ){
                    //влез бы по высоте
                    //проверям ширину
                    let coordY = [y,y+reelH];
                    for (let x = 0; x < containerW; x++) {
                        if (x + reelW <= containerW ){
                            //влез бы по ширине
                            let coordX = [x,x+reelW];

                            //проверяем персечение с другими элементами
                            let isCrossed = false;
                            $.each(items,function (){
                                let width = this.getWidth()*20;
                                let height = this.getHeight()*20;
                                let position = this.getPosition();
                                let left = position.left*20;
                                let top = position.top*20;

                                if (coordX.isRangeCrossed([left, left+width],false) && coordY.isRangeCrossed([top, top+height],false)){
                                    isCrossed = true;
                                    return true;
                                }
                            });
                            //нет пересечений
                            if (!isCrossed){
                                return true;
                            }
                        } else {
                            break;
                        }
                    }
                } else {
                    return false;
                }
            }
            return false;
        }

        function addItem(item,count = null,max = null) {
            if (count){
                let elemDom = $('.reels__item[data-item="'+item+'"]').find('.reels__item-icon')[0];
                let arrayElem = [];
                for (let i = 0; i < count; i++) {
                    let elem = elemDom.cloneNode(true);
                    elem.classList.add('opacity');
                    arrayElem.push(elem);
                }
                let addedItems = gridTruck.add(arrayElem);
                if (max === null){
                    let destroyed = 0;
                    setTimeout(function (){
                        $.each(addedItems,function (){
                            if (this.isDestroyed()) destroyed++;
                        });
                        if (destroyed > 0){
                            gridTruck.remove(addedItems, { removeElements: true })
                        }
                    },20);
                }
                setTimeout(function (){
                    $('.content-grid .reels__item-icon').removeClass('opacity');
                },50);
            } else {
                let elemDom = $('.reels__item[data-item="'+item+'"]').find('.reels__item-icon')[0];
                let elem = elemDom.cloneNode(true);
                gridTruck.add([elem]);
            }

            checkAllFeet();
        }

        function checkAllFeet(){
            setTimeout(function (){
                $('.reels .reels__item-icon').each(function (i,ele){
                    setTimeout(function() {
                        let elem = ele.cloneNode(true);
                        let parent = $(ele).closest('.reels__item');
                        elem.classList.add('opacity');
                        let added = gridTruck.add([elem]);
                        let destroyed = 0;
                        setTimeout(function (){
                            $.each(added,function (){
                                if (this.isDestroyed()) destroyed++;
                            });
                            if (destroyed > 0){
                                parent.addClass('disabled');
                            } else {
                                parent.removeClass('disabled');
                            }
                            gridTruck.remove(added, { removeElements: true })

                        },1);
                    }, (i+1)*20);
                });
            },100);
        }
    }
});

function maxLengthCheck(object) {
    if (object.value.length > object.max.length)
        object.value = object.value.slice(0, object.max.length)
}

function isNumeric (evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode (key);
    var regex = /[0-9]|\./;
    if ( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}
