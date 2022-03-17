import { BaseUrl } from './base-url';

export class Urls {
  public static NewEnv: BaseUrl = new BaseUrl({
    url: 'http://localhost:8080',
    subDirectory: '',
  });

  public static MeteEnv: BaseUrl = new BaseUrl({
    url: 'http://192.168.1.52:8080',
    subDirectory: '',
  });

  public static HerokuEnv: BaseUrl = new BaseUrl({
    url: 'https://hotelium.herokuapp.com',
    subDirectory: '',
  });

  public static BASE_URL: BaseUrl = Urls.HerokuEnv;
}
