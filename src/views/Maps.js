import React, { useCallback, useEffect, useRef, useState } from "react";

// reactstrap components
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
} from "reactstrap";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";

// core components
import PanelHeader from "components/Layout/PanelHeader.js";
import { locations } from "constants/data";

const libraries = ["places"];

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

let currentLocation = {
  lng: 55,
  lat: 25,
  default: true,
};

function FullScreenMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAHWBEDZm9ew3NsjpN0hSRWD2QOIbxw7hw",
    libraries,
  });

  const [selectedMarker, setSelectedMarker] = useState();
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(
    () =>
      navigator.geolocation.getCurrentPosition((position) => {
        currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          default: false,
        };
      }),
    []
  );

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>Google Maps</CardHeader>
              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                      center={currentLocation}
                      zoom={10}
                      onLoad={onMapLoad}
                      options={options}
                    >
                      {locations.map((location) => (
                        <Marker
                          key={location.name}
                          position={{ lat: location.lat, lng: location.lng }}
                          onClick={() => setSelectedMarker(location)}
                          // label={location.name}
                        />
                      ))}
                      {selectedMarker && (
                        <InfoWindow
                          onCloseClick={() => setSelectedMarker(null)}
                          position={{
                            lat: selectedMarker.lat + 0.01,
                            lng: selectedMarker.lng,
                          }}
                        >
                          <div>
                            <Card className="text-center">
                              <CardHeader tag="h6">
                                {selectedMarker.name}
                              </CardHeader>
                              <CardBody>
                                <CardText>
                                  Telephone: {selectedMarker.telephone}
                                </CardText>
                                <CardText></CardText>
                                {selectedMarker.website_url && (
                                  <CardText>
                                    <a
                                      type="button"
                                      className="secondary"
                                      href={selectedMarker.website_url}
                                    >
                                      View Website
                                    </a>
                                  </CardText>
                                )}
                              </CardBody>
                              <CardFooter>
                                <a href={selectedMarker.maps_url}>
                                  View On Google Maps
                                </a>
                              </CardFooter>
                            </Card>
                          </div>
                        </InfoWindow>
                      )}
                    </GoogleMap>
                  ) : (
                    <h1>Loading Maps!</h1>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default FullScreenMap;
