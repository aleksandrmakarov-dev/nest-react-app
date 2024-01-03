export class EmailOptionsDto {
  to: string | string[];
  subject: string;
  template: string;
  context: any;
}
