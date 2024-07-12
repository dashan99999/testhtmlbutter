export class FormulaError {
  type = 'error';
  dataType = 'string';
  protected info!: any;
  constructor(protected msg: string, info?: any) {
    if (info) {
      if (typeof info === 'object') {
        try {
          this.info = JSON.parse(JSON.stringify(info));
        } catch (error) {
          this.info = { originInfo: info, error };
        }
      } else {
        this.info = info;
      }
    }
  }
  toString() {
    return this.msg;
  }
  get value() {
    return this.msg;
  }
}
