import { Injector } from '@angular/core';

export class AppInjectorService {

    private _injector: Injector;

    public setInjector(injector: Injector) {
        this._injector = injector;
    }

    public get(service) {
        return this._injector.get(service);
    }
}

export const AppInjector: AppInjectorService = new AppInjectorService();
