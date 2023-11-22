import {registerSheet} from 'react-native-actions-sheet';
import UserInfoSheet from './UserInfoSheet';
import BankInfoSheet from './BankInfoSheet';
import WorkerAddSheet from './manager/WorkerAddSheet';
import AddJobSheet from './manager/AddJobSheet';
import NotiAddSheet from './manager/NotiAddSheet';

registerSheet('UserInfoSheet', UserInfoSheet);
registerSheet('BankInfoSheet', BankInfoSheet);
registerSheet('WorkerAddSheet', WorkerAddSheet);
registerSheet('AddJobSheet', AddJobSheet);
registerSheet('NotiAddSheet', NotiAddSheet);

export {};
