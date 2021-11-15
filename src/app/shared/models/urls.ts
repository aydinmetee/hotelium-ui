import { BaseUrl } from './base-url';

export class Urls {
  public static NewEnv: BaseUrl = new BaseUrl({
    url: 'http://localhost:8080',
    subDirectory: '',
  });

  public static BASE_URL: BaseUrl = Urls.NewEnv;
}
