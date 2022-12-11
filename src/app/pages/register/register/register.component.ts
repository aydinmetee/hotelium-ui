import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeAndSlideUp } from 'src/app/shared/animation/fade';
import { BaseComponent } from 'src/app/shared/base-component';
import { LabelValue } from 'src/app/shared/models/label-value';
import { ComboService } from 'src/app/shared/services/combo.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { Register } from '../models/register';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeAndSlideUp],
})
export class RegisterComponent extends BaseComponent implements OnInit {
  orgList:LabelValue<string, string>[] = [];
  constructor(    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private activatedRoute: ActivatedRoute,
    private comboService:ComboService,
    utilServ: UtilityService) {
      super(null,utilServ);
      this.form = formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', Validators.required],
        orgId: ['', [Validators.required]],
        rePassword: ['', Validators.required],
        
      });
     }

  ngOnInit(): void {
    this.comboService.getOrganizationList().subscribe(res => {
      this.orgList=[{value:null,label:"Organizasyon Seçiniz"},...res];
    });
    this.hideloader();
  }

  public register() {
    const modal:Register = Object.assign({},this.form.value,{type:'USER'});
    if(modal.password != this.form.get('rePassword').value){
      this.utilityService.alertService.warn('HATA!','Parola ve Parola tekrarı farklı değerler içeriyor.');
    }
    else{this.showLoader();
    console.log(this.router.config);
    this.registerService.getRegisterInfo(
      modal,
      () => {
        this.utilityService.alertService.success("BAŞARILI!","Başarıyla Kayıt Olundu.");
        this.router.navigateByUrl('/login');
      }
    );}
  }
}
