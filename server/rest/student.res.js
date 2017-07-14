import Router from 'koa-router';
import ApiController from '../util/api-controller';
import Student from '../model/Student';

export default class StudentController extends ApiController {
	path = 'student';
	Model = Student;

}
