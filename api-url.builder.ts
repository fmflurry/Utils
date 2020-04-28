export class ApiUrlBuilder {
  url: string;
  hasAlreadyOneQueryParam: boolean;

  constructor(baseUrl: string) {
    this.url = baseUrl;
  }

  withQueryParam(name: string, value: any) {
    if (this.hasAlreadyOneQueryParam) {
      this.url = `${this.url}&`;
    } else {
      this.url = `${this.url}?`;
      this.hasAlreadyOneQueryParam = true;
    }
    this.url = `${this.url}${name}=${value}`;
    return this;
  }

  withRouteParam(routeParam: any) {
    this.url = `${this.url}/${routeParam}`;
    return this;
  }

  build() {
    return this.url;
  }
}
