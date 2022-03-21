import { FormGroup } from '@angular/forms';

/* tslint:disable */

export function convertToEnglishLetter(str): string {
  for (let i = 0; i < str.length; i++) {
    str = str.replace(str[i], function (m) {
      switch (m) {
        case 'ş':
          return 's';
        case 'ı':
          return 'i';
        case 'ç':
          return 'c';
        case 'ü':
          return 'u';
        case 'ğ':
          return 'g';
        case 'ö':
          return 'o';
        case 'Ş':
          return 'S';
        case 'İ':
          return 'I';
        case 'Ç':
          return 'C';
        case 'Ğ':
          return 'G';
        case 'Ü':
          return 'U';
        case 'Ö':
          return 'O';
        case ' ':
          return '-';
        case m:
          return m;
      }
    });
  }
  return str;
}

//  export function cloneObject<T>(arg: T, type: { new(): T }): T {
//     let clonedObject = new type();
//     for (let prop in arg) {
//         clonedObject[prop] = arg[prop];
//     }
//     return clonedObject;
// }

export function getOrderType(order: number) {
  if (order === 1) {
    return 'DESC';
  } else {
    return 'ASC';
  }
}

export function convertFunction(str: string): any {
  return eval(str);
}

export function findIndex(value: string, findArg: string): number {
  let index: number;
  index = value.indexOf(findArg);
  return index;
}

/**
 * @param phoneNumber Phone Number
 */
export function removeMaskCharacters(phoneNumber: string): string {
  if (phoneNumber) {
    return phoneNumber.replace(/[\s\-\(\)]*/g, '');
  } else {
    return null;
  }
}

/**
 * Get the properties of object as a string array
 * like {prop1:'val1',prop2:'val2'...} => ['prop1','prop2'...]
 * @static
 * @param {*} [object={}] target object
 * @returns {string[]} result type
 * @memberof Util
 */
export function getObjectKeys(object: object = {}): string[] {
  return Object.keys(object);
}

/**
 * [1,2,3,4,2,3,4,4,4,] => [1,2,3,4]
 *
 * @static
 * @param {any[]} base array
 * @returns {any[]} array without duplicate value
 * @memberof Util
 */
export function uniq(arr: any[]): any[] {
  return Array.from(new Set(arr));
}

export function getFileExt(fileName: string): string {
  if (fileName && fileName.indexOf('.') !== -1) {
    const dotIndex: number = fileName.lastIndexOf('.');
    return fileName.substr(dotIndex + 1);
  } else {
  }
  return '';
}

export function getFileIcon(fileName: string): string {
  switch (getFileExt(fileName)) {
    case 'pdf':
      return 'fa fa-file-pdf-o';

    case 'zip':
    case 'rar':
    case '7-zip':
      return 'fa fa-file-archive-o';

    case 'docx':
    case 'doc':
      return 'fa a-file-word-o';

    case 'jpg':
    case 'png':
    case 'jpeg':
    case 'bmp':
      return 'fa fa-file-image-o';

    case 'txt':
      return 'fa fa-file-text-o';

    case 'pptx':
    case 'ppt':
      return 'fa fa-file-powerpoint-o';

    case 'xls':
    case 'xlsx':
      return 'fa fa-file-excel-o';

    default:
      return 'fa fa-file-o';
  }
}

export function getFormatedDate(date: Date): string {
  if (date instanceof Date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  } else {
    return date;
  }
}

export function convertToNumber(num: any): string {
  return String(num).replace(',', '.');
}
export function nullDateChecker(dateValue: number | Date | null): Date | null {
  if (dateValue === null) {
    return null;
  } else {
    return new Date(dateValue);
  }
}

export function nameof(args: any = {}): string {
  return Object.keys(args)[0] || 'none';
}

export function setRatioValueLimit(
  form: FormGroup,
  valueControl: string,
  ratioControl: string
) {
  console.log('jkfsdjkjfk');
  form.get(valueControl).valueChanges.subscribe((value) => {
    if (
      (form.get(ratioControl).value === 'RATIO' ||
        +form.get(ratioControl).value === 0) &&
      value > 100
    ) {
      form.get(valueControl).setValue(100);
    }
  });

  form.get(ratioControl).valueChanges.subscribe((value) => {
    if (
      (value === 'RATIO' || +value === 0) &&
      (+form.get(valueControl).value || 0) > 100
    ) {
      form.get(valueControl).setValue(100);
    }
  });
}

export function decodeHtmlTextMessage(message: string): string {
  function unescapeHtml(unsafe) {
    return unsafe
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  }

  function decodeHtml(html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  return decodeHtml(unescapeHtml(message));
}

export function onlyDateModifier(date) {
  return (
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  );
}

export function getPeriodDates(startDate, daysToAdd) {
  var aryDates = [];

  for (var i = 0; i < daysToAdd; i++) {
    var currentDate = new Date();
    currentDate.setDate(startDate.getDate() + i);
    aryDates.push(onlyDateModifier(currentDate));
  }

  return aryDates;
}
