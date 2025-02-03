export interface PuntoMappa {
  title: string,
  position: any, // {lat, lng} object - in accordance to the API
  info: string, // HTML-formatted on server side in my case, but you may construct the content here from a number of plain string data
}
