export class LogbookEntry {
  myCallsign: string;
  destCallsign: string;

  constructor(obj: any) {
    this.myCallsign = obj.myCallsign;
    this.destCallsign = obj.destCallsign;
  }
}
