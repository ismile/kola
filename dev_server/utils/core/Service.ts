import Model from "./Model";
import status from 'http-status-codes'

export default class Service {
  status    = status
  model     = new Model()
}
