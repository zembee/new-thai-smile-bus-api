import LocationResponseDto from '../../station/document/location-response.dto'

export default interface StationsInterface {
  index: number
  name: string
  description: string
  location: LocationResponseDto
  type: string
  objectId: string
}
