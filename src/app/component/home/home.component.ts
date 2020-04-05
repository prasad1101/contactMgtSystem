import { Component, OnInit } from '@angular/core';
import { DalService } from 'src/app/services/dal.service';
import Swal from 'sweetalert2';
import $ from 'jquery'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dal: DalService) { }
  userData = {
    avatar: "",
    birthday: Date,
    phoneNumber: null,
    email: "",
    country: "",
    countryCode: "",
    displayName: "",
    fname: "",
    lname: "",
    address: "",
    city: "",
    state: "",
    zip: "94920"
  }
  newUserData = {
    id: Math.floor(Math.random() * 90 + 10),
    avatar: "",
    birthday: Date,
    phoneNumber: null,
    email: "",
    country: "",
    countryCode: "",
    displayName: "",
    fname: "",
    lname: "",
    address: "",
    city: "",
    state: "",
    zip: "94920"
  }
  ngOnInit() {

    $(document).ready(function () {
      $("#searchBox").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myList li").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
      $('.contactList').click(function (e) {
        console.log("wwwwww", e);
        e.preventDefault();
        $(this).css('background-color', 'red');
      })
    });

    console.log("userdata", this.userData)
    this.getContactList();
  }
  contactList: any
  getContactList() {
    this.dal.getContactList().subscribe(x => {
      this.contactList = x;
      console.log("contact list fetched", x);
    })
  }

  detailsById: any
  getUserDetailsById(id) {
    this.detailsById = this.contactList.filter(x => x.id == id);
    console.log("details by id", this.detailsById);
    this.userData = this.detailsById[0];
  }

  updateMe(data) {

    if (!this.validateUpdateContact()) return;
    //console.log("update data", data)
    this.contactList.map(obj => [data].find(o => o.id === obj.id) || obj);
    // console.log("updated contact list", this.contactList);

    this.dal.updateContact(this.contactList).subscribe(x => {
      console.log("update contact res", x);
      this.getContactList();
      Swal.fire({
        icon: 'success',
        title: "Success!",
        text: "User Information updated successfully!",
        timer: 3000
      })
    })
  }

  isContactExists(phoneNumber, arr) {
    return arr.some(function (el) {
      return el.phoneNumber == phoneNumber;
    });
  }

  addContact() {
    console.log(this.validateAddContact())

    if (!this.validateAddContact()) return;

    if (this.isContactExists(this.newUserData.phoneNumber, this.contactList)) {
      Swal.fire({
        icon: 'error',
        title: "Error!",
        text: "User already registered with this phone number!",
        timer: 3000
      })
    } else {
      this.contactList.push(this.newUserData)
      console.log("after adding", this.contactList);
      //let prev = this.contactList.filter(x => x.phoneNumber == this.newUserData.phoneNumber)

      this.dal.updateContact(this.contactList).subscribe(x => {
        console.log("after adding contact", x);
        Swal.fire({
          icon: 'success',
          title: "Success!",
          text: "User Information added successfully!",
          timer: 3000
        })
        this.getContactList();

      })
      document.getElementById('closeModal').click();
    }



  }

  validateAddContact() {
    if (this.newUserData.displayName == "") {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Enter display name!',
        timer: 3000
      })
      return false
    }

    if (this.newUserData.fname == "") {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Enter first name!',
        timer: 3000
      })
      return false
    }

    if (this.newUserData.lname == "") {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Enter last name!',
        timer: 3000
      })
      return false
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.newUserData.email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Enter valid email!',
        timer: 3000
      })
      return false
    }

    if (!/^\d{10}$/.test(this.newUserData.phoneNumber)) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Enter valid mobile number!',
        timer: 3000
      })
      return false
    }
    return true;
  }

  validateUpdateContact() {
    if (this.userData.displayName == "") {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Enter display name!',
        timer: 3000
      })
      return false
    }

    if (this.userData.fname == "") {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Enter first name!',
        timer: 3000
      })
      return false
    }

    if (this.userData.lname == "") {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Enter last name!',
        timer: 3000
      })
      return false
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userData.email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Enter valid email!',
        timer: 3000
      })
      return false
    }

    if (!/^\d{10}$/.test(this.userData.phoneNumber)) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Enter valid mobile number!',
        timer: 3000
      })
      return false
    }
    return true;
  }

}


