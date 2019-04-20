ymaps.ready(init);

function init() {
    var map = new ymaps.Map('map', {
            center: [49, 70],
            zoom: 6,
            controls: []
        },
        ButtonLayout = ymaps.templateLayoutFactory.createClass(
            "<div class='d-flex card' style='display:none' id='infoPanel'> " +
            "<h3 class='card-header' id='topic'>" +
            "{{ data.content }}"+
            "</h3>" +
            "<div class='card-body'"+
            "<h5 class='class-title'>" +
            
            "</h5>" +
            "<ul'>" +
            "<li class='card-title' id='schoolCity'>" +
            "</li>" +
            "<li class='card-title' id='schoolName'>" +
            "</li>" +
            "<li class='card-title' id='schoolAddress'>" +
            "</li>" +
            "</ul>" +
            "</div>" +
            "</div>"
        ),
        button = new ymaps.control.Button({
            data: {
                content: "Карта школ Казахстана"
            },
            options: {
                layout: ButtonLayout
            }
        }));

    ListBoxLayout = ymaps.templateLayoutFactory.createClass(
            "<button id='my-listbox-header' style='display:block;left:5%;' class='d-block btn btn-default  style='display:block' data-toggle='dropdown'>" +
            "{{data.title}} <span class='caret'></span>" +
            "</button>" +
            // Этот элемент будет служить контейнером для элементов списка.
            // В зависимости от того, свернут или развернут список, этот контейнер будет
            // скрываться или показываться вместе с дочерними элементами.
            "<ul id='my-listbox'" +
            " class='ml-1 dropdown-menu' role='menu' aria-labelledby='dropdownMenu'" +
            " style='display: {% if state.expanded %}block{% else %}none{% endif %};'></ul>", {

                build: function () {
                    // Вызываем метод build родительского класса перед выполнением
                    // дополнительных действий.
                    ListBoxLayout.superclass.build.call(this);

                    this.childContainerElement = $('#my-listbox').get(0);
                    // Генерируем специальное событие, оповещающее элемент управления
                    // о смене контейнера дочерних элементов.
                    this.events.fire('childcontainerchange', {
                        newChildContainerElement: this.childContainerElement,
                        oldChildContainerElement: null
                    });
                },

                // Переопределяем интерфейсный метод, возвращающий ссылку на
                // контейнер дочерних элементов.
                getChildContainerElement: function () {
                    return this.childContainerElement;
                },

                clear: function () {
                    this.events.fire('childcontainerchange', {
                        newChildContainerElement: null,
                        oldChildContainerElement: this.childContainerElement
                    });
                    this.childContainerElement = null;
                    ListBoxLayout.superclass.clear.call(this);
                }
            }),

        ListBoxItemLayout = ymaps.templateLayoutFactory.createClass(
            "<li><a>{{data.name}}</a></li>"
        ),
        ListBoxLayout1 = ymaps.templateLayoutFactory.createClass(
            "<button id='city-listbox-header' class='d-block btn btn-default  style='display:block;left:5%;' data-toggle='dropdown'>" +
            "{{data.title}} <span class='caret'></span>" +
            "</button>" +
            // Этот элемент будет служить контейнером для элементов списка.
            // В зависимости от того, свернут или развернут список, этот контейнер будет
            // скрываться или показываться вместе с дочерними элементами.
            "<ul id='city-listbox'" +
            " class='mt-5 ml-3 dropdown-menu' role='menu' aria-labelledby='dropdownMenu'" +
            " style='display: {% if state.expanded %}block{% else %}none{% endif %};'></ul>", {

                build: function () {
                    ListBoxLayout1.superclass.build.call(this);
                    this.childContainerElement = $('#city-listbox').get(0);
                    this.events.fire('childcontainerchange', {
                        newChildContainerElement: this.childContainerElement,
                        oldChildContainerElement: null
                    });
                },
                getChildContainerElement: function () {
                    return this.childContainerElement;
                },

                clear: function () {
                    this.events.fire('childcontainerchange', {
                        newChildContainerElement: null,
                        oldChildContainerElement: this.childContainerElement
                    });
                    this.childContainerElement = null;
                    ListBoxLayout1.superclass.clear.call(this);
                }
            }),

        ListBoxItemLayout1 = ymaps.templateLayoutFactory.createClass(
            "<li><a>{{data.name}}</a></li>"
        ),
        listBoxItems1 = [
            new ymaps.control.ListBoxItem({
                data: {
                    name: 'Акмолинская область',
                    center: [51.785262, 69.908818],
                    zoom: 6,
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: 'Актюбинская область',
                    center: [48.605970, 58.593710],
                    zoom: 9,
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: 'Алматинская область',
                    center: [44.548301, 77.474240],
                    zoom: 9,
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: 'Атырауская область',
                    center: [47.490698, 52.093519],
                    zoom: 9,
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: 'Восточно-Казахстанская область',
                    center: [48.793012, 81.488910],
                    zoom: 9,
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: 'Жамбылская область',
                    center: [44.311975, 72.138463],
                    zoom: 9,
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: 'Западно-Казахстанская область',
                    center: [49.813556, 50.675447],
                    zoom: 9,
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: 'Карагандинская область',
                    center: [48.219942, 70.978720],
                    zoom: 9,
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: 'Костанайская область',
                    center: [51.602478, 64.015555],
                    zoom: 9,
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: 'Кызылординская область',
                    center: [44.571371, 65.794929],
                    zoom: 9,
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: 'Мангистауская область',
                    center: [44.122553, 53.722021],
                    zoom: 9,
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: 'Павлодарская область',
                    center: [52.068494, 76.242551],
                    zoom: 9,
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: 'Северо-Казахстанская область',
                    center: [53.668040, 67.982794],
                    zoom: 9,
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: 'Туркестанская область',
                    center: [44.294764, 68.676347],
                    zoom: 9,
                }
            })
        ],
        listBoxItems = [
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Астана",
                    center: [51.128207, 71.430411],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Алматы",
                    center: [43.238293, 76.945465],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Шымкент",
                    center: [42.315514, 69.586907],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Караганда",
                    center: [49.807754, 73.088504],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Актобе",
                    center: [50.300371, 57.154555],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Тараз",
                    center: [42.901183, 71.378309],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Павлодар",
                    center: [52.285577, 76.940947],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Усть-Каменогорск",
                    center: [49.948759, 82.628459],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Семей",
                    center: [50.416526, 80.25617],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Костанай",
                    center: [53.21448, 63.632073],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Атырау",
                    center: [47.106811, 51.916874],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Кызылорда",
                    center: [44.842557, 65.502545],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Уральск",
                    center: [51.20398, 51.370375],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Петропавловск",
                    center: [54.865472, 69.135602],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Актау",
                    center: [43.635601, 51.168254],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Кокшетау",
                    center: [53.284635, 69.377527],
                    zoom: 9
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    name: "Талдыкорган",
                    center: [45.017837, 78.382096],
                    zoom: 9
                }
            })
        ],
        listBox = new ymaps.control.ListBox({
            items: listBoxItems,
            data: {
                title: 'Выберите город'
            },
            options: {
                layout: ListBoxLayout,
                itemLayout: ListBoxItemLayout
            }
        }),
        listBox1 = new ymaps.control.ListBox({
            items: listBoxItems1,
            data: {
                title: 'Выберите область'
            },
            options: {
                layout: ListBoxLayout1,
                itemLayout: ListBoxItemLayout1
            }
        });



    listBox.events.add('click', function (e) {
        // Получаем ссылку на объект, по которому кликнули.
        // События элементов списка пропагируются
        // и их можно слушать на родительском элементе.
        var item = e.get('target');
        // Клик на заголовке выпадающего списка обрабатывать не надо.
        if (item != listBox) {
            map.setCenter(
                item.data.get('center'),
                item.data.get('zoom')
            );
        }
    });

    listBox1.events.add('click', function (e) {
        // Получаем ссылку на объект, по которому кликнули.
        // События элементов списка пропагируются
        // и их можно слушать на родительском элементе.
        var item = e.get('target');
        // Клик на заголовке выпадающего списка обрабатывать не надо.
        if (item != listBox1) {
            map.setCenter(
                item.data.get('center'),
                item.data.get('zoom')
            );
        }
    });


    listBox.events.add('click', function (e) {
        // Получаем ссылку на объект, по которому кликнули.
        // События элементов списка пропагируются
        // и их можно слушать на родительском элементе.
        var item = e.get('target');
        // Клик на заголовке выпадающего списка обрабатывать не надо.
        if (item != listBox) {
            map.setCenter(
                item.data.get('center'),
                item.data.get('zoom')
            );
        }
    });

    listBox1.events.add('click', function (e) {
        // Получаем ссылку на объект, по которому кликнули.
        // События элементов списка пропагируются
        // и их можно слушать на родительском элементе.
        var item = e.get('target');
        // Клик на заголовке выпадающего списка обрабатывать не надо.
        if (item != listBox1) {
            map.setCenter(
                item.data.get('center'),
                item.data.get('zoom')
            );
        }
    });

    map.controls.add(button,{
        float:'left'
    });

    map.controls.add(listBox, {
        float:'left'
    });

    map.controls.add(listBox1,{
        float:'left'
    });

    $.ajax({
        url: "response.json"
    }).done(function (data) {
        objectManager.add(data);
    });

    $.ajax({
        url: "response.json"
    }).done(function (data) {
        iconObjectManager.add(data);
    });

    var objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: false
    });
    var iconObjectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: false
    });
    map.geoObjects.add(objectManager);
    map.geoObjects.add(iconObjectManager);

    // Создаем экземпляр класса ymaps.control.SearchControl
    var mySearchControl = new ymaps.control.SearchControl({
        options: {
            provider: new CustomSearchProvider([objectManager, iconObjectManager]),
            noPlacemark: true,
            resultsPerPage: 5,
            useMapBounds: true,
            strictBounds: true,
        }
    });

    // Добавляем контрол в верхний правый угол,
    map.controls
        .add(mySearchControl, {
            float: 'right'
        });


    function onObjectClick(e) {
        // objectId – идентификатор объекта, на котором произошло событие.
        var objectId = e.get('objectId'),
            object = iconObjectManager.objects.getById(objectId);
        // Выведем информацию об объекте.
        // document.getElementById("topic").innerHTML = 'Информация о школе';
        document.getElementById("schoolName").innerHTML = "Название школы: " + object.properties.Name;
        document.getElementById("schoolCity").innerHTML = "Город школы: " + object.properties.CATO;
        document.getElementById("schoolAddress").innerHTML = "Адрес школы: " + object.properties.Address;
        var element = document.getElementById("infoPanel");
        element.classList.add('infoPane');
    }

    iconObjectManager.objects.events.add(['click'], onObjectClick);

    // Провайдер данных для элемента управления ymaps.control.SearchControl.
    // Осуществляет поиск геообъектов в по массиву points.
    // Реализует интерфейс IGeocodeProvider.
    function CustomSearchProvider(oms) {
        this.oms = oms;
    }

    // Провайдер ищет по полю text стандартным методом String.ptototype.indexOf.
    CustomSearchProvider.prototype.geocode = function (request, options) {
        var deferred = new ymaps.vow.defer();
        var geoObjects = new ymaps.GeoObjectCollection();
        var offset = options.skip || 0;
        var limit = options.results || 20;
        var points = [];

        for (var i = 0, l = this.oms.length; i < l; i++) {
            var om = this.oms[i];
            om.objects.each(function (p) {
                if (p.properties.CATO.toLowerCase().indexOf(request.toLowerCase()) != -1 || p.properties.Name.toLowerCase().indexOf(request.toLowerCase()) != -1) {
                    points.push(p);
                }
            });
        }
        // При формировании ответа можно учитывать offset и limit.
        points = points.splice(offset, limit);

        // Добавляем точки в результирующую коллекцию.
        for (i = 0, l = points.length; i < l; i++) {
            var point = points[i];
            var coords = point.geometry.coordinates;
            var name = point.properties.Name;
            var city = point.properties.CATO;

            geoObjects.add(new ymaps.Placemark(coords, {
                name: name + ', ' + city,
                boundedBy: [coords, coords]
            }));
        }

        deferred.resolve({
            // Геообъекты поисковой выдачи.
            geoObjects: geoObjects,
            // Метаинформация ответа.
            metaData: {
                geocoder: {
                    // Строка обработанного запроса.
                    request: request,
                    // Количество найденных результатов.
                    found: geoObjects.getLength(),
                    // Количество возвращенных результатов.
                    results: limit,
                    // Количество пропущенных результатов.
                    skip: offset
                }
            }
        });

        // Возвращаем объект-обещание.
        return deferred.promise();
    }
}