import { Request, Response } from 'express';
import { SubjectService } from '../services/subject.service';
import catchAsync from '../utils/catchAsync';
import { sendSuccess, sendCreated } from '../utils/response';

export const createSubject = catchAsync(async (req: Request, res: Response) => {
  const subject = await SubjectService.createSubject(req.body);
  sendCreated(res, 'Subject created successfully', subject);
});

export const getAllSubjects = catchAsync(async (req: Request, res: Response) => {
  const subjects = await SubjectService.getAllSubjects();
  sendSuccess(res, 'Subjects retrieved successfully', subjects);
});

export const createTopic = catchAsync(async (req: Request, res: Response) => {
  const { id: subjectId } = req.params;
  const topic = await SubjectService.createTopic(subjectId, req.body);
  sendCreated(res, 'Topic created successfully', topic);
});

export const getTopicsBySubject = catchAsync(async (req: Request, res: Response) => {
  const { id: subjectId } = req.params;
  const topics = await SubjectService.getTopicsBySubject(subjectId);
  sendSuccess(res, 'Topics retrieved successfully', topics);
});
