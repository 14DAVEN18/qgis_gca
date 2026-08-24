var wms_layers = [];


        var lyr_OSMStandard_0 = new ol.layer.Tile({
            'title': 'OSM Standard',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_image_1 = new ol.format.GeoJSON();
var features_image_1 = format_image_1.readFeatures(json_image_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_image_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_image_1.addFeatures(features_image_1);
var lyr_image_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_image_1, 
                style: style_image_1,
                popuplayertitle: 'image',
                interactive: true,
                title: '<img src="styles/legend/image_1.png" /> image'
            });
var lyr_OSM_2 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https%3A%2F%2Fgca.traces.com.co%2Fdev%2Fqgis%2Fserver%2F",
                              attributions: ' ',
                              params: {
                                "LAYERS": "osm",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'OSM',
                            popuplayertitle: 'OSM',
                            type: '',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_OSM_2, 0]);
var format_image_3 = new ol.format.GeoJSON();
var jsonSource_image_3 = new ol.source.Vector({
    attributions: ' ',
});
var lyr_image_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_image_3, 
                style: style_image_3,
                popuplayertitle: 'image',
                interactive: true,
                title: '<img src="styles/legend/image_3.png" /> image'
            });

fetchWFSimage_3Data(lyr_image_3.get('title'), function (error, response) {
    var features_image_3;
    try {
        if (typeof response === "object" && !response.nodeType) {
            // Case JSONP/GeoJSON
            features_image_3 = format_image_3.readFeatures(response);
        } else {
            // Case XML string o DOM
            var parser = new DOMParser();
            var xmlDoc = (typeof response === "string")
                ? parser.parseFromString(response, "text/xml")
                : response;

            // Find GML version from tags
            var gmlFormat;
            if (xmlDoc.getElementsByTagName("gml:featureMember").length > 0) {
                // GML2
                gmlFormat = new ol.format.GML2();
            } else if (xmlDoc.getElementsByTagName("gml:featureMembers").length > 0 ||
                    xmlDoc.getElementsByTagName("gml:FeatureCollection").length > 0) {
                // GML3
                gmlFormat = new ol.format.GML3();
            } else {
                // Fallback generico
                gmlFormat = new ol.format.WFS();
            }

            features_image_3 = gmlFormat.readFeatures(xmlDoc, {
                dataProjection: 'EPSG:3857',
                featureProjection: map.getView().getProjection()
            });
        }

        if (features_image_3 && features_image_3.length > 0) {
            jsonSource_image_3.addFeatures(features_image_3);
        } else {
            lyr_image_3.set('title', '<i class="fa-regular fa-triangle-exclamation" title="Parsing Error"></i> ' + lyr_image_3.get('title'));
            console.warn("No features loaded for image_3");
        }
    } catch (e) {
        console.error("Error parsing WFS for image_3:", e);
    }
});

lyr_OSMStandard_0.setVisible(true);lyr_image_1.setVisible(true);lyr_OSM_2.setVisible(true);lyr_image_3.setVisible(true);
var layersList = [lyr_OSMStandard_0,lyr_image_1,lyr_OSM_2,lyr_image_3];
lyr_image_1.set('fieldAliases', {'id': 'id', 'path': 'path', 'is_reference': 'is_reference', 'is_bridge': 'is_bridge', });
lyr_image_3.set('fieldAliases', {'id': 'id', 'path': 'path', 'is_reference': 'is_reference', 'is_bridge': 'is_bridge', });
lyr_image_1.set('fieldImages', {'id': '', 'path': '', 'is_reference': '', 'is_bridge': '', });
lyr_image_3.set('fieldImages', {'id': '', 'path': '', 'is_reference': '', 'is_bridge': '', });
lyr_image_1.set('fieldLabels', {'id': 'no label', 'path': 'no label', 'is_reference': 'no label', 'is_bridge': 'no label', });
lyr_image_3.set('fieldLabels', {'id': 'no label', 'path': 'no label', 'is_reference': 'no label', 'is_bridge': 'no label', });
lyr_image_3.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});