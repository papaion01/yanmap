ymaps.ready(init);

function init() {

    var map = new ymaps.Map('map', {
            center: [48.17, 77.44],
            zoom: 4,
            controls: ['zoomControl']
        },
        ButtonLayout = ymaps.templateLayoutFactory.createClass(
            "<div class=my-button>" +
            "{{data.content}}" +
            "</div>"
        ),
        button = new ymaps.control.Button({
            data: {
                content: "Информация о школе"
            },
            options: {
                layout: ButtonLayout
            }
        }));

        ListBoxLayout = ymaps.templateLayoutFactory.createClass(
            "<button id='my-listbox-header' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>" +
                "{{data.title}} <span class='caret'></span>" +
            "</button>" +
            // Этот элемент будет служить контейнером для элементов списка.
            // В зависимости от того, свернут или развернут список, этот контейнер будет
            // скрываться или показываться вместе с дочерними элементами.
            "<ul id='my-listbox'" +
                " class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu'" +
                " style='display: {% if state.expanded %}block{% else %}none{% endif %};'></ul>", {

            build: function() {
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
                // Заставим элемент управления перед очисткой макета
                // откреплять дочерние элементы от родительского.
                // Это защитит нас от неожиданных ошибок,
                // связанных с уничтожением dom-элементов в ранних версиях ie.
                this.events.fire('childcontainerchange', {
                    newChildContainerElement: null,
                    oldChildContainerElement: this.childContainerElement
                });
                this.childContainerElement = null;
                // Вызываем метод clear родительского класса после выполнения
                // дополнительных действий.
                ListBoxLayout.superclass.clear.call(this);
            }
        }),

        // Также создадим макет для отдельного элемента списка.
        ListBoxItemLayout = ymaps.templateLayoutFactory.createClass(
            "<li><a>{{data.name}}</a></li>"
        ),
        listBoxItems = [
            new ymaps.control.ListBoxItem({
                data: {
                    name: 'Акмолинская область',
                    center: [51.785262, 69.908818],
                    zoom: 9,
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

        // Теперь создадим список, содержащий 2 пункта.
        listBox = new ymaps.control.ListBox({
                items: listBoxItems,
                data: {
                    title: 'Выберите пункт'
                },
                options: {
                    // С помощью опций можно задать как макет непосредственно для списка,
                    layout: ListBoxLayout,
                    // так и макет для дочерних элементов списка. Для задания опций дочерних
                    // элементов через родительский элемент необходимо добавлять префикс
                    // 'item' к названиям опций.
                    itemLayout: ListBoxItemLayout
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



    var listBoxItems = [
        new ymaps.control.ListBoxItem({
            data: {
                name: 'Акмолинская область',
                center: [51.785262, 69.908818],
                zoom: 9,
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
    ]

    listBox = new ymaps.control.ListBox({
        items: listBoxItems,
        data: {
            title: 'Выберите пункт'
        },
        options: {
            // С помощью опций можно задать как макет непосредственно для списка,
            layout: ListBoxLayout,
            // так и макет для дочерних элементов списка. Для задания опций дочерних
            // элементов через родительский элемент необходимо добавлять префикс
            // 'item' к названиям опций.
            itemLayout: ListBoxItemLayout
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
    map.controls.add(listBox, {
        float: 'left'
    });

    $.ajax({
        url: "response.json"
    }).done(function (data) {
        objectManager.add(data);
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
            object = objectManager.objects.getById(objectId);
        // Выведем информацию об объекте.
        document.getElementById("schoolName").innerHTML = object.properties.Name;
        document.getElementById("schoolPower").innerHTML = object.properties.CATO;
        document.getElementById("schoolCapacity").innerHTML = object.properties.Address;
    }

    objectManager.objects.events.add(['click'], onObjectClick);

    /*map.controls
        .add(button, {
            float: 'left'
        });*/
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