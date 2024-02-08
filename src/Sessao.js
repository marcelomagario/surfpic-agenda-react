"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

export default function Intro() {
  const position = { lat: 53.54, lng: 10 };
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey='AIzaSyCkfG8FnNQaLpDiiRCOHRYkizjOE7anM7g'>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={9} center={position} mapId='3bbf1b712d8bd82e'>
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"grey"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </AdvancedMarker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>I'm in Hamburg</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}