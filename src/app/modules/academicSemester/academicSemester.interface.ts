export type TMonth =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';

export type TName = 'Autumn' | 'Summer' | 'Fall'
export type TCode = '01' | '02' | '03'

export interface IAcademicSemester {
    name: TName;
    code: TCode;
    year: string;
    startMonth: TMonth;
    endMonth: TMonth;
}

export interface INameCodeMapper {
    [key: string]: string;
}
