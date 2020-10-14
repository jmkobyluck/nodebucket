// /*
// ============================================
// ; Title: Nodebucket
// ; Author: Professor Krasso
// ; Modified By: Jonathan Kobyluck
// ; Data: 7 October 2020
// ; Description: employee interface
// ;===========================================
// */

import { Item } from './item.interface';

export interface Employee {
  empId: string;
  todo: Item[];
  done: Item[];
}
