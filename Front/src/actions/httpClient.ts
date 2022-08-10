declare interface IAPIresponse<T> {
  message: string;
  data: T;
}

enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface IHeaders {
  method: RequestMethod;
  body: any | null;
  headers: any;
}

const defaultHeader: IHeaders = {
  method: RequestMethod.GET,
  body: null,
  headers: {
    "Content-Type": "application/json",
  },
};

export class HttpClient {
  public static async Get<T>(request: string): Promise<IHttpResponse<T>> {
    let headers = {
      ...defaultHeader,
      method: RequestMethod.GET,
    };

    const response = await fetch(request, headers);
    return this.GetResponse(response);
  }

  public static async Post<T>(request: string, object: any): Promise<IHttpResponse<T>> {
    let headers = {
      ...defaultHeader,
      method: RequestMethod.POST,
      body: JSON.stringify(object),
    };
    const response = await fetch(request, headers);
    return this.GetResponse(response);
  }

  public static async Put<T>(request: string, object: any): Promise<IHttpResponse<T>> {
    let headers = {
      ...defaultHeader,
      method: RequestMethod.PUT,
      body: JSON.stringify(object),
    };

    const response = await fetch(request, headers);
    return this.GetResponse(response);
  }
  public static async Delete<T>(request: string): Promise<IHttpResponse<T>> {
    let headers = {
      ...defaultHeader,
      method: RequestMethod.DELETE,
    };

    const response = await fetch(request, headers);
    return this.GetResponse(response);
  }

  private static async GetResponse<T>(response: Response): Promise<IHttpResponse<T>> {
    if (response.status === 200) {
      const apiData: IAPIresponse<T> = await response.json();
      return {
        okay: true,
        message: apiData.message,
        data: apiData.data,
      };
    } else {
      return {
        okay: false,
        message: await response.text(),
        data: null,
      };
    }
  }
}
