import { INameCodeMapper, TCode, TMonth, TName } from "./academicSemester.interface";

export const month: TMonth[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const name: TName[] = ['Autumn', 'Summer', 'Fall'];
export const code: TCode[] = ['01', '02', '03'];

export const academicSemesterNameCodeMapper: INameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
};
