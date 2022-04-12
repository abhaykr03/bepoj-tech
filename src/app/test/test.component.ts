import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  userForm:any;
  Userid = 1000;
  isEdit = false;
  selectedUser:any = {};
  selectedIndex:number = -1;
  reset = true;
  constructor(
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.userForm = this.fb.group({
      name:["",[Validators.required]],
      longitude:["",[Validators.required]],
      latitude:["",[Validators.required]],
      totalBudget:["",[Validators.required]],
      ownerFName:["",[Validators.required]],
      ownerLName:["",[Validators.required]],
    })
  }


  dealersInfo = {
  "dealers": [
    {
      "id": 1000,
      "name": "Ford",
      "totalBudget": 1525,
      "remainingBudget": "2700",
      "owner": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "location": {
        "latitude": "46545.45",
        "longitude": "4655.245"
      },
      "cars": [
        {
          "id": "10001",
          "name": "Ford Endeavour",
          "model": "2018",
          "brand": "Ford",
          "color": "Silver",
          "price": 542
        },
        {
          "id": "10002",
          "name": "Ford EcoSport",
          "model": "2020",
          "brand": "Ford",
          "color": "Red",
          "price": 542
        },
        {
          "id": "10003",
          "name": "Ford Figo",
          "model": "2018",
          "brand": "Ford",
          "color": "White",
          "price": 855
        }
      ]
    }
  ]
}

  addDealer(template:any){
    let obj = {...this.userForm.value,
      location:{latitude:this.userForm.value.latitude,longitude:this.userForm.value.longitude},
      owner:{firstName:this.userForm.value.ownerFName,lastName:this.userForm.value.ownerLName} };
    delete obj.longitude;
    delete obj.latitude;
    delete obj.ownerFName;
    delete obj.ownerLName;
    if(!this.isEdit){
      obj = {...obj,cars:[],id:++this.Userid};
      this.dealersInfo.dealers.push(obj);
    }else {
      this.dealersInfo.dealers[this.selectedIndex] = {...this.selectedUser,...obj};
      console.log(this.dealersInfo.dealers[this.selectedIndex])
    }
    template.click();
  }

  getRemainingAmount(data:any){
    let calAmount = data.cars.length ? data.cars.reduce((pre:any,cur:any) => (pre)+(cur.price*1) ,0 ) : 0;
    return (data.totalBudget*1 - calAmount);
  }

  deleteUser(index:number){
    this.dealersInfo.dealers.splice(index,1);
  }

  editUser(index:number,template:any){
    let data = this.dealersInfo.dealers[index];
    this.selectedUser = JSON.parse(JSON.stringify(data));
    this.selectedIndex = index;
    this.isEdit = true;
    this.userForm.patchValue({name:data.name,latitude:data.location.latitude,longitude:data.location.longitude,totalBudget:data.totalBudget,ownerFName:data.owner.firstName, ownerLName: data.owner.lastName });
    this.reset = false;
     template.click();
  }

  openDialog(){
    if(this.reset){
      this.selectedIndex = -1;
      this.selectedUser = {};
      this.isEdit = false;
      this.createForm();
    }
    this.reset = true;
  }

}
