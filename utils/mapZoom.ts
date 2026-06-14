export function zoomToDelta(zoom: number) {
  const delta = 360 / Math.pow(2, zoom);
  return { latitudeDelta: delta, longitudeDelta: delta };
}

export function deltaToZoom(latitudeDelta: number) {
  return Math.round(Math.log2(360 / latitudeDelta));
}
