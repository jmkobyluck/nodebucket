// /*
// ============================================
// ; Title: Nodebucket
// ; Author: Professor Krasso
// ; Modified By: Jonathan Kobyluck
// ; Data: 7 October 2020
// ; Description: item interface
// ;===========================================
// */

import { ObjectUnsubscribedError } from 'rxjs';

export interface Item {
  _id: string;
  text: string;
}
