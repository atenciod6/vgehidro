require([
    "esri/Map",
    "esri/layers/MapImageLayer",
    "esri/layers/FeatureLayer",
    "esri/widgets/LayerList",
    "esri/views/MapView",
    "esri/widgets/Search",
    "dojo/domReady!"
    ], function(
        Map,
        MapImageLayer,
        FeatureLayer,
        LayerList,
        MapView,
        Search
    ) {

      // Create the map
      var map = new Map({
        basemap: "streets"
      });

      // Create the MapView
      var view = new MapView({
          container: "viewDiv",
          map: map,
          zoom: 6,
          center: [-74, -9]
      });

      var template = { // autocasts as new PopupTemplate()
        title: "Marriage in NY, Zip Code: {ZIP}",
        content: [{
          // It is also possible to set the fieldInfos outside of the content
          // directly in the popupTemplate. If no fieldInfos is specifically set
          // in the content, it defaults to whatever may be set within the popupTemplate.
          type: "fields",
          fieldInfos: [{
            fieldName: "MARRIEDRATE",
            label: "Married %",
            visible: true
          }]
        }]
      };
      
      var featureLayer = new FeatureLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/NYCDemographics1/FeatureServer/0",
        outFields: ["*"],
        popupTemplate: template
      });
      map.add(featureLayer);
    
    var layer1 = new MapImageLayer({
        url: "http://geo.ana.gob.pe/arcgis/rest/services/SERV_CARTOGRAFIA_BASE_UTM18S/MapServer",
        title: "Cartografía base"
    });
    map.add(layer1);  // adds the layer to the map
    
    var layer2 = new MapImageLayer({
    url: "http://geo.ana.gob.pe/arcgis/rest/services/SERV_AMBITOS_ADMINISTRATIVOS/MapServer",
    title:"Ámbitos Administrativos",
    sublayers:[{
      title:"Autoridad Administrativa del Agua",
      id:0,
      popupTemplate: {
          title:"Autoridad Administrativa del Agua: {NAME_AAA}",
          content:[{
                  type: "fields",
                  fieldInfos: [{
                      fieldName: "AREA_KM2",
                      label: "Área (km2)",
                      visible: true,
                        format: {
                        digitSeparator: false,
                        places: 0
                        }
                  }]
          }]
      }
    }]
    });
    map.add(layer2);  // adds the layer to the map
    
    var layer3 = new MapImageLayer({
        url: "http://geo.ana.gob.pe/arcgis/rest/services/GeoHidroV2/GESTION_RIESGO_DESASTRE/MapServer",
        title: "Gestión del riesgo",
        visible: false,
        sublayers:[{
        title:"Fajas marginales",
        id:32,
        popupTemplate: {
            title:"Fajas marginal: {DBAnaPublic.IDE.FajasMarginales.NOMCUE}",
            content:[{
                    type: "fields",
                    fieldInfos: [{
                        fieldName: "DBAnaPublic.IDE.FajasMarginales.TIPCUE",
                        label: "Tipo"
                    },{
                        fieldName: "DBAnaPublic.IDE.FajasMarginales.MARGEN",
                        label: "Margen"
                    },
                    {
                        fieldName: "DBAnaPublic.IDE.FajasMarginales.RESAPROB",
                        label: "Resolución de aprobación"
                    },
                    {
                        fieldName: "DBAnaPublic.IDE.FajasMarginales.FECAPROB",
                        label: "Fecha",
                        format: {
                        dateFormat: "short-date-le"
                        }
                    },{
                    fieldName: "DBAnaPublic.IDE.FajasMarginales.ESTE",
                    label: "Este",
                        format: {
                            digitSeparator: false,
                            places: 2
                        }
                    },{
                    fieldName: "DBAnaPublic.IDE.FajasMarginales.NORTE",
                    label: "Norte",
                        format: {
                            digitSeparator: false,
                            places: 2
                        }
                    },{
                        fieldName: "DBAnaPublic.IDE.FajasMarginales.ZONAUTM",
                        label: "Zona UTM"
                    },
                    {
                        fieldName: "DBAnaPublic.IDE.FajasMarginales.NOMDEP",
                        label: "Departamento"
                    },
                                        {
                        fieldName: "DBAnaPublic.IDE.FajasMarginales.NOMPROV",
                        label: "Provincia"
                    },
                                        {
                        fieldName: "DBAnaPublic.IDE.FajasMarginales.NOMDIST",
                        label: "Distrito"
                    } 
                            ]
            },{
            type: "text",
            text: "<a href={DBANAPUBLIC.IDE.FAJASLINK.LINK}><b>Ver resolución de aprobación</b></a>"
            },{
            type: "media",
            mediaInfos: [{
                title: "Ver enlace",
                type: "image",
                value: {
                    sourceURL: "http://ftp.ana.gob.pe/docs/images/ResolucionView.jpg"
                }
            }]
            }
            ]
        }
    }]
    });
    map.add(layer3);  // adds the layer to the map
    
    var layer4 = new MapImageLayer({
        url: "http://geo.ana.gob.pe/arcgis/rest/services/GeoHidroV2/RED_MONITOREO/MapServer",
        title: "Red de monitoreo",
        visible: false
    });
    map.add(layer4);  // adds the layer to the map
    
    var layer5 = new MapImageLayer({
        url: "http://geo.ana.gob.pe/arcgis/rest/services/GeoHidroV2/INFRAESTRUCTURAS_HIDRAULICAS/MapServer",
        title: "Infraestructura hidraúlica",
        visible: false
    });
    map.add(layer5);  // adds the layer to the map
    
    var layer6 = new MapImageLayer({
        url: "http://geo.ana.gob.pe/arcgis/rest/services/GeoHidroV2/HIDROGRAFIA_NATURAL/MapServer",
        title: "Hidrografía natural",
        visible: false
    });
    map.add(layer6);  // adds the layer to the map
    
    var layer7 = new MapImageLayer({
        url: "http://geo.ana.gob.pe/arcgis/rest/services/GeoHidroV2/ESTUDIOS_HIDRICOS/MapServer",
        title: "Estudios hídricos",
        visible: false
    });
    map.add(layer7);  // adds the layer to the map
    
    var layer8 = new MapImageLayer({
        url: "http://geo.ana.gob.pe/arcgis/rest/services/GeoHidroV2/DERECHOS_ADMINISTRATIVOS/MapServer",
        title: "Derechos administrativos",
        visible: false
    });
    map.add(layer8);  // adds the layer to the map
  
    view.when(function() {
        var layerList = new LayerList({
          view: view
        });

        // Add widget to the top right corner of the view
        view.ui.add(layerList, "top-right");
    });
    var searchWidget = new Search({
        view: view
    });

    // Add the search widget to the top right corner of the view
    view.ui.add(searchWidget, {
        position: "top-right"
    });
      
});


