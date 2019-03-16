import React, { Component } from "react";

class Map extends Component {
  constructor(props) {
    super(props);

    this.polyline = null;

    this.initMap = () => {
      if (window.google) {
        this.map = new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: -37.813762, lng: 144.970467 },
          zoom: 16,
          mapTypeId: "roadmap",
          disableDefaultUI: true,
          gestureHandling: "greedy",
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#242f3e" }]
            },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#746855" }]
            },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }]
            },
            {
              featureType: "poi",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f", visibility: "on" }]
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76", visibility: "on" }]
            },
            {
              featureType: "transit",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }]
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }]
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }]
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }]
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }]
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }]
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }]
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }]
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }]
            }
          ]
        });
        this.refreshMap();
      } else {
        setTimeout(this.initMap, 200);
      }
    };

    this.refreshMap = () => {
      const { availableBars, chosenBars } = this.props;

      const infoWindows = [];

      if (availableBars && window.google) {
        availableBars.forEach(bar => {
          const marker = new google.maps.Marker({
            position: bar.geometry.location,
            map: this.map,
            icon: "assets/icon.png"
          });

          marker.bar = bar;

          this.props.markers.push(marker);

          const infoWindowContent = `
            <div>${bar.name}</div>
            <div>Rating: ${bar.rating}</div>
            <div>Price level: ${bar.price_level}</div>
          `;

          const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
          });

          infoWindows.push(infoWindow);

          marker.addListener("click", () => {
            if (this.props.isAddMode) {
              if (this.props.chosenBars.includes(bar)) {
                this.props.removeBar(bar);
                marker.setIcon("assets/icon.png");
              } else {
                this.props.chooseBar(bar);
                marker.setIcon("assets/iconWhite.png");
              }
            } else {
              infoWindows.forEach(infoWindow => infoWindow.close());
              if (infoWindow.isOpen) {
                infoWindow.close(this.map, marker);
                infoWindow.isOpen = false;
              } else {
                infoWindow.open(this.map, marker);
                infoWindow.isOpen = true;
              }
            }
          });
        });
      } else {
        setTimeout(this.refreshMap, 200);
      }
    };

    this.refreshLines = () => {
      const lineCoords = this.props.chosenBars.map(bar => bar.geometry.location);
      const lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 4
      };
      console.log(lineCoords);
      if (this.polyline) this.polyline.setMap(null);
      this.polyline = new google.maps.Polyline(
        {
          path: lineCoords,
          geodesic: true,
          strokeColor: '#fff',
          strokeOpacity: 0,
          icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '20px'
          }],
          strokeWeight: 2
        }
      );
      this.polyline.setMap(this.map);
    };
  }

  componentDidMount() {
    window.setTimeout(this.initMap, 200);
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.availableBars) !==
      JSON.stringify(this.props.availableBars)
    ) {
      this.refreshMap();
    }

    if (
      JSON.stringify(prevProps.chosenBars) !==
      JSON.stringify(this.props.chosenBars)
    ) {
      this.refreshLines();
    }
  }

  render() {
    return <div id="map" />;
  }
}

export default Map;
