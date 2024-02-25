import {registerSheet} from 'react-native-actions-sheet';
import UserInfoSheet from './UserInfoSheet';
import BankInfoSheet from './BankInfoSheet';
import WorkerAddSheet from './manager/WorkerAddSheet';
import AddJobSheet from './manager/AddJobSheet';
import NotiAddSheet from './manager/NotiAddSheet';
import AddGroupSheet from './manager/AddGroupSheet';
import CreateGroupSheet from './manager/CreateGroupSheet';
import UploadFileSheet from './manager/UploadFileSheet';
import CreateFolderSheet from './manager/CreateFolderSheet';

registerSheet('UserInfoSheet', UserInfoSheet);
registerSheet('BankInfoSheet', BankInfoSheet);
registerSheet('WorkerAddSheet', WorkerAddSheet);
registerSheet('AddJobSheet', AddJobSheet);
registerSheet('NotiAddSheet', NotiAddSheet);
registerSheet('AddGroupSheet', AddGroupSheet);
registerSheet('CreateGroupSheet', CreateGroupSheet);
registerSheet('UploadFileSheet', UploadFileSheet);
registerSheet('CreateFolderSheet', CreateFolderSheet);

export {};
