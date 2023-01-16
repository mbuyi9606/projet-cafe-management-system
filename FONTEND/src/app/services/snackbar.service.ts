import { Injectable } from '@angular/core';
import { matsnackbar } from '@material/snackbar'


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }
}
