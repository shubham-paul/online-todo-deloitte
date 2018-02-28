/**
 * Created by ppandey on 6/2/2017.
 */
export class ErrorMessageMap {
  static readonly errorMap: Map<number, string> = new Map<number, string>([
    [401, "UNAUTHORIZED: Reenter your UserName and Password"],
    [200, 'OPERATION SUCCESSFUL'],
    [500, 'BAD REQUEST']
  ]);


}
