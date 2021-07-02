cell_phone: ['', [Validators.required, this.cellPhoneValidator]];
cell_phone_confirmation: ['', [Validators.required]];


// example of a matching validator 
private cellPhoneValidator(control: AbstractControl) {
 if (control.root.get('cell_phone_confirmation') {
    return control.root.get('cell_phone_confirmation').value !== control.value ?
      { cellPhoneValidator: { value: control.value } } : null;
  }
}
