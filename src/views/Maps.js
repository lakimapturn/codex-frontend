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
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { locations } from "constants/data";

const libraries = ["places"];

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const currentLocation = {
  lng: 55,
  lat: 25,
};

function FullScreenMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAHWBEDZm9ew3NsjpN0hSRWD2QOIbxw7hw",
    libraries,
  });
  // const [currentLocation, setCurrentLocation] = useState({
  //   lng: 55,
  //   lat: 25,
  // });
  const [selectedMarker, setSelectedMarker] = useState();
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // useEffect(
  //   () =>
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setCurrentLocation({
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       });
  //     }),
  //   []
  // );

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
                      zoom={9}
                      onLoad={onMapLoad}
                      options={options}
                    >
                      {locations.map((location) => (
                        <Marker
                          key={location.name}
                          position={{ lat: location.lat, lng: location.lng }}
                          onClick={() => setSelectedMarker(location)}
                        />
                      ))}
                      {selectedMarker && (
                        <InfoWindow
                          onCloseClick={() => setSelectedMarker(null)}
                          position={{
                            lat: selectedMarker.lat + 0.1,
                            lng: selectedMarker.lng,
                          }}
                        >
                          <div>
                            <Card>
                              <CardHeader>{selectedMarker.name}</CardHeader>
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
