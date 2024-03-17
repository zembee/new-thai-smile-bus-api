export default interface BusLocationInterface {
  utc_ts: string
  ext_power_status: number
  alt: number
  recv_utc_ts: string
  engine_status: number
  lon: number
  hdop: number
  num_sats: number
  speed: number
  gpsdata_id: number
  driver_track1: string
  driver_track3: string
  driver_track2: string
  fix: number
  imei: string
  course: number
  seq: number
  lat: number
}
